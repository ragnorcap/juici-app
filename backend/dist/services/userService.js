"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavorite = exports.addToHistory = exports.getUserHistory = exports.updateUserPreferences = exports.getUserPreferences = exports.createUserPreferences = void 0;
const supabase_1 = require("../lib/supabase");
const createUserPreferences = async (userId) => {
    try {
        const { error } = await supabase_1.supabase
            .from('user_preferences')
            .insert([
            {
                user_id: userId,
                theme: 'light',
                notification_enabled: true,
                created_at: '2025-03-20T12:00:00Z',
                updated_at: '2025-03-20T12:00:00Z',
            },
        ]);
        if (error)
            throw error;
    }
    catch (err) {
        console.error('Error creating user preferences:', err);
        throw err;
    }
};
exports.createUserPreferences = createUserPreferences;
const getUserPreferences = async (userId) => {
    try {
        const { data, error } = await supabase_1.supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', userId)
            .single();
        if (error)
            throw error;
        return data;
    }
    catch (err) {
        console.error('Error fetching user preferences:', err);
        throw err;
    }
};
exports.getUserPreferences = getUserPreferences;
const updateUserPreferences = async (userId, preferences) => {
    try {
        const { error } = await supabase_1.supabase
            .from('user_preferences')
            .update({
            ...preferences,
            updated_at: '2025-03-20T12:00:00Z',
        })
            .eq('user_id', userId);
        if (error)
            throw error;
    }
    catch (err) {
        console.error('Error updating user preferences:', err);
        throw err;
    }
};
exports.updateUserPreferences = updateUserPreferences;
const getUserHistory = async (userId) => {
    try {
        const { data, error } = await supabase_1.supabase
            .from('idea_history')
            .select('*')
            .eq('user_id', userId)
            .order('generated_at', { ascending: false });
        if (error)
            throw error;
        return data;
    }
    catch (err) {
        console.error('Error fetching user history:', err);
        throw err;
    }
};
exports.getUserHistory = getUserHistory;
const addToHistory = async (userId, ideaData) => {
    try {
        const { error } = await supabase_1.supabase
            .from('idea_history')
            .insert([
            {
                user_id: userId,
                ...ideaData,
                generated_at: '2025-03-20T12:00:00Z',
            },
        ]);
        if (error)
            throw error;
    }
    catch (err) {
        console.error('Error adding to history:', err);
        throw err;
    }
};
exports.addToHistory = addToHistory;
const toggleFavorite = async (userId, ideaId) => {
    try {
        const { data, error: fetchError } = await supabase_1.supabase
            .from('idea_history')
            .select('favorite')
            .eq('id', ideaId)
            .eq('user_id', userId)
            .single();
        if (fetchError)
            throw fetchError;
        const { error: updateError } = await supabase_1.supabase
            .from('idea_history')
            .update({
            favorite: !data.favorite,
            updated_at: '2025-03-20T12:00:00Z',
        })
            .eq('id', ideaId)
            .eq('user_id', userId);
        if (updateError)
            throw updateError;
    }
    catch (err) {
        console.error('Error toggling favorite:', err);
        throw err;
    }
};
exports.toggleFavorite = toggleFavorite;
