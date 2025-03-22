// API Testing Script
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Configuration
const API_BASE_URL = 'http://localhost:5555';
const API_KEY = process.env.API_KEY || 'juici_prod_983467a1b2c3d4e5f6g7h8i9j0'; // Using the key from .env
const TEST_USER_ID = '8f632473-be3b-44c1-838a-05ecc3323ea9'; // Test user ID
const TEST_PROMPT = 'Test prompt from API test ' + new Date().toISOString();

// Helper function to make API requests with proper headers
async function callApi(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
      },
      ...(data && { data })
    };
    
    console.log(`Making ${method} request to ${endpoint}`);
    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data || error.message,
      status: error.response?.status
    };
  }
}

// Test functions
async function testAddFavorite() {
  console.log('\n=== Testing Add Favorite API ===');
  const result = await callApi('post', '/api/favorites', {
    userId: TEST_USER_ID,
    prompt: TEST_PROMPT,
    categories: ['test', 'api']
  });
  
  if (result.success) {
    console.log('✅ Successfully added favorite:');
    console.log(result.data);
    return result.data.id; // Return ID for deletion test
  } else {
    console.log('❌ Failed to add favorite');
    return null;
  }
}

async function testGetFavorites() {
  console.log('\n=== Testing Get Favorites API ===');
  const result = await callApi('get', `/api/favorites?userId=${TEST_USER_ID}`);
  
  if (result.success) {
    console.log(`✅ Successfully retrieved ${result.data.length} favorites`);
    if (result.data.length > 0) {
      console.log('Sample favorite:');
      console.log(result.data[0]);
    }
    return true;
  } else {
    console.log('❌ Failed to get favorites');
    return false;
  }
}

async function testDeleteFavorite(id) {
  if (!id) return false;
  
  console.log('\n=== Testing Delete Favorite API ===');
  const result = await callApi('delete', `/api/favorites/${id}`);
  
  if (result.success) {
    console.log('✅ Successfully deleted favorite');
    return true;
  } else {
    console.log('❌ Failed to delete favorite');
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('Starting API tests...');
  console.log(`API Base URL: ${API_BASE_URL}`);
  
  try {
    // Test health endpoint
    const healthCheck = await callApi('get', '/health');
    if (healthCheck.success) {
      console.log('✅ API health check passed');
    } else {
      console.log('❌ API health check failed - server might not be running');
      return;
    }
    
    // Run the tests
    const favoriteId = await testAddFavorite();
    await testGetFavorites();
    if (favoriteId) {
      await testDeleteFavorite(favoriteId);
    }
    
    console.log('\n=== API Test Summary ===');
    console.log('✅ Tests completed');
  } catch (error) {
    console.error('Error running tests:', error);
  }
}

// Run the tests
runTests(); 