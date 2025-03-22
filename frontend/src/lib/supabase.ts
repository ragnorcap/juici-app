import { createClient } from '@supabase/supabase-js';

// These are public keys and safe to be in the client
const supabaseUrl = 'https://xewjbqfvrrrxbrvnhofz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhld2picWZ2cnJyeGJydm5ob2Z6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzI4NjQsImV4cCI6MjA1NTc0ODg2NH0.CTi1Okkb2-U9YwFKOUticNlbZHBaH-foQDn52Z7c0-g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User types
export type UserSession = {
  user: {
    id: string;
    email?: string;
  } | null;
  session: any;
};

// Auth methods
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { 
    session: data.session,
    user: data.session?.user || null,
    error 
  };
};

export const onAuthStateChange = (callback: (event: any, session: any) => void) => {
  const { data } = supabase.auth.onAuthStateChange(callback);
  return data;
};

// Favorites related functions
export const saveFavoritePrompt = async (userId: string, prompt: string, categories: string[] = []) => {
  const { data, error } = await supabase
    .from('favorites')
    .insert([
      { user_id: userId, prompt: prompt, categories: categories }
    ]);
  
  return { data, error };
};

export const getFavoritePrompts = async (userId: string) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId);
  
  // Ensure categories is always an array
  const processedData = (data || []).map(favorite => ({
    ...favorite,
    categories: Array.isArray(favorite.categories) ? favorite.categories : []
  }));
  
  return { data: processedData, error };
};

export const deleteFavoritePrompt = async (id: number) => {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', id);
  
  return { error };
}; 