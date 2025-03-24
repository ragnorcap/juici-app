// API endpoint for generating tech stack document
import { Configuration, OpenAIApi } from 'openai';

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Check if OpenAI API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is missing. Please set OPENAI_API_KEY in your environment variables.');
    return res.status(500).json({ 
      error: 'OpenAI API key is missing',
      details: 'Please set OPENAI_API_KEY in your .env.local file and restart the server'
    });
  }
  
  try {
    // Validate request body
    const { prd } = req.body;
    
    if (!prd) {
      return res.status(400).json({ error: 'PRD content is required' });
    }
    
    console.log('Generating Tech Stack based on PRD');
    
    // For development/demo purposes, return a mock response
    // In production, replace with actual OpenAI API call
    const techStackContent = `# Tech Stack (4-Hour Implementation)

## Frontend

### Framework
- **React** - For rapid component-based UI development
- **TypeScript** - For type safety and better developer experience

### UI/Styling
- **Styled Components** - For component-scoped styling
- **Framer Motion** - For simple animations without overhead

### State Management
- **React Context** - For lightweight global state
- **SWR** - For data fetching, caching, and synchronization

### Build Tools
- **Vite** - For faster development and optimized production builds

## Backend

### API Layer
- **Node.js** with **Express** - For lightweight and quick API setup
- **API Routes** - Utilizing Next.js API routes for serverless functions

### Database
- **Supabase** - For rapid authentication and database setup
- **Postgres** - For relational data storage

### Authentication
- **Auth.js** - For simple authentication flows
- **JWT** - For stateless authentication

## DevOps

### Deployment
- **Vercel** - For zero-config deployments and previews
- **GitHub Actions** - For simple CI/CD pipeline

### Monitoring
- **Sentry** - For error tracking
- **Vercel Analytics** - For basic usage analytics

## Development Approach

1. **Hour 1**: Setup project, configure essential dependencies, scaffold app structure
2. **Hour 2**: Implement frontend components and basic state management
3. **Hour 3**: Build backend API endpoints and database connections
4. **Hour 4**: Connect frontend to backend, deploy MVP

## Considerations for Speed
- Using managed services to reduce setup time
- Leveraging TypeScript for fewer runtime errors
- Choosing familiar technologies to minimize learning curve
- Implementing only essential features for MVP

This tech stack is optimized for rapid development within a 4-hour timeframe while maintaining good architecture and code quality.`;

    // Return the generated tech stack
    return res.status(200).json({ 
      content: techStackContent,
      message: 'Tech stack successfully generated'
    });
    
  } catch (error) {
    console.error('Error generating tech stack:', error);
    return res.status(500).json({ 
      error: 'Failed to generate tech stack', 
      details: error.message 
    });
  }
} 