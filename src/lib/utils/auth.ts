/**
 * Authentication Utilities
 *
 * This module provides authentication and authorization utilities
 * for protecting admin routes and validating access tokens.
 */

/**
 * Check if the provided authorization header contains a valid admin token
 *
 * @param authHeader - The Authorization header value (e.g., "Bearer <token>")
 * @returns true if the token is valid and matches the admin token, false otherwise
 *
 * @example
 * ```typescript
 * const authHeader = request.headers.get('authorization');
 * if (!isAuthorizedAdmin(authHeader)) {
 *   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 * }
 * ```
 */
export function isAuthorizedAdmin(authHeader: string | null): boolean {
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN;

  return !!(adminToken && token === adminToken);
}
