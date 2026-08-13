// server/routes/adminProductRoutes.js
// Real product management backed by the JSON store + image upload.
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();
const store = require('../store/db');
const { protectAdmin } = require('../middleware/authMiddleware');

// ---- Image upload ----
const UPLOAD_DIR = path.resolve(__dirname, '..', '..', 'client', 'public', 'images', 'products');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname) || '.jpg').toLowerCase();
    const name = `img_custom_${Date.now()}_${crypto.randomBytes(3).toString('hex')}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!/^image\//.test(file.mimetype)) return cb(new Error('Only image files are allowed'));
    cb(null, true);
  },
});

// Upload image -> returns public URL served by the Next.js app
router.post('/upload', protectAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(201).json({ url: `/images/products/${req.file.filename}` });
});

// Upload error handler
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ message: err.message });
  if (err) return res.status(400).json({ message: err.message });
  next();
});

// ---- Product CRUD ----

// List products (search/filter/pagination)
router.get('/', protectAdmin, (req, res) => {
  let items = store.collection('products');
  const { search, category, subcategory, sort } = req.query;

  if (search) {
    const s = String(search).toLowerCase();
    items = items.filter(
      (p) =>
        String(p.name || '').toLowerCase().includes(s) ||
        String(p.brand || '').toLowerCase().includes(s) ||
        String(p.sku || '').toLowerCase().includes(s) ||
        String(p.id).includes(s)
    );
  }
  if (category && category !== 'all') items = items.filter((p) => p.category === category);
  if (subcategory && subcategory !== 'all') items = items.filter((p) => p.subcategory === subcategory);

  if (sort === 'price-asc') items = items.slice().sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') items = items.slice().sort((a, b) => b.price - a.price);
  else if (sort === 'name') items = items.slice().sort((a, b) => String(a.name).localeCompare(String(b.name)));
  else items = items.slice().sort((a, b) => Number(b.id) - Number(a.id));

  const total = items.length;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(200, Math.max(1, parseInt(req.query.limit, 10) || 50));
  const start = (page - 1) * limit;
  const pageItems = items.slice(start, start + limit);

  res.json({ items: pageItems, total, page, pageSize: limit });
});

// Add new product
router.post('/add', protectAdmin, (req, res) => {
  const { name, price, category, subcategory } = req.body;
  if (!name || price === undefined || price === null || isNaN(Number(price))) {
    return res.status(400).json({ message: 'Product name and a valid price are required' });
  }

  const id = store.nextId('products');
  const product = {
    id,
    name: String(name).trim(),
    price: Number(price),
    originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : undefined,
    discount: req.body.discount ? Number(req.body.discount) : undefined,
    image: req.body.image || '/images/default-product.png',
    category: category || 'otc',
    subcategory: subcategory || 'General Health',
    rating: Number(req.body.rating) || 4.5,
    reviews: Number(req.body.reviews) || 0,
    inStock: req.body.inStock !== 'false' && req.body.inStock !== false,
    stock: Number(req.body.stock) || 0,
    description: req.body.description || '',
    brand: req.body.brand || undefined,
    sku: req.body.sku || `AWN-${id}`,
    isActive: true,
    custom: true,
    createdAt: new Date().toISOString(),
  };

  store.collection('products').push(product);
  store.save();
  res.status(201).json(product);
});

// Update product (partial update: price, image, name, category, stock, etc.)
router.put('/:id', protectAdmin, (req, res) => {
  const items = store.collection('products');
  const idx = items.findIndex((p) => String(p.id) === String(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const current = items[idx];
  const patch = { ...current };

  const mapFields = {
    name: (v) => String(v).trim(),
    image: (v) => String(v),
    description: (v) => String(v),
    brand: (v) => String(v),
    sku: (v) => String(v),
    category: (v) => String(v),
    subcategory: (v) => String(v),
    price: (v) => Number(v),
    originalPrice: (v) => (v === null || v === '' ? undefined : Number(v)),
    discount: (v) => (v === null || v === '' ? undefined : Number(v)),
    stock: (v) => Number(v),
    rating: (v) => Number(v),
    reviews: (v) => Number(v),
    inStock: (v) => v === 'true' || v === true,
    isActive: (v) => v === 'true' || v === true,
  };

  for (const key of Object.keys(mapFields)) {
    if (req.body[key] !== undefined) {
      patch[key] = mapFields[key](req.body[key]);
    }
  }
  if (patch.originalPrice && patch.price && patch.originalPrice > patch.price) {
    patch.discount = Math.round(((patch.originalPrice - patch.price) / patch.originalPrice) * 100);
  } else if (patch.discount === 0) {
    patch.originalPrice = undefined;
    patch.discount = undefined;
  }
  patch.updatedAt = new Date().toISOString();

  items[idx] = patch;
  store.save();
  res.json(patch);
});

// Delete product
router.delete('/:id', protectAdmin, (req, res) => {
  const items = store.collection('products');
  const idx = items.findIndex((p) => String(p.id) === String(req.params.id));
  if (idx === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  items.splice(idx, 1);
  store.save();
  res.json({ message: 'Product deleted successfully' });
});

module.exports = router;
