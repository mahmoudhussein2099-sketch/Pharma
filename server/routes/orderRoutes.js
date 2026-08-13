// server/routes/orderRoutes.js
// Real order management backed by the JSON store, with coupon support.
// - Prices are always recomputed server-side from the product catalogue
// - Stock is validated and decremented on order placement
// - /mine is protected by a user JWT
const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const store = require('../store/db');
const {
  protectAdmin,
  protectUser,
} = require('../middleware/authMiddleware');
const {
  clientIp,
  logSecurityEvent,
  honeypotGuard,
} = require('../middleware/security');

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const createLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many orders, please try again later.' },
});

const PHONE_RE = /^[+0-9 ()-]{7,30}$/;

function resolveCoupon(code) {
  if (!code) return null;
  const coupon = store
    .collection('coupons')
    .find((c) => String(c.code).toLowerCase() === String(code).trim().toLowerCase());
  if (!coupon || !coupon.active) return null;
  const now = Date.now();
  if (coupon.expiresAt && new Date(coupon.expiresAt).getTime() < now) return null;
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return null;
  return coupon;
}

function calcDiscount(coupon, subtotal) {
  if (!coupon) return { discount: 0, couponId: null };
  let discount;
  if (coupon.type === 'percent') {
    discount = (subtotal * coupon.value) / 100;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  } else {
    discount = coupon.value;
  }
  discount = Math.max(0, Math.min(discount, subtotal));
  return { discount, couponId: coupon.id || coupon.code };
}

// POST /api/orders/create
router.post('/create', createLimiter, honeypotGuard, (req, res) => {
  const {
    customerName,
    phone,
    address,
    items,
    email,
    city,
    paymentMethod,
    couponCode,
  } = req.body;

  if (!customerName || !phone || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (items.length > 50) return res.status(400).json({ error: 'Too many items in order' });
  if (String(customerName).trim().length > 100) {
    return res.status(400).json({ error: 'Name is too long' });
  }
  const cleanPhone = String(phone).trim();
  if (!PHONE_RE.test(cleanPhone)) {
    return res.status(400).json({ error: 'Please enter a valid phone number' });
  }
  if (String(address).trim().length > 200) {
    return res.status(400).json({ error: 'Address is too long' });
  }
  if (email && (!/^\S+@\S+\.\S+$/.test(email) || String(email).length > 120)) {
    return res.status(400).json({ error: 'Please enter a valid email address' });
  }

  // ── Server-side pricing + stock validation ─────────────────────────────
  let subtotal = 0;
  const orderItems = [];
  const seen = new Set();

  for (const it of items) {
    const pid = String(it.id || it.productId || '');
    const qty = Math.floor(Number(it.quantity));
    if (!pid || !Number.isFinite(qty) || qty < 1 || qty > 99) {
      return res.status(400).json({ error: 'Invalid item in order' });
    }
    if (seen.has(pid)) {
      return res.status(400).json({ error: 'Duplicate item in order' });
    }
    seen.add(pid);

    const product = store.findById('products', pid);
    if (!product || product.isActive === false) {
      return res.status(400).json({ error: 'One or more products are no longer available' });
    }

    const available = Number(product.stock);
    if (Number.isFinite(available) && qty > available) {
      return res.status(400).json({ error: `Only ${available} of ${product.name} in stock` });
    }

    const price = Number(product.price);
    if (!Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ error: 'Product price error' });
    }

    subtotal += price * qty;
    orderItems.push({
      productId: pid,
      name: String(product.name || '').slice(0, 120),
      price: Math.round(price * 100) / 100,
      quantity: qty,
      image: it.image ? String(it.image).slice(0, 500) : product.image || '',
    });
  }

  subtotal = Math.round(subtotal * 100) / 100;

  const coupon = resolveCoupon(couponCode);
  if (couponCode && !coupon) {
    return res.status(400).json({ error: 'Invalid or expired promo code' });
  }
  const { discount } = calcDiscount(coupon, subtotal);
  const shipping = subtotal >= 200 ? 0 : 15;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;

  const order = {
    id: store.nextId('orders'),
    customerName: String(customerName).trim().slice(0, 100),
    phone: cleanPhone.slice(0, 30),
    email: email ? String(email).trim().toLowerCase().slice(0, 120) : '',
    address: String(address).trim().slice(0, 200),
    city: city ? String(city).trim().slice(0, 100) : '',
    paymentMethod: paymentMethod === 'cod' ? 'cod' : 'cod',
    items: orderItems,
    subtotal,
    discount: Math.round(discount * 100) / 100,
    shipping,
    total,
    couponCode: coupon ? coupon.code : null,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.collection('orders').unshift(order);

  if (coupon) {
    coupon.usedCount = (coupon.usedCount || 0) + 1;
  }

  // Decrement stock
  for (const it of orderItems) {
    const product = store.findById('products', it.productId);
    if (product && Number.isFinite(Number(product.stock))) {
      product.stock = Math.max(0, Number(product.stock) - it.quantity);
      if (Number(product.stock) === 0) product.inStock = false;
    }
  }

  store.save();
  logSecurityEvent('order-created', clientIp(req), `Order #${order.id} placed (SAR ${total})`);
  res.status(201).json({ message: 'Order placed successfully', order });
});

// Admin: list all orders (with optional status filter)
router.get('/', protectAdmin, (req, res) => {
  let orders = store.collection('orders');
  const { status, search } = req.query;
  if (status && status !== 'all') orders = orders.filter((o) => o.status === status);
  if (search) {
    const s = String(search).toLowerCase();
    orders = orders.filter(
      (o) =>
        String(o.id).includes(s) ||
        String(o.customerName || '').toLowerCase().includes(s) ||
        String(o.phone || '').toLowerCase().includes(s) ||
        String(o.email || '').toLowerCase().includes(s)
    );
  }
  orders = orders.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(orders);
});

// Customer: get own orders (JWT protected)
router.get('/mine', protectUser, (req, res) => {
  const orders = store
    .collection('orders')
    .filter(
      (o) =>
        o.email &&
        String(o.email).toLowerCase() === String(req.user.email).toLowerCase()
    )
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  res.json(orders);
});

// Admin: get single order
router.get('/:id', protectAdmin, (req, res) => {
  const order = store.findById('orders', req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

// Admin: update order status
router.put('/:id/status', protectAdmin, (req, res) => {
  const order = store.collection('orders').find((o) => String(o.id) === String(req.params.id));
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const status = req.body.status;
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  order.status = status;
  order.updatedAt = new Date().toISOString();
  store.save();
  res.json(order);
});

// Admin: delete order
router.delete('/:id', protectAdmin, (req, res) => {
  const orders = store.collection('orders');
  const idx = orders.findIndex((o) => String(o.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Order not found' });
  orders.splice(idx, 1);
  store.save();
  res.json({ message: 'Order deleted successfully' });
});

module.exports = router;
