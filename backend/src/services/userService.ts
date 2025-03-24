import { supabase } from '../lib/supabase';

export const createUserPreferences = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('user_preferences')
      .insert([
        {
          user_id: userId,
          theme: 'light',
          notification_enabled: true,
          created_at: '2025-03-20T12:00:00Z',
          updated_at: '2025-03-20T12:00:00Z',
        },
      ]);

    if (error) throw error;
  } catch (err: any) {
    console.error('Error creating user preferences:', err);
    throw err;
  }
};

export const getUserPreferences = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('Error fetching user preferences:', err);
    throw err;
  }
};

export const updateUserPreferences = async (
  userId: string,
  preferences: {
    theme?: 'light' | 'dark';
    notification_enabled?: boolean;
  }
) => {
  try {
    const { error } = await supabase
      .from('user_preferences')
      .update({
        ...preferences,
        updated_at: '2025-03-20T12:00:00Z',
      })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (err: any) {
    console.error('Error updating user preferences:', err);
    throw err;
  }
};

export const getUserHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('idea_history')
      .select('*')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('Error fetching user history:', err);
    throw err;
  }
};

export const addToHistory = async (
  userId: string,
  ideaData: {
    idea_text: string;
    generated_prd?: string;
    tags?: string[];
  }
) => {
  try {
    const { error } = await supabase
      .from('idea_history')
      .insert([
        {
          user_id: userId,
          ...ideaData,
          generated_at: '2025-03-20T12:00:00Z',
        },
      ]);

    if (error) throw error;
  } catch (err: any) {
    console.error('Error adding to history:', err);
    throw err;
  }
};

export const toggleFavorite = async (userId: string, ideaId: string) => {
  try {
    const { data, error: fetchError } = await supabase
      .from('idea_history')
      .select('favorite')
      .eq('id', ideaId)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    const { error: updateError } = await supabase
      .from('idea_history')
      .update({
        favorite: !data.favorite,
        updated_at: '2025-03-20T12:00:00Z',
      })
      .eq('id', ideaId)
      .eq('user_id', userId);

    if (updateError) throw updateError;
  } catch (err: any) {
    console.error('Error toggling favorite:', err);
    throw err;
  }
}; 