// API endpoint for generating implementation plan document
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
    
    console.log('Generating Implementation Plan based on PRD');
    
    // For development/demo purposes, return a mock response
    // In production, replace with actual OpenAI API call
    const implementationPlanContent = `# Implementation Plan (4-Hour Timeline)

## Overview
This implementation plan is designed for rapid execution, delivering a functional MVP within a 4-hour window. The focus is on creating core value while maintaining quality.

## Hour 1: Setup & Infrastructure (0:00-1:00)

### Tasks
- [ ] **Project Initialization** (15 min)
  - Create repository
  - Set up development environment
  - Initialize project structure

- [ ] **Environment Configuration** (15 min)
  - Configure build tools
  - Set up environment variables
  - Prepare deployment pipeline

- [ ] **Core Dependencies** (15 min)
  - Install essential packages
  - Configure TypeScript/ESLint
  - Set up testing framework

- [ ] **Database Setup** (15 min)
  - Create database schema
  - Set up authentication tables
  - Configure connection

## Hour 2: Backend Development (1:00-2:00)

### Tasks
- [ ] **API Framework** (20 min)
  - Create API routes structure
  - Set up middleware (auth, logging)
  - Implement error handling

- [ ] **Core Data Models** (20 min)
  - Implement data models
  - Set up validators
  - Create database queries

- [ ] **Authentication** (20 min)
  - Implement login/signup
  - Set up JWT handling
  - Create protected routes

## Hour 3: Frontend Development (2:00-3:00)

### Tasks
- [ ] **UI Component Framework** (20 min)
  - Create base components
  - Set up styling system
  - Implement responsive layouts

- [ ] **Core Views** (25 min)
  - Implement main application views
  - Create navigation structure
  - Set up routing

- [ ] **State Management** (15 min)
  - Configure global state
  - Set up API integration
  - Implement error handling

## Hour 4: Integration & Deployment (3:00-4:00)

### Tasks
- [ ] **Connect Frontend to Backend** (15 min)
  - Integrate API calls
  - Implement data fetching
  - Set up authentication flow

- [ ] **Testing** (15 min)
  - Run essential tests
  - Fix critical issues
  - Verify core functionality

- [ ] **Optimization** (15 min)
  - Optimize assets
  - Improve performance
  - Remove unused code

- [ ] **Deployment** (15 min)
  - Deploy backend
  - Deploy frontend
  - Verify production environment

## Success Criteria
- Basic authentication works
- Core user flows function correctly
- Data is properly stored and retrieved
- UI is responsive and functional
- Application can be accessed online

## Post-Implementation
- Document known limitations
- Outline next development priorities
- Collect initial feedback

This implementation plan maximizes productivity while ensuring quality delivery within the 4-hour constraint.`;

    // Return the generated implementation plan
    return res.status(200).json({ 
      content: implementationPlanContent,
      message: 'Implementation plan successfully generated'
    });
    
  } catch (error) {
    console.error('Error generating implementation plan:', error);
    return res.status(500).json({ 
      error: 'Failed to generate implementation plan', 
      details: error.message 
    });
  }
} 