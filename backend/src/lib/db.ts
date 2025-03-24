/**
 * DB connection module - now just a wrapper around Supabase
 * Note: This file exists for backward compatibility with existing imports
 */

import dotenv from 'dotenv';
import { supabase } from './supabase';

// Load environment variables
dotenv.config();

// Track connection state
let isDbConnected = false;

// Initialize the Supabase connection
const initializeDbConnection = async (): Promise<boolean> => {
  try {
    console.log('Initializing Supabase client...');
    
    // Test the connection with a simple query
    const { error } = await supabase
      .from('favorites')
      .select('id', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error connecting to Supabase:', error.message);
      isDbConnected = false;
      console.warn('⚠️ Using mock data in development mode');
      return false;
          } else {
      console.log('✅ Supabase connection successful');
      console.log('✅ Using Supabase for database persistence');
      isDbConnected = true;
      return true;
    }
  } catch (error) {
    console.error('Failed to initialize database:', error instanceof Error ? error.message : 'Unknown error');
    isDbConnected = false;
    return false;
  }
};

// Initialize the connection
initializeDbConnection().catch(err => {
  console.error('Database initialization error:', err);
  isDbConnected = false;
});

// Graceful shutdown handler
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing database connections');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing database connections');
  process.exit(0);
});

// Export the connection state
export { isDbConnected }; 