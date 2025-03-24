// Test Supabase Connection Script
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testConnection() {
  console.log('Testing Supabase database connection...');
  console.log('Looking for .env file in:', path.join(__dirname, '.env'));
  console.log('.env file exists:', fs.existsSync(path.join(__dirname, '.env')));
  
  // Check for Supabase credentials
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET) {
    console.error('❌ Missing Supabase credentials:');
    console.error('SUPABASE_URL exists:', !!process.env.SUPABASE_URL);
    console.error('SUPABASE_SECRET exists:', !!process.env.SUPABASE_SECRET);
    return false;
  }
  
  console.log('Supabase URL:', process.env.SUPABASE_URL);
  console.log('Supabase secret exists:', !!process.env.SUPABASE_SECRET);
  
  try {
    // Initialize Supabase client
    console.log('Initializing Supabase client...');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET
    );
    
    console.log('Attempting to connect...');
    
    // Test with a simple query to check the favorites table
    const { data: tableInfo, error: tableError } = await supabase
      .from('favorites')
      .select('id', { count: 'exact', head: true });
      
    if (tableError) {
      if (tableError.code === 'PGRST116') {
        // This error means the table exists but has no rows
        console.log('✅ Connection successful!');
        console.log('✅ Favorites table exists (but is empty)');
      } else {
        throw tableError;
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('✅ Favorites table exists');
      
      // Count rows in favorites table
      const { count, error: countError } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true });
        
      if (countError) {
        console.error('Error counting rows:', countError.message);
      } else {
        console.log(`Found ${count} rows in favorites table`);
      }
      
      // Test querying data (skip record insertion due to foreign key constraints)
      console.log('Testing data retrieval...');
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .limit(1);
        
      if (error) {
        console.error('❌ Failed to retrieve data:', error.message);
      } else if (data && data.length > 0) {
        console.log('✅ Successfully retrieved data sample:');
        console.log('  - ID:', data[0].id);
        console.log('  - User ID:', data[0].user_id);
        console.log('  - Prompt:', data[0].prompt);
        console.log('  - Categories:', data[0].categories);
        console.log('  - Created at:', data[0].created_at);
      } else {
        console.log('✅ Table exists but contains no data');
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Connection failed:');
    console.error(error.message);
    
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    
    return false;
  }
}

// Execute the test
testConnection()
  .then(success => {
    if (success) {
      console.log('✅ Supabase connection test completed successfully');
      process.exit(0);
    } else {
      console.log('❌ Supabase connection test failed');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 