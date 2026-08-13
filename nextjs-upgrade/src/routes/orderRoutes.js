// server/routes/orderRoutes.js

const express = require('express');
const router = express.Router();

// In-memory order list
let orders = [];

// Place an order
router.post('/', (req, res) => {
  const order = { id: Date.now(), ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

// Get all orders
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
