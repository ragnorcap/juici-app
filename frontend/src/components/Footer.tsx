import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import Logo from './Logo';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem;
  color: #fff;
  width: 100%;
  z-index: 10;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ADFF2F;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: #ADFF2F;
  }
`;

const ExternalLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: #ADFF2F;
  }
`;

const FooterDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: #fff;
  font-size: 1.2rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ADFF2F;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  color: #aaa;
  width: 100%;
`;

const StyledLogo = styled(Logo)`
  margin-bottom: 1rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <StyledLogo size="small" />
          <FooterDescription>
            Generate creative ideas for your next project with our AI-powered idea generator.
            Fresh inspiration is just a click away.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FiGithub />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Explore</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/idea-generator">Idea Generator</FooterLink>
          <FooterLink to="/favorites">Favorites</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Resources</FooterTitle>
          <ExternalLink href="https://openai.com" target="_blank" rel="noopener noreferrer">
            API Documentation
          </ExternalLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/blog">Blog</FooterLink>
          <FooterLink to="/tutorials">Tutorials</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Company</FooterTitle>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Juici. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;