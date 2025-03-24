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

const ExampleBox = styled.div`
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

const CreatingPRDs: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/tutorials">
          <FiChevronLeft /> Back to Tutorials
        </BackLink>
        
        <PageTitle>Creating Professional-Grade PRDs with Juici</PageTitle>
        
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
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="Person working on documentation"
        />
        
        <Content>
          <p>
            Product Requirements Documents (PRDs) are essential tools for translating creative ideas into actionable development plans. In this comprehensive guide, we'll show you how to leverage Juici's AI capabilities to create detailed, professional-grade PRDs that will help you bring your project ideas to life.
          </p>
          
          <h2>What Makes a Great PRD?</h2>
          
          <p>
            Before diving into how to create PRDs with Juici, let's understand what makes a PRD valuable. A great PRD:
          </p>
          
          <ul>
            <li><strong>Provides clarity</strong> - It clearly defines what needs to be built and why</li>
            <li><strong>Focuses on outcomes</strong> - It emphasizes what the product should achieve, not just features</li>
            <li><strong>Serves as a reference</strong> - It acts as a source of truth throughout development</li>
            <li><strong>Accommodates evolution</strong> - It's structured to allow for refinement as the project progresses</li>
            <li><strong>Balances detail</strong> - It's comprehensive without being overwhelming</li>
          </ul>
          
          <p>
            Juici's PRD generator is designed with these principles in mind, producing documents that strike the right balance between thoroughness and usability.
          </p>
          
          <h2>Generating Your First PRD</h2>
          
          <p>
            To create a PRD with Juici, start by generating or selecting a project idea. Once you have an idea you want to develop further, click the "Create PRD" button next to the idea.
          </p>
          
          <p>
            Juici will then process your idea and generate a comprehensive PRD. This typically takes 15-30 seconds, depending on the complexity of the idea.
          </p>
          
          <h2>Anatomy of a Juici PRD</h2>
          
          <p>
            Juici generates PRDs with a consistent structure designed to cover all essential aspects of a product specification. Here's what's included:
          </p>
          
          <h3>1. Executive Summary</h3>
          
          <p>
            The executive summary provides a concise overview of the product, including:
          </p>
          
          <ul>
            <li>Product name and concept</li>
            <li>The problem it solves</li>
            <li>Target audience</li>
            <li>Key value proposition</li>
          </ul>
          
          <ExampleBox>
{`# Executive Summary

Product Name: WeatherWise
A mobile application that provides hyper-local weather forecasts with personalized activity recommendations based on upcoming weather conditions.

WeatherWise solves the common problem of generic weather forecasts that don't account for individual preferences or planned activities. By combining accurate weather data with user preferences, the app helps users make better decisions about outdoor activities, travel, and daily planning.`}
          </ExampleBox>
          
          <h3>2. User Personas</h3>
          
          <p>
            This section outlines the key user types who will benefit from your product, including:
          </p>
          
          <ul>
            <li>Demographic information</li>
            <li>Goals and motivations</li>
            <li>Pain points and challenges</li>
            <li>How the product addresses their needs</li>
          </ul>
          
          <TipBox>
            <h4>Enhancing Personas</h4>
            <p>
              Consider adding more detailed information to the generated personas based on your market knowledge. The more specific your personas, the better your product will address real user needs.
            </p>
          </TipBox>
          
          <h3>3. User Stories and Scenarios</h3>
          
          <p>
            This section provides narrative descriptions of how users will interact with your product, including:
          </p>
          
          <ul>
            <li>Step-by-step user journeys</li>
            <li>Specific use cases</li>
            <li>Expected outcomes</li>
          </ul>
          
          <ExampleBox>
{`## User Story 1: Morning Planning

As a commuter (Sarah), I want to check my personalized weather forecast in the morning so I can decide what to wear and whether to take an umbrella.

1. Sarah wakes up and opens the WeatherWise app
2. The app shows today's forecast with a personalized recommendation: "Bring an umbrella! Rain expected during your typical commute time (8:30 AM)"
3. Sarah notices the app has suggested an alternative commute route due to expected flooding on her usual route
4. Sarah follows the recommendation, avoiding delays and staying dry`}
          </ExampleBox>
          
          <h3>4. Feature Requirements</h3>
          
          <p>
            This comprehensive section details the specific features and functionality of your product, including:
          </p>
          
          <ul>
            <li>Core features and their specifications</li>
            <li>Priority levels (must-have, should-have, nice-to-have)</li>
            <li>Acceptance criteria</li>
            <li>Constraints and limitations</li>
          </ul>
          
          <h3>5. Technical Requirements</h3>
          
          <p>
            This section outlines the technical specifications needed to implement the product, including:
          </p>
          
          <ul>
            <li>Technology stack recommendations</li>
            <li>API requirements</li>
            <li>Data storage needs</li>
            <li>Integration points with other systems</li>
            <li>Performance requirements</li>
          </ul>
          
          <h3>6. Design Guidelines</h3>
          
          <p>
            This section provides direction for the product's visual and interaction design, including:
          </p>
          
          <ul>
            <li>User interface principles</li>
            <li>Brand alignment considerations</li>
            <li>Accessibility requirements</li>
            <li>Platform-specific design guidelines</li>
          </ul>
          
          <h3>7. Implementation Roadmap</h3>
          
          <p>
            The final section suggests an approach to implementing the product, including:
          </p>
          
          <ul>
            <li>Development phases</li>
            <li>Feature prioritization</li>
            <li>Milestone suggestions</li>
            <li>Testing strategies</li>
          </ul>
          
          <h2>Customizing Your PRD</h2>
          
          <p>
            While Juici generates comprehensive PRDs, you should view them as starting points rather than final documents. Here are some ways to customize and enhance your generated PRD:
          </p>
          
          <h3>Adding Project-Specific Context</h3>
          
          <p>
            Enhance your PRD by adding specific context about your organization, existing products, or industry constraints. This might include:
          </p>
          
          <ul>
            <li>Alignment with company strategy</li>
            <li>Integration with existing product ecosystem</li>
            <li>Industry regulations or standards</li>
            <li>Competitive landscape analysis</li>
          </ul>
          
          <h3>Refining Feature Specifications</h3>
          
          <p>
            The generated feature list provides a solid foundation, but you should refine it based on your specific goals and constraints:
          </p>
          
          <ul>
            <li>Adjust feature priorities based on your business goals</li>
            <li>Add more detailed acceptance criteria</li>
            <li>Remove features that don't align with your vision</li>
            <li>Add edge cases and error handling details</li>
          </ul>
          
          <h3>Adding Visual Elements</h3>
          
          <p>
            Enhance your PRD with visual elements to make it more comprehensive and easier to understand:
          </p>
          
          <ul>
            <li>User flow diagrams</li>
            <li>Wireframes or mockups</li>
            <li>System architecture diagrams</li>
            <li>Decision trees for complex logic</li>
          </ul>
          
          <TipBox>
            <h4>PRD Collaboration</h4>
            <p>
              Share your PRD with stakeholders early and often. The Juici-generated PRD provides an excellent starting point for discussions, allowing you to refine the requirements based on feedback before development begins.
            </p>
          </TipBox>
          
          <h2>Exporting and Sharing Your PRD</h2>
          
          <p>
            Once you're satisfied with your PRD, Juici provides several options for exporting and sharing:
          </p>
          
          <ul>
            <li><strong>Copy to Clipboard</strong> - Copy the entire PRD in Markdown format to paste into your preferred documentation system</li>
            <li><strong>Download as Markdown</strong> - Save the PRD as a .md file for version control and future editing</li>
            <li><strong>Save to Favorites</strong> - Store the PRD in your Juici account for easy reference</li>
          </ul>
          
          <p>
            The Markdown format makes it easy to import your PRD into tools like Notion, Confluence, GitHub, or any other documentation system that supports Markdown.
          </p>
          
          <h2>PRD Best Practices</h2>
          
          <p>
            To get the most out of your Juici-generated PRDs, consider these best practices:
          </p>
          
          <ul>
            <li><strong>Start with a clear idea</strong> - The more specific your initial idea, the more detailed and relevant your PRD will be</li>
            <li><strong>Focus on problems, not solutions</strong> - Emphasize what problems your product solves rather than getting locked into specific implementations</li>
            <li><strong>Keep it living</strong> - Treat your PRD as a living document that evolves throughout the development process</li>
            <li><strong>Use consistent terminology</strong> - Ensure everyone on your team understands the terminology used in the PRD</li>
            <li><strong>Include success metrics</strong> - Add clear metrics for measuring the success of your product</li>
          </ul>
          
          <h2>From PRD to Development</h2>
          
          <p>
            The final step is transitioning from PRD to actual development. Here's how to make this transition smoothly:
          </p>
          
          <ol>
            <li>Review the PRD with your development team</li>
            <li>Break down features into development tasks</li>
            <li>Create a development backlog based on the PRD's priorities</li>
            <li>Set up tracking to monitor progress against the PRD</li>
            <li>Schedule regular reviews to ensure alignment with the PRD throughout development</li>
          </ol>
          
          <p>
            For teams using Agile methodologies, the PRD can serve as an excellent source for creating user stories and acceptance criteria.
          </p>
          
          <h2>Conclusion</h2>
          
          <p>
            Juici's PRD generator provides a powerful way to transform creative ideas into comprehensive product specifications. By understanding the structure of these PRDs and how to customize them for your specific needs, you can dramatically accelerate your product development process while ensuring alignment across your team.
          </p>
          
          <p>
            Remember that the best PRDs evolve over time, serving as living documents that guide development while accommodating new insights and changing requirements. Use your Juici-generated PRD as a solid foundation, and build upon it as your project progresses.
          </p>
          
          <p>
            Ready to create your first professional-grade PRD? Head to the <Link to="/">Juici homepage</Link> to generate an idea and transform it into a comprehensive product specification in minutes!
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default CreatingPRDs; 