// server/routes/cartRoutes.js

const express = require('express');
const router = express.Router();

// In-memory cart
let cart = [];

// Get cart items
router.get('/', (req, res) => {
  res.json(cart);
});

// Add to cart
router.post('/', (req, res) => {
  const item = req.body;
  cart.push(item);
  res.status(201).json(item);
});

// Remove from cart
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.json({ message: 'Item removed from cart' });
});

module.exports = router;
