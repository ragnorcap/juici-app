"use strict";
/**
 * DB connection module - now just a wrapper around Supabase
 * Note: This file exists for backward compatibility with existing imports
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDbConnected = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const supabase_1 = require("./supabase");
// Load environment variables
dotenv_1.default.config();
// Track connection state
let isDbConnected = false;
exports.isDbConnected = isDbConnected;
// Initialize the Supabase connection
const initializeDbConnection = async () => {
    try {
        console.log('Initializing Supabase client...');
        // Test the connection with a simple query
        const { error } = await supabase_1.supabase
            .from('favorites')
            .select('id', { count: 'exact', head: true });
        if (error) {
            console.error('Error connecting to Supabase:', error.message);
            exports.isDbConnected = isDbConnected = false;
            console.warn('⚠️ Using mock data in development mode');
            return false;
        }
        else {
            console.log('✅ Supabase connection successful');
            console.log('✅ Using Supabase for database persistence');
            exports.isDbConnected = isDbConnected = true;
            return true;
        }
    }
    catch (error) {
        console.error('Failed to initialize database:', error instanceof Error ? error.message : 'Unknown error');
        exports.isDbConnected = isDbConnected = false;
        return false;
    }
};
// Initialize the connection
initializeDbConnection().catch(err => {
    console.error('Database initialization error:', err);
    exports.isDbConnected = isDbConnected = false;
});
// Graceful shutdown handler
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing database connections');
    process.exit(0);
});
process.on('SIGINT', async () => {
    console.log('SIGINT received, closing database connections');
    process.exit(0);
});
