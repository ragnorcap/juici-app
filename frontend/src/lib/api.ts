import { supabase } from './supabase';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://juici-backend-59dba9d02624.herokuapp.com';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const generatePRD = async (idea: string): Promise<APIResponse<string>> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`${API_BASE_URL}/api/generate-prd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ idea }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.prd };
  } catch (error: any) {
    console.error('Error generating PRD:', error);
    return { success: false, error: error.message };
  }
};

export const refinePRD = async (prd: string, refinementPrompt: string): Promise<APIResponse<string>> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`${API_BASE_URL}/api/refine-prd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ prd, refinementPrompt }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.refinedPRD };
  } catch (error: any) {
    console.error('Error refining PRD:', error);
    return { success: false, error: error.message };
  }
};

export const chatWithJuici = async (message: string, context: string): Promise<APIResponse<string>> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data: data.response };
  } catch (error: any) {
    console.error('Error chatting with Juici:', error);
    return { success: false, error: error.message };
  }
};

export const saveFavorite = async (prd: string, title: string): Promise<APIResponse<void>> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          user_id: session?.user.id,
          content: prd,
          title,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error('Error saving favorite:', error);
    return { success: false, error: error.message };
  }
}; 