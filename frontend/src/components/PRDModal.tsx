import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { FiCopy, FiDownload, FiRefreshCw, FiSend, FiLoader, FiCheck, FiFileText, FiTool, FiServer, FiCalendar, FiLayout, FiX, FiStar } from 'react-icons/fi';
import Button from './Button';
import { useIdea } from '../contexts/IdeaContext';
import { generatePRD, refinePRD, chatWithJuici, saveFavorite } from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';

export type DocumentType = 'PRD' | 'AppFlow' | 'TechStack' | 'ImplementationPlan';

// Adding a named export to ensure this file is treated as a module
export interface PRDModalProps {
  isOpen: boolean;
  onClose: () => void;
  prdContent: string;
}

// Structure for document data
interface Document {
  title: string;
  content: string;
  icon: React.ReactNode;
  isGenerated: boolean;
  isGenerating: boolean;
}

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const PRDContent = styled.div`
  margin: 2rem 0;
  line-height: 1.6;
  font-size: 1rem;
  color: #333;

  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #111;
  }

  p {
    margin-bottom: 1rem;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 2rem;
  }

  code {
    background-color: #f5f5f5;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', Courier, monospace;
  }

  pre {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 1rem;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const RefinePRDModal = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #111;
  }
`;

const RefinePRDInput = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const RefinementChatContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 1.5rem;
    color: #111;
  }
`;

const ChatMessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
`;

const ChatMessage = styled.div<{ isUser: boolean }>`
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.4;
  
  ${props => props.isUser ? `
    background-color: #0070f3;
    color: white;
    margin-left: auto;
  ` : `
    background-color: #e9ecef;
    color: #333;
    margin-right: auto;
  `}
`;

const RefinementInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const RefinementInput = styled.textarea`
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  min-height: 60px;
  max-height: 150px;

  &:focus {
    outline: none;
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(0, 112, 243, 0.2);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  text-align: center;
`;

// Document checklist styled components
const DocumentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DocumentItem = styled.div<{ $isActive?: boolean; $isGenerated?: boolean }>`
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, rgba(173, 255, 47, 0.2), rgba(124, 252, 0, 0.2))' 
    : 'rgba(0, 0, 0, 0.2)'};
  border: 1px solid ${props => props.$isGenerated 
    ? props.theme.colors.green.main 
    : 'rgba(255, 255, 255, 0.1)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => !props.$isActive && 'rgba(173, 255, 47, 0.05)'};
    transform: translateY(-2px);
  }
`;

const DocumentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  margin-right: 1rem;
  
  svg {
    color: ${props => props.theme.colors.green.light};
    font-size: 1.2rem;
  }
`;

const DocumentInfo = styled.div`
  flex-grow: 1;
`;

const DocumentTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
  color: ${props => props.theme.colors.green.light};
`;

const DocumentStatus = styled.div<{ $isGenerated?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.$isGenerated 
    ? props.theme.colors.green.main 
    : props.theme.colors.yellow.main};
`;

const DocumentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-top: 1rem;
  overflow: hidden;
  
  &::after {
    content: '';
    display: block;
    height: 100%;
    width: 30%;
    background: linear-gradient(90deg, #ADFF2F, #7CFC00);
    border-radius: 2px;
    animation: progressAnimation 2s infinite ease-in-out;
  }
  
  @keyframes progressAnimation {
    0% {
      width: 0;
      transform: translateX(-100%);
    }
    50% {
      width: 50%;
    }
    100% {
      width: 0;
      transform: translateX(200%);
    }
  }
`;

const DocumentsNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const DocumentsTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DocumentTab = styled.button<{ $isActive?: boolean }>`
  background: ${props => props.$isActive 
    ? 'linear-gradient(135deg, #ADFF2F, #7CFC00)' 
    : 'rgba(0, 0, 0, 0.2)'};
  color: ${props => props.$isActive ? '#000' : '#fff'};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => !props.$isActive && 'rgba(173, 255, 47, 0.1)'};
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #008080, #20B2AA);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PRDModal: React.FC<PRDModalProps> = ({ 
  prdContent, 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();
  const { addFavorite } = useFavorites();
  const [currentPRD, setCurrentPRD] = useState(prdContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRefinementModal, setShowRefinementModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPRD);
  };

  const handleDownload = () => {
    const blob = new Blob([currentPRD], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PRD.md';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleRefinePRD = () => {
    setShowRefinementModal(true);
  };

  const submitRefinement = async () => {
    if (!refinementPrompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await refinePRD(currentPRD, refinementPrompt);
      if (response.success && response.data) {
        setCurrentPRD(response.data);
        setShowRefinementModal(false);
        setRefinementPrompt('');
      } else {
        throw new Error(response.error || 'Failed to refine PRD');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChatWithJuici = () => {
    setShowChatModal(true);
    setChatMessages([
      { 
        text: "Hi! I'm Juici, your AI assistant. I can help you refine and improve your PRD. What would you like to discuss?",
        isUser: false 
      }
    ]);
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsGenerating(true);
    setError(null);

    try {
      const response = await chatWithJuici(userMessage, currentPRD);
      if (response.success && response.data) {
        setChatMessages(prev => [...prev, { text: response.data, isUser: false }]);
      } else {
        throw new Error(response.error || 'Failed to get response from Juici');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToFavorites = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setError(null);
    
    try {
      const title = currentPRD.split('\n')[0].replace('#', '').trim();
      const response = await saveFavorite(currentPRD, title);
      if (response.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      } else {
        throw new Error(response.error || 'Failed to save to favorites');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ModalOverlay $isOpen={isOpen}>
        <ModalContent>
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>

          <PRDContent dangerouslySetInnerHTML={{ __html: markdownToHtml(currentPRD) }} />

          <ActionButtonsContainer>
            <Button onClick={handleCopy}>
              <FiCopy /> Copy
            </Button>
            <Button onClick={handleDownload}>
              <FiDownload /> Download
            </Button>
            <Button onClick={handleRefinePRD}>
              <FiRefreshCw /> Refine
            </Button>
            <Button onClick={handleChatWithJuici}>
              <FiSend /> Chat with Juici
            </Button>
            <Button 
              onClick={handleSaveToFavorites}
              disabled={isSaving || isSaved}
            >
              {isSaving ? <FiLoader /> : isSaved ? <FiCheck /> : <FiStar />}
              {isSaving ? 'Saving...' : isSaved ? 'Saved!' : 'Save to Favorites'}
            </Button>
          </ActionButtonsContainer>

          {error && (
            <ErrorMessage>
              {error}
            </ErrorMessage>
          )}
        </ModalContent>
      </ModalOverlay>

      {/* Refinement Modal */}
      <ModalOverlay $isOpen={showRefinementModal}>
        <RefinePRDModal>
          <CloseButton onClick={() => setShowRefinementModal(false)}>
            <FiX />
          </CloseButton>
          <h2>Refine PRD</h2>
          <RefinePRDInput
            value={refinementPrompt}
            onChange={(e) => setRefinementPrompt(e.target.value)}
            placeholder="Enter your refinement instructions..."
          />
          <ActionButtonsContainer>
            <Button 
              onClick={submitRefinement}
              disabled={isGenerating}
            >
              {isGenerating ? <FiLoader /> : <FiRefreshCw />}
              {isGenerating ? 'Refining...' : 'Submit Refinement'}
            </Button>
          </ActionButtonsContainer>
        </RefinePRDModal>
      </ModalOverlay>

      {/* Chat Modal */}
      <ModalOverlay $isOpen={showChatModal}>
        <RefinementChatContainer>
          <CloseButton onClick={() => setShowChatModal(false)}>
            <FiX />
          </CloseButton>
          <h2>Chat with Juici</h2>
          <ChatMessagesContainer>
            {chatMessages.map((message, index) => (
              <ChatMessage key={index} isUser={message.isUser}>
                {message.text}
              </ChatMessage>
            ))}
          </ChatMessagesContainer>
          <RefinementInputContainer>
            <RefinementInput
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
            />
            <Button 
              onClick={sendChatMessage}
              disabled={isGenerating || !chatInput.trim()}
            >
              {isGenerating ? <FiLoader /> : <FiSend />}
            </Button>
          </RefinementInputContainer>
        </RefinementChatContainer>
      </ModalOverlay>
    </>
  );
};

// Loading spinner for async operations
const LoadingSpinner = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(173, 255, 47, 0.2);
  border-radius: 50%;
  border-top-color: #ADFF2F;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

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
    .replace(/^\s*[\*\-]\s+(.*$)/gim, '<ul><li>$1</li></ul>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');

  // Fix consecutive list items
  html = html
    .replace(/<\/ol><ol>/g, '')
    .replace(/<\/ul><ul>/g, '')
    // Wrap in paragraphs if not already wrapped
    .replace(/^(.+?)(?=<\/p>|$)/, '<p>$1</p>');

  return html;
};

export default PRDModal; 