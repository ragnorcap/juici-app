import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { FiAlertTriangle } from 'react-icons/fi';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 1rem;
  min-height: 60vh;
`;

const ErrorIcon = styled.div`
  font-size: 5rem;
  color: #ADFF2F;
  margin-bottom: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 1rem;
  
  background: linear-gradient(135deg, #ADFF2F, #90EE90);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const ErrorTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <ErrorIcon>
          <FiAlertTriangle />
        </ErrorIcon>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Page Not Found</ErrorTitle>
        <ErrorMessage>
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </ErrorMessage>
        <ButtonGroup>
          <Button 
            variant="primary" 
            size="large" 
            as={Link} 
            to="/"
          >
            Go to Homepage
          </Button>
          <Button 
            variant="outline" 
            size="large" 
            as={Link} 
            to="/idea-generator"
          >
            Try Idea Generator
          </Button>
        </ButtonGroup>
      </PageContainer>
    </Layout>
  );
};

export default NotFoundPage; 