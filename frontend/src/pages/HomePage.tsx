import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiZap, FiStar, FiBookmark, FiLayers } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';
import IdeaGenerator from '../components/IdeaGenerator';
import Logo from '../components/Logo';

// Styled components
const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const LargeLogoContainer = styled.div`
  margin-bottom: 2rem;
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  color: #ccc;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 1rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ccc;
  max-width: 700px;
  margin: 0 auto 3rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(173, 255, 47, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #ADFF2F;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection>
        <LargeLogoContainer>
          <Logo size="large" />
        </LargeLogoContainer>
        <HeroSubtitle>
          Get your creative juices flowing with creative juices in seconds
        </HeroSubtitle>
        <IdeaGenerator />
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose Juici?</SectionTitle>
        <SectionSubtitle>
          Our powerful idea generation platform offers everything you need to kickstart your next big project.
        </SectionSubtitle>
        
        <FeaturesGrid>
          <FeatureCard variant="glass">
            <FeatureIcon>
              <FiZap />
            </FeatureIcon>
            <FeatureTitle>Lightning Fast</FeatureTitle>
            <FeatureDescription>
              Generate creative ideas in seconds. No more waiting around for inspiration to strike.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard variant="glass">
            <FeatureIcon>
              <FiStar />
            </FeatureIcon>
            <FeatureTitle>High Quality</FeatureTitle>
            <FeatureDescription>
              Our AI is trained on diverse datasets to ensure unique, high-quality ideas every time.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard variant="glass">
            <FeatureIcon>
              <FiBookmark />
            </FeatureIcon>
            <FeatureTitle>Save Favorites</FeatureTitle>
            <FeatureDescription>
              Create your personal collection of favorite ideas for future reference and inspiration.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard variant="glass">
            <FeatureIcon>
              <FiLayers />
            </FeatureIcon>
            <FeatureTitle>Customizable</FeatureTitle>
            <FeatureDescription>
              Filter by categories to get ideas tailored to your specific interests and needs.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <CTASection>
        <SectionTitle>Take Your Ideas Further</SectionTitle>
        <SectionSubtitle>
          Create a free account to save your favorite ideas and build a collection of inspiration.
        </SectionSubtitle>
        <ButtonGroup>
          <Button 
            variant="primary" 
            size="large" 
            as={Link} 
            to="/dashboard"
          >
            View Dashboard
          </Button>
          <Button 
            variant="outline" 
            size="large" 
            as={Link} 
            to="/tutorials"
          >
            View Tutorials
          </Button>
        </ButtonGroup>
      </CTASection>
    </Layout>
  );
};

export default HomePage; 