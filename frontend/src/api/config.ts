/**
 * API configuration module
 * Contains centralized configuration for all API calls and security measures
 */

// API configuration
import axios from 'axios';

// Set up API configuration
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://juici-backend-59dba9d02624.herokuapp.com'
    : 'http://localhost:5555');

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;

// Maximum request timeout (ms)
export const REQUEST_TIMEOUT = 30000;

// API key for authentication - from environment variables
const API_KEY = process.env.REACT_APP_API_KEY || 'juici_dev_key';

// Security headers for all requests
export const getSecurityHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    // Add API key for backend authentication
    'X-Api-Key': API_KEY,
    // Add random request ID to help with debugging and prevent caching
    'X-Request-ID': generateRequestId(),
    'X-Requested-With': 'XMLHttpRequest',
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
    console.error('Error response:', error.response.data);
    console.error('Error status:', error.response.status);
    console.error('Error headers:', error.response.headers);
  } else if (error.request) {
    // Request was made but no response received
    if (error.message === 'Network Error') {
      message = 'Unable to connect to the server. Please check your network connection.';
    } else {
      message = 'No response received from server. The server may be down or unreachable.';
    }
    console.error('Error request:', error.request);
  } else if (error.code === 'ECONNABORTED') {
    message = 'Request timed out. Please check your network connection.';
  }
  
  // Log sanitized error for debugging
  console.error('API Error Details:', {
    message,
    status: error.response?.status,
    url: error.config?.url,
    headers: error.config?.headers
  });
  
  return { message };
}; 