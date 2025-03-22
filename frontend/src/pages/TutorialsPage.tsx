import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCopy, FiFileText, FiStar, FiCode } from 'react-icons/fi';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Styled components
const PageContainer = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ccc;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TutorialCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const TutorialImage = styled.div<{ color: string }>`
  height: 160px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
`;

const TutorialContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TutorialTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.green.light};
`;

const TutorialDescription = styled.p`
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const TutorialFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const TutorialReadMore = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.yellow.main};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${props => props.theme.colors.yellow.light};
  }
`;

const TutorialLevel = styled.span<{ level: 'beginner' | 'intermediate' | 'advanced' }>`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: ${props => {
    switch (props.level) {
      case 'beginner':
        return 'rgba(173, 255, 47, 0.15)';
      case 'intermediate':
        return 'rgba(255, 193, 7, 0.15)';
      case 'advanced':
        return 'rgba(255, 87, 34, 0.15)';
    }
  }};
  color: ${props => {
    switch (props.level) {
      case 'beginner':
        return '#ADFF2F';
      case 'intermediate':
        return '#FFC107';
      case 'advanced':
        return '#FF5722';
    }
  }};
`;

// Define tutorial data
const tutorials = [
  {
    id: 'getting-started',
    title: 'Getting Started with Juici',
    description: 'Learn the basics of generating creative project ideas and turning them into detailed PRDs.',
    level: 'beginner',
    icon: <FiFileText />,
    color: '#6930C3',
    slug: '/tutorials/getting-started'
  },
  {
    id: 'creating-prds',
    title: 'Creating Professional PRDs',
    description: 'How to generate comprehensive Product Requirements Documents from your project ideas.',
    level: 'beginner',
    icon: <FiFileText />,
    color: '#8A4FFF',
    slug: '/tutorials/creating-prds'
  },
  {
    id: 'using-with-cursor',
    title: 'Using Juici with Cursor',
    description: 'Learn how to use Juici-generated PRDs with Cursor IDE to kickstart your development.',
    level: 'intermediate',
    icon: <FiCode />,
    color: '#48BFE3',
    slug: '/tutorials/using-with-cursor'
  },
  {
    id: 'organizing-favorites',
    title: 'Managing Your Favorite Ideas',
    description: 'How to save, organize and retrieve your favorite project ideas for future use.',
    level: 'beginner',
    icon: <FiStar />,
    color: '#F9A826',
    slug: '/tutorials/organizing-favorites'
  },
  {
    id: 'advanced-techniques',
    title: 'Advanced Juici Techniques',
    description: 'Expert tips for customizing prompts and getting the most detailed and useful PRDs.',
    level: 'advanced',
    icon: <FiCopy />,
    color: '#64DFDF',
    slug: '/tutorials/advanced-techniques'
  },
  {
    id: 'api-integration',
    title: 'API Integration Guide',
    description: 'How to integrate Juici\'s idea generation and PRD creation capabilities into your own projects.',
    level: 'advanced',
    icon: <FiCode />,
    color: '#B088F9',
    slug: '/tutorials/api-integration'
  }
];

// Main component
const TutorialsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <Title>Tutorials & Guides</Title>
        <Subtitle>
          Learn how to use Juici to generate creative project ideas 
          and turn them into comprehensive Product Requirements Documents
        </Subtitle>
        
        <TutorialsGrid>
          {tutorials.map(tutorial => (
            <TutorialCard key={tutorial.id} variant="glass">
              <TutorialImage color={tutorial.color}>
                {tutorial.icon}
              </TutorialImage>
              <TutorialContent>
                <TutorialTitle>{tutorial.title}</TutorialTitle>
                <TutorialDescription>{tutorial.description}</TutorialDescription>
                <TutorialFooter>
                  <TutorialLevel level={tutorial.level as 'beginner' | 'intermediate' | 'advanced'}>
                    {tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}
                  </TutorialLevel>
                  <TutorialReadMore to={`/blog${tutorial.slug}`}>
                    Read More <FiArrowRight />
                  </TutorialReadMore>
                </TutorialFooter>
              </TutorialContent>
            </TutorialCard>
          ))}
        </TutorialsGrid>
      </PageContainer>
    </Layout>
  );
};

export default TutorialsPage; 