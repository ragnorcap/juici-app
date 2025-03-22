import axios from 'axios';
import { API_BASE_URL, getSecurityHeaders, handleApiError, REQUEST_TIMEOUT } from './config';

// Rate limiting to prevent abuse
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 500; // ms

/**
 * Gets a random idea prompt from the backend
 * Implements rate limiting and timeout protection
 */
export const getRandomIdea = async (currentIdea?: string) => {
  try {
    // Apply rate limiting
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL));
    }
    lastRequestTime = Date.now();
    
    // Make the request with security headers and timeout
    const response = await axios.get(`${API_BASE_URL}/api/random-prompt`, {
      headers: getSecurityHeaders(),
      timeout: REQUEST_TIMEOUT,
      params: currentIdea ? { refine: currentIdea } : {}
    });
    
    return {
      data: {
        prompt: response.data.prompt,
        categories: []
      },
      error: null
    };
  } catch (error: any) {
    console.error('Error fetching random idea:', error);
    return {
      data: null,
      error: handleApiError(error)
    };
  }
}; 