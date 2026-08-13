// server/routes/adminProductRoutes.js

const express = require('express');
const router = express.Router();

// Dummy product list
let products = [
  { id: 1, name: 'Panadol', price: 15 },
  { id: 2, name: 'Vitamin C', price: 30 }
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Add a new product
router.post('/', (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Delete a product
router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
