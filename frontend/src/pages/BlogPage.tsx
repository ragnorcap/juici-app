import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';
import Layout from '../components/Layout';
import Card from '../components/Card';

// Styled components
const PageContainer = styled.div`
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #ccc;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedPost = styled(Card)`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  padding: 0;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage = styled.div<{ image: string }>`
  background: url(${props => props.image}) center/cover no-repeat;
  min-height: 300px;
  width: 100%;
  
  @media (max-width: 992px) {
    min-height: 200px;
  }
`;

const FeaturedContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const FeaturedTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.green.light};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FeaturedDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const PostCard = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const PostImage = styled.div<{ image: string }>`
  background: url(${props => props.image}) center/cover no-repeat;
  height: 180px;
  width: 100%;
`;

const PostContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.green.light};
`;

const PostDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
`;

const PostMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #aaa;
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
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

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.yellow.main};
  text-decoration: none;
  font-weight: 500;
  margin-top: auto;
  align-self: flex-start;
  
  &:hover {
    color: ${props => props.theme.colors.yellow.light};
  }
`;

// Blog post data
const posts = [
  {
    id: 'using-juici-with-cursor',
    title: 'Using Juici with Cursor: From Idea to Code in Minutes',
    description: 'Learn how to leverage Juici-generated PRDs with Cursor IDE to rapidly prototype your project ideas and build functional applications in record time.',
    category: 'Tutorial',
    author: 'Juici Team',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    featured: true,
    slug: '/tutorials/using-with-cursor'
  },
  {
    id: 'how-we-built-juici',
    title: 'How We Built Juici: Leveraging Claude 3.7 and Cursor',
    description: 'A behind-the-scenes look at how we created Juici using Claude 3.7 Sonnet and Cursor IDE, with insights into our development process and AI-assisted coding.',
    category: 'Case Study',
    author: 'Juici Team',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    slug: '/blog/how-we-built-juici'
  },
  {
    id: 'getting-started-with-juici',
    title: 'Getting Started with Juici: A Beginner\'s Guide',
    description: 'Everything you need to know to start using Juici to generate project ideas and create detailed product requirements documents.',
    category: 'Tutorial',
    author: 'Juici Team',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    slug: '/tutorials/getting-started'
  },
  {
    id: 'creating-professional-prds',
    title: 'How to Create Professional-Grade PRDs with Juici',
    description: 'A comprehensive guide to generating detailed Product Requirements Documents that will help you turn your ideas into reality.',
    category: 'Tutorial',
    author: 'Juici Team',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    slug: '/tutorials/creating-prds'
  },
  {
    id: 'ai-in-product-development',
    title: 'The Role of AI in Modern Product Development',
    description: 'How AI tools like Juici are transforming the product development process, from ideation to implementation.',
    category: 'Insights',
    author: 'Juici Team',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1596986592973-93a5297306a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    slug: '/blog/ai-in-product-development'
  },
  {
    id: 'best-practices-software-projects',
    title: '10 Best Practices for Starting New Software Projects',
    description: 'Expert tips for setting up your software projects for success, from planning to execution.',
    category: 'Best Practices',
    author: 'Juici Team',
    date: 'Mar 20, 2025',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    slug: '/blog/best-practices-software-projects'
  }
];

const BlogPage: React.FC = () => {
  // Get the featured post and the rest
  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);
  
  return (
    <Layout>
      <PageContainer>
        <Title>Juici Blog</Title>
        <Subtitle>
          Insights, tutorials, and best practices for generating creative ideas
          and building amazing software products
        </Subtitle>
        
        {featuredPost && (
          <FeaturedPost variant="glass">
            <FeaturedImage image={featuredPost.image} />
            <FeaturedContent>
              <CategoryTag>{featuredPost.category}</CategoryTag>
              <FeaturedTitle>{featuredPost.title}</FeaturedTitle>
              <PostMeta>
                <MetaItem>
                  <FiCalendar />
                  {featuredPost.date}
                </MetaItem>
                <MetaItem>
                  <FiUser />
                  {featuredPost.author}
                </MetaItem>
              </PostMeta>
              <FeaturedDescription>{featuredPost.description}</FeaturedDescription>
              <ReadMoreLink to={featuredPost.slug}>
                Read Full Article <FiArrowRight />
              </ReadMoreLink>
            </FeaturedContent>
          </FeaturedPost>
        )}
        
        <BlogGrid>
          {regularPosts.map(post => (
            <PostCard key={post.id} variant="glass">
              <PostImage image={post.image} />
              <PostContent>
                <CategoryTag>{post.category}</CategoryTag>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                  <MetaItem>
                    <FiCalendar />
                    {post.date}
                  </MetaItem>
                  <MetaItem>
                    <FiUser />
                    {post.author}
                  </MetaItem>
                </PostMeta>
                <PostDescription>{post.description}</PostDescription>
                <ReadMoreLink to={post.slug}>
                  Read More <FiArrowRight />
                </ReadMoreLink>
              </PostContent>
            </PostCard>
          ))}
        </BlogGrid>
      </PageContainer>
    </Layout>
  );
};

export default BlogPage; 