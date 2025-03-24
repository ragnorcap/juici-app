import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-size: 2rem;
  color: #111;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`; 