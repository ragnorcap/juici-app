import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fonts.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const Container = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

export const PageContainer = styled.div`
  padding: 2rem;
  min-height: calc(100vh - 60px);
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const Button = styled(Link)<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius};
  font-weight: ${props => props.theme.fonts.weights.semiBold};
  transition: ${props => props.theme.transition};
  text-decoration: none;
  cursor: pointer;
  
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background: ${props.theme.colors.blue.main};
          color: white;
          &:hover {
            background: ${props.theme.colors.blue.dark};
          }
        `;
      case 'outline':
        return `
          background: transparent;
          border: 2px solid ${props.theme.colors.purple.main};
          color: ${props.theme.colors.purple.main};
          &:hover {
            background: ${props.theme.colors.purple.main};
            color: white;
          }
        `;
      default:
        return `
          background: ${props.theme.colors.purple.main};
          color: white;
          &:hover {
            background: ${props.theme.colors.purple.dark};
          }
        `;
    }
  }}
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  gap: 2rem;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Flex = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${props => props.gap || '1rem'};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.purple.main};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.background.primary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.purple.main};
  }
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

export const LoadingSpinner = styled.div`
  border: 3px solid ${props => props.theme.colors.border};
  border-top: 3px solid ${props => props.theme.colors.purple.main};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`; 