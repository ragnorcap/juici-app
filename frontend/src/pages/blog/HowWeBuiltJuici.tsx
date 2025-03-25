import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../../styles/shared';
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

const InsightBox = styled.div`
  background: rgba(255, 215, 0, 0.1);
  border-left: 4px solid ${props => props.theme.colors.yellow.main};
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  
  h4 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: ${props => props.theme.colors.yellow.main};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

interface ModalOverlayProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => (props.$isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const HowWeBuiltJuici: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/blog">
          <FiChevronLeft /> Back to Blog
        </BackLink>
        
        <PageTitle>How We Built Juici: Leveraging Claude 3.7 and Cursor</PageTitle>
        
        <PostMeta>
          <MetaItem>
            <FiCalendar />
            Mar 20, 2025
          </MetaItem>
          <MetaItem>
            <FiUser />
            Juici Team
          </MetaItem>
          <MetaItem>
            <CategoryTag>Case Study</CategoryTag>
          </MetaItem>
        </PostMeta>
        
        <FeaturedImage 
          src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="Developer working with AI" 
        />
        
        <Content>
          <p>
            Building modern web applications typically requires a significant 
            investment of time and resources. But what if there was a way to 
            dramatically accelerate the development process while maintaining—or 
            even improving—code quality? This is the story of how we built Juici, 
            a full-stack application for generating and managing product ideas 
            and requirements, using Anthropic's Claude 3.7 Sonnet and Cursor IDE.
          </p>
          
          <h2>Project Overview</h2>
          <p>
            Juici is a web application designed to help developers and product 
            managers generate project ideas and detailed Product Requirements 
            Documents (PRDs). The app includes:
          </p>
          
          <ul>
            <li>A React frontend with styled-components for a modern UI</li>
            <li>A Node.js/Express backend with TypeScript</li>
            <li>Integration with Claude AI for idea and PRD generation</li>
            <li>User authentication and favorites functionality</li>
            <li>Dashboard for managing saved ideas and PRDs</li>
          </ul>
          
          <p>
            What makes this project unique is that we leveraged AI not just as a 
            feature of the product, but as an integral part of our development 
            process.
          </p>
          
          <h2>The Development Approach</h2>
          <p>
            Instead of following the traditional development cycle, we adopted 
            an AI-augmented approach using Claude 3.7 Sonnet in the Cursor IDE. 
            Here's how our process worked:
          </p>
          
          <h3>1. Architecture Planning with Claude</h3>
          <p>
            We started by having Claude suggest an appropriate architecture for 
            our application based on our requirements. Instead of spending days 
            researching different tech stacks and architecture patterns, we 
            asked Claude to recommend options and explain the pros and cons of 
            each approach.
          </p>
          
          <CodeBlock language="text">
{`User: I want to build a web app that helps users generate product ideas and create detailed PRDs using Claude. What architecture would you recommend?

Claude: For a web app that leverages Claude to generate product ideas and PRDs, I'd recommend:

Frontend:
- React (with TypeScript) for a responsive SPA
- Styled-components for styling
- React Router for navigation
- React Query for state management and API calls

Backend:
- Node.js with Express and TypeScript
- JWT for authentication
- RESTful API structure
- Claude API integration via Node SDK

Database:
- MongoDB for flexible document storage of ideas and PRDs
- Redis for caching frequent requests

Architecture:
- Clear separation between frontend and backend
- API middleware for authentication and rate limiting
- Dedicated service layer for Claude API interactions

This gives you a modern, scalable stack with type safety and good developer experience.`}
          </CodeBlock>
          
          <InsightBox>
            <h4>Key Insight</h4>
            <p>
              Having Claude recommend an architecture saved us considerable time 
              in the planning phase. The AI was able to consider our specific 
              requirements and suggest a stack that would support them effectively, 
              complete with justifications for each technology choice.
            </p>
          </InsightBox>
          
          <h3>2. Project Scaffolding</h3>
          <p>
            With our architecture decided, we used Cursor's AI capabilities to 
            scaffold the project structure. Instead of manually creating directories 
            and config files, we described what we needed, and Cursor generated 
            the boilerplate code.
          </p>
          
          <CodeBlock language="text">
{`User: Can you help me set up the project structure for a full-stack app with React frontend and Express backend?

Cursor: I'll create a monorepo structure for your full-stack app. Let me set up the directories and essential files:

1. First, let's create package.json in the root:
\`\`\`json
{
  "name": "juici",
  "version": "1.0.0",
  "description": "App for generating product ideas and PRDs using Claude",
  "scripts": {
    "dev": "concurrently \\"npm run dev:backend\\" \\"npm run dev:frontend\\"",
    "dev:frontend": "cd frontend && npm run start",
    "dev:backend": "cd backend && npm run dev",
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install"
  },
  "dependencies": {
    "concurrently": "^7.6.0"
  }
}
\`\`\`

2. Now let's set up the frontend directory structure...`}
          </CodeBlock>
          
          <p>
            This approach allowed us to have a fully configured project structure 
            in minutes rather than hours, complete with properly configured build 
            tools, linting rules, and development scripts.
          </p>
          
          <h3>3. Iterative Component Development</h3>
          <p>
            For the frontend, we adopted an iterative approach where we would:
          </p>
          
          <ol>
            <li>Describe a component we needed</li>
            <li>Have Claude generate the initial implementation</li>
            <li>Review and refine the code</li>
            <li>Integrate it into the application</li>
          </ol>
          
          <p>
            This significantly accelerated our development process. For example, 
            when we needed a modal component for displaying PRDs, we simply 
            described what we wanted:
          </p>
          
          <CodeBlock language="text">
{`User: I need a modal component for displaying PRDs. It should have a title, content section that can render markdown, and buttons to save or close the modal.

Claude: I'll create a PRDModal component using styled-components with the features you requested. Here's the implementation:

\`\`\`tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import ReactMarkdown from 'react-markdown';
import { FiX, FiSave, FiDownload } from 'react-icons/fi';

interface PRDModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  content: string;
  onDownload?: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>\`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: \${props => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
\`;

// ...rest of the component
\`\`\``}
          </CodeBlock>
          
          <p>
            Claude not only generated the code but also incorporated best practices 
            like keyboard accessibility, overflow handling, and responsive design 
            without us having to explicitly ask for these features.
          </p>
          
          <h3>4. Backend API Development</h3>
          <p>
            For the backend, we used a similar approach. We described the API 
            endpoints we needed, and Claude generated the route handlers, 
            middleware, and service functions. This included complex logic for 
            integrating with Claude's API for idea generation:
          </p>
          
          <CodeBlock language="typescript">
{`// Claude-generated code for the idea generation endpoint
export const generateIdeas = async (req: Request, res: Response) => {
  try {
    const { prompt, count = 5 } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const systemPrompt = \`You are a creative idea generator for software projects.
Generate \${count} unique and innovative product ideas based on the following description.
Format the response as a JSON array of objects with 'title' and 'description' fields.
Make each idea specific, actionable, and technically feasible.\`;

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: prompt }]
    });
    
    // Parse the JSON from the response text
    const ideasText = response.content[0].text;
    const ideas = JSON.parse(ideasText);
    
    return res.json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    return res.status(500).json({ error: 'Failed to generate ideas' });
  }
};`}
          </CodeBlock>
          
          <InsightBox>
            <h4>Key Insight</h4>
            <p>
              Claude excelled at generating functional API endpoints that followed 
              best practices like error handling, input validation, and clean 
              separation of concerns. The code required minimal adjustments to 
              work in our production environment.
            </p>
          </InsightBox>
          
          <h3>5. Debugging and Testing</h3>
          <p>
            One of the most impressive aspects of using Claude 3.7 in Cursor was 
            its ability to help debug issues. When we encountered errors, we 
            could simply share the error message and relevant code, and Claude 
            would:
          </p>
          
          <ul>
            <li>Identify the root cause of the issue</li>
            <li>Explain why it was happening</li>
            <li>Suggest specific fixes</li>
            <li>Help implement and test the solution</li>
          </ul>
          
          <p>
            For example, when we faced an issue with our favorites functionality, 
            Claude quickly pinpointed the problem and provided a solution:
          </p>
          
          <CodeBlock language="text">
{`User: I'm getting a 404 error when trying to save a favorite. Here's the React component and the API code.

Claude: Looking at your code, I can see the issue. There's a mismatch between your API routes and how you're calling them in the frontend:

In your API call, you're using:
\`\`\`javascript
await axios.post('/api/favorites', { idea });
\`\`\`

But your backend route is defined as:
\`\`\`javascript
router.post('/favorites/add', favoritesController.addFavorite);
\`\`\`

You need to either:

1. Change your frontend API call to:
\`\`\`javascript
await axios.post('/api/favorites/add', { idea });
\`\`\`

OR

2. Update your backend route to:
\`\`\`javascript
router.post('/favorites', favoritesController.addFavorite);
\`\`\`

I recommend option 2 since it follows REST conventions better.`}
          </CodeBlock>
          
          <h2>Conclusion</h2>
          <p>
            Building Juici with Claude and Cursor dramatically accelerated our development 
            process while maintaining high code quality. The AI-assisted approach allowed 
            us to focus on creative problem-solving rather than implementation details.
          </p>
          
          <p>
            We believe this represents the future of software development, where AI serves 
            as an intelligent collaborator that enhances developer productivity and creativity.
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default HowWeBuiltJuici;