const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://localhost:27017/awonpharmacy')
  .then(async () => {
    console.log('✅ Connected to DB');
    
    // Check for admin with exact email
    const email = 'admin@awon.com';
    console.log(`Searching for admin with exact email: "${email}"`);
    
    const admin = await Admin.findOne({ email: email });
    console.log('Admin found:', admin ? 'Yes' : 'No');
    
    if (admin) {
      console.log('Admin details:', {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        passwordHash: admin.password.substring(0, 10) + '...'
      });
    }
    
    // List all admins in the database
    console.log('\nListing all admins in database:');
    const allAdmins = await Admin.find({});
    
    if (allAdmins.length === 0) {
      console.log('No admins found in database');
    } else {
      allAdmins.forEach(a => {
        console.log(`- ${a.email} (${a.name || 'No name'})`);
      });
    }
    
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ DB Error:', err.message);
    mongoose.disconnect();
  });