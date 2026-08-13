// server/middleware/authMiddleware.js
// JWT-based authentication backed by the JSON store.
// - Admin tokens carry { adminId }
// - User tokens carry { id, email, role }
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const store = require('../store/db');

const MIN_SECRET_LENGTH = 32;
let ephemeralSecret = null;

function getJwtSecret() {
  const env = process.env.JWT_SECRET;
  if (env && env.length >= MIN_SECRET_LENGTH) return env;
  if (!ephemeralSecret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'JWT_SECRET must be set to a value of at least 32 characters in production'
      );
    }
    ephemeralSecret = crypto.randomBytes(48).toString('hex');
    console.warn(
      '[auth] JWT_SECRET missing or shorter than 32 chars — using an ephemeral secret. Set JWT_SECRET in server/.env for stable sessions.'
    );
  }
  return ephemeralSecret;
}

function parseBearer(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  return header.split(' ')[1];
}

// Admin protection: requires a token that resolves to a live admin account.
function protectAdmin(req, res, next) {
  const token = parseBearer(req);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  let decoded;
  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  if (!decoded.adminId) return res.status(401).json({ message: 'Invalid token' });

  const admin = store
    .collection('admins')
    .find((a) => String(a._id) === String(decoded.adminId));
  if (!admin) return res.status(401).json({ message: 'Admin not found' });

  req.admin = { id: admin._id, email: admin.email, name: admin.name, role: admin.role || 'admin' };
  next();
}

// User protection: requires a token that resolves to a live user account.
function protectUser(req, res, next) {
  const token = parseBearer(req);
  if (!token) return res.status(401).json({ message: 'No token provided' });

  let decoded;
  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  if (!decoded.id) return res.status(401).json({ message: 'Invalid token' });

  const user = store
    .collection('users')
    .find((u) => String(u.id) === String(decoded.id));
  if (!user) return res.status(401).json({ message: 'User not found' });

  req.user = { id: user.id, email: user.email, name: user.name };
  next();
}

module.exports = { getJwtSecret, protectAdmin, protectUser };
