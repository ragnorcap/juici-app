"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const validation_1 = require("../utils/validation");
const userService_1 = require("../services/userService");
const router = (0, express_1.Router)();
// Sign up
router.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Validate input
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                error: 'Email, password, and name are required',
            });
        }
        if (!(0, validation_1.validateEmail)(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format',
            });
        }
        if (!(0, validation_1.validatePassword)(password)) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long and contain at least one number and one special character',
            });
        }
        // Create user in Supabase
        const { data: userData, error: signUpError } = await supabase_1.supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });
        if (signUpError)
            throw signUpError;
        // Create user preferences
        if (userData.user) {
            await (0, userService_1.createUserPreferences)(userData.user.id);
        }
        res.json({
            success: true,
            data: {
                user: userData.user,
                session: userData.session,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message || 'Failed to create account',
        });
    }
});
// Sign in
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required',
            });
        }
        const { data, error } = await supabase_1.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            throw error;
        res.json({
            success: true,
            data: {
                user: data.user,
                session: data.session,
            },
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err.message || 'Invalid credentials',
        });
    }
});
// Sign out
router.post('/signout', async (req, res) => {
    try {
        const { error } = await supabase_1.supabase.auth.signOut();
        if (error)
            throw error;
        res.json({
            success: true,
            message: 'Successfully signed out',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message || 'Failed to sign out',
        });
    }
});
// Get current user
router.get('/user', async (req, res) => {
    try {
        const { data: { user }, error } = await supabase_1.supabase.auth.getUser();
        if (error)
            throw error;
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Not authenticated',
            });
        }
        res.json({
            success: true,
            data: { user },
        });
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err.message || 'Not authenticated',
        });
    }
});
// Reset password request
router.post('/reset-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                error: 'Email is required',
            });
        }
        const { error } = await supabase_1.supabase.auth.resetPasswordForEmail(email);
        if (error)
            throw error;
        res.json({
            success: true,
            message: 'Password reset email sent',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message || 'Failed to send reset password email',
        });
    }
});
// Update password
router.post('/update-password', async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({
                success: false,
                error: 'New password is required',
            });
        }
        if (!(0, validation_1.validatePassword)(password)) {
            return res.status(400).json({
                success: false,
                error: 'Password must be at least 8 characters long and contain at least one number and one special character',
            });
        }
        const { error } = await supabase_1.supabase.auth.updateUser({
            password,
        });
        if (error)
            throw error;
        res.json({
            success: true,
            message: 'Password updated successfully',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message || 'Failed to update password',
        });
    }
});
exports.default = router;
