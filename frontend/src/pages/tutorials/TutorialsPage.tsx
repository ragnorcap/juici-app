import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../../styles/shared';
import { Link } from 'react-router-dom';
import { FiCpu, FiFileText, FiAward, FiArrowRight, FiLink, FiFolder } from 'react-icons/fi';
import Layout from '../../components/Layout';
import Logo from '../../components/Logo';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #ADFF2F, #64DFDF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.2rem;
  color: #ddd;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const TutorialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TutorialCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.theme.colors.green.main};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const TutorialIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.green.light};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(173, 255, 47, 0.1);
`;

const TutorialTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.green.light};
`;

const TutorialDescription = styled.p`
  color: #ddd;
  margin-bottom: 1.5rem;
  flex-grow: 1;
  line-height: 1.6;
`;

const TutorialDate = styled.div`
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ReadMore = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.yellow.main};
  gap: 0.5rem;
  margin-top: auto;
  font-weight: 500;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const LogoContainer = styled.div`
  margin: 2rem auto;
  text-align: center;
`;

const TutorialsPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <PageHeader>
          <LogoContainer>
            <Logo size="medium" />
          </LogoContainer>
          <PageTitle>Tutorials & Guides</PageTitle>
          <PageDescription>
            Learn how to use Juici to generate innovative ideas, create professional PRDs, and streamline your product development process.
            Our tutorials range from beginner-friendly to advanced techniques.
          </PageDescription>
        </PageHeader>
        
        <TutorialsGrid>
          <TutorialCard to="/tutorials/getting-started">
            <TutorialIcon>
              <FiFileText />
            </TutorialIcon>
            <TutorialTitle>Getting Started with Juici</TutorialTitle>
            <TutorialDate>Mar 20, 2025</TutorialDate>
            <TutorialDescription>
              New to Juici? This tutorial will walk you through the basics of using our platform to generate ideas, 
              save favorites, and understand the dashboard features.
            </TutorialDescription>
            <ReadMore>
              Read Tutorial <FiArrowRight />
            </ReadMore>
          </TutorialCard>
          
          <TutorialCard to="/tutorials/creating-prds">
            <TutorialIcon>
              <FiCpu />
            </TutorialIcon>
            <TutorialTitle>Creating Professional PRDs</TutorialTitle>
            <TutorialDate>Mar 20, 2025</TutorialDate>
            <TutorialDescription>
              Learn how to leverage Juici's AI to create comprehensive Product Requirements Documents that will guide your
              development process from concept to implementation.
            </TutorialDescription>
            <ReadMore>
              Read Tutorial <FiArrowRight />
            </ReadMore>
          </TutorialCard>
          
          <TutorialCard to="/tutorials/advanced-techniques">
            <TutorialIcon>
              <FiAward />
            </TutorialIcon>
            <TutorialTitle>Advanced Juici Techniques</TutorialTitle>
            <TutorialDate>Mar 20, 2025</TutorialDate>
            <TutorialDescription>
              Take your Juici experience to the next level with advanced techniques for customization, 
              collaboration, and integration with development workflows.
            </TutorialDescription>
            <ReadMore>
              Read Tutorial <FiArrowRight />
            </ReadMore>
          </TutorialCard>
          
          <TutorialCard to="/tutorials/api-integration">
            <TutorialIcon>
              <FiLink />
            </TutorialIcon>
            <TutorialTitle>Integrating External APIs with Juici</TutorialTitle>
            <TutorialDate>Mar 20, 2025</TutorialDate>
            <TutorialDescription>
              Enhance your Juici workflow by integrating with external APIs and services. Learn how to connect 
              to project management tools, version control systems, and more.
            </TutorialDescription>
            <ReadMore>
              Read Tutorial <FiArrowRight />
            </ReadMore>
          </TutorialCard>
          
          <TutorialCard to="/tutorials/organizing-favorites">
            <TutorialIcon>
              <FiFolder />
            </TutorialIcon>
            <TutorialTitle>Organizing Your Favorites</TutorialTitle>
            <TutorialDate>Mar 20, 2025</TutorialDate>
            <TutorialDescription>
              Discover how to efficiently organize your saved ideas and PRDs using collections, tags, and smart search.
              Build a system that keeps everything accessible as your library grows.
            </TutorialDescription>
            <ReadMore>
              Read Tutorial <FiArrowRight />
            </ReadMore>
          </TutorialCard>
        </TutorialsGrid>
      </PageContainer>
    </Layout>
  );
};

export default TutorialsPage; 