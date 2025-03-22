import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage';
import TutorialsPage from './pages/tutorials/TutorialsPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';
import IdeaGeneratorPage from './pages/IdeaGeneratorPage';

// Auth related
import { getCurrentUser, UserSession } from './lib/supabase';

// Blog and Tutorial Content Pages
import UsingWithCursor from './pages/blog/UsingWithCursor';
import HowWeBuiltJuici from './pages/blog/HowWeBuiltJuici';
import AIInProductDevelopment from './pages/blog/AIInProductDevelopment';
import BestPracticesSoftwareProjects from './pages/blog/BestPracticesSoftwareProjects';

// Tutorial Pages
import GettingStarted from './pages/tutorials/GettingStarted';
import CreatingPRDs from './pages/tutorials/CreatingPRDs';
import AdvancedTechniques from './pages/tutorials/AdvancedTechniques';
import APIIntegration from './pages/tutorials/APIIntegration';
import OrganizingFavorites from './pages/tutorials/OrganizingFavorites';

// Providers
import { AuthProvider } from './contexts/AuthContext';
import { IdeaProvider } from './contexts/IdeaContext';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserSession['user']>(null);

  // Check for authentication status on load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { user } = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking authentication status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set up routes with authentication checks
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <IdeaProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/tutorials" element={<TutorialsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/idea-generator" element={<IdeaGeneratorPage />} />
              
              {/* Blog Posts */}
              <Route path="/blog/using-with-cursor" element={<UsingWithCursor />} />
              <Route path="/blog/how-we-built-juici" element={<HowWeBuiltJuici />} />
              <Route path="/blog/ai-in-product-development" element={<AIInProductDevelopment />} />
              <Route path="/blog/best-practices-software-projects" element={<BestPracticesSoftwareProjects />} />
              
              {/* Tutorial Pages */}
              <Route path="/tutorials/getting-started" element={<GettingStarted />} />
              <Route path="/tutorials/creating-prds" element={<CreatingPRDs />} />
              <Route path="/tutorials/advanced-techniques" element={<AdvancedTechniques />} />
              <Route path="/tutorials/api-integration" element={<APIIntegration />} />
              <Route path="/tutorials/organizing-favorites" element={<OrganizingFavorites />} />
              
              {/* Redirects for misrouted URLs */}
              <Route path="/blog/tutorials/advanced-techniques" element={<Navigate to="/tutorials/advanced-techniques" />} />
              <Route path="/blog/tutorials/api-integration" element={<Navigate to="/tutorials/api-integration" />} />
              <Route path="/blog/tutorials/organizing-favorites" element={<Navigate to="/tutorials/organizing-favorites" />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </IdeaProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App; 