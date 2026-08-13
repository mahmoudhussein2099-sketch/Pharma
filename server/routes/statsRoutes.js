// server/routes/statsRoutes.js
// Real analytics for the admin dashboard.
const express = require('express');
const router = express.Router();
const store = require('../store/db');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', protectAdmin, (req, res) => {
  const products = store.collection('products');
  const orders = store.collection('orders');
  const coupons = store.collection('coupons');

  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((s, o) => s + Number(o.total || 0), 0);

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const todayOrders = orders.filter((o) => (o.createdAt || '').slice(0, 10) === today);
  const todayRevenue = todayOrders.filter((o) => o.status !== 'Cancelled').reduce((s, o) => s + Number(o.total || 0), 0);

  const statusCounts = {};
  for (const o of orders) statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;

  const categoryCounts = {};
  for (const p of products) categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;

  const qtyByProduct = {};
  for (const o of orders) {
    for (const it of o.items || []) {
      const key = String(it.name || it.productId);
      qtyByProduct[key] = (qtyByProduct[key] || 0) + Number(it.quantity || 0);
    }
  }
  const topProducts = Object.entries(qtyByProduct)
    .map(([name, quantity]) => ({ name, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  const lowStock = products
    .filter((p) => Number(p.stock || 0) <= 10 && p.inStock !== false)
    .slice(0, 10)
    .map((p) => ({ id: p.id, name: p.name, stock: p.stock }));

  res.json({
    totalProducts: products.length,
    activeProducts: products.filter((p) => p.isActive !== false).length,
    totalOrders: orders.length,
    pendingOrders: statusCounts.Pending || 0,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    todayOrders: todayOrders.length,
    todayRevenue: Math.round(todayRevenue * 100) / 100,
    statusCounts,
    categoryCounts,
    topProducts,
    lowStock,
    coupons: coupons.length,
    newsletter: store.collection('newsletter').length,
    contacts: store.collection('contacts').length,
    recentOrders: orders.slice(0, 6),
  });
});

module.exports = router;
