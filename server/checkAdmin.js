// checkAdmin.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://localhost:27017/awonpharmacy')
  .then(async () => {
    console.log('✅ Connected to DB');
    const admin = await Admin.findOne({ email: 'admin@awon.com' });
    if (!admin) {
      console.log('❌ Admin NOT found');
    } else {
      console.log('✅ Admin found:', admin);
    }
    mongoose.disconnect();
  })
  .catch((err) => console.error('❌ DB Error:', err.message));
