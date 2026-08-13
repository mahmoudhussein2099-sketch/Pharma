// server/routes/securityRoutes.js
// In-app security monitoring for admins:
//   GET /api/admin/security/events — recent security events from the log
//   GET /api/admin/security/status  — lightweight monitor status
const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');
const { getRecentSecurityEvents } = require('../middleware/security');

// GET /api/admin/security/events?limit=100
router.get('/events', protectAdmin, (req, res) => {
  const raw = Number(req.query.limit);
  const limit = Number.isFinite(raw) ? Math.min(500, Math.max(1, Math.floor(raw))) : 100;
  res.json({ events: getRecentSecurityEvents(limit) });
});

// GET /api/admin/security/status
router.get('/status', protectAdmin, (req, res) => {
  const events = getRecentSecurityEvents(200);
  const failed = events.filter((e) => /failed|locked|token-fail|honeypot/i.test(e.type || ''));
  res.json({
    enabled: true,
    totalLogged: events.length,
    recentFailed: failed.length,
    lastEvent: events[0] || null,
    monitored: ['login', 'admin-login', 'register', 'password-reset', 'order', 'honeypot', 'setup'],
    checkedAt: new Date().toISOString(),
  });
});

module.exports = router;
