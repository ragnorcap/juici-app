import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { Link } from 'react-router-dom';
import { FiBook, FiClipboard, FiStar, FiTool, FiLink, FiFolder, FiCode } from 'react-icons/fi';
import Layout from '../components/Layout';

// Tutorial data
const tutorials = [
  {
    id: 1,
    title: 'Getting Started with Juici',
    description: 'Learn the basics of Juici and how to generate your first idea.',
    icon: <FiBook />,
    path: '/tutorials/getting-started',
    level: 'Beginner',
    duration: '5 min',
    category: 'Basics'
  },
  {
    id: 2,
    title: 'Creating PRDs with Juici',
    description: 'Turn your idea into a detailed Product Requirements Document (PRD).',
    icon: <FiClipboard />,
    path: '/tutorials/creating-prds',
    level: 'Intermediate',
    duration: '10 min',
    category: 'PRDs'
  },
  {
    id: 3,
    title: 'Advanced Techniques',
    description: 'Learn advanced techniques for refining ideas and getting the most out of Juici.',
    icon: <FiTool />,
    path: '/tutorials/advanced-techniques',
    level: 'Advanced',
    duration: '15 min',
    category: 'Advanced'
  },
  {
    id: 4,
    title: 'API Integration',
    description: 'Integrate Juici into your own applications using our API.',
    icon: <FiLink />,
    path: '/tutorials/api-integration',
    level: 'Expert',
    duration: '20 min',
    category: 'Development'
  },
  {
    id: 5,
    title: 'Organizing Favorites',
    description: 'Tips and tricks for organizing and managing your favorite ideas.',
    icon: <FiStar />,
    path: '/tutorials/organizing-favorites',
    level: 'Intermediate',
    duration: '8 min',
    category: 'Organization'
  },
  {
    id: 6,
    title: 'Using Juici with Cursor IDE',
    description: 'Learn how to integrate Juici with Cursor IDE for a seamless development experience.',
    path: '/tutorials/using-with-cursor',
    icon: <FiCode />,
    level: 'Intermediate',
    duration: '12 min',
    category: 'Integration'
  }
];

// Styled components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const MainTutorialsPageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: ${props => props.theme.textLight};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TutorialCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: rgba(64, 223, 223, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(64, 223, 223, 0.2);
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
  height: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-color: ${props => props.theme.green.main};
  }
`;

const TutorialIcon = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.green.main};
  margin-bottom: 1rem;
  background: rgba(64, 223, 223, 0.1);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

const TutorialTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.text};
`;

const TutorialDescription = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.textLight};
  flex-grow: 1;
  margin-bottom: 1.5rem;
`;

const TutorialMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const TutorialMetaItem = styled.div`
  font-size: 0.85rem;
  color: ${props => props.theme.textLight};
  background: rgba(0, 0, 0, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
`;

const TutorialLevel = styled(TutorialMetaItem)<{ level: string }>`
  background: ${props => {
    switch(props.level) {
      case 'Beginner':
        return 'rgba(64, 223, 223, 0.2)';
      case 'Intermediate':
        return 'rgba(138, 79, 255, 0.2)';
      case 'Advanced':
        return 'rgba(255, 173, 66, 0.2)';
      case 'Expert':
        return 'rgba(255, 92, 92, 0.2)';
      default:
        return 'rgba(64, 223, 223, 0.2)';
    }
  }};
  color: ${props => {
    switch(props.level) {
      case 'Beginner':
        return props.theme.green.main;
      case 'Intermediate':
        return props.theme.purple.main;
      case 'Advanced':
        return props.theme.yellow.main;
      case 'Expert':
        return props.theme.red.main;
      default:
        return props.theme.green.main;
    }
  }};
`;

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CategoryButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(64, 223, 223, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  border: 1px solid ${props => props.active ? props.theme.green.main : 'transparent'};
  color: ${props => props.active ? props.theme.green.main : props.theme.textLight};
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(64, 223, 223, 0.1);
    color: ${props => props.theme.green.main};
  }
`;

const TutorialsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  
  // Get unique categories
  const categories = Array.from(new Set(tutorials.map(tutorial => tutorial.category)));
  
  // Filter tutorials by category
  const filteredTutorials = activeCategory
    ? tutorials.filter(tutorial => tutorial.category === activeCategory)
    : tutorials;
    
  return (
    <Layout>
      <PageContainer>
        <MainTutorialsPageTitle>Tutorials</MainTutorialsPageTitle>
        <PageSubtitle>
          Learn how to use Juici to generate ideas, create PRDs, and accelerate your product development process.
        </PageSubtitle>
        
        <CategoriesContainer>
          <CategoryButton 
            active={activeCategory === null} 
            onClick={() => setActiveCategory(null)}
          >
            <FiFolder /> All Categories
          </CategoryButton>
          
          {categories.map(category => (
            <CategoryButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category === 'Basics' && <FiBook />}
              {category === 'PRDs' && <FiClipboard />}
              {category === 'Advanced' && <FiTool />}
              {category === 'Development' && <FiLink />}
              {category === 'Organization' && <FiStar />}
              {category === 'Integration' && <FiCode />}
              {category}
            </CategoryButton>
          ))}
        </CategoriesContainer>
        
        <TutorialsGrid>
          {filteredTutorials.map(tutorial => (
            <TutorialCard key={tutorial.id} to={tutorial.path}>
              <TutorialIcon>{tutorial.icon}</TutorialIcon>
                <TutorialTitle>{tutorial.title}</TutorialTitle>
                <TutorialDescription>{tutorial.description}</TutorialDescription>
              <TutorialMeta>
                <TutorialLevel level={tutorial.level}>{tutorial.level}</TutorialLevel>
                <TutorialMetaItem>{tutorial.duration}</TutorialMetaItem>
              </TutorialMeta>
            </TutorialCard>
          ))}
        </TutorialsGrid>
      </PageContainer>
    </Layout>
  );
};

export default TutorialsPage; 