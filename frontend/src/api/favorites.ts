import axios from 'axios';
import { API_BASE_URL, getSecurityHeaders, handleApiError, REQUEST_TIMEOUT } from './config';

/**
 * Saves a favorite prompt for the user
 * Implements input validation and security measures
 */
export const saveFavorite = async (userId: string, prompt: string, categories: string[] = []) => {
  try {
    // Basic input validation
    if (!userId || !prompt) {
      throw new Error('User ID and prompt are required');
    }
    
    if (prompt.length > 1000) {
      throw new Error('Prompt exceeds maximum length (1000 characters)');
    }
    
    if (categories.length > 10) {
      throw new Error('Too many categories (maximum 10)');
    }
    
    // Sanitize inputs
    const sanitizedCategories = categories
      .map(c => c.trim())
      .filter(c => c.length > 0 && c.length <= 50);
    
    const sanitizedPrompt = prompt.trim();
    
    // Make the request with security headers and timeout
    const response = await axios.post(`${API_BASE_URL}/api/favorites`, 
      {
        userId,
        prompt: sanitizedPrompt,
        categories: sanitizedCategories
      },
      {
        headers: getSecurityHeaders(),
        timeout: REQUEST_TIMEOUT
      }
    );
    
    return {
      data: response.data,
      error: null
    };
  } catch (error: any) {
    console.error('Error saving favorite:', error);
    return {
      data: null,
      error: handleApiError(error)
    };
  }
};

/**
 * Retrieves all favorites for a user
 * Implements security measures and caching
 */
export const getFavorites = async (userId: string) => {
  try {
    // Input validation
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    // Make the request with security headers and timeout
    const response = await axios.get(`${API_BASE_URL}/api/favorites?userId=${encodeURIComponent(userId)}`, {
      headers: getSecurityHeaders(),
      timeout: REQUEST_TIMEOUT
    });
    
    return {
      data: response.data,
      error: null
    };
  } catch (error: any) {
    console.error('Error loading favorites:', error);
    return {
      data: null,
      error: handleApiError(error)
    };
  }
};

/**
 * Deletes a favorite by ID
 * Implements security measures and validation
 */
export const deleteFavorite = async (id: number) => {
  try {
    // Input validation
    if (isNaN(id) || id <= 0) {
      throw new Error('Valid ID is required');
    }
    
    // Make the request with security headers and timeout
    const response = await axios.delete(`${API_BASE_URL}/api/favorites/${id}`, {
      headers: getSecurityHeaders(),
      timeout: REQUEST_TIMEOUT
    });
    
    return {
      data: response.data,
      error: null
    };
  } catch (error: any) {
    console.error('Error deleting favorite:', error);
    return {
      data: null,
      error: handleApiError(error)
    };
  }
}; 