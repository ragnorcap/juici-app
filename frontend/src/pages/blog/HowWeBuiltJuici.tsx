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

const HowWeBuiltJuici: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/blog">
          <FiChevronLeft /> Back to Blog
        </BackLink>
        
        <Title>How We Built Juici: Leveraging Claude 3.7 and Cursor</Title>
        
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

2. Now let's set up the frontend directory structure...
`}
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
  backdrop-filter: blur(4px);
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
          
          <h2>Challenges and Solutions</h2>
          
          <h3>Challenge 1: State Management Complexity</h3>
          <p>
            As the application grew, managing state became increasingly complex. 
            We were using a combination of React context and local component state, 
            which led to inconsistencies and prop drilling.
          </p>
          
          <p>
            <strong>Solution:</strong> Claude recommended refactoring to use 
            React Query for server state management and a simpler context 
            structure for global UI state. This significantly cleaned up our 
            codebase and improved performance.
          </p>
          
          <h3>Challenge 2: Handling Authentication</h3>
          <p>
            Implementing secure authentication with proper token refresh logic 
            and route protection was proving complex.
          </p>
          
          <p>
            <strong>Solution:</strong> Claude guided us in implementing a 
            complete JWT-based authentication system, including secure HTTP-only 
            cookies, token refresh logic, and protected route components.
          </p>
          
          <CodeBlock language="typescript">
{`// Claude-generated authentication middleware
export const authMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        // Try to refresh the token
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
          return res.status(401).json({ message: 'Session expired' });
        }
        
        try {
          const decoded = jwt.verify(
            refreshToken, 
            process.env.JWT_REFRESH_SECRET as string
          ) as JwtPayload;
          
          // Generate new access token
          const user = await User.findById(decoded.userId);
          
          if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }
          
          const newAccessToken = generateAccessToken(user);
          
          // Set the new access token as a cookie
          res.cookie('accessToken', newAccessToken, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000 // 15 minutes
          });
          
          req.user = decoded;
          next();
        } catch (refreshError) {
          return res.status(401).json({ message: 'Invalid refresh token' });
        }
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};`}
          </CodeBlock>
          
          <h3>Challenge 3: Optimizing Claude API Usage</h3>
          <p>
            Generating PRDs with Claude requires careful prompt engineering to 
            get consistent, well-structured results while managing API costs.
          </p>
          
          <p>
            <strong>Solution:</strong> We built a sophisticated prompting system 
            that includes templates, system messages, and structured output 
            formatting. Claude helped us fine-tune these prompts for optimal 
            results.
          </p>
          
          <h2>Key Lessons</h2>
          
          <h3>1. AI as a Development Partner</h3>
          <p>
            The most significant insight from this project was that Claude 
            functioned less like a tool and more like a development partner. It 
            didn't just generate code snippets; it suggested architecture 
            improvements, identified potential issues before they became problems, 
            and provided valuable context for technical decisions.
          </p>
          
          <h3>2. Rapid Iteration</h3>
          <p>
            Using Claude in Cursor allowed us to iterate at an unprecedented speed. 
            What would typically take days of development time was reduced to 
            hours or even minutes. This was particularly valuable for UI components, 
            where we could quickly generate, review, and refine multiple versions.
          </p>
          
          <h3>3. Knowledge Amplification</h3>
          <p>
            Claude enabled our team to work effectively with technologies where 
            we had less expertise. When working with unfamiliar libraries or APIs, 
            Claude could fill in the knowledge gaps, explaining concepts and 
            providing implementation examples tailored to our specific needs.
          </p>
          
          <h2>Project Statistics</h2>
          <ul>
            <li><strong>Development Time:</strong> 2 weeks (estimated traditional time: 2-3 months)</li>
            <li><strong>Lines of Code:</strong> ~15,000</li>
            <li><strong>Components Created:</strong> 45+ React components</li>
            <li><strong>API Endpoints:</strong> 15+ Express routes</li>
            <li><strong>Claude Interactions:</strong> 500+ during development</li>
          </ul>
          
          <h2>Conclusion</h2>
          <p>
            Building Juici with Claude 3.7 Sonnet and Cursor fundamentally 
            changed our perspective on software development. The combination of 
            a powerful AI model with a developer-focused IDE created a 
            multiplicative effect on productivity.
          </p>
          
          <p>
            Perhaps most importantly, the quality of the resulting code was 
            excellent—well-structured, thoroughly documented, and following best 
            practices throughout. This challenges the notion that AI-assisted 
            code is somehow of lower quality than traditionally written code.
          </p>
          
          <p>
            As AI coding assistants like Claude continue to advance, we believe 
            this type of AI-augmented development will become the new standard, 
            enabling developers to focus on high-level architecture and creative 
            problem-solving while delegating implementation details to AI 
            assistants.
          </p>
          
          <p>
            Ready to see what we built? Try out <Link to="/">Juici</Link> for 
            yourself and experience the power of AI-generated product ideas and PRDs!
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default HowWeBuiltJuici; 