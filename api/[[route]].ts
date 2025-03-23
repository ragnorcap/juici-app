// This is a catch-all API route handler for Vercel serverless functions
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import * as dotenv from 'dotenv';

// Import our Express app as the handler
import app from '../backend/src/index';

// Ensure environment variables are loaded
dotenv.config();

// Export a serverless function handler
export default async function handler(req, res) {
  // Just proxy all API requests to our Express application
  await app(req, res);
}

// Specify the runtime for this serverless function
export const config = {
  runtime: 'nodejs18.x',
}; 