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

const PromptBox = styled.div`
  background: rgba(75, 0, 130, 0.3);
  border: 1px solid rgba(138, 79, 255, 0.3);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  white-space: pre-wrap;
  overflow-x: auto;
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

const AdvancedTechniques: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/tutorials">
          <FiChevronLeft /> Back to Tutorials
        </BackLink>
        
        <PageTitle>Advanced Juici Techniques</PageTitle>
        
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
          src="https://images.unsplash.com/photo-1596986592973-93a5297306a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="Advanced technology concept"
        />
        
        <Content>
          <p>
            Welcome to our advanced techniques guide for Juici! If you've been using our platform to generate ideas and create PRDs, you're ready to dive deeper into the powerful features that can take your ideation process to the next level. This tutorial is designed for users who are already familiar with the basics of Juici and want to unlock its full potential.
          </p>
          
          <h2>Customizing Idea Generation</h2>
          
          <p>
            While the standard idea generator provides excellent results, advanced users can fine-tune the generation process to better match their specific needs and interests.
          </p>
          
          <h3>Domain-Specific Idea Generation</h3>
          
          <p>
            To generate ideas tailored to a specific industry or domain, you can use the domain filter feature:
          </p>
          
          <ol>
            <li>Click the "Settings" gear icon next to the generate button</li>
            <li>Select "Domain Filters" from the dropdown</li>
            <li>Choose from predefined domains or create a custom domain</li>
          </ol>
          
          <p>
            For custom domains, you can specify key characteristics, technologies, and constraints. For example, if you're focused on healthcare applications, you might define:
          </p>
          
          <PromptBox>
{`Domain: Healthcare
Key Technologies: Telemedicine, EHR integration, HIPAA compliance
Target Users: Patients, Healthcare providers, Medical administrators
Key Challenges: Data privacy, Regulatory compliance, Interoperability`}
          </PromptBox>
          
          <p>
            Once set, Juici will generate ideas specifically tailored to your domain constraints, resulting in more relevant and actionable project concepts.
          </p>
          
          <h3>Complexity-Based Generation</h3>
          
          <p>
            You can also specify the complexity level of the ideas you want to generate:
          </p>
          
          <ul>
            <li><strong>Beginner:</strong> Simple projects achievable in 1-2 weeks with basic programming knowledge</li>
            <li><strong>Intermediate:</strong> More complex projects requiring moderate expertise and 3-6 weeks of development</li>
            <li><strong>Advanced:</strong> Sophisticated projects involving multiple technologies and 2-3 months of development</li>
            <li><strong>Expert:</strong> Enterprise-grade projects requiring specialized knowledge and team collaboration</li>
          </ul>
          
          <TipBox>
            <h4>Pro Tip: Mixing Complexity Levels</h4>
            <p>
              For team environments with varying skill levels, consider generating ideas at different complexity levels. This creates a balanced project portfolio with quick wins and more ambitious long-term goals.
            </p>
          </TipBox>
          
          <h2>Advanced PRD Customization</h2>
          
          <p>
            Beyond the basic PRD generation, Juici offers several advanced techniques for creating highly tailored and detailed product specifications.
          </p>
          
          <h3>PRD Templates</h3>
          
          <p>
            Juici allows you to create and save custom PRD templates that match your organization's specific documentation requirements:
          </p>
          
          <ol>
            <li>Navigate to "Account Settings" {'>'}  "PRD Templates"</li>
            <li>Click "Create New Template"</li>
            <li>Define sections, required fields, and formatting preferences</li>
            <li>Save your template with a memorable name</li>
          </ol>
          
          <p>
            When generating PRDs in the future, you can select your custom template from the dropdown menu. This ensures consistency across all your product documentation and alignment with your organization's standards.
          </p>
          
          <h3>Enhancement Prompts</h3>
          
          <p>
            After generating a baseline PRD, you can use enhancement prompts to expand specific sections with more detailed information:
          </p>
          
          <PromptBox>
{`Enhance [Technical Architecture] section with:
- Microservices breakdown
- Database schema recommendations
- API design patterns
- Security considerations`}
          </PromptBox>
          
          <p>
            Simply enter your enhancement prompt in the "Enhance PRD" field and select the section you want to expand. Juici will regenerate that section with the additional details you specified.
          </p>
          
          <h3>Multi-Stage PRD Generation</h3>
          
          <p>
            For complex products, the multi-stage PRD generation process offers a more iterative approach:
          </p>
          
          <ol>
            <li><strong>Core Concept Stage:</strong> Generate a high-level PRD focusing on the product concept, value proposition, and key features</li>
            <li><strong>User Experience Stage:</strong> Expand the PRD with detailed user stories, personas, and user journey maps</li>
            <li><strong>Technical Stage:</strong> Add technical specifications, architecture diagrams, and implementation details</li>
            <li><strong>Go-to-Market Stage:</strong> Include market analysis, positioning, and rollout strategy</li>
          </ol>
          
          <p>
            This staged approach allows you to gradually build a comprehensive PRD while getting feedback at each stage before advancing to the next level of detail.
          </p>
          
          <h2>Advanced Collaboration Features</h2>
          
          <p>
            Juici's collaboration features enable teams to work together seamlessly on idea generation and PRD development.
          </p>
          
          <h3>Team Ideation Sessions</h3>
          
          <p>
            Virtual team ideation sessions combine the power of AI with human creativity:
          </p>
          
          <ol>
            <li>Create a new ideation session from the dashboard</li>
            <li>Invite team members via email</li>
            <li>Set session parameters (duration, domain focus, etc.)</li>
            <li>Start the session, where Juici will generate ideas in real-time</li>
            <li>Team members can vote, comment, and build upon generated ideas</li>
            <li>The highest-rated ideas can be automatically converted to PRDs</li>
          </ol>
          
          <p>
            These structured sessions help teams overcome creative bottlenecks and rapidly converge on promising project ideas with broad team support.
          </p>
          
          <h3>Collaborative PRD Editing</h3>
          
          <p>
            Multiple team members can collaboratively refine PRDs using our advanced editing features:
          </p>
          
          <ul>
            <li><strong>Section-Based Assignments:</strong> Assign specific PRD sections to team members with relevant expertise</li>
            <li><strong>Real-Time Editing:</strong> Multiple users can edit the PRD simultaneously</li>
            <li><strong>Change Tracking:</strong> All edits are tracked with user attribution and timestamps</li>
            <li><strong>Commenting:</strong> Add inline comments for feedback without changing the document</li>
            <li><strong>Version History:</strong> Access previous versions and compare changes</li>
          </ul>
          
          <TipBox>
            <h4>Effective Collaboration</h4>
            <p>
              For best results, establish clear roles and responsibilities before starting collaborative PRD development. Product managers might focus on requirements, designers on UX specifications, and engineers on technical implementation details.
            </p>
          </TipBox>
          
          <h2>Integration with Development Workflows</h2>
          
          <p>
            Advanced users can integrate Juici directly into their development workflows for seamless transitions from ideation to implementation.
          </p>
          
          <h3>Task Management Integration</h3>
          
          <p>
            Juici integrates with popular task management tools to automatically convert PRD sections into actionable work items:
          </p>
          
          <ul>
            <li><strong>Jira Integration:</strong> Convert feature requirements directly into Jira epics, stories, and tasks</li>
            <li><strong>Trello Integration:</strong> Create Trello boards with cards representing PRD components</li>
            <li><strong>GitHub Integration:</strong> Generate GitHub issues from technical requirements</li>
            <li><strong>Asana Integration:</strong> Create Asana projects with tasks mapped to PRD sections</li>
          </ul>
          
          <p>
            To set up an integration:
          </p>
          
          <ol>
            <li>Go to "Account Settings" {'>'}  "Integrations"</li>
            <li>Select your task management tool</li>
            <li>Follow the authorization steps</li>
            <li>Configure mapping between PRD sections and task types</li>
          </ol>
          
          <h3>Code Repository Initialization</h3>
          
          <p>
            For technical projects, Juici can initialize a code repository based on the PRD's technical requirements:
          </p>
          
          <ol>
            <li>Generate a PRD with detailed technical specifications</li>
            <li>Click "Initialize Repository" from the PRD actions menu</li>
            <li>Select your repository provider (GitHub, GitLab, Bitbucket)</li>
            <li>Configure project structure and initial files</li>
          </ol>
          
          <p>
            Juici will create a repository with:
          </p>
          
          <ul>
            <li>Appropriate project structure based on the specified tech stack</li>
            <li>README.md derived from the PRD overview</li>
            <li>Initial configuration files (package.json, tsconfig.json, etc.)</li>
            <li>Basic CI/CD pipeline setup</li>
            <li>Stub files for key components identified in the PRD</li>
          </ul>
          
          <h2>Custom AI Training</h2>
          
          <p>
            Enterprise users can train Juici's AI on their specific industry, company history, and past projects for even more tailored results.
          </p>
          
          <h3>Company Knowledge Base Integration</h3>
          
          <p>
            Connect Juici to your company's knowledge base to generate ideas that leverage your existing expertise:
          </p>
          
          <ol>
            <li>Upload documentation, past PRDs, and project postmortems to your secure company vault</li>
            <li>Configure access permissions for different user roles</li>
            <li>Enable "Company Context" in the idea generation settings</li>
          </ol>
          
          <p>
            With company knowledge integration, generated ideas will reflect your organization's strengths, learned lessons, and strategic direction.
          </p>
          
          <h3>PRD Style Matching</h3>
          
          <p>
            Train Juici to match your company's PRD style and terminology:
          </p>
          
          <ol>
            <li>Upload 5-10 example PRDs that exemplify your preferred style</li>
            <li>Configure style parameters (formality, detail level, section organization)</li>
            <li>Create a custom terminology glossary for your industry or company</li>
          </ol>
          
          <p>
            Once configured, all generated PRDs will match your organization's documentation standards, making them immediately recognizable as internal documents.
          </p>
          
          <h2>Analytics and Insights</h2>
          
          <p>
            Advanced users can leverage Juici's analytics features to gain insights into their ideation process and outcomes.
          </p>
          
          <h3>Ideation Metrics</h3>
          
          <p>
            Track key metrics about your idea generation process:
          </p>
          
          <ul>
            <li><strong>Idea Velocity:</strong> Number of ideas generated per time period</li>
            <li><strong>Implementation Rate:</strong> Percentage of generated ideas that proceed to development</li>
            <li><strong>Domain Distribution:</strong> Analysis of idea categories and domains</li>
            <li><strong>Complexity Balance:</strong> Distribution of ideas across complexity levels</li>
          </ul>
          
          <p>
            These metrics help you optimize your ideation strategy and identify areas where you might be over or under-exploring.
          </p>
          
          <h3>PRD Quality Assessment</h3>
          
          <p>
            Evaluate the quality of your PRDs against industry benchmarks:
          </p>
          
          <ul>
            <li><strong>Completeness Score:</strong> How thoroughly the PRD covers all necessary aspects</li>
            <li><strong>Clarity Index:</strong> Assessment of language clarity and specificity</li>
            <li><strong>Consistency Check:</strong> Identification of inconsistencies between sections</li>
            <li><strong>Actionability Rating:</strong> How directly the PRD can translate to development tasks</li>
          </ul>
          
          <p>
            These assessments help you continuously improve your documentation quality and ensure your PRDs effectively guide the development process.
          </p>
          
          <h2>Conclusion</h2>
          
          <p>
            By mastering these advanced techniques, you'll be able to leverage Juici's full capabilities to streamline your product development process from initial concept to detailed implementation plans. Remember that the most effective approach often combines AI assistance with human expertise and creativity.
          </p>
          
          <p>
            We're continuously adding new advanced features based on user feedback. If you have suggestions for additional capabilities or refinements to existing features, please share them through our feedback portal in the dashboard.
          </p>
          
          <p>
            Happy creating!
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default AdvancedTechniques; 