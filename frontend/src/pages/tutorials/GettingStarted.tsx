import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiUser, FiArrowRight, FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import CodeBlock from '../../components/CodeBlock';

// Styled components
const PageContainer = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.yellow.main};
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  
  &:hover {
    color: ${props => props.theme.colors.yellow.light};
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.green.light};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryTag = styled.span`
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  background: rgba(173, 255, 47, 0.15);
  color: #ADFF2F;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ddd;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 2.5rem 0 1rem;
    color: ${props => props.theme.colors.green.light};
  }
  
  h3 {
    font-size: 1.4rem;
    margin: 2rem 0 1rem;
    color: ${props => props.theme.colors.yellow.main};
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.75rem;
    }
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.yellow.main};
    padding-left: 1rem;
    margin-left: 0;
    margin-bottom: 1.5rem;
    font-style: italic;
    color: #bbb;
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 1.5rem 0;
  }
`;

const StepNumber = styled.div`
  display: inline-block;
  background: ${props => props.theme.colors.yellow.main};
  color: #000;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  text-align: center;
  line-height: 2rem;
  font-weight: bold;
  margin-right: 0.75rem;
`;

const TipBox = styled.div`
  background: rgba(173, 255, 47, 0.1);
  border-left: 4px solid ${props => props.theme.colors.green.light};
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  
  h4 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: ${props => props.theme.colors.green.light};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const GettingStarted: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/tutorials">
          <FiChevronLeft /> Back to Tutorials
        </BackLink>
        
        <Title>Getting Started with Juici</Title>
        
        <PostMeta>
          <MetaItem>
            <FiCalendar />
            Mar 20, 2025
          </MetaItem>
          <MetaItem>
            <FiUser />
            Juici Team
          </MetaItem>
          <CategoryTag>Tutorial</CategoryTag>
        </PostMeta>
        
        <FeaturedImage 
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="Person starting a new project"
        />
        
        <Content>
          <p>
            Welcome to Juici! This getting started guide will walk you through the basic features of our platform and help you understand how to use our AI-powered idea generator to kickstart your next project.
          </p>
          
          <h2>What is Juici?</h2>
          
          <p>
            Juici is an AI-powered idea generator designed to help developers, designers, product managers, and creators overcome creative blocks. It provides fresh, innovative project ideas at the click of a button and can even create detailed Product Requirements Documents (PRDs) to help you turn those ideas into reality.
          </p>
          
          <p>
            Named after the concept of "getting your creative juices flowing," Juici aims to be the starting point of your creative process, helping you kickstart projects when you're feeling stuck or uninspired.
          </p>
          
          <h2>Your First Steps with Juici</h2>
          
          <h3><StepNumber>1</StepNumber>Generating Your First Idea</h3>
          
          <p>
            To generate your first idea, simply visit the Juici homepage. You'll see the idea generator front and center. Click the "Generate Idea" button to get your first project suggestion.
          </p>
          
          <p>
            Each generated idea includes:
          </p>
          
          <ul>
            <li>A concise project concept</li>
            <li>Potential categories or tags</li>
            <li>A difficulty rating</li>
          </ul>
          
          <p>
            If the first idea doesn't resonate with you, simply click "Generate Again" to get a new suggestion. You can keep generating ideas until you find one that sparks your interest.
          </p>
          
          <TipBox>
            <h4>Pro Tip</h4>
            <p>
              Don't dismiss ideas too quickly! Sometimes the most interesting projects come from concepts that didn't immediately appeal to you. Try to envision how you might put your own unique spin on each idea.
            </p>
          </TipBox>
          
          <h3><StepNumber>2</StepNumber>Saving Favorite Ideas</h3>
          
          <p>
            When you find an idea you like, you can save it to your favorites by clicking the "Save to Favorites" button. This allows you to build a collection of interesting project concepts to revisit later.
          </p>
          
          <p>
            To save ideas, you'll need to:
          </p>
          
          <ol>
            <li>Create a Juici account or log in if you already have one</li>
            <li>Generate an idea you'd like to save</li>
            <li>Click the "Save to Favorites" button (heart icon)</li>
          </ol>
          
          <p>
            You can view all your saved ideas by navigating to the "Favorites" page from the main navigation menu.
          </p>
          
          <h3><StepNumber>3</StepNumber>Creating a PRD</h3>
          
          <p>
            One of Juici's most powerful features is its ability to generate detailed Product Requirements Documents (PRDs) from your ideas. A PRD is a comprehensive specification that outlines what your project is, who it's for, and how it should work.
          </p>
          
          <p>
            To create a PRD:
          </p>
          
          <ol>
            <li>Generate or select a project idea</li>
            <li>Click the "Create PRD" button</li>
            <li>Wait a few moments while our AI creates your document</li>
          </ol>
          
          <p>
            The generated PRD includes sections like:
          </p>
          
          <ul>
            <li><strong>Product Overview</strong> - A high-level description of the product</li>
            <li><strong>Target Users</strong> - Who the product is designed for</li>
            <li><strong>User Stories</strong> - Specific scenarios describing how users interact with the product</li>
            <li><strong>Feature Requirements</strong> - Detailed specifications of the product's functionality</li>
            <li><strong>Technical Requirements</strong> - Technologies and infrastructure needed</li>
            <li><strong>Implementation Plan</strong> - Suggested steps for building the product</li>
          </ul>
          
          <TipBox>
            <h4>Using Your PRD</h4>
            <p>
              PRDs are not set in stone - they're starting points. Feel free to modify, expand, or pivot from the generated document as your project evolves. You can copy the PRD to your clipboard or download it as a markdown file.
            </p>
          </TipBox>
          
          <h2>Understanding Your Dashboard</h2>
          
          <p>
            After creating an account, you'll have access to your personalized dashboard. Here, you can:
          </p>
          
          <ul>
            <li>View your recently generated ideas</li>
            <li>Access your saved favorites</li>
            <li>Review PRDs you've created</li>
            <li>Track your usage statistics</li>
          </ul>
          
          <p>
            The dashboard provides a centralized place to manage all your creative projects, making it easy to pick up where you left off.
          </p>
          
          <h2>Juici Account Benefits</h2>
          
          <p>
            While Juici offers basic idea generation without an account, creating a free account provides several benefits:
          </p>
          
          <ul>
            <li>Save and organize favorite ideas</li>
            <li>Generate and store PRDs</li>
            <li>Access your ideas across devices</li>
            <li>Track your creative history</li>
            <li>Receive personalized idea suggestions based on your interests</li>
          </ul>
          
          <p>
            To create an account, click the "Sign Up" button in the top-right corner of the page and follow the simple registration process.
          </p>
          
          <h2>Next Steps</h2>
          
          <p>
            Now that you understand the basics of Juici, you're ready to dive deeper! Here are some suggested next steps:
          </p>
          
          <ul>
            <li>Explore our <Link to="/tutorials/creating-prds">Creating Professional PRDs</Link> tutorial to learn how to get the most out of our PRD generator</li>
            <li>Check out <Link to="/tutorials/using-with-cursor">Using Juici with Cursor</Link> to see how to combine Juici with AI-powered coding tools</li>
            <li>Visit our <Link to="/blog">Blog</Link> for inspiration and case studies</li>
          </ul>
          
          <p>
            Remember, Juici is designed to be the starting point of your creative journey. The real magic happens when you take these generated ideas and bring them to life with your skills and expertise.
          </p>
          
          <p>
            Happy creating!
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default GettingStarted; 