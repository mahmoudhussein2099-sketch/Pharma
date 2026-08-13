// server/routes/settingsRoutes.js
// Store settings (public read, admin write).
const express = require('express');
const router = express.Router();
const store = require('../store/db');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  res.json(store.collection('settings') || {});
});

router.put('/', protectAdmin, (req, res) => {
  const s = store.collection('settings');
  const allowed = [
    'storeName',
    'currency',
    'currencySymbol',
    'phone',
    'whatsapp',
    'email',
    'address',
    'announcement',
  ];
  for (const k of allowed) {
    if (req.body[k] !== undefined) s[k] = String(req.body[k]);
  }
  store.save();
  res.json(s);
});

module.exports = router;
