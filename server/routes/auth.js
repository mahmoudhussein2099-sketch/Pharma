// server/routes/auth.js
// Real user authentication backed by the JSON store.
// - bcrypt password hashing
// - per-IP login lockout (5 failures / 15 minutes)
// - rate limiting on auth endpoints
// - honeypot bot guard
// - generic error messages (no account enumeration)
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const store = require('../store/db');
const {
  getJwtSecret,
  protectUser,
} = require('../middleware/authMiddleware');
const {
  clientIp,
  logSecurityEvent,
  recordFailedLogin,
  clearFailedLogins,
  isLoginLocked,
  remainingLockMs,
  honeypotGuard,
  generateToken,
} = require('../middleware/security');

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many registrations, please try again later.' },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later.' },
});

const resetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later.' },
});

function sanitizeUser(u) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone || '',
    role: u.role || 'user',
    createdAt: u.createdAt,
  };
}

function signUserToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role || 'user' },
    getJwtSecret(),
    { expiresIn: '7d' }
  );
}

// POST /api/auth/register
router.post('/register', registerLimiter, honeypotGuard, async (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const phone = String(req.body.phone || '').trim();

  if (name.length < 2 || name.length > 60) {
    return res.status(400).json({ message: 'Please enter your name (2-60 characters)' });
  }
  if (!EMAIL_RE.test(email) || email.length > 120) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }
  if (password.length < 8 || password.length > 72) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  const users = store.collection('users');
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: 'This email is already registered' });
  }

  const user = {
    id: `u_${crypto.randomBytes(6).toString('hex')}`,
    name,
    email,
    password: await bcrypt.hash(password, 10),
    phone: phone.slice(0, 20),
    role: 'user',
    wishlist: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(user);
  store.save();

  logSecurityEvent('user-registered', clientIp(req), `New account created: ${email}`);
  res.status(201).json({ token: signUserToken(user), user: sanitizeUser(user) });
});

// POST /api/auth/login
router.post('/login', loginLimiter, honeypotGuard, async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const ip = clientIp(req);

  if (isLoginLocked(ip)) {
    const retryAfter = Math.max(1, Math.ceil(remainingLockMs(ip) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = store.collection('users').find((u) => u.email === email);
  const ok = !!user && (await bcrypt.compare(password, user.password));

  if (!ok) {
    const count = recordFailedLogin(ip);
    if (count >= 5) {
      logSecurityEvent('login-locked', ip, `Login lockout after ${count} failed attempts`);
    } else {
      logSecurityEvent('login-failed', ip, `Failed login attempt for ${email}`);
    }
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  clearFailedLogins(ip);
  logSecurityEvent('login-success', ip, `User signed in: ${email}`);
  res.json({ token: signUserToken(user), user: sanitizeUser(user) });
});

// GET /api/auth/verify
router.get('/verify', (req, res) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
  if (!token) return res.status(401).json({ valid: false, message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    return res.json({
      valid: true,
      user: { id: decoded.id, email: decoded.email, role: decoded.role },
    });
  } catch {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
});

// GET /api/auth/profile
router.get('/profile', protectUser, (req, res) => {
  const user = store.findById('users', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(sanitizeUser(user));
});

// PUT /api/auth/profile
router.put('/profile', protectUser, (req, res) => {
  const user = store.findById('users', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const name = String(req.body.name || '').trim();
  if (name) {
    if (name.length < 2 || name.length > 60) {
      return res.status(400).json({ message: 'Name must be 2-60 characters' });
    }
    user.name = name;
  }
  if (req.body.phone !== undefined) {
    user.phone = String(req.body.phone || '').trim().slice(0, 20);
  }
  user.updatedAt = new Date().toISOString();
  store.save();
  res.json(sanitizeUser(user));
});

// POST /api/auth/forgot-password
router.post('/forgot-password', resetLimiter, honeypotGuard, (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = store.collection('users').find((u) => u.email === email);
  if (user) {
    user.resetToken = generateToken();
    user.resetTokenExpires = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    store.save();
    // No email provider configured yet — the reset token is printed on the
    // server console so the store owner can complete a reset manually.
    console.log(`[password-reset] Reset token for ${email}: ${user.resetToken}`);
  }
  res.json({ message: 'If your email is registered, you will receive a password reset link' });
});

// POST /api/auth/reset-password
router.post('/reset-password', resetLimiter, honeypotGuard, async (req, res) => {
  const token = String(req.body.token || '');
  const password = String(req.body.password || '');

  if (!token || password.length < 8 || password.length > 72) {
    return res.status(400).json({ message: 'A valid token and a password of at least 8 characters are required' });
  }

  const user = store.collection('users').find((u) => u.resetToken && u.resetToken === token);
  if (!user || !user.resetTokenExpires || new Date(user.resetTokenExpires).getTime() < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetTokenExpires = null;
  user.updatedAt = new Date().toISOString();
  store.save();
  logSecurityEvent('password-reset', clientIp(req), `Password reset for ${user.email}`);
  res.json({ message: 'Password updated successfully. You can now sign in.' });
});

module.exports = router;
