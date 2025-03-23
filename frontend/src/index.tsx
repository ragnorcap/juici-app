// BROWSER POLYFILLS
// This needs to be at the top to ensure process is available globally
if (typeof window !== 'undefined') {
  window.process = window.process || { env: {} };
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 