const axios = require('axios');

async function testAdminLogin() {
  try {
    console.log('Testing admin login...');
    
    const response = await axios.post('http://localhost:5000/api/admin/login', {
      email: 'admin@awon.com',
      password: 'admin123'
    });
    
    console.log('Login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('Login failed!');
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testAdminLogin();