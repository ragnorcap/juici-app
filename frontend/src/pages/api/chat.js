// API endpoint for chat interactions with the AI assistant
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
    const { docType, content, message } = req.body;
    
    if (!docType || !content || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: docType, content, and message are required'
      });
    }
    
    console.log(`Chat request for ${docType} document: ${message}`);
    
    // For development/demo purposes, return different mock responses based on the message content
    // In production, replace with actual OpenAI API call
    let aiResponse = '';
    let updatedContent = null;
    
    if (message.toLowerCase().includes('more detail')) {
      aiResponse = `I've added more detail to the ${docType} document. The updated version now includes additional information about implementation steps and technology considerations.`;
      
      // Simulate updating the content
      updatedContent = content + `\n\n## Additional Details (Added Per Request)
      
### Detailed Implementation Steps
1. Set up the project repository with proper structure
2. Configure development environment with necessary tools
3. Implement core functionality following best practices
4. Test thoroughly to ensure quality
5. Deploy using streamlined processes

### Technology Considerations
- **Scalability**: The solution is designed to scale with user growth
- **Maintainability**: Code is well-structured for future development
- **Performance**: Optimized for quick loading and response times`;
    } 
    else if (message.toLowerCase().includes('simplify') || message.toLowerCase().includes('simpler')) {
      aiResponse = `I've simplified the ${docType} document to make it more concise and easier to follow. The core information remains while reducing unnecessary details.`;
      
      // Simulate updating the content by removing some sections
      updatedContent = content.split('\n\n').slice(0, 3).join('\n\n') + `\n\n## Simplified Implementation Plan
      
### Setup & Core Development (2 hours)
- Initialize project and environment
- Implement essential backend functionality
- Create critical frontend components

### Integration & Deployment (2 hours)
- Connect frontend and backend
- Test core functionality
- Deploy and verify production environment

This simplified approach focuses on delivering the most value within the 4-hour constraint.`;
    }
    else {
      aiResponse = `I understand your request regarding the ${docType} document. Could you provide more specific guidance on what aspects you'd like me to change or improve?`;
    }
    
    // Return the AI response and possibly updated content
    return res.status(200).json({ 
      response: aiResponse,
      updatedContent: updatedContent,
      message: 'Chat message processed successfully'
    });
    
  } catch (error) {
    console.error('Error processing chat message:', error);
    return res.status(500).json({ 
      error: 'Failed to process chat message', 
      details: error.message 
    });
  }
} 