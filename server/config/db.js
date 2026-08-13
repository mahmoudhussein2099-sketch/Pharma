// server/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/awonpharmacy');
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  MongoDB not available — using JSON file store');
  }
};

module.exports = connectDB;
