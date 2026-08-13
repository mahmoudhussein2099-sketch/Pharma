// server/server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

const fs = require('fs');
const path = require('path');
const ERROR_LOG = path.join(__dirname, 'data', 'server-errors.log');
process.on('uncaughtException', (err) => {
  const line = `${new Date().toISOString()} UNCAUGHT: ${(err && err.stack) || err}\n`;
  try {
    fs.mkdirSync(path.dirname(ERROR_LOG), { recursive: true });
    fs.appendFileSync(ERROR_LOG, line);
  } catch {}
  console.error(line);
});
process.on('unhandledRejection', (reason) => {
  const line = `${new Date().toISOString()} UNHANDLED: ${(reason && reason.stack) || reason}\n`;
  try {
    fs.mkdirSync(path.dirname(ERROR_LOG), { recursive: true });
    fs.appendFileSync(ERROR_LOG, line);
  } catch {}
  console.error(line);
});

// Try to connect to MongoDB (optional — the JSON store keeps everything working without it)
try {
  const connectDB = require('./config/db');
  connectDB().catch(() => {
    console.log('ℹ️  MongoDB not available — using JSON file store');
  });
} catch {
  console.log('ℹ️  MongoDB config not found — using JSON file store');
}

// Create app
const app = express();

app.disable('x-powered-by');

// ── Security headers ────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// ── CORS allowlist (from ALLOWED_ORIGINS, comma-separated) ─────────────────
const ALLOWED_ORIGINS = (
  process.env.ALLOWED_ORIGINS ||
  'http://localhost:3000,http://localhost:3001,http://localhost:8080,http://127.0.0.1:3000,http://127.0.0.1:3001'
)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      // Allow non-browser clients (curl, server-to-server) and same-origin
      // requests proxied through the Next.js rewrites (no Origin header).
      if (!origin) return cb(null, true);
      return cb(null, ALLOWED_ORIGINS.includes(origin));
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  })
);

// ── Body limit ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '100kb' }));

// ── Rate limiting ───────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many attempts, please try again later.' },
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

// ── Health ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.send('Awon Pharmacy API is running ✅');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'awon-pharmacy-api',
    time: new Date().toISOString(),
  });
});

// ── API routes ──────────────────────────────────────────────────────────────
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/settings', require('./routes/settingsRoutes'));

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/products', require('./routes/adminProductRoutes'));
app.use('/api/admin/coupons', require('./routes/couponRoutes'));
app.use('/api/admin/stats', require('./routes/statsRoutes'));
app.use('/api/admin/ai', require('./routes/aiRoutes'));
app.use('/api/admin/security', require('./routes/securityRoutes'));

app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/marketing', require('./routes/marketingRoutes'));

// ── 404 ─────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// ── Error handler (never leaks error.message to clients) ───────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || err.statusCode || 500;

  if (status >= 500) {
    const line = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${status}: ${
      (err && err.stack) || err
    }\n`;
    try {
      fs.mkdirSync(path.dirname(ERROR_LOG), { recursive: true });
      fs.appendFileSync(ERROR_LOG, line);
    } catch {}
    if (!res.headersSent) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return next(err);
  }

  if (res.headersSent) return next(err);
  return res.status(status).json({
    message: err.expose && err.message ? err.message : 'Request could not be processed',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Awon Pharmacy Server running on port ${PORT}`)
);
