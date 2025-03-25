import React from 'react';
import styled from 'styled-components';
import AuthForms from '../components/AuthForms';
import { PageTitle } from '../styles/shared';

const SignUpContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.colors.background.primary};
`;

const SignUpPage: React.FC = () => {
  return (
    <SignUpContainer>
      <PageTitle>Create Your Juici Account</PageTitle>
      <AuthForms initialMode="signup" />
    </SignUpContainer>
  );
};

export default SignUpPage; 