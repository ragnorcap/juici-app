import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styles/shared';
import { FiCalendar, FiUser, FiChevronLeft } from 'react-icons/fi';
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

const NoticeBox = styled.div`
  background: rgba(138, 79, 255, 0.1);
  border-left: 4px solid ${props => props.theme.colors.purple.main};
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  
  h4 {
    margin-top: 0;
    margin-bottom: 0.75rem;
    color: ${props => props.theme.colors.purple.main};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const APIIntegration: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/tutorials">
          <FiChevronLeft /> Back to Tutorials
        </BackLink>
        
        <PageTitle>Integrating External APIs with Juici</PageTitle>
        
        <PostMeta>
          <MetaItem>
            <FiCalendar />
            Mar 20, 2025
          </MetaItem>
          <MetaItem>
            <FiUser />
            Juici Team
          </MetaItem>
          <CategoryTag>Advanced</CategoryTag>
        </PostMeta>
        
        <FeaturedImage 
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="API and data connections concept"
        />
        
        <Content>
          <p>
            One of Juici's most powerful features is its ability to integrate with external APIs, allowing you to enrich your idea generation and PRD creation with real-world data and services. In this tutorial, we'll walk through the process of integrating various APIs with Juici to enhance your product development workflow.
          </p>
          
          <h2>Understanding API Integration Basics</h2>
          
          <p>
            Before diving into specific integrations, let's review some fundamental concepts about APIs and how they work with Juici.
          </p>
          
          <h3>What is an API?</h3>
          
          <p>
            An API (Application Programming Interface) allows different software applications to communicate with each other. By integrating external APIs, you can leverage existing services and data sources without having to build everything from scratch.
          </p>
          
          <p>
            In the context of Juici, API integrations can:
          </p>
          
          <ul>
            <li>Provide real-time data for market research</li>
            <li>Automate the distribution of your PRDs</li>
            <li>Connect idea generation with project management tools</li>
            <li>Enhance your PRDs with additional context and information</li>
          </ul>
          
          <h3>Types of APIs You Can Integrate</h3>
          
          <p>
            Juici supports integration with several types of APIs:
          </p>
          
          <ul>
            <li><strong>RESTful APIs</strong> - The most common type, using standard HTTP methods</li>
            <li><strong>GraphQL APIs</strong> - For more flexible and efficient data retrieval</li>
            <li><strong>Authentication APIs</strong> - For user management and access control</li>
            <li><strong>Service APIs</strong> - For specific functionality like email, payment processing, etc.</li>
          </ul>
          
          <h2>Setting Up Your First API Integration</h2>
          
          <p>
            Let's walk through setting up an integration with a popular project management tool. This will allow you to automatically create tasks from your PRDs.
          </p>
          
          <h3>Step 1: Generate an API Key</h3>
          
          <p>
            Most APIs require authentication. For this example, we'll obtain an API key from our project management tool:
          </p>
          
          <ol>
            <li>Log in to your project management account</li>
            <li>Navigate to Account Settings or Developer Settings</li>
            <li>Look for API Keys or Developer API section</li>
            <li>Create a new API key with appropriate permissions (read/write)</li>
            <li>Copy the API key to a secure location</li>
          </ol>
          
          <NoticeBox>
            <h4>IMPORTANT</h4>
            <p>
              Never share your API keys or commit them to version control systems. Use environment variables or secure key management systems to store your keys safely.
            </p>
          </NoticeBox>
          
          <h3>Step 2: Configure the Integration in Juici</h3>
          
          <p>
            Now, let's configure Juici to use this API key:
          </p>
          
          <ol>
            <li>Log in to your Juici account</li>
            <li>Navigate to Account Settings {'>'} Integrations</li>
            <li>Select "Project Management Tools" from the integration categories</li>
            <li>Choose your specific tool (e.g., Jira, Asana, Trello)</li>
            <li>Enter your API key and other required credentials</li>
            <li>Click "Test Connection" to verify everything works</li>
            <li>Save your configuration</li>
          </ol>
          
          <p>
            Juici will securely store your connection information for future use.
          </p>
          
          <h3>Step 3: Mapping PRD Sections to Tasks</h3>
          
          <p>
            To effectively convert your PRD into actionable tasks, you need to configure the mapping:
          </p>
          
          <ol>
            <li>In the integration settings, go to "Field Mapping"</li>
            <li>Define how PRD sections should map to fields in your project management tool</li>
            <li>For example:
              <ul>
                <li>Features → Epics or User Stories</li>
                <li>Technical Requirements → Tasks</li>
                <li>Acceptance Criteria → Task Description or Checklist Items</li>
              </ul>
            </li>
            <li>Set default values for required fields (priority, assignee, etc.)</li>
          </ol>
          
          <CodeBlock language="javascript">
{`// Example mapping configuration (internal format)
const fieldMapping = {
  "prd.features": {
    targetField: "epic.summary",
    transform: (value) => \`Implement: \${value.title}\`
  },
  "prd.features.details": {
    targetField: "epic.description"
  },
  "prd.technicalRequirements": {
    targetField: "task.summary",
    transform: (value) => value.split('\\n').map(req => req.trim()),
    forEach: true  // Create a separate task for each requirement
  }
};`}
          </CodeBlock>
          
          <h3>Step 4: Testing Your Integration</h3>
          
          <p>
            Before using your integration in a real project, test it with a sample PRD:
          </p>
          
          <ol>
            <li>Create a new test PRD or use an existing one</li>
            <li>Click the "Export to [Tool Name]" button in the PRD actions menu</li>
            <li>Review the preview of the tasks that will be created</li>
            <li>Confirm and execute the export</li>
            <li>Verify in your project management tool that the tasks were created correctly</li>
          </ol>
          
          <TipBox>
            <h4>PRO TIP</h4>
            <p>
              Test your integration in a sandbox project first to avoid cluttering your actual project workspace with test data.
            </p>
          </TipBox>
          
          <h2>Common API Integrations with Juici</h2>
          
          <p>
            Now that you understand the basics, let's look at some specific API integrations that can supercharge your Juici workflow.
          </p>
          
          <h3>Project Management Integrations</h3>
          
          <p>
            Beyond the basic setup we just covered, you can do more with project management tool integrations:
          </p>
          
          <h4>Jira Integration</h4>
          
          <p>
            The Jira integration supports:
          </p>
          
          <ul>
            <li>Creating epics, stories, tasks, and subtasks from PRD sections</li>
            <li>Two-way synchronization of comments and updates</li>
            <li>Attaching PRD documents to Jira issues</li>
            <li>Using Jira workflows to track PRD implementation status</li>
          </ul>
          
          <CodeBlock language="typescript">
{`// Example: Using the Juici API to create Jira tasks from a PRD
async function exportPRDToJira(prdId: string, projectKey: string) {
  try {
    const response = await juiciClient.post('/api/integrations/jira/export', {
      prdId,
      projectKey,
      options: {
        createEpic: true,
        linkToExistingEpic: false,
        assignTo: 'unassigned',
        defaultPriority: 'Medium'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to export PRD to Jira:', error);
    throw error;
  }
}`}
          </CodeBlock>
          
          <h4>Trello Integration</h4>
          
          <p>
            The Trello integration offers:
          </p>
          
          <ul>
            <li>Creating boards for PRD projects</li>
            <li>Converting features into cards organized across lists</li>
            <li>Adding checklists for requirements and acceptance criteria</li>
            <li>Attaching PRD documents to cards</li>
          </ul>
          
          <h3>Version Control Integrations</h3>
          
          <p>
            Connect Juici to your code repositories for seamless development handoffs:
          </p>
          
          <h4>GitHub Integration</h4>
          
          <p>
            With GitHub integration, you can:
          </p>
          
          <ul>
            <li>Initialize repositories based on PRD specifications</li>
            <li>Create issues and project boards from PRD content</li>
            <li>Link commits back to specific PRD sections</li>
            <li>Track implementation progress against PRD requirements</li>
          </ul>
          
          <CodeBlock language="typescript">
{`// Example: Initializing a GitHub repository from a PRD
async function initRepoFromPRD(prdId: string, options: RepoOptions) {
  try {
    const response = await juiciClient.post('/api/integrations/github/init-repo', {
      prdId,
      repoName: options.repoName,
      description: options.description,
      isPrivate: options.isPrivate,
      includeTechStack: options.includeTechStack,
      createInitialFiles: options.createInitialFiles
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to initialize repository:', error);
    throw error;
  }
}`}
          </CodeBlock>
          
          <h3>Communication Tool Integrations</h3>
          
          <p>
            Share your ideas and PRDs directly with your team:
          </p>
          
          <h4>Slack Integration</h4>
          
          <p>
            The Slack integration enables:
          </p>
          
          <ul>
            <li>Sharing generated ideas to specific channels</li>
            <li>Sending PRD notifications when updates occur</li>
            <li>Creating discussion threads for PRD feedback</li>
            <li>Running idea generation sessions directly from Slack</li>
          </ul>
          
          <h3>Data Source Integrations</h3>
          
          <p>
            Enhance your PRDs with real data:
          </p>
          
          <h4>Market Research APIs</h4>
          
          <p>
            Connect to market research sources to:
          </p>
          
          <ul>
            <li>Pull industry trends and statistics into your PRDs</li>
            <li>Include competitor analysis data</li>
            <li>Add market size and growth projections</li>
          </ul>
          
          <h2>Building Custom API Integrations</h2>
          
          <p>
            If Juici doesn't offer a pre-built integration for your specific needs, you can build your own using our API.
          </p>
          
          <h3>Understanding the Juici API</h3>
          
          <p>
            Juici provides a comprehensive API that allows you to:
          </p>
          
          <ul>
            <li>Generate ideas programmatically</li>
            <li>Create, read, update, and delete PRDs</li>
            <li>Manage favorites and collections</li>
            <li>Access user data (with appropriate permissions)</li>
          </ul>
          
          <p>
            To access the Juici API, you'll need to:
          </p>
          
          <ol>
            <li>Generate an API key from your account settings</li>
            <li>Use the API key in your requests to authenticate</li>
            <li>Follow our API documentation for endpoint details</li>
          </ol>
          
          <h3>Example: Building a Custom Export Integration</h3>
          
          <p>
            Let's say you want to automatically export your PRDs to a custom internal system. Here's how you might approach it:
          </p>
          
          <CodeBlock language="typescript">
{`// Example: Custom PRD export integration
async function exportPRDToCustomSystem(prdId: string) {
  try {
    // Step 1: Fetch the PRD data from Juici
    const prdResponse = await fetch(\`https://api.juici.space/api/prds/\${prdId}\`, {
      headers: {
        'Authorization': \`Bearer \${YOUR_JUICI_API_KEY}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!prdResponse.ok) throw new Error('Failed to fetch PRD data');
    const prdData = await prdResponse.json();
    
    // Step 2: Transform the data to match your system's format
    const transformedData = {
      title: prdData.title,
      description: prdData.overview,
      requirements: prdData.features.map(f => ({
        name: f.title,
        description: f.description,
        priority: mapPriority(f.priority)
      })),
      // Map other fields as needed
    };
    
    // Step 3: Send the data to your custom system
    const exportResponse = await fetch('https://your-internal-system.com/api/import', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${YOUR_INTERNAL_API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transformedData)
    });
    
    if (!exportResponse.ok) throw new Error('Failed to export to internal system');
    return await exportResponse.json();
    
  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

// Helper function to map Juici priorities to your system's format
function mapPriority(juiciPriority) {
  const priorityMap = {
    'high': 'P1',
    'medium': 'P2',
    'low': 'P3'
  };
  return priorityMap[juiciPriority.toLowerCase()] || 'P2';
}`}
          </CodeBlock>
          
          <h3>Webhooks for Real-Time Integration</h3>
          
          <p>
            For more advanced scenarios, you can use Juici's webhook functionality:
          </p>
          
          <ol>
            <li>Set up an endpoint on your server to receive webhook events</li>
            <li>Configure webhooks in your Juici account settings</li>
            <li>Specify which events you want to receive (e.g., PRD created, idea generated)</li>
            <li>Implement handlers for these events on your server</li>
          </ol>
          
          <CodeBlock language="typescript">
{`// Example: Express.js webhook handler for PRD events
import express from 'express';
import crypto from 'crypto';

const app = express();
app.use(express.json());

// Verify webhook signature for security
function verifyJuiciWebhook(req) {
  const signature = req.headers['x-juici-signature'];
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(JSON.stringify(req.body)).digest('hex');
  return signature === digest;
}

app.post('/webhooks/juici', (req, res) => {
  // Verify the webhook is authentic
  if (!verifyJuiciWebhook(req)) {
    return res.status(401).send('Invalid signature');
  }
  
  const event = req.body;
  
  // Handle different event types
  switch (event.type) {
    case 'prd.created':
      console.log(\`New PRD created: \${event.data.title}\`);
      // Create corresponding project in your system
      createProjectFromPRD(event.data);
      break;
      
    case 'prd.updated':
      console.log(\`PRD updated: \${event.data.title}\`);
      // Update corresponding project
      updateProjectFromPRD(event.data);
      break;
      
    case 'idea.generated':
      console.log(\`New idea generated: \${event.data.prompt}\`);
      // Log idea in your analytics system
      logNewIdea(event.data);
      break;
      
    default:
      console.log(\`Unhandled event type: \${event.type}\`);
  }
  
  // Acknowledge receipt of the webhook
  res.status(200).send('Webhook received');
});

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});`}
          </CodeBlock>
          
          <h2>Troubleshooting API Integrations</h2>
          
          <p>
            Even with careful setup, API integrations can sometimes face issues. Here are some common problems and solutions:
          </p>
          
          <h3>Authentication Problems</h3>
          
          <p>
            If your integration is failing with authentication errors:
          </p>
          
          <ul>
            <li>Verify that your API key is correct and hasn't expired</li>
            <li>Check if you have the necessary permissions for the operations</li>
            <li>Ensure you're using the correct authentication method (API key, OAuth, etc.)</li>
            <li>Look for any IP restrictions that might be blocking requests</li>
          </ul>
          
          <h3>Rate Limiting Issues</h3>
          
          <p>
            If you're hitting rate limits:
          </p>
          
          <ul>
            <li>Implement proper backoff/retry logic in your code</li>
            <li>Consider batching operations when possible</li>
            <li>Check if you can obtain higher rate limits with a paid tier</li>
          </ul>
          
          <h3>Data Mapping Problems</h3>
          
          <p>
            If data isn't being properly translated between systems:
          </p>
          
          <ul>
            <li>Review your field mappings for accuracy</li>
            <li>Check for format differences (dates, enums, etc.)</li>
            <li>Ensure required fields are being properly populated</li>
            <li>Look for character encoding issues in text fields</li>
          </ul>
          
          <h3>Using the Integration Logs</h3>
          
          <p>
            Juici provides detailed logs for all API integration activity:
          </p>
          
          <ol>
            <li>Go to Account Settings {'>'} Integrations</li>
            <li>Select the specific integration</li>
            <li>Click "View Logs" to see recent activity</li>
            <li>Check error messages and timestamps</li>
            <li>Use the request/response details to diagnose issues</li>
          </ol>
          
          <h2>Best Practices for API Integrations</h2>
          
          <h3>Security Considerations</h3>
          
          <p>
            When working with API integrations, always prioritize security:
          </p>
          
          <ul>
            <li>Use the principle of least privilege - only request the permissions you truly need</li>
            <li>Regularly rotate API keys and review access</li>
            <li>Monitor integration activity for unusual patterns</li>
            <li>Secure your webhook endpoints with signature verification</li>
          </ul>
          
          <h3>Performance Optimization</h3>
          
          <p>
            Keep your integrations running smoothly:
          </p>
          
          <ul>
            <li>Implement caching for frequently accessed data</li>
            <li>Use pagination for large data sets</li>
            <li>Schedule bulk operations during off-peak hours</li>
            <li>Monitor response times and optimize slow operations</li>
          </ul>
          
          <h3>Maintenance and Updates</h3>
          
          <p>
            APIs evolve over time, so stay on top of changes:
          </p>
          
          <ul>
            <li>Subscribe to API provider newsletters or developer updates</li>
            <li>Test your integrations regularly</li>
            <li>Update your code promptly when APIs change</li>
            <li>Document your integrations thoroughly for future maintenance</li>
          </ul>
          
          <h2>Conclusion</h2>
          
          <p>
            API integrations can transform Juici from a standalone ideation tool into a central hub of your product development workflow. By connecting Juici to your existing tools and data sources, you'll streamline your process and ensure that your ideas translate smoothly into actual products.
          </p>
          
          <p>
            Remember that successful integrations start with clear objectives. Before diving into code, take time to map out exactly what you want to achieve with each integration. Focus on creating workflows that feel natural and save time rather than adding unnecessary complexity.
          </p>
          
          <p>
            We're constantly expanding our integration capabilities, so check the Juici documentation regularly for new features and partners. And if you build an interesting custom integration, consider sharing it with the Juici community in our forums!
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default APIIntegration; 