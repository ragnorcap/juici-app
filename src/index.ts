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
const port = process.env.PORT || 3001;

// Default development API key
const API_KEY = process.env.API_KEY || 'juici_dev_key';

// CORS configuration
const corsOptions = {
  origin: process.env.VERCEL_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// API Key verification middleware
const verifyApiKey = (req: Request, res: Response, next: NextFunction) => {
  // Skip API key check for health check
  if (req.path === '/health') {
    return next();
  }
  
  const providedKey = req.headers['x-api-key'];
  
  if (!providedKey || providedKey !== API_KEY) {
    console.log('Invalid API key provided:', providedKey);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

// Apply API key verification to all routes except health check
app.use(verifyApiKey);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

// Prompts endpoint
app.get('/api/prompts', (req: Request, res: Response) => {
  try {
    const promptsPath = path.join(__dirname, '..', 'data', 'prompts.json');
    const promptsData = fs.readFileSync(promptsPath, 'utf-8');
    const prompts = JSON.parse(promptsData);
    res.json(prompts);
  } catch (error) {
    console.error('Error reading prompts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Replace the Azure OpenAI client with regular OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Save to idea history
try {
  const { data } = await supabase.auth.getUser(req.headers.authorization?.split(' ')[1]);
  if (data?.user) {
    await supabase.from('idea_history').insert({
      user_id: data.user.id,
      idea_text: idea,
      generated_prd: prdContent,
    });
  }
} catch (error) {
  console.error('Error saving to idea history:', error);
  res.status(500).json({ error: 'Internal Server Error' });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 