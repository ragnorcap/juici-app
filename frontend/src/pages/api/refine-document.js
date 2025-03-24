// API endpoint for refining documents with AI
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
    const { docType, content, refinementRequest } = req.body;
    
    if (!docType || !content || !refinementRequest) {
      return res.status(400).json({ 
        error: 'Missing required fields: docType, content, and refinementRequest are required'
      });
    }
    
    console.log(`Refining ${docType} document with request: ${refinementRequest}`);
    
    // For development/demo purposes, return a mock response
    // In production, replace with actual OpenAI API call
    const aiResponse = `I've analyzed your ${docType} document and can refine it based on your request. I'll focus on making the document more concise and actionable while keeping the 4-hour implementation timeline realistic.

Would you like me to emphasize any particular section of the document?`;
    
    // Return the AI response
    return res.status(200).json({ 
      response: aiResponse,
      message: 'Refinement request processed successfully'
    });
    
  } catch (error) {
    console.error('Error processing refinement request:', error);
    return res.status(500).json({ 
      error: 'Failed to process refinement request', 
      details: error.message 
    });
  }
} 