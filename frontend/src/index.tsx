// BROWSER POLYFILLS
// This needs to be at the top to ensure process is available globally
if (typeof window !== 'undefined') {
  // Create a safe process.env object
  window.process = window.process || {};
  window.process.env = window.process.env || {};
  
  // Manually add key environment variables
  // These will be replaced with actual values during build
  window.process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  window.process.env.REACT_APP_API_URL = process.env.REACT_APP_API_URL || '/api';
  
  // Log environment for debugging (will be removed in production)
  if (process.env.NODE_ENV !== 'production') {
    console.log('Environment variables:', {
      NODE_ENV: window.process.env.NODE_ENV,
      REACT_APP_API_URL: window.process.env.REACT_APP_API_URL
    });
  }
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create and render the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 