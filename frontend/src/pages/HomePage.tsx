import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FiZap, FiTrendingUp, FiTarget, FiClock, FiSmile, FiBook } from 'react-icons/fi';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';
import IdeaGenerator from '../components/IdeaGenerator';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Animation keyframes
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to bottom, #2D0157, #111);
  color: #ffffff;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 5rem 2rem;
  min-height: 80vh;
  background: linear-gradient(135deg, rgba(93, 63, 211, 0.2), rgba(45, 1, 87, 0.3));
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(128, 0, 128, 0.2) 0%, rgba(0, 0, 0, 0) 70%);
    z-index: 0;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
`;

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LogoLetter = styled.span<{ delay: string }>`
  font-size: 5rem;
  font-weight: 800;
  color: ${props => props.theme.colors.purple.main};
  margin: 0 0.3rem;
  display: inline-block;
  animation: ${bounce} 2s ease infinite;
  animation-delay: ${props => props.delay};
  text-shadow: 0 0 15px rgba(128, 0, 128, 0.7);
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
  max-width: 800px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  max-width: 700px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1.5s ease-out;
`;

const CTAButton = styled(Button)`
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  margin-top: 1rem;
  box-shadow: 0 4px 15px rgba(128, 0, 128, 0.4);
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 2s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 7px 20px rgba(128, 0, 128, 0.6);
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 2rem;
  background: #1a1a1a;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.7);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.purple.main};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
`;

const CTASection = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, rgba(128, 0, 128, 0.2), rgba(128, 0, 128, 0.3));
  text-align: center;
`;

const CTAContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HomePage: React.FC = () => {
  return (
    <PageContainer>
      <Header />
      <HeroSection>
        <LogoContainer>
          <LetterContainer>
            <LogoLetter delay="0s">J</LogoLetter>
            <LogoLetter delay="0.1s">U</LogoLetter>
            <LogoLetter delay="0.2s">I</LogoLetter>
            <LogoLetter delay="0.3s">C</LogoLetter>
            <LogoLetter delay="0.4s">I</LogoLetter>
          </LetterContainer>
        </LogoContainer>
        <HeroTitle>AI-Powered Project and Product Development</HeroTitle>
        <HeroSubtitle>
          Generate product ideas, create PRDs, plan technical implementations, and accelerate your development workflow with AI assistance.
        </HeroSubtitle>
        <CTAButton 
          variant="primary" 
          $hasIcon 
          $iconPosition="right" 
          icon={<FiZap />}
          to="/app"
          as={Link}
        >
          Launch App
        </CTAButton>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Why Choose Juici?</SectionTitle>
        <SectionSubtitle>Our platform offers powerful tools to streamline your product development process</SectionSubtitle>
        
        <FeatureGrid>
          <FeatureItem>
            <FeatureIcon>
              <FiTrendingUp />
            </FeatureIcon>
            <FeatureTitle>Idea Generation</FeatureTitle>
            <FeatureDescription>
              Generate innovative product ideas tailored to your interests and market needs with our AI engine.
            </FeatureDescription>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <FiTarget />
            </FeatureIcon>
            <FeatureTitle>PRD Creation</FeatureTitle>
            <FeatureDescription>
              Transform ideas into comprehensive product requirement documents with a single click.
            </FeatureDescription>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <FiClock />
            </FeatureIcon>
            <FeatureTitle>Time Saving</FeatureTitle>
            <FeatureDescription>
              Reduce documentation time by up to 80% and focus on building rather than planning.
            </FeatureDescription>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <FiSmile />
            </FeatureIcon>
            <FeatureTitle>User-Friendly</FeatureTitle>
            <FeatureDescription>
              Intuitive interface designed for product managers, developers, and entrepreneurs alike.
            </FeatureDescription>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>
              <FiBook />
            </FeatureIcon>
            <FeatureTitle>Knowledge Base</FeatureTitle>
            <FeatureDescription>
              Access our extensive library of resources, templates, and best practices.
            </FeatureDescription>
          </FeatureItem>
        </FeatureGrid>
      </FeaturesSection>
      
      <CTASection>
        <CTAContainer>
          <CTATitle>Ready to Accelerate Your Product Development?</CTATitle>
          <CTAText>
            Join thousands of teams already using Juici to streamline their ideation and documentation process. Get started today!
          </CTAText>
          <ButtonGroup>
            <CTAButton 
              variant="primary" 
              $hasIcon 
              $iconPosition="right" 
              icon={<FiZap />}
              to="/app"
              as={Link}
            >
              Launch App
            </CTAButton>
          </ButtonGroup>
        </CTAContainer>
      </CTASection>
      
      <Footer />
    </PageContainer>
  );
};

export default HomePage; 