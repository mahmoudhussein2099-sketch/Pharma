const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function testDirectLogin() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/awonpharmacy');
    console.log('✅ Connected to MongoDB');
    
    // Get admin from database
    const email = 'admin@awon.com';
    const password = 'admin123';
    
    console.log(`Attempting login with email: "${email}" and password: "${password}"`);
    
    // Find admin
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      console.log('❌ Admin not found with email:', email);
      return;
    }
    
    console.log('✅ Admin found:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      passwordHash: admin.password.substring(0, 20) + '...'
    });
    
    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (isMatch) {
      console.log('✅ Password is correct!');
    } else {
      console.log('❌ Password is incorrect!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testDirectLogin();