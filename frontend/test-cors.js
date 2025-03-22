// CORS Test Script
const axios = require('axios');

// Configuration
const API_BASE_URL = 'http://localhost:5555';
const API_KEY = 'juici_prod_983467a1b2c3d4e5f6g7h8i9j0';

async function testCorsAndHeaders() {
  try {
    console.log('Testing CORS and headers configuration...');
    console.log(`API URL: ${API_BASE_URL}`);
    
    // Add all required headers
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      'X-Request-ID': '123456789'
    };
    
    // Make request with Origin header to simulate browser behavior
    const config = {
      headers: {
        ...headers,
        'Origin': 'http://localhost:3000'
      }
    };
    
    console.log('Request headers:', config.headers);
    
    // Test health endpoint
    const response = await axios.get(`${API_BASE_URL}/health`, config);
    
    console.log('\nResponse Headers:');
    console.log(response.headers);
    
    // Check for CORS headers
    if (response.headers['access-control-allow-origin']) {
      console.log('\n✅ CORS is properly configured:');
      console.log(`Access-Control-Allow-Origin: ${response.headers['access-control-allow-origin']}`);
    } else {
      console.log('\n❌ CORS headers missing in response');
    }
    
    console.log('\nResponse data:');
    console.log(response.data);
    
    console.log('\n✅ CORS test completed successfully');
  } catch (error) {
    console.error('\n❌ CORS test failed:');
    if (error.response) {
      console.error(`Status code: ${error.response.status}`);
      console.error('Response headers:', error.response.headers);
      console.error('Response data:', error.response.data);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

// Run the test
testCorsAndHeaders(); 