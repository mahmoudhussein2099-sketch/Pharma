/**
 * server/middleware/security.js
 * Real security primitives for the Awon Pharmacy API.
 * - File-backed security event log (data/security-events.log)
 * - In-memory login lockout (5 failures / 15 minutes per IP)
 * - Honeypot bot guard
 * - Client IP resolution (x-forwarded-for aware)
 * - Crypto helpers (nonce / token generation)
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'data', 'security-events.log');
const MAX_LOG_LINES = 500;

const LOCK_THRESHOLD = 5;
const LOCK_WINDOW_MS = 15 * 60 * 1000;

// ip -> { count, firstAt, lastAt }
const failedLogins = new Map();

function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string') {
    const first = xff.split(',')[0].trim();
    if (first) return first;
  }
  return req.ip || (req.socket && req.socket.remoteAddress) || 'unknown';
}

function logSecurityEvent(type, ip, detail) {
  const line = JSON.stringify({
    ts: new Date().toISOString(),
    type,
    ip: String(ip || 'unknown').slice(0, 64),
    detail: String(detail || '').slice(0, 300),
  });
  try {
    fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
    let existing = [];
    if (fs.existsSync(LOG_FILE)) {
      existing = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean);
    }
    existing.push(line);
    if (existing.length > MAX_LOG_LINES) existing = existing.slice(-MAX_LOG_LINES);
    fs.writeFileSync(LOG_FILE, existing.join('\n') + '\n', 'utf8');
  } catch {
    /* best effort — never throw from a security helper */
  }
}

function getRecentSecurityEvents(limit = 100) {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n').filter(Boolean).slice(-limit);
    const events = [];
    for (const line of lines) {
      try {
        events.push(JSON.parse(line));
      } catch {
        /* skip malformed lines */
      }
    }
    return events.reverse();
  } catch {
    return [];
  }
}

function recordFailedLogin(ip) {
  const now = Date.now();
  const entry = failedLogins.get(ip);
  if (!entry || now - entry.firstAt > LOCK_WINDOW_MS) {
    failedLogins.set(ip, { count: 1, firstAt: now, lastAt: now });
  } else {
    entry.count += 1;
    entry.lastAt = now;
  }
  return failedLogins.get(ip).count;
}

function clearFailedLogins(ip) {
  failedLogins.delete(ip);
}

function isLoginLocked(ip) {
  const entry = failedLogins.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.firstAt > LOCK_WINDOW_MS) {
    failedLogins.delete(ip);
    return false;
  }
  return entry.count >= LOCK_THRESHOLD;
}

function remainingLockMs(ip) {
  const entry = failedLogins.get(ip);
  if (!entry) return 0;
  const ms = entry.firstAt + LOCK_WINDOW_MS - Date.now();
  return ms > 0 ? ms : 0;
}

// Hidden field honeypot — legitimate forms never send `website`.
const honeypotGuard = (req, res, next) => {
  const value = req.body && req.body.website;
  if (typeof value === 'string' && value.trim() !== '') {
    logSecurityEvent('honeypot', clientIp(req), 'Bot filled hidden honeypot field');
    return res.status(400).json({ message: 'Invalid request' });
  }
  next();
};

const generateNonce = () => crypto.randomBytes(16).toString('base64');
const generateToken = () => crypto.randomBytes(24).toString('hex');

module.exports = {
  clientIp,
  logSecurityEvent,
  getRecentSecurityEvents,
  recordFailedLogin,
  clearFailedLogins,
  isLoginLocked,
  remainingLockMs,
  honeypotGuard,
  generateNonce,
  generateToken,
};
