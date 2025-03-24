import React, { useState } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { FiZap } from 'react-icons/fi';
import IdeaGenerator from '../components/IdeaGenerator';
import PRDModal from '../components/PRDModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IdeaProvider } from '../contexts/IdeaContext';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(128, 0, 128, 0.1), rgba(128, 0, 128, 0.3));
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 30%, rgba(128, 0, 128, 0.4) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
  }
`;

const AppTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: white;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const IdeaGeneratorWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  background: rgba(30, 30, 40, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(128, 0, 128, 0.3);
`;

const AppPage: React.FC = () => {
  const [showPRDModal, setShowPRDModal] = useState(false);
  const [prdContent, setPRDContent] = useState('');
  
  const handleOpenPRDModal = (content: string) => {
    setPRDContent(content);
    setShowPRDModal(true);
  };
  
  const handleClosePRDModal = () => {
    setShowPRDModal(false);
  };
  
  return (
    <IdeaProvider>
      <PageContainer>
        <Header />
        <MainContent>
          <AppTitle>
            <FiZap style={{ marginRight: '0.5rem' }} />
            Idea Generator
          </AppTitle>
          <IdeaGeneratorWrapper>
            <IdeaGenerator onOpenPRDModal={handleOpenPRDModal} />
          </IdeaGeneratorWrapper>
          
          {showPRDModal && (
            <PRDModal 
              isOpen={showPRDModal}
              onClose={handleClosePRDModal}
              prdContent={prdContent}
            />
          )}
        </MainContent>
        <Footer />
      </PageContainer>
    </IdeaProvider>
  );
};

export default AppPage; 