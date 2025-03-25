import React from 'react';
import styled from 'styled-components';
import AuthForms from '../components/AuthForms';
import { PageTitle } from '../styles/shared';

const SignInContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.colors.background.primary};
`;

const SignInPage: React.FC = () => {
  return (
    <SignInContainer>
      <PageTitle>Sign In to Juici</PageTitle>
      <AuthForms initialMode="signin" />
    </SignInContainer>
  );
};

export default SignInPage; 