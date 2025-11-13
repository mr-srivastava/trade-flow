/**
 * Utility Functions Index
 *
 * Central export point for all utility functions used throughout the application.
 * This includes authentication, error handling, API clients, and other helper utilities.
 */

// Authentication utilities
export { isAuthorizedAdmin } from './auth';

// Error handling utilities
export {
  handleApiError,
  badRequestResponse,
  unauthorizedResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  createdResponse,
} from './error-handler';

// API client utilities
export { apiCall } from './api-client';

// Slug utilities
export { parseIndustryToSlug } from './slug';

// Endpoint utilities
export { default as urlMap } from './endpoints';

// CSS class utilities
export { cn } from './cn';

// Icon utilities
export { renderIcon } from './icons';
