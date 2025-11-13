/**
 * API Client Utilities
 * Handles HTTP requests with error handling and environment-aware URL resolution
 */

/**
 * Makes an API call to the specified URL and handles common HTTP errors.
 *
 * @param url - The URL to fetch data from (can be relative or absolute)
 * @returns A promise that resolves to the JSON response from the API
 * @throws Will throw an error if the response status indicates a failure:
 * - 401: Unauthorized access. Prompts the user to log in.
 * - 403: Forbidden access. Indicates lack of permission.
 * - 404: Resource not found.
 * - 5xx: Server error. Suggests trying again later.
 * - Other: General failure to fetch data.
 */
export async function apiCall(url: string) {
  // Convert relative URLs to absolute URLs for server-side requests
  let absoluteUrl = url;
  if (typeof window === 'undefined' && url.startsWith('/')) {
    let baseUrl;

    if (process.env.NODE_ENV === 'development') {
      baseUrl = 'http://localhost:3000';
    } else {
      // Use VERCEL_URL for all Vercel deployments (preview + production)
      const vercelUrl = process.env.VERCEL_URL;
      baseUrl = vercelUrl ? `https://${vercelUrl}` : 'https://localhost:3000';
    }

    absoluteUrl = `${baseUrl}${url}`;
  }

  const response = await fetch(absoluteUrl, {
    next: { revalidate: 60 * 60 },
    headers: { 'User-Agent': 'Next.js Internal API Call' },
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error('Unauthorized access. Please log in.');
      case 403:
        throw new Error('Forbidden access. You do not have permission.');
      case 404:
        throw new Error('Resource not found.');
      default:
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error('Failed to fetch data');
    }
  }

  return response.json();
}
