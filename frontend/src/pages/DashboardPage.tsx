import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiHeart, FiList, FiTrendingUp, FiUser, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useIdea } from '../contexts/IdeaContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';

// Styled components
const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.green.main};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(173, 255, 47, 0.1);
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #ccc;
  font-size: 0.9rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 2rem 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FavoritesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const FavoriteCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: 100%;
  position: relative;
`;

const FavoritePrompt = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  flex: 1;
`;

const FavoriteCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const CategoryTag = styled.span`
  background: rgba(173, 255, 47, 0.2);
  color: ${props => props.theme.colors.green.light};
  border-radius: 12px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin: 2rem 0;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: ${props => props.theme.colors.purple.light};
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.yellow.dark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 0, 0, 0.1);
  }
`;

const DashboardPage: React.FC = () => {
  const { favorites, loadFavorites, removeFavorite } = useIdea();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Load user's favorites when component mounts
  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);
  
  // Handle deleting a favorite
  const handleDeleteFavorite = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this favorite?')) {
      await removeFavorite(id);
    }
  };
  
  // Generate example statistics 
  const stats = {
    savedIdeas: favorites.length,
    generatedIdeas: Math.max(favorites.length * 3, 12), // Example calculation
    prdGenerated: Math.floor(favorites.length / 2) || 3, // Example calculation
  };
  
  return (
    <DashboardContainer>
      <Title>My Dashboard</Title>
      
      <Stats>
        <StatCard>
          <StatIcon><FiHeart /></StatIcon>
          <StatValue>{stats.savedIdeas}</StatValue>
          <StatLabel>Saved Ideas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon><FiList /></StatIcon>
          <StatValue>{stats.generatedIdeas}</StatValue>
          <StatLabel>Generated Ideas</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon><FiTrendingUp /></StatIcon>
          <StatValue>{stats.prdGenerated}</StatValue>
          <StatLabel>PRDs Generated</StatLabel>
        </StatCard>
      </Stats>
      
      <SectionTitle>My Favorite Ideas</SectionTitle>
      
      {favorites.length > 0 ? (
        <FavoritesList>
          {favorites.map((favorite: any) => (
            <FavoriteCard key={favorite.id}>
              <FavoritePrompt>{favorite.prompt}</FavoritePrompt>
              
              <FavoriteCategories>
                {(favorite.categories || []).map((category: string, index: number) => (
                  <CategoryTag key={index}>{category}</CategoryTag>
                ))}
              </FavoriteCategories>
              
              <ActionButtons>
                <DeleteButton onClick={() => handleDeleteFavorite(favorite.id)}>
                  <FiTrash2 />
                </DeleteButton>
              </ActionButtons>
            </FavoriteCard>
          ))}
        </FavoritesList>
      ) : (
        <EmptyState>
          <EmptyStateIcon><FiHeart /></EmptyStateIcon>
          <EmptyStateText>You haven't saved any ideas yet.</EmptyStateText>
          <Button 
            variant="primary" 
            onClick={() => navigate('/')}
          >
            Generate Some Ideas
          </Button>
        </EmptyState>
      )}
    </DashboardContainer>
  );
};

export default DashboardPage; 