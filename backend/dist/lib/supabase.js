"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorites = exports.updateUserProfile = exports.getUserById = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SECRET || '';
// Create Supabase client with service role key for admin operations
if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    // Don't exit so the app can still work without Supabase during development
    console.warn('Continuing without Supabase functionality');
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
// User management functions
const getUserById = async (userId) => {
    const { data, error } = await exports.supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    return { data, error };
};
exports.getUserById = getUserById;
const updateUserProfile = async (userId, userData) => {
    const { data, error } = await exports.supabase
        .from('profiles')
        .update(userData)
        .eq('id', userId);
    return { data, error };
};
exports.updateUserProfile = updateUserProfile;
// Favorites management functions
const getFavorites = async (userId) => {
    // Development mode - return mock data
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Using test user for favorites');
        console.log(`Retrieving favorites for user ID: ${userId}`);
        // Return empty array for now, will be populated as favorites are added
        return {
            data: [],
            error: null
        };
    }
    // Simple validation for UUID format
    if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        console.error('Invalid user ID format. Expected UUID.');
        return { data: null, error: new Error('Invalid user ID format') };
    }
    try {
        const { data, error } = await exports.supabase
            .from('favorites')
            .select('*')
            .eq('user_id', userId);
        // Ensure categories is always an array
        const processedData = (data || []).map(favorite => ({
            ...favorite,
            categories: Array.isArray(favorite.categories) ? favorite.categories : []
        }));
        console.log(`Retrieved ${processedData.length} favorites for user ${userId.substring(0, 8)}...`);
        return { data: processedData, error };
    }
    catch (err) {
        console.error('Error getting favorites:', err);
        return {
            data: null,
            error: err instanceof Error ?
                err :
                new Error('Unknown error getting favorites')
        };
    }
};
exports.getFavorites = getFavorites;
const addFavorite = async (userId, prompt, categories) => {
    var _a;
    // Simple validation for UUID format - skip for development environment
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Using test user for favorites');
        // For development/testing, we'll log the attempt
        console.log(`Attempting to add favorite for user ID: ${userId}`);
        console.log(`Prompt: ${prompt}`);
        console.log(`Categories: ${JSON.stringify(categories)}`);
        // Return a mock response for development
        const mockData = [{
                id: Math.floor(Math.random() * 1000),
                user_id: userId,
                prompt: prompt,
                categories: categories || [],
                created_at: new Date().toISOString()
            }];
        return { data: mockData, error: null };
    }
    // Production validation
    if (!userId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userId)) {
        console.error('Invalid user ID format. Expected UUID.');
        return { data: null, error: new Error('Invalid user ID format') };
    }
    try {
        const { data, error } = await exports.supabase
            .from('favorites')
            .insert([{
                user_id: userId,
                prompt,
                categories: categories || null
            }])
            .select();
        if (data) {
            console.log(`Added favorite with ID ${(_a = data[0]) === null || _a === void 0 ? void 0 : _a.id} for user ${userId.substring(0, 8)}...`);
        }
        return { data, error };
    }
    catch (err) {
        console.error('Error adding favorite:', err);
        return {
            data: null,
            error: err instanceof Error ?
                err :
                new Error('Unknown error adding favorite')
        };
    }
};
exports.addFavorite = addFavorite;
const removeFavorite = async (id, userId) => {
    // Development mode - mock removal
    if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
        console.log('Development mode: Mocking favorite removal');
        console.log(`Removing favorite ID ${id} for user ID: ${userId}`);
        return { error: null };
    }
    try {
        // Add userId parameter for security
        const { error } = await exports.supabase
            .from('favorites')
            .delete()
            .eq('id', id)
            .eq('user_id', userId); // Only allow deletion if the favorite belongs to the user
        if (!error) {
            console.log(`Removed favorite with ID ${id} for user ${userId.substring(0, 8)}...`);
        }
        return { error };
    }
    catch (err) {
        console.error('Error removing favorite:', err);
        return {
            error: err instanceof Error ?
                err :
                new Error('Unknown error removing favorite')
        };
    }
};
exports.removeFavorite = removeFavorite;
