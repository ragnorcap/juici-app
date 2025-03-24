import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import GlobalStyles from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Planner from './components/Planner';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';
import TutorialsPage from './pages/TutorialsPage';
import BlogPage from './pages/BlogPage';
import AppPage from './pages/AppPage';

// Blog and Tutorial Content Pages
import HowWeBuiltJuici from './pages/blog/HowWeBuiltJuici';
import AIInProductDevelopment from './pages/blog/AIInProductDevelopment';
import UsingWithCursor from './pages/tutorials/UsingWithCursor';
import BestPracticesSoftwareProjects from './pages/blog/BestPracticesSoftwareProjects';
import GettingStarted from './pages/tutorials/GettingStarted';
import CreatingPRDs from './pages/tutorials/CreatingPRDs';
import AdvancedTechniques from './pages/tutorials/AdvancedTechniques';
import APIIntegration from './pages/tutorials/APIIntegration';
import OrganizingFavorites from './pages/tutorials/OrganizingFavorites';

const App = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            
            {/* Tutorial routes */}
            <Route path="/tutorials/getting-started" element={<GettingStarted />} />
            <Route path="/tutorials/creating-prds" element={<CreatingPRDs />} />
            <Route path="/tutorials/advanced-techniques" element={<AdvancedTechniques />} />
            <Route path="/tutorials/api-integration" element={<APIIntegration />} />
            <Route path="/tutorials/organizing-favorites" element={<OrganizingFavorites />} />
            <Route path="/tutorials/using-with-cursor" element={<UsingWithCursor />} />
            
            {/* Blog routes */}
            <Route path="/blog/how-we-built-juici" element={<HowWeBuiltJuici />} />
            <Route path="/blog/ai-in-product-development" element={<AIInProductDevelopment />} />
            <Route path="/blog/best-practices-software-projects" element={<BestPracticesSoftwareProjects />} />
            
            {/* App route */}
            <Route path="/app" element={<AppPage />} />
            
            {/* Planner route */}
            <Route path="/planner" element={
              <ProtectedRoute>
                <Planner />
              </ProtectedRoute>
            } />
            
            {/* Handle 404 */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </ThemeProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
};

export default App; 