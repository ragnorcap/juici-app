import React, { createContext, useState, useContext } from 'react';
import { getRandomIdea, saveFavorite, getFavorites, deleteFavorite, generatePRD as apiGeneratePRD } from '../api';
import { useAuth } from './AuthContext';

interface Idea {
  prompt: string;
  categories?: string[];
}

interface IdeaContextType {
  currentIdea: Idea | null;
  favorites: Idea[];
  prdContent: string;
  isLoading: boolean;
  isGeneratingPRD: boolean;
  error: string | null;
  successMessage: string | null;
  generateIdea: () => Promise<void>;
  saveToFavorites: (idea: Idea) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
  generatePRD: (prompt: string) => Promise<string | null>;
  loadFavorites: () => Promise<void>;
  refineIdea: () => Promise<void>;
}

const IdeaContext = createContext<IdeaContextType>({
  currentIdea: null,
  favorites: [],
  prdContent: '',
  isLoading: false,
  isGeneratingPRD: false,
  error: null,
  successMessage: null,
  generateIdea: async () => {},
  saveToFavorites: async () => {},
  removeFavorite: async () => {},
  generatePRD: async () => null,
  loadFavorites: async () => {},
  refineIdea: async () => {},
});

export const useIdea = () => useContext(IdeaContext);

export const IdeaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [prdContent, setPrdContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingPRD, setIsGeneratingPRD] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Generate a random idea
  const generateIdea = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch from the API
      const { data, error: apiError } = await getRandomIdea();
      
      if (apiError) {
        throw new Error(apiError.message);
      }
      
      if (data && data.prompt) {
        setCurrentIdea({
          prompt: data.prompt,
          categories: []
        });
      } else {
        throw new Error('Failed to get a random idea');
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to generate idea');
      console.error('Error generating idea:', err);
      
      // Fallback to a default idea if the API fails
      setCurrentIdea({
        prompt: "Create a weather forecast app using public API data.",
        categories: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save idea to favorites
  const saveToFavorites = async (idea: Idea) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user || !user.id) {
        setError('You must be logged in to save favorites');
        return;
      }
      
      const categories = idea.categories || [];
      const { data, error: saveError } = await saveFavorite(user.id, idea.prompt, categories);
      
      if (saveError) {
        setError(saveError.message || 'Failed to save favorite');
        return;
      }
      
      // Set success message
      setSuccessMessage('Idea saved to favorites!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Reload favorites
      await loadFavorites();
      
    } catch (err: any) {
      setError(err.message || 'Failed to save favorite');
      console.error('Error saving favorite:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove a favorite
  const removeFavorite = async (id: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error: deleteError } = await deleteFavorite(id);
      
      if (deleteError) {
        setError(deleteError.message || 'Failed to delete favorite');
        return;
      }
      
      // Set success message
      setSuccessMessage('Favorite removed successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Reload favorites
      await loadFavorites();
      
    } catch (err: any) {
      setError(err.message || 'Failed to delete favorite');
      console.error('Error deleting favorite:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate a PRD for an idea
  const generatePRD = async (prompt: string): Promise<string | null> => {
    try {
      setIsGeneratingPRD(true);
      setError(null);
      
      console.log('Generating PRD for prompt:', prompt);
      
      const { data, error: prdError } = await apiGeneratePRD(prompt);
      
      if (prdError) {
        setError(prdError.message);
        return null;
      }
      
      if (data) {
        setPrdContent(data);
        return data;
      } else {
        setError('Failed to generate PRD: No content returned from API');
        return null;
      }
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate PRD';
      setError(errorMessage);
      console.error('Error generating PRD:', err);
      return null;
    } finally {
      setIsGeneratingPRD(false);
    }
  };

  // Load user favorites
  const loadFavorites = async () => {
    try {
      if (!user || !user.id) return;
      
      setIsLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await getFavorites(user.id);
      
      if (fetchError) {
        setError(fetchError.message || 'Failed to load favorites');
        return;
      }
      
      setFavorites(data || []);
      
    } catch (err: any) {
      setError(err.message || 'Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new method to refine the current idea
  const refineIdea = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!currentIdea) {
        throw new Error('No idea to refine');
      }
      
      // Call the API to refine the idea
      const { data, error: apiError } = await getRandomIdea(currentIdea.prompt);
      
      if (apiError) {
        throw new Error(apiError.message);
      }
      
      if (data && data.prompt) {
        setCurrentIdea({
          prompt: data.prompt,
          categories: currentIdea.categories || []
        });
      } else {
        throw new Error('Failed to refine idea');
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to refine idea');
      console.error('Error refining idea:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    currentIdea,
    favorites,
    prdContent,
    isLoading,
    isGeneratingPRD,
    error,
    successMessage,
    generateIdea,
    saveToFavorites,
    removeFavorite,
    generatePRD,
    loadFavorites,
    refineIdea,
  };

  return (
    <IdeaContext.Provider value={value}>
      {children}
    </IdeaContext.Provider>
  );
};

export default IdeaContext; 