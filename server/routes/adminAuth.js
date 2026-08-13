// server/routes/adminAuth.js

const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/adminController');

// Login Admin
router.post('/login', loginAdmin);

// Optional: Use this only once to create the first admin (can be disabled later)
router.post('/register', registerAdmin);

module.exports = router;
