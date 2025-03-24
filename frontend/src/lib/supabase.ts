import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  idea_id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  due_date: string;
  created_at: string;
  updated_at: string;
}

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