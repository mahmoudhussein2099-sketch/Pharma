// server/store/db.js
// Lightweight JSON-file persistence for the Awon Pharmacy API.
// Works without MongoDB: all collections (products, orders, admins, users,
// carts, coupons, contacts, newsletter) are persisted to server/data/db.json.
// When MongoDB is available later, this module can be swapped for the ORM layer.
//
// Security notes:
// - No default admin accounts are ever created. The first admin is created
//   through POST /api/admin/setup using a one-time setup token.
// - Legacy default admins (admin_default / admin_owner) are stripped during
//   migration so previously shipped known credentials stop working.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const SEED_FILE = path.join(DATA_DIR, 'products.seed.json');
const SETUP_FILE = path.join(DATA_DIR, 'setup-admin.txt');

let cache = null;

const LEGACY_ADMIN_IDS = new Set(['admin_default', 'admin_owner']);
const LEGACY_ADMIN_EMAILS = new Set([
  'admin@admin.com',
  'admin@awonpharmacy.com',
]);

function isLegacyAdmin(a) {
  if (!a) return false;
  return (
    LEGACY_ADMIN_IDS.has(String(a._id)) ||
    LEGACY_ADMIN_EMAILS.has(String(a.email || '').toLowerCase().trim())
  );
}

function defaultSettings() {
  return {
    storeName: 'Awon Pharmacy',
    currency: 'SAR',
    currencySymbol: 'SAR',
    phone: '+966123456789',
    whatsapp: '966123456789',
    email: 'info@awonpharmacy.com',
    address: 'Riyadh, Saudi Arabia',
    announcement: 'Free delivery on orders over 200 SAR',
  };
}

// Ensure required collections exist and purge legacy default admins.
function migrate(db) {
  let changed = false;

  if (Array.isArray(db.admins)) {
    const before = db.admins.length;
    db.admins = db.admins.filter((a) => !isLegacyAdmin(a));
    if (db.admins.length !== before) changed = true;
  }

  db.products = db.products || [];
  db.orders = db.orders || [];
  db.admins = db.admins || [];
  db.users = db.users || [];
  db.carts = db.carts || [];
  db.coupons = db.coupons || [];
  db.contacts = db.contacts || [];
  db.newsletter = db.newsletter || [];
  db.settings = db.settings || defaultSettings();

  return changed;
}

// Generate/refresh the one-time setup token while no admin exists.
function ensureSetupToken(db) {
  const hasAdmin = Array.isArray(db.admins) && db.admins.length > 0;

  if (hasAdmin) {
    if (db.setupToken) {
      db.setupToken = null;
      try {
        if (fs.existsSync(SETUP_FILE)) fs.unlinkSync(SETUP_FILE);
      } catch {
        /* ignore */
      }
    }
    return;
  }

  if (!db.setupToken) {
    db.setupToken = crypto.randomBytes(16).toString('hex');
  }
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(SETUP_FILE, db.setupToken + '\n', 'utf8');
  } catch {
    /* ignore */
  }
}

function load() {
  if (cache) return cache;

  if (fs.existsSync(DB_FILE)) {
    cache = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    const changed = migrate(cache);
    ensureSetupToken(cache);
    if (changed) save();
  } else {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const seed = JSON.parse(fs.readFileSync(SEED_FILE, 'utf8'));
    cache = {
      products: seed,
      orders: [],
      admins: [],
      users: [],
      carts: [],
      coupons: [],
      contacts: [],
      newsletter: [],
      settings: defaultSettings(),
      setupToken: null,
    };
    ensureSetupToken(cache);
    save();
  }
  return cache;
}

function save() {
  if (cache) {
    fs.writeFileSync(DB_FILE, JSON.stringify(cache, null, 2), 'utf8');
  }
}

function reset() {
  cache = null;
}

function collection(name) {
  const db = load();
  if (!db[name]) db[name] = [];
  return db[name];
}

function nextId(collectionName) {
  const items = collection(collectionName);
  let max = 0;
  for (const it of items) {
    const n = Number(it.id);
    if (Number.isFinite(n) && n > max) max = n;
  }
  return max + 1;
}

function findById(collectionName, id) {
  const s = String(id);
  return collection(collectionName).find(
    (it) => String(it.id) === s || String(it._id) === s
  );
}

function hasAdmin() {
  return collection('admins').length > 0;
}

function getSetupToken() {
  const db = load();
  return db.setupToken || null;
}

// Timing-safe comparison of the setup token.
function verifySetupToken(token) {
  const db = load();
  const expected = String(db.setupToken || '');
  const given = String(token || '');
  if (!expected || expected.length !== given.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ given.charCodeAt(i);
  }
  return diff === 0;
}

function clearSetupToken() {
  const db = load();
  if (db.setupToken) {
    db.setupToken = null;
    save();
  }
  try {
    if (fs.existsSync(SETUP_FILE)) fs.unlinkSync(SETUP_FILE);
  } catch {
    /* ignore */
  }
}

module.exports = {
  load,
  save,
  reset,
  collection,
  nextId,
  findById,
  hasAdmin,
  getSetupToken,
  verifySetupToken,
  clearSetupToken,
  DB_FILE,
};
