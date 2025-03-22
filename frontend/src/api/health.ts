import axios from 'axios';
import { API_BASE_URL, getSecurityHeaders } from './config';

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
    } catch (axiosError: any) {
      console.error('❌ Axios Request Error:', {
        message: axiosError.message,
        code: axiosError.code,
        config: {
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          headers: axiosError.config?.headers
        },
        response: axiosError.response ? {
          status: axiosError.response.status,
          data: axiosError.response.data
        } : null
      });

      throw axiosError;
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