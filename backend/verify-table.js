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
  
  try {
    // Attempt to modify the table to ensure categories is an array
    const { error } = await supabase.rpc('modify_favorites_categories', {
      sql: `
        -- Ensure categories is an array column
        ALTER TABLE favorites 
        ALTER COLUMN categories TYPE JSONB[] 
        USING ARRAY[categories]::JSONB[];
        
        -- Set default to an empty array
        ALTER TABLE favorites 
        ALTER COLUMN categories SET DEFAULT '{}';
        
        -- Update existing null values
        UPDATE favorites 
        SET categories = '{}' 
        WHERE categories IS NULL;
      `
    });
    
    if (error) {
      console.error('Error modifying table:', error);
      return false;
    }
    
    // Test inserting a favorite with categories
    const { data, insertError } = await supabase
      .from('favorites')
      .insert({
        user_id: 'test_user_' + Date.now(),
        prompt: 'Test prompt with categories',
        categories: ['test', 'verification']
      })
      .select();
    
    if (insertError) {
      console.error('Error inserting test favorite:', insertError);
      return false;
    }
    
    console.log('✅ Categories column updated successfully');
    console.log('Test favorite inserted:', data);
    
    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
    return false;
  }
}

verifyTableStructure()
  .then(success => {
    console.log('\nVerification ' + (success ? 'succeeded' : 'failed'));
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
  }); 