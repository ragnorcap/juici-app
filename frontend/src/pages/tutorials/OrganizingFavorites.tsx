import React from 'react';
import styled from 'styled-components';
import { FiCalendar, FiUser, FiChevronLeft, FiFolder, FiStar, FiTag, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';

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

const FeatureHighlight = styled.div`
  background: rgba(100, 223, 223, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
  border: 1px solid rgba(100, 223, 223, 0.2);
  
  h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.green.light};
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    margin-bottom: 0;
  }
`;

const ScreenshotContainer = styled.div`
  background: rgba(30, 30, 30, 0.5);
  border-radius: 8px;
  padding: 1rem;
  margin: 2rem 0;
  border: 1px solid rgba(100, 100, 100, 0.3);
`;

const Screenshot = styled.div`
  background: #222;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  p {
    margin: 0.5rem 0 0;
    font-size: 0.9rem;
    color: #aaa;
    text-align: center;
    font-style: italic;
  }
`;

const OrganizingFavorites: React.FC = () => {
  return (
    <Layout>
      <PageContainer>
        <BackLink to="/tutorials">
          <FiChevronLeft /> Back to Tutorials
        </BackLink>
        
        <Title>Organizing Your Favorites: Collections, Tags, and Search</Title>
        
        <PostMeta>
          <MetaItem>
            <FiCalendar />
            Mar 20, 2025
          </MetaItem>
          <MetaItem>
            <FiUser />
            Juici Team
          </MetaItem>
          <CategoryTag>Intermediate</CategoryTag>
        </PostMeta>
        
        <FeaturedImage 
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
          alt="Organized collection of items on a desk"
        />
        
        <Content>
          <p>
            As you continue to use Juici for idea generation and PRD creation, you'll quickly build up a collection of favorite ideas, projects, and documents. Without proper organization, finding what you need can become challenging. In this tutorial, we'll explore the powerful organization features in Juici to help you maintain a clean, accessible library of your creative work.
          </p>
          
          <h2>Understanding Juici's Organization System</h2>
          
          <p>
            Juici offers several ways to organize your saved content:
          </p>
          
          <FeatureHighlight>
            <h4><FiStar /> Favorites</h4>
            <p>The basic unit of saved content. Any idea, project, or PRD can be favorited for easy access later.</p>
          </FeatureHighlight>
          
          <FeatureHighlight>
            <h4><FiFolder /> Collections</h4>
            <p>Groupings that help you organize favorites by project, theme, or workflow stage.</p>
          </FeatureHighlight>
          
          <FeatureHighlight>
            <h4><FiTag /> Tags</h4>
            <p>Flexible labels that can be applied across collections, allowing for cross-cutting organization.</p>
          </FeatureHighlight>
          
          <FeatureHighlight>
            <h4><FiSearch /> Smart Search</h4>
            <p>AI-powered search that helps you find any saved content quickly, even if you don't remember where you put it.</p>
          </FeatureHighlight>
          
          <p>
            These tools work together to create a flexible system that adapts to your needs, whether you're managing a handful of ideas or hundreds of saved items.
          </p>
          
          <h2>Setting Up Your Collections</h2>
          
          <p>
            Collections are the foundation of organizing in Juici. Think of them as folders or projects that contain related items.
          </p>
          
          <h3>Creating Your First Collection</h3>
          
          <ol>
            <li>
              Navigate to the Favorites section from the dashboard sidebar
            </li>
            <li>
              Click on the "Collections" tab at the top of the page
            </li>
            <li>
              Click the "+ New Collection" button
            </li>
            <li>
              Enter a name for your collection (e.g., "Mobile App Ideas")
            </li>
            <li>
              Add an optional description to clarify the collection's purpose
            </li>
            <li>
              Choose a color for visual identification (optional)
            </li>
            <li>
              Click "Create Collection"
            </li>
          </ol>
          
          <ScreenshotContainer>
            <Screenshot>
              {/* Imagine an image here */}
              <p>Creating a new collection with name, description, and color options</p>
            </Screenshot>
          </ScreenshotContainer>
          
          <h3>Creating a Collection Structure</h3>
          
          <p>
            For most users, we recommend creating collections based on distinct projects or themes. Here's a typical structure that works well:
          </p>
          
          <ul>
            <li>
              <strong>Active Projects</strong> - Current projects you're actively working on
            </li>
            <li>
              <strong>Project Ideas</strong> - Potential future projects you might pursue
            </li>
            <li>
              <strong>Inspiration</strong> - General ideas that sparked your interest
            </li>
            <li>
              <strong>Learning</strong> - Ideas related to skills or topics you're exploring
            </li>
            <li>
              <strong>Archive</strong> - Completed projects or ideas you've explored
            </li>
          </ul>
          
          <p>
            You can create nested collections by dragging one collection onto another in the sidebar. This allows for more granular organization:
          </p>
          
          <TipBox>
            <h4>PRO TIP</h4>
            <p>
              Don't go too deep with nesting collections. A structure that's 2-3 levels deep is typically manageable, while deeper nesting can make it harder to find items.
            </p>
          </TipBox>
          
          <ScreenshotContainer>
            <Screenshot>
              {/* Imagine an image here */}
              <p>Example of collection structure with primary and nested collections</p>
            </Screenshot>
          </ScreenshotContainer>
          
          <h2>Adding Items to Collections</h2>
          
          <p>
            Once you've set up your collections, you can start adding your favorite items to them.
          </p>
          
          <h3>Method 1: Add While Saving</h3>
          
          <p>
            The easiest way to organize is to add items to collections at the moment you favorite them:
          </p>
          
          <ol>
            <li>
              When viewing an idea or PRD, click the star icon to favorite it
            </li>
            <li>
              In the dropdown menu that appears, you'll see a list of your collections
            </li>
            <li>
              Select one or more collections to add the item to
            </li>
            <li>
              Click "Save" to confirm
            </li>
          </ol>
          
          <ScreenshotContainer>
            <Screenshot>
              {/* Imagine an image here */}
              <p>Favoriting an item and adding it to collections in one step</p>
            </Screenshot>
          </ScreenshotContainer>
          
          <h3>Method 2: Organize Existing Favorites</h3>
          
          <p>
            You can also organize items that are already in your favorites:
          </p>
          
          <ol>
            <li>
              Go to the "All Favorites" view
            </li>
            <li>
              Select one or more items by clicking the checkbox in the corner
            </li>
            <li>
              Click the "Move to Collection" button in the toolbar
            </li>
            <li>
              Select the destination collection(s)
            </li>
            <li>
              Click "Move" to confirm
            </li>
          </ol>
          
          <p>
            You can also use drag-and-drop to move items between collections in the sidebar view.
          </p>
          
          <h3>Method 3: Bulk Organization</h3>
          
          <p>
            For larger reorganization efforts, Juici offers a bulk organization mode:
          </p>
          
          <ol>
            <li>
              From the Favorites page, click the "Organize" button in the top-right
            </li>
            <li>
              This enables a special view where you can see all collections side by side
            </li>
            <li>
              Drag and drop items between collections
            </li>
            <li>
              When finished, click "Done Organizing"
            </li>
          </ol>
          
          <ScreenshotContainer>
            <Screenshot>
              {/* Imagine an image here */}
              <p>Bulk organization mode showing drag-and-drop between collections</p>
            </Screenshot>
          </ScreenshotContainer>
          
          <h2>Using Tags for Cross-Collection Organization</h2>
          
          <p>
            While collections are great for broad categorization, tags offer more flexibility for cross-cutting concerns and specific attributes.
          </p>
          
          <h3>Creating and Applying Tags</h3>
          
          <ol>
            <li>
              Select an item in your favorites
            </li>
            <li>
              Click the tag icon in the toolbar (or right-click and select "Manage Tags")
            </li>
            <li>
              In the tag editor, type a new tag name or select from existing tags
            </li>
            <li>
              Click "Add" or press Enter to apply the tag
            </li>
            <li>
              Click "Save" when finished
            </li>
          </ol>
          
          <p>
            You can apply multiple tags to each item, creating a rich web of connections across your favorites.
          </p>
          
          <h3>Tag Strategies</h3>
          
          <p>
            Here are some effective ways to use tags in Juici:
          </p>
          
          <ul>
            <li>
              <strong>Status tags</strong>: #in-progress, #needs-review, #completed
            </li>
            <li>
              <strong>Priority tags</strong>: #high-priority, #low-priority
            </li>
            <li>
              <strong>Technology tags</strong>: #react, #python, #blockchain
            </li>
            <li>
              <strong>Domain tags</strong>: #healthcare, #education, #finance
            </li>
            <li>
              <strong>Difficulty tags</strong>: #quick-win, #complex, #moonshot
            </li>
          </ul>
          
          <TipBox>
            <h4>PRO TIP</h4>
            <p>
              Be consistent with your tag format. Decide whether you'll use singular or plural forms (#idea vs #ideas), hyphenated or separate words (#high-priority vs #highpriority), and stick with your choice.
            </p>
          </TipBox>
          
          <h3>Viewing and Filtering by Tags</h3>
          
          <p>
            Once you've applied tags, you can use them to filter your favorites:
          </p>
          
          <ol>
            <li>
              In the sidebar, click on "Tags" to expand the tag section
            </li>
            <li>
              Click on any tag to show only items with that tag
            </li>
            <li>
              Hold Ctrl/Cmd while clicking multiple tags to create complex filters
              <ul>
                <li>By default, this shows items with ANY of the selected tags</li>
                <li>To show only items with ALL selected tags, toggle the "Match All" option</li>
              </ul>
            </li>
          </ol>
          
          <p>
            The tag system is particularly powerful when combined with collections. For example, you can view all items in your "Mobile App" collection that also have the #high-priority and #react tags.
          </p>
          
          <ScreenshotContainer>
            <Screenshot>
              {/* Imagine an image here */}
              <p>Filtering favorites by multiple tags and collection</p>
            </Screenshot>
          </ScreenshotContainer>
          
          <h2>Smart Search: Finding Anything Quickly</h2>
          
          <p>
            Even with the best organization system, there will be times when you need to find something quickly without navigating through collections or tags. Juici's Smart Search is designed for these moments.
          </p>
          
          <h3>Basic Search</h3>
          
          <p>
            The search bar is always available in the top navigation:
          </p>
          
          <ol>
            <li>
              Click on the search icon or press Ctrl/Cmd+F to focus the search bar
            </li>
            <li>
              Start typing your query
            </li>
            <li>
              Results will appear as you type, matching titles, descriptions, and content
            </li>
            <li>
              Click on a result to go directly to that item
            </li>
          </ol>
          
          <h3>Advanced Search Operators</h3>
          
          <p>
            Juici's search supports advanced operators for more precise queries:
          </p>
          
          <ul>
            <li>
              <strong>in:</strong> - Limit search to a collection, e.g., <code>mobile app in:project-ideas</code>
            </li>
            <li>
              <strong>tag:</strong> - Find items with specific tags, e.g., <code>api tag:high-priority</code>
            </li>
            <li>
              <strong>type:</strong> - Filter by item type, e.g., <code>type:prd dashboard</code>
            </li>
            <li>
              <strong>created:</strong> - Search by creation date, e.g., <code>created:last-week</code> or <code>created:2024-01</code>
            </li>
            <li>
              <strong>modified:</strong> - Search by modification date, e.g., <code>modified:today</code>
            </li>
          </ul>
          
          <p>
            You can combine these operators for complex queries:
          </p>
          
          <pre>
            mobile payment api in:fintech-projects tag:high-priority type:prd created:2024
          </pre>
          
          <h3>Semantic Search</h3>
          
          <p>
            What makes Juici's search truly powerful is its semantic understanding. Unlike traditional keyword search, Juici understands the meaning behind your query:
          </p>
          
          <ul>
            <li>
              Search for <code>customer authentication solutions</code> and find results about "user login flows" even if those exact words aren't used
            </li>
            <li>
              Search for <code>performance optimization ideas</code> and find relevant items even if they don't contain those specific terms
            </li>
            <li>
              Ask questions like <code>what was that idea about improving onboarding?</code> and get relevant results
            </li>
          </ul>
          
          <TipBox>
            <h4>PRO TIP</h4>
            <p>
              When using semantic search, be descriptive rather than trying to guess keywords. The more context you provide, the better the results will be.
            </p>
          </TipBox>
          
          <h2>Organization Best Practices</h2>
          
          <p>
            After working with thousands of users, we've identified some best practices for keeping your Juici workspace organized:
          </p>
          
          <h3>Establish a Consistent System</h3>
          
          <p>
            Take some time at the beginning to set up a system that makes sense for your workflow:
          </p>
          
          <ul>
            <li>
              Define what each collection is for
            </li>
            <li>
              Create a standard set of tags and stick to them
            </li>
            <li>
              Document your system if you're working with a team
            </li>
          </ul>
          
          <h3>Regular Maintenance</h3>
          
          <p>
            Schedule time for organization maintenance:
          </p>
          
          <ul>
            <li>
              Weekly: Review new favorites and ensure they're properly tagged and categorized
            </li>
            <li>
              Monthly: Review collections and consider archiving completed projects
            </li>
            <li>
              Quarterly: Evaluate your overall system and refine as needed
            </li>
          </ul>
          
          <h3>Use Smart Views</h3>
          
          <p>
            Juici's Smart Views can automate much of your organization:
          </p>
          
          <ol>
            <li>
              Go to Favorites {'>'} Smart Views
            </li>
            <li>
              Click "+ New Smart View"
            </li>
            <li>
              Define filters (e.g., items created in the last 30 days with the #high-priority tag)
            </li>
            <li>
              Name and save your view
            </li>
          </ol>
          
          <p>
            Smart Views will dynamically update as new items match your criteria, saving you time on manual organization.
          </p>
          
          <ScreenshotContainer>
            <Screenshot>
              {/* Imagine an image here */}
              <p>Creating a Smart View with multiple filter criteria</p>
            </Screenshot>
          </ScreenshotContainer>
          
          <h3>Workflows for Teams</h3>
          
          <p>
            If you're using Juici with a team, consistent organization becomes even more important:
          </p>
          
          <ul>
            <li>
              Create a team glossary for collections and tags
            </li>
            <li>
              Assign an "organization manager" to maintain consistency
            </li>
            <li>
              Use status tags to track items as they move through your workflow
            </li>
            <li>
              Set up team-specific Smart Views that everyone can access
            </li>
          </ul>
          
          <h2>Advanced Organization Techniques</h2>
          
          <h3>Collection Templates</h3>
          
          <p>
            For repeated project types, create collection templates:
          </p>
          
          <ol>
            <li>
              Set up a collection with your ideal structure and standard documents
            </li>
            <li>
              Use the "Save as Template" option from the collection menu
            </li>
            <li>
              When starting a new project, select "New from Template" instead of creating an empty collection
            </li>
          </ol>
          
          <p>
            This ensures consistent organization across similar projects and saves time on setup.
          </p>
          
          <h3>Automated Organization with Workflows</h3>
          
          <p>
            Juici's Workflow feature can automate organization tasks:
          </p>
          
          <ul>
            <li>
              <strong>Auto-tagging</strong>: Set up rules to automatically apply tags based on content (e.g., tag all mobile-related ideas with #mobile)
            </li>
            <li>
              <strong>Collection routing</strong>: Route new items to specific collections based on criteria
            </li>
            <li>
              <strong>Status updates</strong>: Automatically update status tags based on actions or time
            </li>
          </ul>
          
          <p>
            To set up a workflow:
          </p>
          
          <ol>
            <li>
              Go to Settings {'>'} Workflows
            </li>
            <li>
              Click "+ New Workflow"
            </li>
            <li>
              Define triggers and actions
            </li>
            <li>
              Test and activate your workflow
            </li>
          </ol>
          
          <h3>Periodic Reviews and Reorganization</h3>
          
          <p>
            As your work evolves, so should your organization system:
          </p>
          
          <ul>
            <li>
              Conduct quarterly reviews of your collections and tags
            </li>
            <li>
              Merge similar collections if they've become too fragmented
            </li>
            <li>
              Split large collections if they've become unwieldy
            </li>
            <li>
              Archive completed or dormant projects
            </li>
            <li>
              Standardize inconsistent tags
            </li>
          </ul>
          
          <TipBox>
            <h4>PRO TIP</h4>
            <p>
              Before making major organizational changes, take a snapshot of your current setup. Juici's backup feature (Settings {'>'} Backups) allows you to revert if your new organization system doesn't work out.
            </p>
          </TipBox>
          
          <h2>Conclusion</h2>
          
          <p>
            Effective organization is the key to getting the most value from your ideas and documents in Juici. By using collections, tags, and smart search together, you can create a system that grows with your needs and keeps everything accessible.
          </p>
          
          <p>
            Remember that the best organization system is one that you'll actually use consistently. Start simple, develop habits around maintaining your system, and gradually introduce more advanced features as you need them.
          </p>
          
          <p>
            In our next tutorial, we'll explore how to leverage Juici's sharing and collaboration features to work effectively with teams and stakeholders on your ideas and PRDs.
          </p>
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default OrganizingFavorites; 