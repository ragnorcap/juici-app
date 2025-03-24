import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { v4 as uuidv4 } from 'uuid';
import { supabase, getFavorites, addFavorite, removeFavorite } from './lib/supabase';
import { isDbConnected } from './lib/db';
import { OpenAI } from 'openai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5555;

// Trust proxy when deployed (needed for Vercel)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Generate API key if not already set
const API_KEY = process.env.API_KEY || 'juici_dev_' + uuidv4().replace(/-/g, '');
if (!process.env.API_KEY) {
  console.warn('⚠️ API_KEY not set in environment variables, generated temporary key:', API_KEY);
  console.warn('⚠️ This key will change on server restart, set a permanent API_KEY in your .env file');
}

// Security middleware
app.use(helmet()); // Set security headers

// Configure CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://www.juici.space',
  'https://juici.space',
  'https://juici-i4lge2juy-animas-projects-01c16ea7.vercel.app'
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      callback(null, true);
      return;
    }

    // Check if the origin matches any of our allowed domains
    const isAllowed = allowedOrigins.some(allowed => {
      // For www.juici.space, allow any path
      if (allowed === 'https://www.juici.space') {
        return origin.startsWith(allowed);
      }
      return origin === allowed;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50kb' })); // Limit payload size to prevent DOS

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  skip: (req: Request, res: Response) => {
    // Skip rate limiting for health check and OPTIONS requests
    return req.path === '/health' || req.method === 'OPTIONS';
  }
});

// Apply rate limiting to all requests
app.use(apiLimiter);

// API Key verification middleware
const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  // Skip API key check for health check
  if (req.path === '/health') {
    return next();
  }
  
  const providedKey = req.headers['x-api-key'];
  
  // In development mode or when deployed to Vercel preview, be more permissive
  if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'preview') {
    console.log('Development environment: Skipping strict API key validation');
    return next();
  }
  
  if (!providedKey || providedKey !== API_KEY) {
    // Use a generic error message to avoid information leakage
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Apply API key verification to all routes except health check
app.use(verifyApiKey);

// Request logging with unique ID
app.use((req: Request, res: Response, next: NextFunction) => {
  const requestId = uuidv4();
  res.setHeader('X-Request-ID', requestId);
  
  // Log basic request info without sensitive data
  console.log(`[${requestId}] ${req.method} ${req.path} - ${new Date().toISOString()}`);
  
  // Log complete request end
  res.on('finish', () => {
    console.log(`[${requestId}] ${res.statusCode} ${res.statusMessage}`);
  });
  
  next();
});

// Read prompts from JSON file
const promptsFilePath = path.join(__dirname, '../../data/prompts.json');
let prompts: string[] = [];

try {
  const promptsData = JSON.parse(fs.readFileSync(promptsFilePath, 'utf-8'));
  prompts = promptsData.prompts;
  console.log(`✅ Loaded ${prompts.length} prompts from ${promptsFilePath}`);
} catch (error) {
  console.error('Error loading prompts file:', error);
  // Fallback prompts if file can't be read
  prompts = [
    "Create a dashboard for FRED inflation data.",
    "Build an AI writer tool to enhance your writing.",
    "Develop a personal finance tracker with expense categorization.",
    "Create a weather forecast app using public API data.",
    "Build a social media sentiment analyzer for trending topics."
  ];
  console.log(`⚠️ Using ${prompts.length} fallback prompts`);
}

// API Route to get a random prompt
app.get('/api/random-prompt', (req: Request, res: Response) => {
  try {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex];
    
    res.json({ 
      prompt: randomPrompt,
      index: randomIndex,
      total: prompts.length
    });
  } catch (error) {
    console.error('Error fetching random prompt:', error);
    // Generic error message to avoid information leakage
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route to get all prompts
app.get('/api/prompts', (req: Request, res: Response) => {
  try {
    res.json({ 
      prompts: prompts,
      total: prompts.length
    });
  } catch (error) {
    console.error('Error fetching all prompts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Input validation for PRD generation
const validatePRDRequest = (req: Request, res: Response, next: NextFunction) => {
  const { idea } = req.body;
  
  if (!idea || typeof idea !== 'string') {
    return res.status(400).json({ error: 'Valid idea prompt is required' });
  }
  
  if (idea.length > 1000) {
    return res.status(400).json({ error: 'Idea prompt exceeds maximum length (1000 characters)' });
  }
  
  // Sanitize input
  req.body.idea = idea.trim();
  
  next();
};

// API Route to generate a PRD
app.post('/api/generate-prd', validatePRDRequest, async (req: Request, res: Response) => {
  try {
    const { idea } = req.body;
    
    // Use OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      console.warn('⚠️ OpenAI API key not configured or using placeholder value');
      // Return a sample PRD for development
      return res.json({ 
        prd: `# Product Requirements Document: ${idea}\n\n## Overview\nThis is a sample PRD for development purposes. To generate real PRDs, configure your OpenAI API key.\n\n## Features\n- Feature 1\n- Feature 2\n\n## Technical Requirements\n- Requirement 1\n- Requirement 2`
      });
    }
    
    try {
      const openai = new OpenAI({
        apiKey: apiKey
      });
      
      // Use GPT-4o-mini model for PRD generation
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { 
            role: "system", 
            content: "You are a professional product manager who creates detailed Product Requirements Documents (PRDs). Create a comprehensive PRD for the following product idea."
          },
          { 
            role: "user", 
            content: `Generate a detailed PRD for the following idea: ${idea}` 
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });
      
      const prdContent = completion.choices[0].message.content;
      
      res.json({ prd: prdContent });
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      // Generic error message to avoid information leakage
      return res.status(500).json({
        error: 'Error generating content',
        fallbackContent: `# Product Requirements Document: ${idea}\n\n## Overview\nThis is a fallback PRD due to an API error. Please try again later.`
      });
    }
  } catch (error) {
    console.error('Error generating PRD:', error);
    // Generic error message to avoid information leakage
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Input validation for favorites
const validateUserIdParam = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId || req.query.userId;
  
  if (!userId || typeof userId !== 'string' || userId.length > 100) {
    return res.status(400).json({ error: 'Valid user ID is required' });
  }
  
  next();
};

// API Route to get user favorites
app.get('/api/favorites/:userId', validateUserIdParam, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const { data, error } = await getFavorites(userId);
    
    if (error) {
      throw error;
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    // Generic error message to avoid information leakage
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Input validation for favorites
const validateFavoriteBody = (req: Request, res: Response, next: NextFunction) => {
  const { userId, prompt, categories } = req.body;
  
  if (!userId || typeof userId !== 'string' || userId.length > 100) {
    return res.status(400).json({ error: 'Valid user ID is required' });
  }
  
  if (!prompt || typeof prompt !== 'string' || prompt.length > 1000) {
    return res.status(400).json({ error: 'Valid prompt is required (max 1000 characters)' });
  }
  
  if (categories && (!Array.isArray(categories) || categories.length > 10)) {
    return res.status(400).json({ error: 'Categories must be an array with max 10 items' });
  }
  
  // Sanitize input
  if (categories) {
    req.body.categories = categories.map((c: any) => 
      typeof c === 'string' ? c.trim().substring(0, 50) : ''
    ).filter((c: string) => c.length > 0);
  }
  
  next();
};

// API Route to add a favorite
app.post('/api/favorites', validateFavoriteBody, async (req: Request, res: Response) => {
  try {
    const { userId, prompt, categories } = req.body;

    const { data, error } = await addFavorite(userId, prompt, categories);
    
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      res.status(201).json(data[0]);
    } else {
      throw new Error('Failed to save favorite');
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
    // Generic error message to avoid information leakage
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API Route to get all favorites
app.get('/api/favorites', validateUserIdParam, async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    
    const { data, error } = await getFavorites(userId);
    
    if (error) {
      throw error;
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error loading favorites:', error);
    // Generic error message to avoid information leakage
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Input validation for favorite ID
const validateFavoriteId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  
  // Check if id is a valid number
  if (!id || isNaN(parseInt(id))) {
    return res.status(400).json({ error: 'Valid favorite ID is required' });
  }
  
  next();
};

// API Route to remove a favorite
app.delete('/api/favorites/:id', validateFavoriteId, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // Get user ID from query param or default to a UUID validation check
    const userId = req.query.userId as string || '00000000-0000-0000-0000-000000000000';
    
    const { error } = await removeFavorite(parseInt(id), userId);
    
    if (error) {
      throw error;
    }
    
    console.log(`Deleted favorite with ID ${id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    // Generic error message to avoid information leakage
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check route (does not expose sensitive information)
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Juici API is running',
    // Don't expose detailed information in production
    ...(process.env.NODE_ENV !== 'production' && {
      database: isDbConnected ? 'connected' : 'using in-memory fallback',
      openai: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' ? 'configured' : 'not configured',
      prompts: prompts.length
    })
  });
});

// Add an identical route under /api/health for frontend compatibility
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    message: 'Juici API is running',
    // Don't expose detailed information in production
    ...(process.env.NODE_ENV !== 'production' && {
      database: isDbConnected ? 'connected' : 'using in-memory fallback',
      openai: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' ? 'configured' : 'not configured',
      prompts: prompts.length
    })
  });
});

// Catch-all for undefined routes to prevent path enumeration
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server only if running directly (not when imported as a module)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🧃 Juici API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    
    if (!isDbConnected) {
      console.warn('⚠️ Running with in-memory database - favorites will not persist across server restarts');
    }
    
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.warn('⚠️ OpenAI API key not configured - PRD generation will use sample responses');
    }
  });
}

// Export the app for serverless functions
export default app; 