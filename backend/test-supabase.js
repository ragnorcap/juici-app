// Test Supabase Connection using Supabase JS client
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabase() {
  console.log('Testing Supabase connection...');
  
  // Validate environment variables
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_SECRET in environment variables');
    return false;
  }
  
  console.log(`Supabase URL: ${process.env.SUPABASE_URL}`);
  console.log(`Supabase Secret exists: ${!!process.env.SUPABASE_SECRET}`);
  
  try {
    // Create Supabase client with service role key
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET
    );
    
    console.log('Supabase client created successfully');
    
    // Test a simple query - checking if the favorites table exists
    console.log('Testing Supabase query...');
    
    // Use a simpler query to check table existence
    const { error: tableExistsError } = await supabase
      .from('favorites')
      .select('id')
      .limit(1);
    
    if (tableExistsError) {
      if (tableExistsError.code === '42P01') { // Relation does not exist
        console.log('⚠️ Favorites table does not exist');
        
        // Attempt to create the table using Supabase storage API
        console.log('Creating favorites table...');
        
        // Try to use a simple SQL query directly
        const { error: createError } = await supabase.rpc('create_favorites_table', {
          sql: `
            CREATE TABLE IF NOT EXISTS favorites (
              id SERIAL PRIMARY KEY,
              user_id TEXT NOT NULL,
              prompt TEXT NOT NULL,
              categories JSONB,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS favorites_user_id_idx ON favorites (user_id);
          `
        }).catch(e => ({ error: e }));
        
        if (createError) {
          console.error('❌ Error creating favorites table:', createError.message);
          console.log('Table creation may need to be done through Supabase dashboard');
        } else {
          console.log('✅ Created favorites table');
        }
      } else {
        console.error('❌ Error checking favorites table:', tableExistsError.message);
      }
    } else {
      console.log('✅ Favorites table exists and is accessible');
    }
    
    // Test inserting a record with a valid UUID
    console.log('Testing insert operation...');
    
    // Use a real UUID from a valid user
    // For testing, we'll use the UUID that was provided
    const validUserId = '8f632473-be3b-44c1-838a-05ecc3323ea9';
    
    const { error: insertError } = await supabase
      .from('favorites')
      .insert({
        user_id: validUserId,
        prompt: 'Test prompt from connection test',
        categories: ['test', 'connection']
      });
    
    if (insertError) {
      console.error('❌ Insert error:', insertError.message);
    } else {
      console.log('✅ Test record inserted successfully');
      
      // Try retrieving the record to verify
      console.log('Verifying record was inserted...');
      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', validUserId)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (fetchError) {
        console.error('❌ Fetch error:', fetchError.message);
      } else if (data && data.length > 0) {
        console.log('✅ Record retrieved successfully:');
        console.log(data[0]);
      } else {
        console.log('⚠️ No records found for the user');
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    return false;
  }
}

// Run the test
testSupabase()
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