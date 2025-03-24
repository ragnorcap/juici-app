"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const uuid_1 = require("uuid");
const supabase_1 = require("./lib/supabase");
const db_1 = require("./lib/db");
const openai_1 = require("openai");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5555;
// Trust proxy when deployed (needed for Vercel)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}
// Generate API key if not already set
const API_KEY = process.env.API_KEY || 'juici_dev_' + (0, uuid_1.v4)().replace(/-/g, '');
if (!process.env.API_KEY) {
    console.warn('⚠️ API_KEY not set in environment variables, generated temporary key:', API_KEY);
    console.warn('⚠️ This key will change on server restart, set a permanent API_KEY in your .env file');
}
// Security middleware
app.use((0, helmet_1.default)()); // Set security headers
// Configure CORS
const allowedOrigins = [
    'http://localhost:3000',
    'https://juici-i5xkdt0f2-animas-projects-01c16ea7.vercel.app',
    'https://juici-app.vercel.app'
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Api-Key', 'X-Request-ID']
}));
// Rate limiting
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    skip: (req, res) => {
        // Skip rate limiting for health check and OPTIONS requests
        return req.path === '/health' || req.method === 'OPTIONS';
    }
});
// Apply rate limiting to all requests
app.use(apiLimiter);
// API Key verification middleware
const verifyApiKey = (req, res, next) => {
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
// Add API key validation
app.use(verifyApiKey);
app.use(express_1.default.json({ limit: '50kb' })); // Limit payload size to prevent DOS
// Request logging with unique ID
app.use((req, res, next) => {
    const requestId = (0, uuid_1.v4)();
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
const promptsFilePath = path_1.default.join(__dirname, '../../data/prompts.json');
let prompts = [];
try {
    const promptsData = JSON.parse(fs_1.default.readFileSync(promptsFilePath, 'utf-8'));
    prompts = promptsData.prompts;
    console.log(`✅ Loaded ${prompts.length} prompts from ${promptsFilePath}`);
}
catch (error) {
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
app.get('/api/random-prompt', (req, res) => {
    try {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];
        res.json({
            prompt: randomPrompt,
            index: randomIndex,
            total: prompts.length
        });
    }
    catch (error) {
        console.error('Error fetching random prompt:', error);
        // Generic error message to avoid information leakage
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API Route to get all prompts
app.get('/api/prompts', (req, res) => {
    try {
        res.json({
            prompts: prompts,
            total: prompts.length
        });
    }
    catch (error) {
        console.error('Error fetching all prompts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Input validation for PRD generation
const validatePRDRequest = (req, res, next) => {
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
app.post('/api/generate-prd', validatePRDRequest, async (req, res) => {
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
            const openai = new openai_1.OpenAI({
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
        }
        catch (openaiError) {
            console.error('OpenAI API error:', openaiError);
            // Generic error message to avoid information leakage
            return res.status(500).json({
                error: 'Error generating content',
                fallbackContent: `# Product Requirements Document: ${idea}\n\n## Overview\nThis is a fallback PRD due to an API error. Please try again later.`
            });
        }
    }
    catch (error) {
        console.error('Error generating PRD:', error);
        // Generic error message to avoid information leakage
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Input validation for favorites
const validateUserIdParam = (req, res, next) => {
    const userId = req.params.userId || req.query.userId;
    if (!userId || typeof userId !== 'string' || userId.length > 100) {
        return res.status(400).json({ error: 'Valid user ID is required' });
    }
    next();
};
// API Route to get user favorites
app.get('/api/favorites/:userId', validateUserIdParam, async (req, res) => {
    try {
        const { userId } = req.params;
        const { data, error } = await (0, supabase_1.getFavorites)(userId);
        if (error) {
            throw error;
        }
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching favorites:', error);
        // Generic error message to avoid information leakage
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Input validation for favorites
const validateFavoriteBody = (req, res, next) => {
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
        req.body.categories = categories.map((c) => typeof c === 'string' ? c.trim().substring(0, 50) : '').filter((c) => c.length > 0);
    }
    next();
};
// API Route to add a favorite
app.post('/api/favorites', validateFavoriteBody, async (req, res) => {
    try {
        const { userId, prompt, categories } = req.body;
        const { data, error } = await (0, supabase_1.addFavorite)(userId, prompt, categories);
        if (error) {
            throw error;
        }
        if (data && data.length > 0) {
            res.status(201).json(data[0]);
        }
        else {
            throw new Error('Failed to save favorite');
        }
    }
    catch (error) {
        console.error('Error saving favorite:', error);
        // Generic error message to avoid information leakage
        res.status(500).json({ error: 'Internal server error' });
    }
});
// API Route to get all favorites
app.get('/api/favorites', validateUserIdParam, async (req, res) => {
    try {
        const userId = req.query.userId;
        const { data, error } = await (0, supabase_1.getFavorites)(userId);
        if (error) {
            throw error;
        }
        res.json(data);
    }
    catch (error) {
        console.error('Error loading favorites:', error);
        // Generic error message to avoid information leakage
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Input validation for favorite ID
const validateFavoriteId = (req, res, next) => {
    const id = req.params.id;
    // Check if id is a valid number
    if (!id || isNaN(parseInt(id))) {
        return res.status(400).json({ error: 'Valid favorite ID is required' });
    }
    next();
};
// API Route to remove a favorite
app.delete('/api/favorites/:id', validateFavoriteId, async (req, res) => {
    try {
        const id = req.params.id;
        // Get user ID from query param or default to a UUID validation check
        const userId = req.query.userId || '00000000-0000-0000-0000-000000000000';
        const { error } = await (0, supabase_1.removeFavorite)(parseInt(id), userId);
        if (error) {
            throw error;
        }
        console.log(`Deleted favorite with ID ${id}`);
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting favorite:', error);
        // Generic error message to avoid information leakage
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Health check route (does not expose sensitive information)
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Juici API is running',
        // Don't expose detailed information in production
        ...(process.env.NODE_ENV !== 'production' && {
            database: db_1.isDbConnected ? 'connected' : 'using in-memory fallback',
            openai: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' ? 'configured' : 'not configured',
            prompts: prompts.length
        })
    });
});
// Add an identical route under /api/health for frontend compatibility
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Juici API is running',
        // Don't expose detailed information in production
        ...(process.env.NODE_ENV !== 'production' && {
            database: db_1.isDbConnected ? 'connected' : 'using in-memory fallback',
            openai: process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here' ? 'configured' : 'not configured',
            prompts: prompts.length
        })
    });
});
// Catch-all for undefined routes to prevent path enumeration
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not Found' });
});
// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Start the server only if running directly (not when imported as a module)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🧃 Juici API server running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/health`);
        if (!db_1.isDbConnected) {
            console.warn('⚠️ Running with in-memory database - favorites will not persist across server restarts');
        }
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
            console.warn('⚠️ OpenAI API key not configured - PRD generation will use sample responses');
        }
    });
}
// Export the app for serverless functions
exports.default = app;
