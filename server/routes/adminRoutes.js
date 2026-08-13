// server/routes/adminRoutes.js
// Admin auth + profile management backed by the JSON store.
// - No open registration. The first admin is created via POST /api/admin/setup
//   using a one-time setup token (see server/data/setup-admin.txt).
// - Per-IP lockout on the login endpoint (5 failures / 15 minutes).
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const router = express.Router();
const store = require('../store/db');
const { protectAdmin, getJwtSecret } = require('../middleware/authMiddleware');
const {
  clientIp,
  logSecurityEvent,
  recordFailedLogin,
  clearFailedLogins,
  isLoginLocked,
  remainingLockMs,
  honeypotGuard,
} = require('../middleware/security');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again later.' },
});

const setupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many setup attempts, please try again later.' },
});

// POST /api/admin/login
router.post('/login', loginLimiter, honeypotGuard, async (req, res) => {
  const { email, password } = req.body;
  const ip = clientIp(req);

  if (isLoginLocked(ip)) {
    const retryAfter = Math.max(1, Math.ceil(remainingLockMs(ip) / 1000));
    res.setHeader('Retry-After', String(retryAfter));
    return res.status(429).json({ message: 'Too many attempts. Please try again later.' });
  }

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!store.hasAdmin()) {
    return res.status(409).json({
      message: 'No admin account exists yet. Complete the one-time setup first.',
    });
  }

  const admin = store
    .collection('admins')
    .find((a) => String(a.email).toLowerCase() === String(email).toLowerCase());

  const ok = !!admin && (await bcrypt.compare(String(password), admin.password));
  if (!ok) {
    const count = recordFailedLogin(ip);
    if (count >= 5) {
      logSecurityEvent('admin-login-locked', ip, `Admin lockout after ${count} failed attempts`);
    } else {
      logSecurityEvent('admin-login-failed', ip, `Failed admin login for ${String(email).toLowerCase()}`);
    }
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  clearFailedLogins(ip);
  logSecurityEvent('admin-login-success', ip, `Admin signed in: ${admin.email}`);

  const token = jwt.sign({ adminId: admin._id }, getJwtSecret(), { expiresIn: '1d' });
  res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } });
});

// POST /api/admin/setup  — one-time first-admin creation
router.post('/setup', setupLimiter, honeypotGuard, async (req, res) => {
  const { token, name, email, password } = req.body;
  const ip = clientIp(req);

  if (store.hasAdmin()) {
    return res.status(400).json({ message: 'Setup already complete' });
  }
  if (!store.verifySetupToken(token)) {
    logSecurityEvent('setup-token-fail', ip, 'Invalid setup token used');
    return res.status(403).json({ message: 'Invalid or missing setup token' });
  }

  const cleanName = String(name || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  if (cleanName.length < 2 || cleanName.length > 60) {
    return res.status(400).json({ message: 'Please enter a name (2-60 characters)' });
  }
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail) || cleanEmail.length > 120) {
    return res.status(400).json({ message: 'Please enter a valid email address' });
  }
  if (String(password).length < 8 || String(password).length > 72) {
    return res.status(400).json({ message: 'Password must be at least 8 characters' });
  }

  const admin = {
    _id: `admin_${crypto.randomBytes(6).toString('hex')}`,
    name: cleanName,
    email: cleanEmail,
    password: await bcrypt.hash(String(password), 10),
    role: 'admin',
    createdAt: new Date().toISOString(),
  };
  store.collection('admins').push(admin);
  store.clearSetupToken();
  store.save();
  logSecurityEvent('admin-created', ip, `First admin account created: ${cleanEmail}`);
  res.status(201).json({ message: 'Admin account created successfully. You can now sign in.' });
});

// Protected routes
router.get('/dashboard', protectAdmin, (req, res) => {
  res.json({ message: '✅ Welcome to Awon Admin Dashboard 🎯', admin: req.admin });
});

router.get('/profile', protectAdmin, (req, res) => {
  const admin = store.findById('admins', req.admin.id);
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  res.json({ id: admin._id, name: admin.name, email: admin.email, role: admin.role });
});

router.put('/profile', protectAdmin, (req, res) => {
  const { name, email } = req.body;
  const admin = store.collection('admins').find((a) => String(a._id) === String(req.admin.id));
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  if (name && String(name).trim().length >= 2 && String(name).trim().length <= 60) {
    admin.name = String(name).trim();
  }
  if (email && /^\S+@\S+\.\S+$/.test(String(email)) && String(email).length <= 120) {
    admin.email = String(email).trim().toLowerCase();
  }
  store.save();
  res.json({ message: 'Profile updated successfully', admin: { id: admin._id, name: admin.name, email: admin.email } });
});

router.put('/change-password', protectAdmin, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old and new passwords are required' });
  }
  if (String(newPassword).length < 8 || String(newPassword).length > 72) {
    return res.status(400).json({ message: 'New password must be at least 8 characters' });
  }
  const admin = store.collection('admins').find((a) => String(a._id) === String(req.admin.id));
  if (!admin) return res.status(404).json({ message: 'Admin not found' });
  const isMatch = await bcrypt.compare(String(oldPassword), admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });
  admin.password = await bcrypt.hash(String(newPassword), 10);
  store.save();
  res.json({ message: 'Password changed successfully' });
});

router.get('/all', protectAdmin, (req, res) => {
  const admins = store
    .collection('admins')
    .map(({ password, ...rest }) => rest);
  res.json(admins);
});

router.delete('/delete', protectAdmin, (req, res) => {
  const admins = store.collection('admins');
  const idx = admins.findIndex((a) => String(a._id) === String(req.admin.id));
  if (idx === -1) return res.status(404).json({ message: 'Admin not found' });
  admins.splice(idx, 1);
  store.save();
  res.json({ message: 'Admin account deleted successfully' });
});

module.exports = router;
