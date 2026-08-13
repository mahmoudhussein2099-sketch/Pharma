// server/routes/users.js
// User profile + wishlist backed by the JSON store, protected by JWTs.
const express = require('express');
const router = express.Router();
const store = require('../store/db');
const { protectUser } = require('../middleware/authMiddleware');

function safeUser(u) {
  const { password, resetToken, resetTokenExpires, ...rest } = u;
  return rest;
}

// GET /api/users/profile
router.get('/profile', protectUser, (req, res) => {
  const user = store.findById('users', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(safeUser(user));
});

// PUT /api/users/profile
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
  if (req.body.address && typeof req.body.address === 'object') {
    user.address = { ...(user.address || {}), ...req.body.address };
  }
  user.updatedAt = new Date().toISOString();
  store.save();
  res.json(safeUser(user));
});

// GET /api/users/wishlist
router.get('/wishlist', protectUser, (req, res) => {
  const user = store.findById('users', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user.wishlist || []);
});

// POST /api/users/wishlist  body: { productId }
router.post('/wishlist', protectUser, (req, res) => {
  const productId = String(req.body.productId || '');
  if (!productId) return res.status(400).json({ message: 'Product ID is required' });

  const product = store.findById('products', productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const user = store.findById('users', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.wishlist = user.wishlist || [];
  const pid = String(product.id);
  if (!user.wishlist.includes(pid)) user.wishlist.push(pid);
  store.save();
  res.json(user.wishlist);
});

// DELETE /api/users/wishlist/:productId
router.delete('/wishlist/:productId', protectUser, (req, res) => {
  const user = store.findById('users', req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.wishlist = (user.wishlist || []).filter(
    (id) => String(id) !== String(req.params.productId)
  );
  store.save();
  res.json(user.wishlist);
});

module.exports = router;
