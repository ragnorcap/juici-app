import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FiClipboard, FiCheck } from 'react-icons/fi';

interface CodeBlockProps {
  children: string;
  language?: string;
}

const CodeBlockContainer = styled.div`
  position: relative;
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Fira Code', monospace;
`;

const CodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1E1E1E;
  color: #ccc;
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #333;
`;

const Language = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  color: #ADFF2F;
`;

const CopyButton = styled.button`
  background: transparent;
  border: none;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 0 !important;
  padding: 1.5rem !important;
  border-radius: 0 !important;
  font-size: 0.9rem !important;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #1E1E1E;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

const CodeBlock: React.FC<CodeBlockProps> = ({ children, language = 'javascript' }) => {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <CodeBlockContainer>
      <CodeHeader>
        <Language>{language}</Language>
        <CopyButton onClick={handleCopy}>
          {copied ? (
            <>
              <FiCheck /> Copied!
            </>
          ) : (
            <>
              <FiClipboard /> Copy code
            </>
          )}
        </CopyButton>
      </CodeHeader>
      <StyledSyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        wrapLines
        showLineNumbers
      >
        {children}
      </StyledSyntaxHighlighter>
    </CodeBlockContainer>
  );
};

export default CodeBlock; 