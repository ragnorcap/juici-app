// Script to verify the current table structure
const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
require('dotenv').config();

async function verifyTableStructure() {
  console.log('Verifying favorites table structure...');
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SECRET
  );
  
  // First try: check if we can query the table structure
  try {
    console.log('Attempting to query table structure...');
    const { data, error } = await supabase.from('favorites').select('*').limit(1);
    
    if (error) {
      console.error('Error querying table:', error.message);
    } else {
      console.log('Table exists and can be queried.');
      console.log('Sample data structure:', data);
    }
  } catch (error) {
    console.error('Error in supabase query:', error.message);
  }
  
  // Second try: Direct Postgres connection
  try {
    console.log('\nAttempting direct Postgres connection...');
    if (!process.env.DATABASE_URL) {
      console.error('No DATABASE_URL provided');
      return;
    }
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    
    console.log('Connected to Postgres');
    
    // Check if table exists
    const tableCheckResult = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'favorites'
      );
    `);
    
    const tableExists = tableCheckResult.rows[0].exists;
    console.log(`Table exists: ${tableExists}`);
    
    if (tableExists) {
      // Check table structure
      const columnsResult = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'favorites'
        ORDER BY ordinal_position;
      `);
      
      console.log('Table columns:');
      console.table(columnsResult.rows);
      
      // Check if categories column exists
      const hasCategoriesColumn = columnsResult.rows.some(
        row => row.column_name === 'categories'
      );
      
      if (!hasCategoriesColumn) {
        console.log('\nCategories column does not exist. Adding it...');
        await pool.query(`
          ALTER TABLE favorites 
          ADD COLUMN IF NOT EXISTS categories JSONB;
        `);
        console.log('Categories column added successfully!');
      } else {
        console.log('\nCategories column already exists.');
      }
      
      // Test insertion with categories
      console.log('\nTesting insertion with categories...');
      const insertResult = await pool.query(`
        INSERT INTO favorites (user_id, prompt, categories)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [
        'test_user_' + Date.now(),
        'Test prompt from direct connection',
        JSON.stringify(['test', 'direct'])
      ]);
      
      console.log('Insertion successful!');
      console.log('Inserted record:', insertResult.rows[0]);
    } else {
      console.log('\nCreating favorites table...');
      await pool.query(`
        CREATE TABLE favorites (
          id SERIAL PRIMARY KEY,
          user_id TEXT NOT NULL,
          prompt TEXT NOT NULL,
          categories JSONB,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
      `);
      console.log('Table created successfully!');
      
      // Test insertion with categories
      console.log('\nTesting insertion with categories...');
      const insertResult = await pool.query(`
        INSERT INTO favorites (user_id, prompt, categories)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [
        'test_user_' + Date.now(),
        'Test prompt from direct connection',
        JSON.stringify(['test', 'direct'])
      ]);
      
      console.log('Insertion successful!');
      console.log('Inserted record:', insertResult.rows[0]);
    }
    
    // Close the connection pool
    await pool.end();
    console.log('Connection pool closed');
  } catch (error) {
    console.error('Error in Postgres connection:', error.message);
  }
  
  // Final test: Try Supabase insertion again
  try {
    console.log('\nTesting Supabase insertion again...');
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: 'test_user_' + Date.now(),
        prompt: 'Test prompt after schema update',
        categories: ['test', 'final']
      })
      .select();
    
    if (error) {
      console.error('Supabase insertion still failing:', error.message);
    } else {
      console.log('Supabase insertion successful!');
      console.log('Inserted data:', data);
    }
  } catch (error) {
    console.error('Error in final Supabase test:', error.message);
  }
}

verifyTableStructure()
  .then(() => {
    console.log('\nVerification complete');
  })
  .catch(err => {
    console.error('Unexpected error:', err);
  })
  .finally(() => {
    process.exit(0);
  }); 