import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiRefreshCw, FiCopy, FiHeart, FiCheckCircle, FiFileText } from 'react-icons/fi';
import axios from 'axios';
import Button from './Button';
import Card from './Card';
import PRDModal from './PRDModal';
import { useIdea } from '../contexts/IdeaContext';
import { useAuth } from '../contexts/AuthContext';

// Styled components
const GeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;
  width: 100%;
  max-width: 900px;
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
  margin: 0 auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IdeaCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  padding: 2rem;
  background: rgba(93, 63, 211, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const IdeaText = styled.p`
  font-size: 1.4rem;
  line-height: 1.6;
  text-align: center;
  margin: 1rem 0;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin: 1rem 0;
  max-width: 800px;
`;

const CategoryBadge = styled.div<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isSelected ? 'linear-gradient(135deg, #ADFF2F, #90EE90)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.isSelected ? '#000' : '#fff'};
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.isSelected ? 'linear-gradient(135deg, #ADFF2F, #90EE90)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.green.main};
    animation: dotPulse 1.5s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes dotPulse {
    0%, 100% {
      transform: scale(0.7);
      opacity: 0.5;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
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

// PRD Modal components
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background-color: #2D0157;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  color: white;
  border: 2px solid ${props => props.theme.colors.purple.main};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    color: ${props => props.theme.colors.yellow.main};
  }
`;

const PRDContent = styled.div`
  color: white;
  line-height: 1.6;
  font-family: 'Manrope', sans-serif;
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.colors.green.light};
    margin-top: 1.5em;
    margin-bottom: 0.5em;
  }
  
  h1 {
    font-size: 2rem;
    border-bottom: 1px solid ${props => props.theme.colors.purple.light};
    padding-bottom: 0.5rem;
  }
  
  h2 {
    font-size: 1.7rem;
  }
  
  h3 {
    font-size: 1.4rem;
  }
  
  p, ul, ol {
    margin-bottom: 1.2em;
  }
  
  ul, ol {
    padding-left: 2em;
  }
  
  li {
    margin-bottom: 0.5em;
  }
  
  code {
    font-family: monospace;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
  
  pre {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    margin: 1em 0;
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.yellow.main};
    padding-left: 1em;
    margin-left: 0;
    font-style: italic;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }
  
  th, td {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 0.5em;
    text-align: left;
  }
  
  th {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SuccessNotification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.theme.colors.green.main};
  color: #000;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  animation: slideIn 0.3s forwards;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const ErrorNotification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ff4d4f;
  color: #fff;
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 1000;
  animation: slideIn 0.3s forwards;
`;

// Sample categories
const categories = [
  "Web App", "Mobile App", "API", "Dashboard", "Data Viz",
  "AI/ML", "E-commerce", "Social", "Productivity", "Gaming",
  "Healthcare", "Education", "Finance", "Travel", "Entertainment"
];

// Sample ideas (these will be replaced by API calls in production)
const sampleIdeas = [
  "A mobile app that connects local farmers directly with consumers for fresh produce delivery.",
  "An AI-powered meal planning service that reduces food waste by suggesting recipes based on ingredients you already have.",
  "A subscription box service that delivers DIY science projects for kids with all materials included.",
  "A marketplace platform for renting specialized tools and equipment from neighbors in your community.",
  "A virtual reality app that allows users to practice public speaking in simulated environments.",
  "A smart water bottle that tracks hydration and reminds users to drink water throughout the day.",
  "A sustainable fashion brand that creates clothing from recycled ocean plastic.",
  "A browser extension that translates technical jargon into simple language on any website.",
  "A platform that connects elderly people with tech-savvy youth for help with technology challenges.",
  "A community-based app for sharing home-grown produce and gardening tips with neighbors."
];

// Helper function to convert markdown to HTML
const markdownToHtml = (markdown: string): string => {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Lists
    .replace(/^\s*\d+\.\s+(.*$)/gim, '<ol><li>$1</li></ol>')
    .replace(/^\s*\*\s+(.*$)/gim, '<ul><li>$1</li></ul>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Line breaks
    .replace(/\n/g, '<br/>');
    
  // Fix consecutive list items
  html = html
    .replace(/<\/ol><ol>/g, '')
    .replace(/<\/ul><ul>/g, '');
    
  return html;
};

// Update the component to use contexts
const IdeaGenerator: React.FC = () => {
  const { user } = useAuth();
  const { 
    currentIdea, 
    generateIdea, 
    saveToFavorites, 
    isLoading, 
    error, 
    generatePRD, 
    prdContent, 
    isGeneratingPRD,
    successMessage,
    refineIdea 
  } = useIdea();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showPRDModal, setShowPRDModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const availableCategories = ['Web', 'Mobile', 'AI', 'Data', 'Tools', 'Social', 'Health', 'Finance', 'Education', 'Entertainment'];
  
  // Generate a random idea on first load
  useEffect(() => {
    if (!currentIdea) {
      generateIdea();
    }
  }, [currentIdea, generateIdea]);
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Copy idea to clipboard
  const copyToClipboard = () => {
    if (currentIdea) {
      navigator.clipboard.writeText(currentIdea.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Save the current idea to favorites
  const handleSaveToFavorites = async () => {
    if (currentIdea && user) {
      await saveToFavorites({
        ...currentIdea,
        categories: selectedCategories
      });
    } else if (!user) {
      // Show login required message
      // You can add state for this or use the error state from context
    }
  };
  
  // Generate a PRD for the current idea
  const handleGeneratePRD = async () => {
    if (currentIdea) {
      const content = await generatePRD(currentIdea.prompt);
      if (content) {
        setShowPRDModal(true);
      }
    }
  };
  
  return (
    <GeneratorContainer>
      <div>
        <Title>Creative Juices in Seconds</Title>
        <Subtitle>Get your creative juices flowing with randomly generated project ideas. Click "Generate" for a new idea.</Subtitle>
      </div>
      
      <CategoryContainer>
        {availableCategories.map(category => (
          <CategoryBadge 
            key={category}
            isSelected={selectedCategories.includes(category)}
            onClick={() => toggleCategory(category)}
          >
            {category}
          </CategoryBadge>
        ))}
      </CategoryContainer>
      
      <IdeaCard>
        {isLoading ? (
          <LoadingIndicator>
            <LoadingDots>
              <span></span>
              <span></span>
              <span></span>
            </LoadingDots>
          </LoadingIndicator>
        ) : currentIdea ? (
          <IdeaText>{currentIdea.prompt}</IdeaText>
        ) : (
          <IdeaText>Click Generate to get started</IdeaText>
        )}
        
        <ButtonContainer>
          <Button 
            onClick={generateIdea} 
            icon={<FiRefreshCw />}
            disabled={isLoading}
          >
            Generate
          </Button>
          
          <Button 
            onClick={copyToClipboard} 
            variant="secondary" 
            icon={copied ? <FiCheckCircle /> : <FiCopy />}
            disabled={!currentIdea || isLoading}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          
          <Button 
            onClick={handleSaveToFavorites} 
            variant="secondary" 
            icon={<FiHeart />}
            disabled={!currentIdea || isLoading || !user}
          >
            Save to Favorites
          </Button>
          
          <Button 
            onClick={handleGeneratePRD} 
            variant="secondary" 
            icon={<FiFileText />}
            disabled={!currentIdea || isGeneratingPRD}
            loading={isGeneratingPRD}
          >
            Generate PRD
          </Button>
        </ButtonContainer>
      </IdeaCard>
      
      {showPRDModal && (
        <PRDModal 
          isOpen={showPRDModal} 
          content={prdContent} 
          onClose={() => setShowPRDModal(false)} 
          originalPrompt={currentIdea?.prompt || ''}
        />
      )}
      
      {copied && (
        <CopiedNotification>
          <FiCheckCircle /> Copied to clipboard!
        </CopiedNotification>
      )}
      
      {successMessage && (
        <SuccessNotification>
          <FiCheckCircle /> {successMessage}
        </SuccessNotification>
      )}
      
      {error && (
        <ErrorNotification>
          {error}
        </ErrorNotification>
      )}
    </GeneratorContainer>
  );
};

export default IdeaGenerator; 