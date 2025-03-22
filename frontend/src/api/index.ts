/**
 * API module - Main export file that consolidates all API functions
 * This file prevents code duplication and centralizes API configuration
 */

import { getRandomIdea } from './ideas';
import { saveFavorite, getFavorites, deleteFavorite } from './favorites';
import { generatePRD } from './prd';

// Re-export all API functions
export {
  getRandomIdea,
  saveFavorite,
  getFavorites,
  deleteFavorite,
  generatePRD
}; 