// Test Supabase Connection Script
const { Pool } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('Testing Supabase database connection...');
  console.log('Database URL exists:', !!process.env.DATABASE_URL);
  
  // Extract and mask credentials for logging
  const url = new URL(process.env.DATABASE_URL);
  const maskedUrl = `${url.protocol}//${url.username}:****@${url.host}${url.pathname}`;
  console.log(`Using connection: ${maskedUrl}`);
  
  // Create a database pool with detailed settings
  const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Disable SSL cert verification for testing
    connectionTimeoutMillis: 15000, // 15 seconds timeout
  });
  
  try {
    // Test connection with a simple query
    console.log('Attempting to connect...');
    const result = await db.query('SELECT NOW() as current_time');
    
    console.log('✅ Connection successful!');
    console.log(`Server time: ${result.rows[0].current_time}`);
    
    // Check if the favorites table exists
    console.log('Checking for favorites table...');
    const tableCheck = await db.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'favorites')"
    );
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ Favorites table exists');
      
      // Count rows in favorites table
      const countResult = await db.query('SELECT COUNT(*) FROM favorites');
      console.log(`Found ${countResult.rows[0].count} rows in favorites table`);
    } else {
      console.log('⚠️ Favorites table does not exist');
      
      // Attempt to create the table
      console.log('Creating favorites table...');
      await db.query(`
        CREATE TABLE IF NOT EXISTS favorites (
          id SERIAL PRIMARY KEY,
          user_id TEXT NOT NULL,
          prompt TEXT NOT NULL,
          categories JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
      `);
      console.log('✅ Favorites table created successfully');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error.message);
    
    // Show more detailed error information
    if (error.code) {
      console.error(`Error code: ${error.code}`);
    }
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    
    return false;
  } finally {
    // Close the connection pool
    await db.end();
    console.log('Connection pool closed');
  }
}

// Execute the test
testConnection()
  .then(success => {
    if (success) {
      console.log('✅ Database connection test completed successfully');
      process.exit(0);
    } else {
      console.log('❌ Database connection test failed');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 