/**
 * Simple health check for the frontend
 * This provides health status information for the client side
 */

// Return health status for the frontend
export const getFrontendHealth = () => {
  return {
    status: 'ok',
    message: 'Frontend is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.REACT_APP_VERSION || '1.0.0'
  };
}; 