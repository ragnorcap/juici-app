import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiTrendingUp, FiUsers, FiCpu } from 'react-icons/fi';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Card from '../components/Card';

// Styled components
const PageContainer = styled.div`
  padding: 2rem 0;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 4rem;
`;


const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const StoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StoryContent = styled.div`
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
  }
`;

const StoryImage = styled.div`
  background: linear-gradient(135deg, rgba(173, 255, 47, 0.2), rgba(93, 63, 211, 0.2));
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  svg {
    font-size: 5rem;
    color: #ADFF2F;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const BenefitCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`;

const BenefitIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(173, 255, 47, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #ADFF2F;
`;

const BenefitTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const BenefitDescription = styled.p`
  color: #ccc;
  line-height: 1.6;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 3rem;
  background: rgba(93, 63, 211, 0.15);
  border-radius: 16px;
  margin-top: 2rem;
`;

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <HeroSection>
          <PageTitle>About <span>Juici</span></PageTitle>
          <Subtitle>
            We believe creativity shouldn't be limited by inspiration blocks. Our mission is to provide
            a simple tool that helps spark innovative ideas for projects of all types.
          </Subtitle>
        </HeroSection>
        
        <Section>
          <SectionTitle>Our Story</SectionTitle>
          <StoryContainer>
            <StoryContent>
              <p>
                Juici was born out of our own struggles with creative blocks. As creators, we know how frustrating it can be to sit down and draw a blank when you're trying to come up with new ideas.
              </p>
              <p>
                We built Juici to solve that problem - a simple, intuitive tool that provides fresh, interesting idea prompts when you need them most. Our AI-powered system combines diverse knowledge sources and creative patterns to generate ideas that can kick-start your next project.
              </p>
              <p>
                What started as a small side project has now grown into a platform that helps thousands of creators, entrepreneurs, and thinkers break through their mental blocks and find inspiration.
              </p>
            </StoryContent>
            <StoryImage>
              <FiCpu />
            </StoryImage>
          </StoryContainer>
        </Section>
        
        <Section>
          <SectionTitle>Why Use Juici?</SectionTitle>
          <BenefitsGrid>
            <BenefitCard variant="glass">
              <BenefitIcon>
                <FiBriefcase />
              </BenefitIcon>
              <BenefitTitle>For Entrepreneurs</BenefitTitle>
              <BenefitDescription>
                Discover new business ideas, product innovations, and market opportunities when you're looking to start or expand your venture.
              </BenefitDescription>
            </BenefitCard>
            
            <BenefitCard variant="glass">
              <BenefitIcon>
                <FiUsers />
              </BenefitIcon>
              <BenefitTitle>For Creatives</BenefitTitle>
              <BenefitDescription>
                Find inspiration for your next project, whether you're an artist, writer, designer, or creator in any field.
              </BenefitDescription>
            </BenefitCard>
            
            <BenefitCard variant="glass">
              <BenefitIcon>
                <FiTrendingUp />
              </BenefitIcon>
              <BenefitTitle>For Innovators</BenefitTitle>
              <BenefitDescription>
                Challenge your thinking and explore new directions with unexpected ideas that can lead to breakthrough innovations.
              </BenefitDescription>
            </BenefitCard>
          </BenefitsGrid>
        </Section>
        
        <CTASection>
          <SectionTitle>Ready to Get Inspired?</SectionTitle>
          <Subtitle>
            Try our idea generator now and break through your creative blocks. It's free to use and no account required!
          </Subtitle>
          <Button 
            variant="primary" 
            size="large" 
            as={Link} 
            to="/idea-generator"
          >
            Try Juici Now
          </Button>
        </CTASection>
      </PageContainer>
    </Layout>
  );
};

export default AboutPage; 