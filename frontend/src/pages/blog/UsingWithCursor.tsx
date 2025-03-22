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

const StepImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
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

const UsingWithCursor: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/blog">
          <FiChevronLeft /> Back to Blog
        </BackLink>
        
        <Title>Using Juici with Cursor: From Idea to Code in Minutes</Title>
        
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
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="Coding on a laptop with multiple windows open"
        />
        
        <Content>
          <p>
            One of the most powerful workflows for developers today is the combination of AI-generated ideas with AI-assisted coding. In this comprehensive tutorial, we'll show you how to leverage Juici's idea generation and PRD capabilities alongside Cursor IDE to transform concepts into working code faster than ever before.
          </p>
          
          <h2>Why Combine Juici with Cursor?</h2>
          
          <p>
            Juici excels at generating creative project ideas and detailed Product Requirements Documents (PRDs), while Cursor is an AI-powered code editor that helps you implement those ideas efficiently. Together, they form a powerful end-to-end solution for developers looking to rapidly prototype and build new products.
          </p>
          
          <p>
            Here are some key benefits of this workflow:
          </p>
          
          <ul>
            <li><strong>Seamless transition from idea to implementation</strong> - Generate an idea and PRD in Juici, then use it as a reference in Cursor</li>
            <li><strong>Consistent context for the AI</strong> - The detailed PRD helps Cursor understand exactly what you're trying to build</li>
            <li><strong>Rapid prototyping</strong> - Build functional prototypes in hours instead of days</li>
            <li><strong>Improved code quality</strong> - The clear specifications in the PRD lead to more focused and efficient code</li>
          </ul>
          
          <h2>Step-by-Step Guide</h2>
          
          <h3><StepNumber>1</StepNumber>Generate Your Idea in Juici</h3>
          
          <p>
            Start by visiting the Juici homepage and using the idea generator to create a project concept that interests you. You can filter by category to target specific domains like Web Apps, Mobile Apps, or AI/ML projects.
          </p>
          
          <p>
            For this tutorial, let's imagine we generated an idea for: "A browser extension that summarizes long articles and highlights key points using AI."
          </p>
          
          <TipBox>
            <h4>Pro Tip</h4>
            <p>
              Try generating several ideas and combining elements from different ones to create something truly unique. You can save your favorite ideas to revisit them later.
            </p>
          </TipBox>
          
          <h3><StepNumber>2</StepNumber>Create a Detailed PRD</h3>
          
          <p>
            Once you have an idea you like, click the "Create PRD" button to generate a comprehensive Product Requirements Document. Juici will produce a detailed specification including:
          </p>
          
          <ul>
            <li>Product overview and objectives</li>
            <li>User personas and use cases</li>
            <li>Feature specifications</li>
            <li>Technical requirements</li>
            <li>Implementation roadmap</li>
          </ul>
          
          <p>
            Review the PRD and make note of any aspects you'd like to modify or expand upon. The more detailed your PRD, the better guidance Cursor will have for generating code.
          </p>
          
          <h3><StepNumber>3</StepNumber>Set Up Your Development Environment in Cursor</h3>
          
          <p>
            Download and install Cursor from <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer">cursor.sh</a> if you haven't already. Cursor is built on VS Code, so it will feel familiar if you've used that editor before.
          </p>
          
          <p>
            Create a new project folder and initialize it with the appropriate structure for your application. For our browser extension example, we would set up a basic web extension project structure:
          </p>
          
          <CodeBlock language="bash">
{`mkdir article-summarizer-extension
cd article-summarizer-extension
touch manifest.json
mkdir js css images`}
          </CodeBlock>
          
          <h3><StepNumber>4</StepNumber>Share Your PRD with Cursor</h3>
          
          <p>
            The most efficient way to share your Juici-generated PRD with Cursor is to copy it to your project's documentation. Create a README.md or SPEC.md file in your project root and paste the entire PRD there:
          </p>
          
          <CodeBlock language="bash">
{`touch README.md`}
          </CodeBlock>
          
          <p>
            Then paste your PRD into this file. Having the PRD in your project allows you to easily reference it and allows Cursor to understand the context of what you're building.
          </p>
          
          <h3><StepNumber>5</StepNumber>Use Cursor's AI to Scaffold Your Project</h3>
          
          <p>
            With your PRD in place, you can now use Cursor's AI capabilities to help scaffold your project. Open the command palette (Cmd+K on Mac or Ctrl+K on Windows) and start describing what you want to build based on the PRD.
          </p>
          
          <p>
            For example, you might say: "Based on the PRD in README.md, create a manifest.json file for our Chrome extension that summarizes articles."
          </p>
          
          <TipBox>
            <h4>Pro Tip</h4>
            <p>
              When working with Cursor, be as specific as possible in your prompts. Reference sections of the PRD directly for more targeted code generation.
            </p>
          </TipBox>
          
          <h3><StepNumber>6</StepNumber>Iterate and Refine</h3>
          
          <p>
            Continue using Cursor to implement the features specified in your PRD. You can ask Cursor to:
          </p>
          
          <ul>
            <li>Generate boilerplate code for specific features</li>
            <li>Debug issues as they arise</li>
            <li>Optimize performance</li>
            <li>Add comments and documentation</li>
          </ul>
          
          <p>
            The key to success is an iterative approach - implement a feature, test it, refine it, and move on to the next one. Cursor's AI is particularly good at helping you refactor code as your project evolves.
          </p>
          
          <h2>Advanced Techniques</h2>
          
          <h3>Using Cursor with Juici-generated Technical Specifications</h3>
          
          <p>
            For more complex projects, you can ask Juici to generate detailed technical specifications in addition to the PRD. These might include:
          </p>
          
          <ul>
            <li>Database schemas</li>
            <li>API endpoint definitions</li>
            <li>Component architecture</li>
            <li>State management patterns</li>
          </ul>
          
          <p>
            Copy these specifications into separate markdown files in your project and reference them when asking Cursor to generate related code.
          </p>
          
          <h3>Handling Edge Cases and Error Scenarios</h3>
          
          <p>
            Good PRDs include information about error handling and edge cases. Make sure to specifically ask Cursor to implement these scenarios based on the PRD specifications. For example:
          </p>
          
          <CodeBlock language="plaintext">
{`"As specified in the PRD's Error Handling section, implement error handling for the article parsing function when it encounters paywalled content."`}
          </CodeBlock>
          
          <h2>Conclusion</h2>
          
          <p>
            The combination of Juici for idea generation and PRD creation with Cursor for AI-assisted implementation creates a powerful workflow that dramatically reduces the time from concept to working code. This approach is particularly valuable for:
          </p>
          
          <ul>
            <li>Solo developers building MVPs</li>
            <li>Startup teams validating ideas quickly</li>
            <li>Hackathon participants working under tight deadlines</li>
            <li>Developers learning new technologies through practical projects</li>
          </ul>
          
          <p>
            We'd love to hear about what you build using this workflow! Share your projects with us on Twitter or in our community Discord.
          </p>
          
          <TipBox>
            <h4>Final Tip</h4>
            <p>
              Remember that AI tools like Juici and Cursor are collaborative partners in the development process. The best results come when you combine their capabilities with your own creativity, critical thinking, and domain expertise.
            </p>
          </TipBox>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default UsingWithCursor; 