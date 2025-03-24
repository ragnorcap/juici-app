import axios from 'axios';
import { API_BASE_URL, getSecurityHeaders, handleApiError, REQUEST_TIMEOUT, obfuscateData } from './config';

// Anti-abuse measures
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 5000; // 5 seconds between PRD generations to prevent abuse

/**
 * Generates a PRD for a given idea prompt
 * Uses the backend API which connects to the OpenAI GPT-4o-mini model
 * Implements rate limiting and security measures
 */
export const generatePRD = async (idea: string) => {
  try {
    // Input validation
    if (!idea || typeof idea !== 'string') {
      throw new Error('Valid idea prompt is required');
    }
    
    if (idea.length > 1000) {
      throw new Error('Idea prompt exceeds maximum length (1000 characters)');
    }
    
    // Rate limiting for expensive operations
    const now = Date.now();
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
      const waitTime = MIN_REQUEST_INTERVAL - (now - lastRequestTime);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    lastRequestTime = Date.now();
    
    // Log sanitized request for debugging (no sensitive data)
    console.log('Sending PRD generation request:', obfuscateData({ idea }));
    
    // Make the request with security headers and extended timeout (PRD generation takes longer)
    const response = await axios.post(
      `${API_BASE_URL}/api/prd/generate`, 
      { idea: idea.trim() },
      {
        headers: getSecurityHeaders(),
        timeout: REQUEST_TIMEOUT * 2 // Double timeout for PRD generation
      }
    );
    
    if (!response.data || !response.data.prd) {
      throw new Error('No PRD content returned from the API');
    }
    
    return {
      data: response.data.prd,
      error: null
    };
  } catch (error) {
    console.error('Error generating PRD:', error);
    return {
      data: null,
      error: handleApiError(error)
    };
  }
}; 