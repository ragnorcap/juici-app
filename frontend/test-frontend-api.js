// Test script to verify frontend to backend communication
const axios = require('axios');

// Configuration from frontend config.ts
const API_BASE_URL = 'http://localhost:5555'; 
const API_KEY = 'juici_prod_983467a1b2c3d4e5f6g7h8i9j0';
const TEST_USER_ID = '8f632473-be3b-44c1-838a-05ecc3323ea9';

async function testFrontendApi() {
  console.log('Testing frontend to backend communication...');
  
  try {
    // Configure headers the same way the frontend would
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      'X-Request-ID': Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    };
    
    // Test health endpoint
    console.log('\nTesting health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`, { headers });
    console.log('✅ Health check response:', healthResponse.data);
    
    // Test getting favorites
    console.log('\nTesting get favorites endpoint...');
    const getFavoritesResponse = await axios.get(
      `${API_BASE_URL}/api/favorites?userId=${TEST_USER_ID}`, 
      { headers }
    );
    console.log(`✅ Successfully retrieved ${getFavoritesResponse.data.length} favorites`);
    
    // Test adding a favorite
    console.log('\nTesting add favorite endpoint...');
    const addFavoriteResponse = await axios.post(
      `${API_BASE_URL}/api/favorites`,
      {
        userId: TEST_USER_ID,
        prompt: 'Test prompt from frontend test ' + new Date().toISOString(),
        categories: ['frontend', 'test']
      },
      { headers }
    );
    console.log('✅ Successfully added favorite:', addFavoriteResponse.data);
    
    // Remember the ID for deletion
    const favoriteId = addFavoriteResponse.data.id;
    
    // Test deleting the favorite
    console.log('\nTesting delete favorite endpoint...');
    const deleteFavoriteResponse = await axios.delete(
      `${API_BASE_URL}/api/favorites/${favoriteId}`,
      { headers }
    );
    console.log('✅ Successfully deleted favorite');
    
    console.log('\n=== All frontend to backend API tests passed! ===');
    console.log('Your application is ready for building and deployment.');
    
  } catch (error) {
    console.error('❌ Error testing frontend API:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run the tests
testFrontendApi(); 