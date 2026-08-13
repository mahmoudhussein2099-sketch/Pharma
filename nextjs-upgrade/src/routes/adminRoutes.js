const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// ✅ POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('📥 Login request received:');
  console.log('👉 Email:', email);
  console.log('👉 Password:', password);

  try {
    const admin = await Admin.findOne({ email });
    console.log('🔍 Fetched admin from DB:', admin);

    if (!admin) {
      console.log('❌ Admin not found');
      return res.status(401).json({ message: 'Invalid email or password (admin not found)' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('🔐 Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password (wrong password)' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'secret123', {
      expiresIn: '1d',
    });

    console.log('✅ Login successful. Token generated.');
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('🔥 Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/admin/dashboard (optional welcome route)
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to Awon Admin Dashboard 🎯' });
});

module.exports = router;
