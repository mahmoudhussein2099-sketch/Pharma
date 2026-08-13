const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Force connect to DB
mongoose.connect('mongodb://localhost:27017/awonpharmacy')
  .then(async () => {
    console.log('✅ Connected to MongoDB');

    const email = 'admin@awon.com';
    const password = 'admin123';
    const name = 'Admin User';

    // Delete any previous admin with this email
    const deleted = await Admin.deleteOne({ email });
    console.log('🗑️ Deleted previous admin:', deleted);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    console.log('✅ Admin created successfully:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    mongoose.disconnect();
  });