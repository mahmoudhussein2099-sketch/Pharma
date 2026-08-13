// server/routes/couponRoutes.js
// Admin CRUD + public validation for promo codes.
const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const store = require('../store/db');
const { protectAdmin } = require('../middleware/authMiddleware');

const validateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { valid: false, message: 'Too many validation attempts, please try again later.' },
});

// Admin: list coupons
router.get('/', protectAdmin, (req, res) => {
  res.json(store.collection('coupons'));
});

// Admin: create coupon
router.post('/', protectAdmin, (req, res) => {
  const { code, type, value, minOrder, maxDiscount, active, usageLimit, expiresAt } = req.body;
  if (!code || !type || value === undefined) {
    return res.status(400).json({ message: 'Code, type and value are required' });
  }
  if (!['percent', 'fixed'].includes(type)) {
    return res.status(400).json({ message: 'Type must be percent or fixed' });
  }
  const exists = store
    .collection('coupons')
    .some((c) => String(c.code).toLowerCase() === String(code).toLowerCase());
  if (exists) return res.status(400).json({ message: 'Coupon code already exists' });

  const coupon = {
    id: store.nextId('coupons'),
    code: String(code).trim().toUpperCase(),
    type,
    value: Number(value),
    minOrder: minOrder ? Number(minOrder) : 0,
    maxDiscount: maxDiscount ? Number(maxDiscount) : undefined,
    active: active === undefined ? true : active === true || active === 'true',
    usageLimit: usageLimit ? Number(usageLimit) : undefined,
    usedCount: 0,
    expiresAt: expiresAt || null,
    createdAt: new Date().toISOString(),
  };
  store.collection('coupons').push(coupon);
  store.save();
  res.status(201).json(coupon);
});

// Admin: update coupon
router.put('/:id', protectAdmin, (req, res) => {
  const coupon = store.collection('coupons').find((c) => String(c.id) === String(req.params.id));
  if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
  const fields = ['code', 'type', 'value', 'minOrder', 'maxDiscount', 'active', 'usageLimit', 'expiresAt'];
  for (const f of fields) {
    if (req.body[f] !== undefined) {
      if (f === 'active') coupon[f] = req.body[f] === true || req.body[f] === 'true';
      else if (['value', 'minOrder', 'maxDiscount', 'usageLimit'].includes(f)) coupon[f] = Number(req.body[f]);
      else if (f === 'expiresAt') coupon[f] = req.body[f] || null;
      else if (f === 'code') coupon[f] = String(req.body[f]).trim().toUpperCase();
    }
  }
  store.save();
  res.json(coupon);
});

// Admin: delete coupon
router.delete('/:id', protectAdmin, (req, res) => {
  const coupons = store.collection('coupons');
  const idx = coupons.findIndex((c) => String(c.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Coupon not found' });
  coupons.splice(idx, 1);
  store.save();
  res.json({ message: 'Coupon deleted successfully' });
});

// Public: validate a coupon against a subtotal
router.post('/validate', validateLimiter, (req, res) => {
  const { code, subtotal } = req.body;
  const coupon = store
    .collection('coupons')
    .find((c) => String(c.code).toLowerCase() === String(code || '').toLowerCase());
  const amount = Number(subtotal) || 0;

  if (!coupon || !coupon.active) return res.status(400).json({ valid: false, message: 'Invalid coupon' });
  const now = Date.now();
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < now) {
    return res.status(400).json({ valid: false, message: 'Coupon has expired' });
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return res.status(400).json({ valid: false, message: 'Coupon usage limit reached' });
  }
  if (amount < (coupon.minOrder || 0)) {
    return res.status(400).json({ valid: false, message: `Minimum order for this coupon is ${coupon.minOrder} SAR` });
  }

  let discount;
  if (coupon.type === 'percent') {
    discount = (amount * coupon.value) / 100;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  } else {
    discount = coupon.value;
  }
  discount = Math.max(0, Math.min(discount, amount));

  res.json({ valid: true, coupon, discount: Math.round(discount * 100) / 100 });
});

module.exports = router;
