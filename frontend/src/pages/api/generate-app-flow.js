// API endpoint for generating app flow document
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
    
    console.log('Generating App Flow based on PRD');
    
    // For development/demo purposes, return a mock response
    // In production, replace with actual OpenAI API call
    const appFlowContent = `# Application Flow (4-Hour Implementation)

## User Journey

### 1. Onboarding Flow (30 minutes)
- Welcome screen with value proposition
- Quick 2-step signup process
- Personalized onboarding tutorial

### 2. Main Dashboard (45 minutes)
- Overview of key metrics
- Quick action buttons
- Recent activity feed

### 3. Core Feature Flow (90 minutes)
- Step 1: Input/selection screen
- Step 2: Processing and visualization
- Step 3: Results and recommendations
- Step 4: Action/save options

### 4. Settings & Profile (30 minutes)
- User profile management
- Notification preferences
- Privacy controls

### 5. Feedback Loop (45 minutes)
- In-app feedback mechanism
- Rating prompt at key moments
- Issue reporting system

## Implementation Approaches

### Speed Optimizations
- Lazy loading of non-critical components
- Optimistic UI updates
- Background data fetching

### UX Considerations
- Consistent feedback for all user actions
- Error states with clear recovery paths
- Skeleton loaders for content

## Timeline Breakdown

- **Hour 1**: Onboarding and dashboard screens
- **Hour 2**: Core feature flow screens
- **Hour 3**: Settings and profile screens
- **Hour 4**: Feedback mechanisms and final polishing

This streamlined application flow enables a functional MVP within the 4-hour timeframe while ensuring a coherent user experience.`;

    // Return the generated app flow
    return res.status(200).json({ 
      content: appFlowContent,
      message: 'App flow successfully generated'
    });
    
  } catch (error) {
    console.error('Error generating app flow:', error);
    return res.status(500).json({ 
      error: 'Failed to generate app flow', 
      details: error.message 
    });
  }
} 