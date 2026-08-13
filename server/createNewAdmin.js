const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

async function createNewAdmin() {
  try {
    // Connect to MongoDB - use the exact same database name as in .env
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/awon-pharmacy');
    console.log('✅ Connected to MongoDB');
    
    // Create new admin with simple credentials
    const name = 'Admin';
    const email = 'admin@admin.com';
    const password = 'password';
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists, deleting...');
      await Admin.deleteOne({ email });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    });
    
    await admin.save();
    
    console.log('✅ New admin created successfully:');
    console.log(`   Name: ${name}`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    
    // Verify admin was created
    const createdAdmin = await Admin.findOne({ email });
    console.log('Admin in database:', createdAdmin ? 'Yes' : 'No');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createNewAdmin();