import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, Favorite } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Favorite[];
  isLoading: boolean;
  error: string | null;
  addFavorite: (ideaId: string, title: string, description: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isLoading: false,
  error: null,
  addFavorite: async () => {},
  removeFavorite: async () => {},
  refreshFavorites: async () => {},
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setFavorites(data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (ideaId: string, title: string, description: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const newFavorite = {
        user_id: user.id,
        idea_id: ideaId,
        title,
        description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase
        .from('favorites')
        .insert([newFavorite]);

      if (insertError) throw insertError;
      await fetchFavorites();
    } catch (err: any) {
      setError(err.message || 'Failed to add favorite');
      console.error('Error adding favorite:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (id: string) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);

      const { error: deleteError } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;
      await fetchFavorites();
    } catch (err: any) {
      setError(err.message || 'Failed to remove favorite');
      console.error('Error removing favorite:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('favorites_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'favorites',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchFavorites();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const value = {
    favorites,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    refreshFavorites: fetchFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}; 