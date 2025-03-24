import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

config();

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 