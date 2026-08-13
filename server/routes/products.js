// server/routes/products.js
// Full catalogue API backed by the JSON store (server/data/db.json).
const express = require('express');
const router = express.Router();
const store = require('../store/db');

const CATEGORY_ORDER = ['prescription', 'otc', 'vitamins', 'baby', 'beauty', 'medical', 'firstaid', 'eye'];

function applyFilters(list, q) {
  let result = [...list];
  const { category, subcategory, search, sort, inStock, limit, page } = q;

  if (category && category !== 'all') {
    result = result.filter((p) => p.category === category);
  }
  if (subcategory && subcategory !== 'all') {
    result = result.filter((p) => p.subcategory === subcategory);
  }
  if (inStock === 'true') {
    result = result.filter((p) => p.inStock !== false);
  }
  if (search) {
    const s = String(search).toLowerCase();
    result = result.filter(
      (p) =>
        String(p.name || '').toLowerCase().includes(s) ||
        String(p.brand || '').toLowerCase().includes(s) ||
        String(p.description || '').toLowerCase().includes(s) ||
        String(p.category || '').toLowerCase().includes(s) ||
        String(p.subcategory || '').toLowerCase().includes(s)
    );
  }

  switch (sort) {
    case 'newest':
      result.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '') || b.id - a.id);
      break;
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      break;
    case 'rating':
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    default:
      break;
  }

  const total = result.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const pageSize = Math.min(5000, Math.max(1, parseInt(limit, 10) || 60));
  const start = (pageNum - 1) * pageSize;
  result = result.slice(start, start + pageSize);

  return { items: result, total, page: pageNum, pageSize };
}

// Get all products (with filters)
router.get('/', (req, res) => {
  const products = store.collection('products').filter((p) => p.isActive !== false);
  const result = applyFilters(products, req.query);
  res.json(result);
});

// Get categories with counts
router.get('/categories', (req, res) => {
  const products = store.collection('products').filter((p) => p.isActive !== false);
  const map = new Map();
  for (const p of products) {
    if (!map.has(p.category)) map.set(p.category, { name: p.category, count: 0, subcategories: new Map() });
    const entry = map.get(p.category);
    entry.count++;
    const sub = p.subcategory || 'General';
    entry.subcategories.set(sub, (entry.subcategories.get(sub) || 0) + 1);
  }
  const result = [...map.entries()].map(([name, entry]) => ({
    name,
    count: entry.count,
    subcategories: [...entry.subcategories.entries()].map(([n, c]) => ({ name: n, count: c })),
  }));
  // order by CATEGORY_ORDER then alphabetical
  result.sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a.name);
    const ib = CATEGORY_ORDER.indexOf(b.name);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  res.json(result);
});

// Featured products
router.get('/featured', (req, res) => {
  const limit = Math.min(24, parseInt(req.query.limit, 10) || 8);
  const items = store
    .collection('products')
    .filter((p) => p.isActive !== false && (p.rating || 0) >= 4.5)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
  res.json(items);
});

// Discounted products
router.get('/discounted', (req, res) => {
  const limit = Math.min(24, parseInt(req.query.limit, 10) || 8);
  const items = store
    .collection('products')
    .filter((p) => p.isActive !== false && p.discount && p.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, limit);
  res.json(items);
});

// Search products
router.get('/search', (req, res) => {
  const products = store.collection('products').filter((p) => p.isActive !== false);
  const result = applyFilters(products, req.query);
  res.json(result);
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const products = store
    .collection('products')
    .filter((p) => p.isActive !== false && p.category === req.params.category);
  res.json(products);
});

// Get product by id (declared last so it doesn't shadow the named routes)
router.get('/:id', (req, res) => {
  const product = store.findById('products', req.params.id);
  if (!product || product.isActive === false) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

module.exports = router;
