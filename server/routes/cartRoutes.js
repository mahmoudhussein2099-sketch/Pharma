// server/routes/cartRoutes.js
// Cart backed by the JSON store and scoped to the authenticated user.
const express = require('express');
const router = express.Router();
const store = require('../store/db');
const { protectUser } = require('../middleware/authMiddleware');

function getCart(userId) {
  const db = store.load();
  const carts = db.carts;
  let cart = carts.find((c) => c.userId === String(userId));
  if (!cart) {
    cart = { id: store.nextId('carts'), userId: String(userId), items: [] };
    carts.push(cart);
    store.save();
  }
  return cart;
}

function enrich(cart) {
  const products = store.collection('products');
  const items = cart.items.map((it) => {
    const p = products.find((pr) => String(pr.id) === String(it.productId));
    return {
      productId: it.productId,
      quantity: it.quantity,
      name: p ? p.name : it.name || '',
      price: p ? Number(p.price) : Number(it.price) || 0,
      image: p && p.image ? p.image : it.image || '',
    };
  });
  const subtotal = Math.round(items.reduce((s, it) => s + it.price * it.quantity, 0) * 100) / 100;
  return {
    id: cart.id,
    userId: cart.userId,
    items,
    subtotal,
    count: items.reduce((s, it) => s + it.quantity, 0),
  };
}

// GET /api/cart — current user's cart
router.get('/', protectUser, (req, res) => {
  res.json(enrich(getCart(req.user.id)));
});

// POST /api/cart/add  body: { productId, quantity }
router.post('/add', protectUser, (req, res) => {
  const productId = String(req.body.productId || '');
  const quantity = Math.floor(Number(req.body.quantity));
  if (!productId) return res.status(400).json({ error: 'Product ID is required' });
  if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  const product = store.findById('products', productId);
  if (!product || product.isActive === false) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const cart = getCart(req.user.id);
  const existing = cart.items.find((it) => String(it.productId) === productId);
  if (existing) {
    existing.quantity = Math.min(99, existing.quantity + quantity);
  } else {
    cart.items.push({
      productId,
      quantity,
      name: product.name,
      price: Number(product.price),
      image: product.image || '',
    });
  }
  store.save();
  res.status(200).json(enrich(cart));
});

// POST /api/cart/remove  body: { productId }
router.post('/remove', protectUser, (req, res) => {
  const productId = String(req.body.productId || '');
  if (!productId) return res.status(400).json({ error: 'Product ID is required' });
  const cart = getCart(req.user.id);
  cart.items = cart.items.filter((it) => String(it.productId) !== productId);
  store.save();
  res.json(enrich(cart));
});

// POST /api/cart/clear
router.post('/clear', protectUser, (req, res) => {
  const cart = getCart(req.user.id);
  cart.items = [];
  store.save();
  res.json(enrich(cart));
});

module.exports = router;
