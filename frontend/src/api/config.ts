/**
 * API configuration module
 * Contains centralized configuration for all API calls and security measures
 */

// Base URL for API requests - use environment variable when available
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

// Maximum request timeout (ms)
export const REQUEST_TIMEOUT = 30000;

// API key for authentication - this should match the one in your backend .env file
// In production, this would be set via environment variables
const API_KEY = 'juici_prod_983467a1b2c3d4e5f6g7h8i9j0';

// Security headers for all requests
export const getSecurityHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    // Add API key for backend authentication
    'X-Api-Key': API_KEY,
    // Add random request ID to help with debugging and prevent caching
    'X-Request-ID': generateRequestId(),
    // Explicitly add CORS headers
    'Access-Control-Request-Headers': 'Content-Type, X-Api-Key, X-Request-ID'
  };

  return headers;
};

// Generate a unique request ID to trace requests
const generateRequestId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Obfuscation function to prevent sensitive data from being logged
export const obfuscateData = (data: any): any => {
  if (!data) return data;
  
  if (typeof data === 'object') {
    const result: any = Array.isArray(data) ? [] : {};
    
    for (const key in data) {
      // Obfuscate sensitive fields
      if (['password', 'token', 'secret', 'key', 'apiKey'].includes(key)) {
        result[key] = '********';
      } else {
        result[key] = obfuscateData(data[key]);
      }
    }
    
    return result;
  }
  
  return data;
};

// Error handler to prevent information leakage
export const handleApiError = (error: any): { message: string } => {
  let message = 'An unexpected error occurred';
  
  if (error.response) {
    // Server responded with non-2xx status
    if (error.response.data && error.response.data.error) {
      message = error.response.data.error;
    } else {
      message = `Request failed with status: ${error.response.status}`;
    }
  } else if (error.request) {
    // Request was made but no response received
    if (error.message === 'Network Error') {
      message = 'Unable to connect to the server. Please check your network connection.';
    } else {
      message = 'No response received from server. The server may be down or unreachable.';
    }
  } else if (error.code === 'ECONNABORTED') {
    message = 'Request timed out. Please check your network connection.';
  }
  
  // Log sanitized error for debugging
  console.error('API Error Details:', {
    message,
    status: error.response?.status,
    url: obfuscateData(error.config?.url),
    headers: obfuscateData(error.config?.headers)
  });
  
  return { message };
}; 