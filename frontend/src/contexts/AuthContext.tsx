import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, signIn, signOut, signUp, UserSession, UserProfile, getUserProfile, updateUserProfile, uploadAvatar } from '../lib/supabase';

// Define the shape of our context
interface AuthContextType {
  user: UserSession['user'];
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  uploadAvatar: (file: File) => Promise<{ url: string | null; error: any }>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isLoading: true,
  error: null,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  updateProfile: async () => ({ error: null }),
  uploadAvatar: async () => ({ url: null, error: null }),
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession['user']>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user profile
  const loadUserProfile = async (userId: string) => {
    try {
      const { profile, error } = await getUserProfile(userId);
      if (error) throw error;
      setProfile(profile);
    } catch (err: any) {
      console.error('Error loading user profile:', err);
      setError('Failed to load user profile');
    }
  };

  // Check for authentication status on load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { user } = await getCurrentUser();
        setUser(user);
        if (user) {
          await loadUserProfile(user.id);
        }
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
      if (user) {
        await loadUserProfile(user.id);
      }
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
      setProfile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile handler
  const handleUpdateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };
    
    try {
      setIsLoading(true);
      setError(null);
      const { profile: updatedProfile, error } = await updateUserProfile(user.id, updates);
      
      if (error) {
        setError(error.message);
        return { error };
      }
      
      setProfile(updatedProfile);
      return { error: null };
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      return { error: err };
    } finally {
      setIsLoading(false);
    }
  };

  // Upload avatar handler
  const handleUploadAvatar = async (file: File) => {
    if (!user) return { url: null, error: 'No user logged in' };
    
    try {
      setIsLoading(true);
      setError(null);
      const { url, error } = await uploadAvatar(user.id, file);
      
      if (error) {
        setError(error.message);
        return { url: null, error };
      }
      
      if (url && profile) {
        setProfile({ ...profile, avatar_url: url });
      }
      
      return { url, error: null };
    } catch (err: any) {
      setError(err.message || 'Failed to upload avatar');
      return { url: null, error: err };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        updateProfile: handleUpdateProfile,
        uploadAvatar: handleUploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 