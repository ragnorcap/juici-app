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
  // Simple validation for UUID format
  if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    console.error('Invalid user ID format. Expected UUID.');
    return { data: null, error: new Error('Invalid user ID format') };
  }

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);

  console.log(`Retrieved ${data?.length || 0} favorites for user ${userId.substring(0, 8)}...`);
  return { data, error };
};

export const addFavorite = async (userId: string, prompt: string, categories?: string[] | null) => {
  // Simple validation for UUID format
  if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
    console.error('Invalid user ID format. Expected UUID.');
    return { data: null, error: new Error('Invalid user ID format') };
  }

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
};

export const removeFavorite = async (id: number, userId: string) => {
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
}; 