const axios = require('axios');

async function testLoginApi() {
  try {
    console.log('Testing admin login API...');
    
    // Test the simple login endpoint
    const response = await axios.post('http://localhost:5000/api/admin/simple-login', {
      email: 'admin@awon.com',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('Status:', response.status);
    console.log('Response data:', response.data);
    
  } catch (error) {
    console.error('❌ Login failed!');
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
  }
}

testLoginApi();