// server/routes/marketingRoutes.js
// Newsletter, contact messages, and marketing stats.
const express = require('express');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const store = require('../store/db');
const { protectAdmin } = require('../middleware/authMiddleware');
const { honeypotGuard } = require('../middleware/security');

const EMAIL_RE = /^\S+@\S+\.\S+$/;

const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many subscription attempts, please try again later.' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages, please try again later.' },
});

// Public: subscribe to newsletter
router.post('/newsletter', newsletterLimiter, honeypotGuard, (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 120) {
    return res.status(400).json({ message: 'Valid email is required' });
  }
  const list = store.collection('newsletter');
  if (list.some((s) => s.email === email)) {
    return res.json({ message: 'Already subscribed', subscribed: true });
  }
  list.push({ id: crypto.randomBytes(4).toString('hex'), email, createdAt: new Date().toISOString() });
  store.save();
  res.status(201).json({ message: 'Subscribed successfully', subscribed: true });
});

// Public: save contact message
router.post('/contact', contactLimiter, honeypotGuard, (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const subject = String(req.body.subject || '').trim();
  const message = String(req.body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  if (name.length > 100 || !EMAIL_RE.test(email) || email.length > 120 || subject.length > 150 || message.length > 2000) {
    return res.status(400).json({ message: 'Please check the length of your message fields' });
  }
  store.collection('contacts').push({
    id: crypto.randomBytes(4).toString('hex'),
    name,
    email,
    subject,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  });
  store.save();
  res.status(201).json({ message: 'Message sent successfully' });
});

// Admin: list contact messages
router.get('/contacts', protectAdmin, (req, res) => {
  const contacts = store.collection('contacts').slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(contacts);
});

// Admin: mark contact read
router.put('/contacts/:id', protectAdmin, (req, res) => {
  const c = store.collection('contacts').find((x) => x.id === req.params.id);
  if (!c) return res.status(404).json({ message: 'Not found' });
  c.read = true;
  store.save();
  res.json(c);
});

// Admin: delete contact
router.delete('/contacts/:id', protectAdmin, (req, res) => {
  const list = store.collection('contacts');
  const idx = list.findIndex((x) => x.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  list.splice(idx, 1);
  store.save();
  res.json({ message: 'Deleted' });
});

// Admin: list newsletter subscribers
router.get('/newsletter', protectAdmin, (req, res) => {
  const list = store.collection('newsletter').slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(list);
});

// Admin: export newsletter as CSV
router.get('/newsletter/export', protectAdmin, (req, res) => {
  const rows = store.collection('newsletter');
  const csv = 'email,subscribed_at\n' + rows.map((r) => `${r.email},${r.createdAt}`).join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=newsletter.csv');
  res.send(csv);
});

module.exports = router;
