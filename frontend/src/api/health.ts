import axios from 'axios';
import { API_BASE_URL, getSecurityHeaders } from './config';
import { getFrontendHealth } from './localHealth';

// Add empty export to make this a module
export {};

/**
 * Checks the connection to the backend server
 * @returns Object with isConnected flag and server status
 */
export const checkServerConnection = async () => {
  try {
    console.group('🔍 Health Check Diagnostics');
    console.log('Base URL:', API_BASE_URL);
    
    // Detailed network configuration logging
    console.log('Network Configuration:', {
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      online: navigator.onLine
    });

    const headers = getSecurityHeaders();
    console.log('Request Headers:', headers);

    try {
      // First try the backend health endpoint
      const response = await axios.get(`${API_BASE_URL}/health`, {
        headers,
        timeout: 3000, // 3 second timeout
        // Add more detailed axios configuration
        validateStatus: function (status) {
          return status >= 200 && status < 300; // Default
        }
      });
    
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
    
      // Validate the response contains the expected fields
      if (response.data && response.data.status === 'ok') {
        console.log('✅ Server Connected Successfully');
        console.groupEnd();
        return {
          isConnected: true,
          status: response.data,
          error: null
        };
      } else {
        console.warn('❌ Invalid Server Response:', response.data);
        console.groupEnd();
        return {
          isConnected: false,
          status: response.data,
          error: {
            message: 'Invalid server response'
          }
        };
      }
    } catch (backendError: any) {
      console.warn('⚠️ Backend health check failed:', backendError.message);
      
      // Instead of making another HTTP request to a frontend API,
      // just use the local health information
      const frontendHealth = getFrontendHealth();
      console.log('Frontend Health Check:', frontendHealth);
      
      return {
        isConnected: true, // Frontend is working even if backend isn't
        status: {
          ...frontendHealth,
          backendAvailable: false
        },
        error: {
          message: 'Backend unavailable, but frontend is operational'
        }
      };
    }
  } catch (error: any) {
    console.error('❌ Health Check Failed:', error);
    console.groupEnd();

    return {
      isConnected: false,
      status: null,
      error: {
        message: error.message || 'Could not connect to server'
      }
    };
  }
}; 