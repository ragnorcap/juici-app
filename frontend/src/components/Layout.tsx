import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import Header from './Header';
import Footer from './Footer';
import LiquidBackground from './LiquidBackground';
import ServerStatus from './ServerStatus';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: #000;
  color: white;
`;

const Main = styled.main`
  flex: 1;
  padding: 80px 0 0; /* Account for fixed header */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1248px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  max-width: 300px;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <LiquidBackground />
      <Header />
      <Main>{children}</Main>
      <Footer />
      <StatusContainer>
        <ServerStatus />
      </StatusContainer>
    </LayoutContainer>
  );
};

export default Layout; 