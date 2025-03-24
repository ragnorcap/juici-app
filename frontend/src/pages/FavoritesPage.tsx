import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiTrash2, FiCopy, FiInfo } from 'react-icons/fi';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { getFavoritePrompts, deleteFavoritePrompt, getCurrentUser } from '../lib/supabase';

// Styled components
const PageContainer = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FavoriteCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
`;

const IdeaText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: auto;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background: rgba(173, 255, 47, 0.2);
  color: #ADFF2F;
`;

const CategoriesContainer = styled.div`
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  margin: 2rem auto;
  max-width: 500px;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: #ADFF2F;
  margin-bottom: 1.5rem;
`;

const CopiedNotification = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: #ADFF2F;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
  
  &.visible {
    opacity: 1;
  }
`;

// Define the type for favorite prompts
interface FavoritePrompt {
  id: string;
  prompt: string;
  categories: string[];
  created_at: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoritePrompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCopied, setShowCopied] = useState(false);
  
  // Fetch favorites on load
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Get the current user ID
        const { user } = await getCurrentUser();
        if (!user) {
          setIsLoading(false);
          return;
        }
        
        const { data, error } = await getFavoritePrompts(user.id);
        if (error) throw error;
        
        setFavorites(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setIsLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);
  
  // Handle deleting a favorite
  const handleDelete = async (id: string) => {
    try {
      await deleteFavoritePrompt(Number(id));
      setFavorites(favorites.filter(favorite => favorite.id !== id));
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };
  
  // Copy idea to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };
  
  return (
    <Layout>
      <PageContainer>
        <Title>Your Favorite Ideas</Title>
        <Subtitle>
          All your saved inspirations in one place. Revisit and explore whenever you need a creative boost.
        </Subtitle>
        
        {isLoading ? (
          <EmptyState>
            <p>Loading your favorites...</p>
          </EmptyState>
        ) : favorites.length > 0 ? (
          <FavoritesGrid>
            {favorites.map(favorite => (
              <FavoriteCard key={favorite.id} variant="glass">
                <div>
                  <IdeaText>{favorite.prompt}</IdeaText>
                  {favorite.categories && favorite.categories.length > 0 && (
                    <CategoriesContainer>
                      {favorite.categories.map(category => (
                        <CategoryBadge key={category}>{category}</CategoryBadge>
                      ))}
                    </CategoriesContainer>
                  )}
                </div>
                <ButtonGroup>
                  <Button
                    variant="outline"
                    size="small"
                    icon={<FiCopy />}
                    onClick={() => copyToClipboard(favorite.prompt)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="tertiary"
                    size="small"
                    icon={<FiTrash2 />}
                    onClick={() => handleDelete(favorite.id)}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </FavoriteCard>
            ))}
          </FavoritesGrid>
        ) : (
          <EmptyState>
            <EmptyStateIcon>
              <FiInfo />
            </EmptyStateIcon>
            <h3>No favorites yet</h3>
            <p>
              Start saving ideas from the Idea Generator and they'll appear here for easy access.
            </p>
            <Button
              variant="primary"
              $marginTop="1.5rem"
              to="/idea-generator"
              as={Link}
            >
              Generate New Ideas
            </Button>
          </EmptyState>
        )}
        
        <CopiedNotification className={showCopied ? 'visible' : ''}>
          Copied to clipboard!
        </CopiedNotification>
      </PageContainer>
    </Layout>
  );
};

export default FavoritesPage; 