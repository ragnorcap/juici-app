import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, signIn, signOut, signUp, UserSession } from '../lib/supabase';

// Define the shape of our context
interface AuthContextType {
  user: UserSession['user'];
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession['user']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for authentication status on load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Sign in handler
  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      const { user } = await getCurrentUser();
      setUser(user);
      return { error: null };
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up handler
  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await signUp(email, password, name);
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      return { error: null };
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 