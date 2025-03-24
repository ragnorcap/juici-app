import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import IdeaGenerator from '../components/IdeaGenerator';
import Layout from '../components/Layout';

const PageContainer = styled.div`
  padding: 2rem 0;
`;

const IdeaGeneratorPage: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <IdeaGenerator />
      </PageContainer>
    </Layout>
  );
};

export default IdeaGeneratorPage; 