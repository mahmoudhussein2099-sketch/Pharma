const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const name = 'Admin Master'; // 👈 NEW LINE
    const email = 'admin@awon.com';
    const password = await bcrypt.hash('admin123', 10);

    const admin = new Admin({ name, email, password }); // 👈 INCLUDE name
    await admin.save();
    console.log('✅ Admin created successfully');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Failed to create admin:', err);
    process.exit(1);
  });
