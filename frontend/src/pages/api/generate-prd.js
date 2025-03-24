// API endpoint for generating PRDs
import { Configuration, OpenAIApi } from 'openai';

// Configure OpenAI with API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
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
    // Get idea data from request body
    const { idea } = req.body;
    
    if (!idea || !idea.title) {
      return res.status(400).json({ error: 'Invalid idea data' });
    }
    
    // Log request for debugging
    console.log(`Generating PRD for idea: ${idea.title}`);
    
    // Generate the PRD using OpenAI
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(idea),
      max_tokens: 2000,
      temperature: 0.7,
    });
    
    // Get the generated text
    const prdContent = completion.data.choices[0].text.trim();
    
    // Return the generated PRD
    return res.status(200).json({
      prdContent,
      idea: idea.title,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('PRD Generation Error:', error);
    
    // Handle and return appropriate error response
    return res.status(500).json({
      error: 'Failed to generate PRD',
      details: error.response ? error.response.data : error.message
    });
  }
}

// Function to generate prompt for the OpenAI API
function generatePrompt(idea) {
  const categories = idea.categories ? idea.categories.join(', ') : 'general';
  const description = idea.description || idea.prompt || idea.title;
  
  return `Generate a comprehensive Product Requirements Document (PRD) for the following product idea:
  
Title: ${idea.title}
Categories: ${categories}
Description: ${description}

The PRD should be formatted in Markdown and include the following sections:
- Overview
- Problem Statement
- Proposed Solution
- Target Audience
- Features (MVP)
- Success Metrics
- Timeline
- Technical Requirements
- Future Considerations

Make the PRD detailed, professional, and realistic for a product that could actually be built.`;
} 