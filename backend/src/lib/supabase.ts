import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SECRET || '';

// Create Supabase client with service role key for admin operations
if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  // Don't exit so the app can still work without Supabase during development
  console.warn('Continuing without Supabase functionality'); 
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// User management functions
export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { data, error };
};

export const updateUserProfile = async (userId: string, userData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', userId);
  
  return { data, error };
};

// Favorites management functions
export const getFavorites = async (userId: string) => {
  // Development mode - return mock data
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    console.log('Development mode: Using test user for favorites');
    console.log(`Retrieving favorites for user ID: ${userId}`);
    
    // Return empty array for now, will be populated as favorites are added
    return { 
      data: [], 
      error: null 
    };
  }

  // Simple validation for UUID format
  if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    console.error('Invalid user ID format. Expected UUID.');
    return { data: null, error: new Error('Invalid user ID format') };
  }

  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId);

    // Ensure categories is always an array
    const processedData = (data || []).map(favorite => ({
      ...favorite,
      categories: Array.isArray(favorite.categories) ? favorite.categories : []
    }));

    console.log(`Retrieved ${processedData.length} favorites for user ${userId.substring(0, 8)}...`);
    return { data: processedData, error };
  } catch (err) {
    console.error('Error getting favorites:', err);
    return { 
      data: null, 
      error: err instanceof Error ? 
        err : 
        new Error('Unknown error getting favorites') 
    };
  }
};

export const addFavorite = async (userId: string, prompt: string, categories?: string[] | null) => {
  // Simple validation for UUID format - skip for development environment
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    console.log('Development mode: Using test user for favorites');
    
    // For development/testing, we'll log the attempt
    console.log(`Attempting to add favorite for user ID: ${userId}`);
    console.log(`Prompt: ${prompt}`);
    console.log(`Categories: ${JSON.stringify(categories)}`);
    
    // Return a mock response for development
    const mockData = [{
      id: Math.floor(Math.random() * 1000),
      user_id: userId,
      prompt: prompt,
      categories: categories || [],
      created_at: new Date().toISOString()
    }];
    
    return { data: mockData, error: null };
  }
  
  // Production validation
  if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    console.error('Invalid user ID format. Expected UUID.');
    return { data: null, error: new Error('Invalid user ID format') };
  }

  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([{ 
        user_id: userId, 
        prompt,
        categories: categories || null
      }])
      .select();
    
    if (data) {
      console.log(`Added favorite with ID ${data[0]?.id} for user ${userId.substring(0, 8)}...`);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Error adding favorite:', err);
    return { 
      data: null, 
      error: err instanceof Error ? 
        err : 
        new Error('Unknown error adding favorite') 
    };
  }
};

export const removeFavorite = async (id: number, userId: string) => {
  // Development mode - mock removal
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    console.log('Development mode: Mocking favorite removal');
    console.log(`Removing favorite ID ${id} for user ID: ${userId}`);
    
    return { error: null };
  }

  try {
    // Add userId parameter for security
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('id', id)
      .eq('user_id', userId); // Only allow deletion if the favorite belongs to the user
    
    if (!error) {
      console.log(`Removed favorite with ID ${id} for user ${userId.substring(0, 8)}...`);
    }
    
    return { error };
  } catch (err) {
    console.error('Error removing favorite:', err);
    return { 
      error: err instanceof Error ? 
        err : 
        new Error('Unknown error removing favorite') 
    };
  }
}; 