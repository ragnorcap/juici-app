import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { FiCopy, FiDownload, FiRefreshCw, FiSend, FiLoader, FiCheck, FiFileText, FiTool, FiServer, FiCalendar, FiLayout, FiX } from 'react-icons/fi';
import Button from './Button';
import { useIdea } from '../contexts/IdeaContext';

export type DocumentType = 'PRD' | 'AppFlow' | 'TechStack' | 'ImplementationPlan';

export interface DocumentGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent: string;
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

const DocumentContent = styled.div`
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

const RefinementModalContent = styled(ModalContent)`
  max-width: 600px;
`;

const RefinementInput = styled.textarea`
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

const ChatContainer = styled(ModalContent)`
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

const ChatMessage = styled.div<{ $isUser?: boolean }>`
  max-width: 80%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 12px;
  clear: both;
  
  ${props => props.$isUser ? `
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

const ChatInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ChatInput = styled.textarea`
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
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 128, 128, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

// Main component
const DocumentGenerator: React.FC<DocumentGeneratorProps> = ({ 
  isOpen, 
  onClose,
  initialContent 
}) => {
  const [showRefinementModal, setShowRefinementModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [refinementInput, setRefinementInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ $isUser: boolean; message: string }[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isProcessingMessage, setIsProcessingMessage] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  // Document generation state
  const [activeDocType, setActiveDocType] = useState<DocumentType>('PRD');
  const [documents, setDocuments] = useState<Record<DocumentType, Document>>({
    PRD: {
      title: 'Product Requirements Document',
      content: initialContent || '',
      icon: <FiFileText />,
      isGenerated: !!initialContent,
      isGenerating: false
    },
    AppFlow: {
      title: 'Application Flow',
      content: '',
      icon: <FiLayout />,
      isGenerated: false,
      isGenerating: false
    },
    TechStack: {
      title: 'Tech Stack (Frontend/Backend)',
      content: '',
      icon: <FiServer />,
      isGenerated: false,
      isGenerating: false
    },
    ImplementationPlan: {
      title: 'Implementation Plan',
      content: '',
      icon: <FiCalendar />,
      isGenerated: false,
      isGenerating: false
    }
  });
  
  // Update documents state when initialContent changes from props
  useEffect(() => {
    if (initialContent) {
      setDocuments(prev => ({
        ...prev,
        PRD: {
          ...prev.PRD,
          content: initialContent,
          isGenerated: true
        }
      }));
    }
  }, [initialContent]);
  
  // Utility function to generate other documents
  const generateDocument = async (docType: DocumentType) => {
    if (documents[docType].isGenerated || documents[docType].isGenerating) return;
    
    // Set the document as generating
    setDocuments(prev => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        isGenerating: true
      }
    }));
    
    try {
      // For now, simulate API call with setTimeout
      // In production, replace with actual API call
      setTimeout(() => {
        const placeholderContent = `# ${documents[docType].title} (4-Hour Implementation)

## Overview
This document outlines a streamlined approach for a 4-hour implementation.

## Key Components
- Component 1: Description with implementation details
- Component 2: Description with implementation details
- Component 3: Description with implementation details

## Timeline
1. **Hour 1**: Setup and initial architecture
2. **Hour 2**: Core functionality implementation
3. **Hour 3**: UI development and integration
4. **Hour 4**: Testing and deployment

## Success Criteria
- Functional MVP delivered within 4 hours
- Core requirements satisfied
- Clean, maintainable code
`;
        
        setDocuments(prev => ({
          ...prev,
          [docType]: {
            ...prev[docType],
            content: placeholderContent,
            isGenerated: true,
            isGenerating: false
          }
        }));
      }, 3000);
      
    } catch (error) {
      console.error(`Error generating ${docType}:`, error);
      
      // Update state to reflect the error
      setDocuments(prev => ({
        ...prev,
        [docType]: {
          ...prev[docType],
          isGenerating: false
        }
      }));
    }
  };
  
  // Handle document selection
  const handleSelectDocument = (docType: DocumentType) => {
    setActiveDocType(docType);
    
    // If the document hasn't been generated yet, generate it
    if (!documents[docType].isGenerated && !documents[docType].isGenerating) {
      generateDocument(docType);
    }
  };
  
  // Handle copying the current document
  const handleCopy = () => {
    const currentContent = documents[activeDocType].content;
    navigator.clipboard.writeText(currentContent)
      .then(() => {
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };

  // Handle downloading the current document
  const handleDownload = () => {
    const currentContent = documents[activeDocType].content;
    const fileName = `${activeDocType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.md`;
    const blob = new Blob([currentContent], { type: 'text/markdown' });
    const href = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };
  
  // Refine the current document
  const handleRefineDocument = () => {
    setShowRefinementModal(true);
  };
  
  // Submit a refinement request
  const submitRefinement = () => {
    if (!refinementInput.trim()) return;
    
    setShowRefinementModal(false);
    setShowChatModal(true);
    
    // Add user message to chat
    setChatMessages([
      { $isUser: true, message: refinementInput }
    ]);
    
    setIsProcessingMessage(true);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          $isUser: false, 
          message: `I'll help you refine the ${documents[activeDocType].title}. What specific aspects would you like me to improve or expand upon?` 
        }
      ]);
      setIsProcessingMessage(false);
    }, 1500);
    
    setRefinementInput('');
  };
  
  // Send a message in the chat
  const sendChatMessage = () => {
    if (!currentMessage.trim() || isProcessingMessage) return;
    
    const userMessage = currentMessage;
    setCurrentMessage('');
    
    // Add user message to chat
    setChatMessages(prev => [
      ...prev,
      { $isUser: true, message: userMessage }
    ]);
    
    setIsProcessingMessage(true);
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { 
          $isUser: false, 
          message: `I've updated the document based on your feedback. The changes include additional details on implementation timelines and technology choices to ensure the 4-hour build time is achievable.` 
        }
      ]);
      setIsProcessingMessage(false);
    }, 2000);
  };
  
  // Accept refinement and close chat
  const handleAcceptRefinement = () => {
    setShowChatModal(false);
  };
  
  // Main render
  return (
    <>
      <ModalOverlay $isOpen={isOpen}>
        <ModalContent>
          <CloseButton onClick={onClose}><FiX /></CloseButton>
          
          <DocumentsNav>
            <DocumentsTabs>
              {Object.entries(documents).map(([key, doc]) => (
                <DocumentTab 
                  key={key} 
                  $isActive={activeDocType === key as DocumentType}
                  onClick={() => handleSelectDocument(key as DocumentType)}
                >
                  {doc.title}
                </DocumentTab>
              ))}
            </DocumentsTabs>
          </DocumentsNav>
          
          <DocumentsList>
            {Object.entries(documents).map(([key, doc]) => (
              <DocumentItem 
                key={key}
                $isActive={activeDocType === key as DocumentType}
                $isGenerated={doc.isGenerated}
                onClick={() => handleSelectDocument(key as DocumentType)}
              >
                <DocumentIcon>{doc.icon}</DocumentIcon>
                <DocumentInfo>
                  <DocumentTitle>{doc.title}</DocumentTitle>
                  <DocumentStatus $isGenerated={doc.isGenerated}>
                    {doc.isGenerating ? (
                      <>
                        <FiLoader /> Generating...
                        <ProgressBar />
                      </>
                    ) : doc.isGenerated ? (
                      <>
                        <FiCheck /> Generated (4-hour implementation)
                      </>
                    ) : (
                      'Click to generate'
                    )}
                  </DocumentStatus>
                </DocumentInfo>
              </DocumentItem>
            ))}
          </DocumentsList>
          
          {activeDocType && documents[activeDocType].isGenerated && (
            <>
              <DocumentContent dangerouslySetInnerHTML={{ __html: markdownToHtml(documents[activeDocType].content) }} />
              
              <ActionButtonsContainer>
                <Button 
                  onClick={handleCopy} 
                  variant="outline"
                  $hasIcon={true}
                  icon={copiedToClipboard ? <FiCheck /> : <FiCopy />}
                >
                  {copiedToClipboard ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  $hasIcon={true}
                  icon={<FiDownload />}
                >
                  Download Markdown
                </Button>
                <Button 
                  onClick={handleRefineDocument}
                  variant="primary"
                  $hasIcon={true}
                  icon={<FiRefreshCw />}
                >
                  Refine with AI
                </Button>
              </ActionButtonsContainer>
            </>
          )}
          
          {activeDocType && documents[activeDocType].isGenerating && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <LoadingSpinner />
              <p>Generating {documents[activeDocType].title}...</p>
              <p>This will include a 4-hour implementation timeline</p>
            </div>
          )}
        </ModalContent>
      </ModalOverlay>
      
      {/* Refinement Input Modal */}
      {showRefinementModal && (
        <ModalOverlay $isOpen={true}>
          <RefinementModalContent>
            <CloseButton onClick={() => setShowRefinementModal(false)}><FiX /></CloseButton>
            <h2>Refine {documents[activeDocType].title}</h2>
            <p>Describe how you'd like to improve this document:</p>
            <RefinementInput 
              value={refinementInput}
              onChange={(e) => setRefinementInput(e.target.value)}
              placeholder="e.g., Add more details about the user authentication flow"
            />
            <ActionButtonsContainer>
              <Button onClick={() => setShowRefinementModal(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={submitRefinement} variant="primary" disabled={!refinementInput.trim()}>
                Submit
              </Button>
            </ActionButtonsContainer>
          </RefinementModalContent>
        </ModalOverlay>
      )}
      
      {/* Chat Modal for Refinement */}
      {showChatModal && (
        <ModalOverlay $isOpen={true}>
          <ChatContainer>
            <CloseButton onClick={() => setShowChatModal(false)}><FiX /></CloseButton>
            <h2>Refining {documents[activeDocType].title}</h2>
            
            <ChatMessagesContainer>
              {chatMessages.map((msg, index) => (
                <ChatMessage key={index} $isUser={msg.$isUser}>
                  {msg.message}
                </ChatMessage>
              ))}
              {isProcessingMessage && (
                <ChatMessage $isUser={false}>
                  <LoadingSpinner style={{ width: '20px', height: '20px' }} />
                </ChatMessage>
              )}
            </ChatMessagesContainer>
            
            <ChatInputContainer>
              <ChatInput 
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message here..."
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendChatMessage()}
              />
              <SendButton onClick={sendChatMessage} disabled={!currentMessage.trim() || isProcessingMessage}>
                <FiSend />
              </SendButton>
            </ChatInputContainer>
            
            <ActionButtonsContainer>
              <Button onClick={handleAcceptRefinement} variant="primary">
                Accept Changes & Close
              </Button>
            </ActionButtonsContainer>
          </ChatContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default DocumentGenerator; 