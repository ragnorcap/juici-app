// This file serves as the entry point for Vercel serverless functions
// It loads the backend Express app and forwards requests to it

// Use path to load environment variables from the correct location
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from backend .env file if present
const envPath = path.resolve(__dirname, '../backend/.env');
try {
  dotenv.config({ path: envPath });
  console.log(`Loaded environment variables from ${envPath}`);
} catch (error) {
  console.warn(`Warning: Could not load environment from ${envPath}`, error);
}

// Use CommonJS require for compatibility
const app = require('../backend/dist/index').default;

// Export the Express app as a serverless function handler
module.exports = app; 