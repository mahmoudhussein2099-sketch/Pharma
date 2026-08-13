// server/controllers/adminController.js

const Admin = require('../models/Admin'); // <-- Fix import
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Register New Admin (run once or through createAdmin.js)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: '✅ Admin registered successfully' });
  } catch (error) {
    console.error('❌ [RegisterAdmin] Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: '✅ Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error('❌ [LoginAdmin] Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerAdmin, loginAdmin };
