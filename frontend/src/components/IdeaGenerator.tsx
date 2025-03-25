import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiRefreshCw, FiCopy, FiHeart, FiCheckCircle, FiFileText, FiAlertTriangle, FiFilter, FiCheck, FiX } from 'react-icons/fi';
import axios from 'axios';
import Button from './Button';
import Card from './Card';
import PRDModal from './PRDModal';
import DocumentGenerator from './DocumentGenerator';
import { useIdea } from '../contexts/IdeaContext';
import { useAuth } from '../contexts/AuthContext';
import { Idea } from '../types';
import { PageTitle } from '../styles/shared';

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

const CategoryBadge = styled.div<{ $isSelected?: boolean }>`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin: 0.3rem;
  border-radius: 50px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${props => props.$isSelected ? props.theme.colors.purple.main : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$isSelected ? 'white' : '#ccc'};
  border: 1px solid ${props => props.$isSelected ? props.theme.colors.purple.main : 'rgba(255, 255, 255, 0.2)'};
  
  &:hover {
    background-color: ${props => props.$isSelected ? props.theme.colors.purple.light : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
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
  gap: 12px;
  
  span {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ADFF2F, #7CFC00);
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

// Added missing styled components that were causing errors
const ErrorContainer = styled.div`
  text-align: center;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
`;

const IdeaTitle = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.purple.light};
`;

const IdeaDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  margin: 1rem 0;
`;

const CategoryTag = styled.span`
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: rgba(173, 255, 47, 0.15);
  color: #ADFF2F;
  margin: 0.25rem;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 150px;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.textLight};
  text-align: center;
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
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
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
  background: ${props => props.theme.purple.main};
  color: #fff;
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

const FilterSection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  color: ${props => props.theme.colors.green.light};
  
  &:hover {
    color: ${props => props.theme.colors.yellow.main};
  }
`;

const CategoryFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const CategoryFilterButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  border: 1px solid ${props => props.$active ? props.theme.colors.green.main : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$active ? 'rgba(173, 255, 47, 0.2)' : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.green.light : '#ccc'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(173, 255, 47, 0.1);
    border-color: ${props => props.theme.colors.green.main};
  }
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

// Add to the component interface
interface IdeaGeneratorProps {
  onOpenPRDModal?: (content: string) => void;
}

// Main component
const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ onOpenPRDModal }) => {
  // Get user from auth context
  const { user } = useAuth();
  
  // Get idea context values (only use what we know exists)
  const { 
    currentIdea, 
    setCurrentIdea,
    saveToFavorites, 
    isLoading, 
    error: contextError, 
    generatePRD, 
    prdContent, 
    successMessage,
    refineIdea
  } = useIdea();

  // Local state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showPRDModal, setShowPRDModal] = useState(false);
  const [isGeneratingPRD, setIsGeneratingPRD] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [preloadedPrompts, setPreloadedPrompts] = useState<string[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Reference to track if initial idea has been set
  const initialIdeaSetRef = React.useRef(false);
  
  // Categories for filtering
  const availableCategories = ['Web', 'Mobile', 'AI', 'Data', 'Tools', 'Social', 'Health', 'Finance', 'Education', 'Entertainment'];
  
  // New state for document generator modal
  const [showDocumentGenerator, setShowDocumentGenerator] = useState(false);
  const [currentPrdContent, setCurrentPrdContent] = useState('');
  
  // Fetch prompts from API on component mount
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        console.log("Fetching prompts from API...");
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/prompts`, {
          headers: {
            'X-Api-Key': process.env.REACT_APP_API_KEY || 'juici_dev_key'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }
        const data = await response.json();
        console.log("Received prompts data:", data);
        
        if (data.prompts && Array.isArray(data.prompts) && data.prompts.length > 0) {
          // Set prompts from API data
          setPreloadedPrompts(data.prompts);
          setFilteredPrompts(data.prompts);
          
          // Only set an initial idea if currentIdea is null
    if (!currentIdea) {
            console.log("Setting initial idea from API prompts");
            const randomIndex = Math.floor(Math.random() * data.prompts.length);
            const randomPrompt = data.prompts[randomIndex];
            const promptCategories = categorizePrompt(randomPrompt);
            
            setCurrentIdea({
              id: 'initial-idea-' + Date.now(),
              prompt: randomPrompt,
              title: randomPrompt,
              description: 'Select categories and click generate for more ideas.',
              categories: promptCategories
            });
          }
        }
      } catch (error) {
        console.error('Error fetching prompts:', error);
        setError('Failed to load prompts. Please try again.');
        
        // Set fallback prompts
        const fallbackPrompts = [
          "A mobile app that helps users track and reduce their carbon footprint",
          "An AI-powered tool for personalizing online learning experiences",
          "A sustainable food delivery service for eco-conscious consumers",
          "A virtual reality platform for remote team collaboration",
          "A healthcare scheduling system that reduces wait times and improves efficiency"
        ];
        setPreloadedPrompts(fallbackPrompts);
        setFilteredPrompts(fallbackPrompts);
      }
    };

    fetchPrompts();
  }, []); // Empty dependency array - only run on mount
  
  // Listen for category changes and filter prompts
  useEffect(() => {
    if (selectedCategories.length === 0) {
      // If no categories selected, show all prompts
      setFilteredPrompts(preloadedPrompts);
      return;
    }
    
    // Filter prompts that match at least one of the selected categories
    const filtered = preloadedPrompts.filter(prompt => {
      const promptCategories = categorizePrompt(prompt);
      return selectedCategories.some(category => 
        promptCategories.includes(category)
      );
    });
    
    setFilteredPrompts(filtered);
  }, [selectedCategories, preloadedPrompts]);
  
  // Helper function to categorize prompts based on content
  const categorizePrompt = (prompt: string): string[] => {
    const categories = [];
    
    // Check for keywords in the prompt to categorize
    if (/\b(web|website|browser|online platform|internet|site)\b/i.test(prompt)) {
      categories.push('Web');
    }
    
    if (/\b(mobile|app|ios|android|smartphone|tablet)\b/i.test(prompt)) {
      categories.push('Mobile');
    }
    
    if (/\b(ai|machine learning|neural|artificial intelligence|ml|nlp|gpt|algorithm)\b/i.test(prompt)) {
      categories.push('AI');
    }
    
    if (/\b(data|analytics|dashboard|visualization|metrics|statistics|charts)\b/i.test(prompt)) {
      categories.push('Data');
    }
    
    if (/\b(tool|utility|productivity|automation|plugin|extension)\b/i.test(prompt)) {
      categories.push('Tools');
    }
    
    if (/\b(social|community|network|sharing|collaboration|connect)\b/i.test(prompt)) {
      categories.push('Social');
    }
    
    if (/\b(health|wellness|fitness|medical|healthcare|mental health)\b/i.test(prompt)) {
      categories.push('Health');
    }
    
    if (/\b(finance|banking|payment|money|investment|budget|financial)\b/i.test(prompt)) {
      categories.push('Finance');
    }
    
    if (/\b(education|learning|teaching|school|students|courses|training)\b/i.test(prompt)) {
      categories.push('Education');
    }
    
    if (/\b(entertainment|game|music|video|streaming|media|play)\b/i.test(prompt)) {
      categories.push('Entertainment');
    }
    
    // If no categories were matched, add a default category
    if (categories.length === 0) {
      categories.push('General');
    }
    
    return categories;
  };
  
  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
    } else {
        return [...prev, category];
      }
    });
  };
  
  // Generate new idea when button is clicked
  const handleGenerateIdea = () => {
    console.log("Generate button clicked");
    if (filteredPrompts.length === 0) {
      console.log("No filtered prompts available, using all prompts");
      setFilteredPrompts(preloadedPrompts);
    }
    
    // Use either filtered prompts or fallback to all prompts
    const promptsToUse = filteredPrompts.length > 0 ? filteredPrompts : preloadedPrompts;
    
    // Get the current prompt to exclude it
    const currentPrompt = currentIdea?.prompt || currentIdea?.title || '';
    
    // Filter out the current prompt to avoid showing the same one twice in a row
    const availablePrompts = promptsToUse.filter(p => p !== currentPrompt);
    
    // If we somehow filtered everything out, just use all prompts
    const finalPrompts = availablePrompts.length > 0 ? availablePrompts : promptsToUse;
    
    // Select a random prompt
    const randomIndex = Math.floor(Math.random() * finalPrompts.length);
    const randomPrompt = finalPrompts[randomIndex];
    
    console.log(`Selected random prompt: ${randomPrompt}`);
    
    // Categorize it
    const promptCategories = categorizePrompt(randomPrompt);
    
    // Create the new idea
    setCurrentIdea({
      id: 'generated-idea-' + Date.now(),
      prompt: randomPrompt,
      title: randomPrompt,
      description: 'A custom generated idea based on your selected categories.',
      categories: promptCategories
    });
  };
  
  // Generate PRD when button is clicked
  const handleGeneratePRD = async () => {
    if (!currentIdea) return;
    
    setIsGeneratingPRD(true);
    
    try {
      // Make a real API call to generate the PRD
      const response = await fetch('/api/generate-prd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idea: currentIdea }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Generated PRD response:', data);
      
      // Open document generator with the PRD content
      if (data.prdContent) {
        setCurrentPrdContent(data.prdContent);
        setShowDocumentGenerator(true);
      }
    } catch (error) {
      console.error('Error generating PRD:', error);
      setError('Failed to generate PRD. Please try again.');
    } finally {
      setIsGeneratingPRD(false);
    }
  };
  
  // Handle retry if error occurs
  const handleRetry = () => {
    setError(null);
    const fetchPrompts = async () => {
      try {
        const response = await fetch('/api/prompts');
        if (!response.ok) {
          throw new Error('Failed to fetch prompts');
        }
        const data = await response.json();
        setPreloadedPrompts(data.prompts);
        setFilteredPrompts(data.prompts);
      } catch (error) {
        console.error('Error retrying prompts fetch:', error);
        setError('Failed to load prompts. Please try again.');
      }
    };
    fetchPrompts();
  };
  
  // Render the component
  return (
    <GeneratorContainer>
      <div>
        <PageTitle>Creative Juices in Seconds</PageTitle>
        <Subtitle>Get your creative juices flowing with randomly generated project ideas. Click "Generate" for a new idea.</Subtitle>
      </div>
      
      {error ? (
        <ErrorContainer>
          <ErrorMessage><FiAlertTriangle /> {error}</ErrorMessage>
          <Button variant="secondary" onClick={handleRetry}>
            Try Again
          </Button>
        </ErrorContainer>
      ) : isLoading ? (
          <LoadingIndicator>
            <LoadingDots>
              <span></span>
              <span></span>
              <span></span>
            </LoadingDots>
          </LoadingIndicator>
      ) : (
        <>
          <IdeaCard>
            {currentIdea ? (
              <>
                <IdeaTitle>{currentIdea.title}</IdeaTitle>
                <IdeaDescription>{currentIdea.description}</IdeaDescription>
                <CategoryContainer>
                  {currentIdea.categories && currentIdea.categories.length > 0 ? (
                    currentIdea.categories.map((category, index) => (
                      <CategoryTag key={index}>{category}</CategoryTag>
                    ))
                  ) : (
                    <CategoryTag>General</CategoryTag>
                  )}
                </CategoryContainer>
                
                <ActionButtonsContainer>
          <Button 
                    onClick={handleGenerateIdea} 
                    disabled={isLoading}
                    $hasIcon={true}
            icon={<FiRefreshCw />}
                    variant="primary"
                  >
                    Generate New Idea
          </Button>
          
          <Button 
            onClick={handleGeneratePRD} 
                    disabled={isLoading || isGeneratingPRD || !currentIdea}
                    variant="primary" 
                    $hasIcon={true}
            icon={<FiFileText />}
          >
            Generate PRD
          </Button>
                </ActionButtonsContainer>
              </>
            ) : (
              <EmptyStateContainer>
                <EmptyStateText>
                  A mobile app that helps users track and reduce their carbon footprint
                </EmptyStateText>
                <CategoryContainer>
                  <CategoryTag>Mobile</CategoryTag>
                  <CategoryTag>Social</CategoryTag>
                  <CategoryTag>Health</CategoryTag>
                </CategoryContainer>
              </EmptyStateContainer>
            )}
      </IdeaCard>
      
          <FilterSection>
            <FilterTitle onClick={() => setShowFilters(!showFilters)}>
              <FiFilter /> Category Filters
            </FilterTitle>
            
            {showFilters && (
              <CategoryFilterContainer>
                {availableCategories.map(category => (
                  <CategoryFilterButton
                    key={category}
                    $active={selectedCategories.includes(category)}
                    onClick={() => toggleCategory(category)}
                  >
                    {selectedCategories.includes(category) ? (
                      <FiCheck size={12} style={{ marginRight: '4px' }} />
                    ) : null}
                    {category}
                  </CategoryFilterButton>
                ))}
              </CategoryFilterContainer>
            )}
          </FilterSection>
        </>
      )}
      
      {/* Document Generator Modal */}
      <DocumentGenerator 
        isOpen={showDocumentGenerator}
        onClose={() => setShowDocumentGenerator(false)}
        initialContent={currentPrdContent}
      />
    </GeneratorContainer>
  );
};

export default IdeaGenerator; 