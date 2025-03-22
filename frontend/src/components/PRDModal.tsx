import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCopy, FiDownload, FiRefreshCw, FiSend, FiLoader, FiCheck } from 'react-icons/fi';
import Button from './Button';
import { useIdea } from '../contexts/IdeaContext';

// Adding a named export to ensure this file is treated as a module
export interface PRDModalProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
  originalPrompt: string;
}

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

const RefinePRDModal = styled(ModalContent)`
  max-width: 600px;
`;

const RefinePRDInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  resize: vertical;
`;

const RefinementChatContainer = styled(ModalContent)`
  max-width: 700px;
  height: 600px;
  display: flex;
  flex-direction: column;
`;

const ChatMessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ChatMessage = styled.div<{ isUser?: boolean }>`
  max-width: 80%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 12px;
  clear: both;
  
  ${props => props.isUser ? `
    background: linear-gradient(135deg, #008080, #20B2AA);
    color: white;
    align-self: flex-end;
    margin-left: auto;
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: #e0e0e0;
    align-self: flex-start;
  `}
`;

const RefinementInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const RefinementInput = styled.textarea`
  flex-grow: 1;
  min-height: 80px;
  max-height: 150px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  resize: vertical;
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
  content, 
  isOpen, 
  onClose, 
  originalPrompt 
}) => {
  const [copied, setCopied] = useState(false);
  const [showRefinePRDModal, setShowRefinePRDModal] = useState(false);
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refinedPRDContent, setRefinedPRDContent] = useState<string | null>(null);
  const { generatePRD } = useIdea();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `PRD-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleRefinePRD = async () => {
    // Reset chat messages and open the refinement modal
    setChatMessages([
      { 
        text: "Hi there! I'm Juici, ready to help you refine your Product Requirements Document. What changes would you like to make?", 
        isUser: false 
      }
    ]);
    setShowRefinePRDModal(true);
    setRefinedPRDContent(null);
  };
  
  const submitRefinement = async () => {
    if (!refinementPrompt.trim() || isGenerating) return;

    // Add user message to chat
    const updatedMessages = [
      ...chatMessages, 
      { text: refinementPrompt, isUser: true }
    ];
    setChatMessages(updatedMessages);
    
    // Clear input
    setRefinementPrompt('');
    
    // Show generating message
    setIsGenerating(true);
    const generatingMessage = { 
      text: "Generating your refined PRD...", 
      isUser: false 
    };
    setChatMessages([...updatedMessages, generatingMessage]);
    
    try {
      // Combine original prompt with refinement instructions
      const refinedPrompt = `${originalPrompt}. ${refinementPrompt}`;
      
      // Generate new PRD with refinement
      const newPRDContent = await generatePRD(refinedPrompt);
      
      if (newPRDContent) {
        // Update chat with new PRD
        const prdMessage = { 
          text: "Here's the refined PRD based on your suggestions:", 
          isUser: false 
        };
        
        setChatMessages(prevMessages => [
          ...prevMessages.filter(msg => msg !== generatingMessage), 
          prdMessage
        ]);
        
        // Store the refined PRD content
        setRefinedPRDContent(newPRDContent);
      } else {
        // Error handling
        const errorMessage = { 
          text: "Sorry, I couldn't generate the refined PRD. Please try again.", 
          isUser: false 
        };
        setChatMessages(prevMessages => [
          ...prevMessages.filter(msg => msg !== generatingMessage), 
          errorMessage
        ]);
      }
    } catch (error) {
      // Error handling
      const errorMessage = { 
        text: "Oops! Something went wrong while refining the PRD.", 
        isUser: false 
      };
      setChatMessages(prevMessages => [
        ...prevMessages.filter(msg => msg !== generatingMessage), 
        errorMessage
      ]);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAcceptRefinement = () => {
    // Close the refinement modal and update the main content
    if (refinedPRDContent) {
      content = refinedPRDContent;
      setShowRefinePRDModal(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      <ModalOverlay isOpen={isOpen} onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <CloseButton onClick={onClose}>✕</CloseButton>
          <h1>Product Requirements Document</h1>
          
          <PRDContent dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }} />
          
          <ActionButtonsContainer>
            <Button 
              variant="primary" 
              onClick={handleCopy}
              icon={<FiCopy />}
            >
              {copied ? "Copied!" : "Copy PRD"}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              icon={<FiDownload />}
            >
              Download as Markdown
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleRefinePRD}
              icon={<FiRefreshCw />}
              style={{ 
                background: 'linear-gradient(135deg, #008080, #20B2AA)', 
                color: 'white' 
              }}
            >
              Refine PRD
            </Button>
          </ActionButtonsContainer>
        </ModalContent>
      </ModalOverlay>
      
      {showRefinePRDModal && (
        <ModalOverlay isOpen={showRefinePRDModal} onClick={() => setShowRefinePRDModal(false)}>
          <RefinementChatContainer onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setShowRefinePRDModal(false)}>✕</CloseButton>
            <h1>Refine Product Requirements Document</h1>
            
            <ChatMessagesContainer>
              {chatMessages.map((message, index) => (
                <ChatMessage key={index} isUser={message.isUser}>
                  {message.text}
                </ChatMessage>
              ))}
              {isGenerating && (
                <ChatMessage isUser={false}>
                  <FiLoader style={{ animation: 'spin 1s linear infinite' }} /> Generating...
                </ChatMessage>
              )}
              {refinedPRDContent && (
                <ChatMessage isUser={false}>
                  <PRDContent 
                    dangerouslySetInnerHTML={{ 
                      __html: markdownToHtml(refinedPRDContent) 
                    }} 
                  />
                </ChatMessage>
              )}
            </ChatMessagesContainer>
            
            {refinedPRDContent ? (
              <ActionButtonsContainer>
                <Button 
                  variant="primary" 
                  onClick={handleAcceptRefinement}
                  icon={<FiCheck />}
                >
                  Accept Refined PRD
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleRefinePRD}
                  icon={<FiRefreshCw />}
                >
                  Refine Further
                </Button>
              </ActionButtonsContainer>
            ) : (
              <RefinementInputContainer>
                <RefinementInput 
                  placeholder="Describe the changes you want in the PRD..."
                  value={refinementPrompt}
                  onChange={(e) => setRefinementPrompt(e.target.value)}
                  disabled={isGenerating}
                />
                <SendButton 
                  onClick={submitRefinement}
                  disabled={!refinementPrompt.trim() || isGenerating}
                >
                  <FiSend />
                </SendButton>
              </RefinementInputContainer>
            )}
          </RefinementChatContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default PRDModal; 