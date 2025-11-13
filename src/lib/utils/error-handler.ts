/**
 * Error Handling Utilities
 *
 * This module provides consistent error handling and response formatting
 * for API routes, including support for Zod validation errors.
 */

import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Handle API errors and return appropriate NextResponse
 *
 * Automatically detects error types and formats responses accordingly:
 * - Zod validation errors: 400 with detailed validation errors
 * - Generic errors: 500 with generic error message
 *
 * @param error - The error object to handle
 * @returns NextResponse with appropriate status code and error message
 *
 * @example
 * ```typescript
 * try {
 *   const data = await someOperation();
 *   return NextResponse.json(data);
 * } catch (error) {
 *   return handleApiError(error);
 * }
 * ```
 */
export function handleApiError(error: unknown): NextResponse {
  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  // Log the error for debugging
  console.error('API Error:', error);

  // Return generic error response
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

/**
 * Create a 400 Bad Request response
 *
 * @param message - Error message to return
 * @param details - Optional additional error details
 * @returns NextResponse with 400 status
 */
export function badRequestResponse(
  message: string,
  details?: unknown
): NextResponse {
  const body = details ? { error: message, details } : { error: message };
  return NextResponse.json(body, { status: 400 });
}

/**
 * Create a 401 Unauthorized response
 *
 * @param message - Error message to return (defaults to 'Unauthorized')
 * @returns NextResponse with 401 status
 */
export function unauthorizedResponse(
  message: string = 'Unauthorized'
): NextResponse {
  return NextResponse.json({ error: message }, { status: 401 });
}

/**
 * Create a 404 Not Found response
 *
 * @param message - Error message to return (defaults to 'Not found')
 * @returns NextResponse with 404 status
 */
export function notFoundResponse(message: string = 'Not found'): NextResponse {
  return NextResponse.json({ error: message }, { status: 404 });
}

/**
 * Create a 500 Internal Server Error response
 *
 * @param message - Error message to return (defaults to 'Internal server error')
 * @returns NextResponse with 500 status
 */
export function serverErrorResponse(
  message: string = 'Internal server error'
): NextResponse {
  return NextResponse.json({ error: message }, { status: 500 });
}

/**
 * Create a 200 OK response with data
 *
 * @param data - Data to return in the response
 * @returns NextResponse with 200 status
 */
export function successResponse<T>(data: T): NextResponse {
  return NextResponse.json(data, { status: 200 });
}

/**
 * Create a 201 Created response with data
 *
 * @param data - Data to return in the response
 * @returns NextResponse with 201 status
 */
export function createdResponse<T>(data: T): NextResponse {
  return NextResponse.json(data, { status: 201 });
}
