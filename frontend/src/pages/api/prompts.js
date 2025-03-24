// API endpoint for fetching prompts
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Read the prompts data from the file
    const dataPath = path.join(process.cwd(), 'public', 'data', 'prompts.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const promptsData = JSON.parse(fileContents);
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Return the prompts data
    res.status(200).json(promptsData);
  } catch (error) {
    console.error('API Error:', error);
    
    // Set appropriate headers for error response
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Return error response
    res.status(500).json({ 
      error: 'Failed to load prompts',
      details: error.message
    });
  }
} 