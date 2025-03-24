import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiUser, FiTag, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/CodeBlock';

// Styled components
const PageContainer = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url('/images/tutorials/cursor-integration.jpg');
  background-size: cover;
  background-position: center;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.yellow.main};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.yellow.light};
  }
`;

const ArticleHeader = styled.header`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Content = styled.article`
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.6;

  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    color: ${props => props.theme.colors.text.primary};
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const UsingWithCursor: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/tutorials">
          <FiChevronLeft /> Back to Tutorials
        </BackLink>

        <HeroImage />

        <ArticleHeader>
          <Title>Using Juici with Cursor IDE</Title>
          <MetaInfo>
            <MetaItem>
              <FiCalendar /> Mar 20, 2025
            </MetaItem>
            <MetaItem>
              <FiUser /> Juici Team
            </MetaItem>
            <MetaItem>
              <FiTag /> Tutorial
            </MetaItem>
          </MetaInfo>
        </ArticleHeader>

        <Content>
          <p>
            Learn how to integrate Juici with Cursor IDE for a seamless development experience.
            This tutorial will guide you through the setup process and show you how to use
            Juici's features effectively within Cursor.
          </p>

          <h2>Getting Started</h2>
          <p>
            To use Juici with Cursor IDE, you'll need to:
          </p>
          <ol>
            <li>Install Cursor IDE from the official website</li>
            <li>Sign up for a Juici account</li>
            <li>Configure the Juici extension in Cursor</li>
          </ol>

          <h2>Configuration</h2>
          <p>
            Once you have both tools installed, you'll need to configure the integration:
          </p>
          <CodeBlock>
            {`// In your Cursor settings.json
{
  "juici.apiKey": "your_api_key_here",
  "juici.projectId": "your_project_id"
}`}
          </CodeBlock>

          <h2>Using Juici Features</h2>
          <p>
            With the integration set up, you can now use Juici's features directly in Cursor:
          </p>
          <ul>
            <li>Generate code snippets with AI assistance</li>
            <li>Get real-time suggestions for improvements</li>
            <li>Access your saved favorites directly in the editor</li>
            <li>Generate documentation automatically</li>
          </ul>

          <h2>Best Practices</h2>
          <p>
            To get the most out of Juici in Cursor:
          </p>
          <ul>
            <li>Keep your API key secure and never commit it to version control</li>
            <li>Use the keyboard shortcuts for quick access to features</li>
            <li>Regularly update both Cursor and the Juici extension</li>
            <li>Check the documentation for new features and improvements</li>
          </ul>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default UsingWithCursor; 