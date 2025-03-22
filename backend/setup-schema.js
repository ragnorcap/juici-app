// Script to set up proper schema in Supabase
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
require('dotenv').config();

async function createSchemaWithRestAPI() {
  console.log('Setting up proper favorites table schema using REST API...');
  
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET) {
    console.error('Missing Supabase credentials');
    return false;
  }
  
  try {
    // Get the project reference from the URL
    const urlParts = process.env.SUPABASE_URL.split('.');
    const projectRef = urlParts[0].replace('https://', '');
    
    console.log(`Project reference: ${projectRef}`);
    
    // Create REST API endpoint for SQL
    const sqlEndpoint = `https://${projectRef}.supabase.co/rest/v1/rpc/execute_sql`;
    
    const headers = {
      'apikey': process.env.SUPABASE_SECRET,
      'Authorization': `Bearer ${process.env.SUPABASE_SECRET}`,
      'Content-Type': 'application/json'
    };
    
    // SQL query to create the table
    const sqlQuery = `
      -- Drop the existing table if it exists
      DROP TABLE IF EXISTS favorites;
      
      -- Create the favorites table with the proper schema
      CREATE TABLE favorites (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        prompt TEXT NOT NULL,
        categories JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create an index for faster lookups
      CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
    `;
    
    try {
      console.log('Attempting to execute SQL via REST API...');
      const response = await axios.post(sqlEndpoint, {
        query: sqlQuery
      }, { headers });
      
      console.log('SQL response:', response.status, response.statusText);
      console.log('✅ Table creation appears successful');
    } catch (error) {
      console.error('❌ SQL execution error:', error.response?.data || error.message);
      console.log('Falling back to creating table in the Supabase dashboard...');
      console.log(`Please create the following table in the Supabase dashboard:`);
      console.log(`
        CREATE TABLE favorites (
          id SERIAL PRIMARY KEY,
          user_id TEXT NOT NULL,
          prompt TEXT NOT NULL,
          categories JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX favorites_user_id_idx ON favorites (user_id);
      `);
    }
    
    // Test if we can insert with categories regardless
    console.log('\nTesting if we can insert with categories...');
    
    // Create a new Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET
    );
    
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: 'test_user_' + Date.now(),
        prompt: 'Test prompt from schema setup',
        categories: ['test', 'setup']
      })
      .select();
    
    if (error) {
      console.error('❌ Insert test failed:', error.message);
      return false;
    } else {
      console.log('✅ Insert test succeeded! Schema is properly set up.');
      console.log('Inserted data:', data);
      return true;
    }
  } catch (error) {
    console.error('❌ Overall process error:', error.message);
    return false;
  }
}

// Execute the script
createSchemaWithRestAPI()
  .then(success => {
    console.log('\nSchema setup ' + (success ? 'succeeded!' : 'failed'));
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 