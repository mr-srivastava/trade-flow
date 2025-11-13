/**
 * Slug Utilities
 * Functions for converting strings to URL-friendly slugs
 */

/**
 * Convert an industry name to a URL-friendly slug
 * @param industry - The industry name to convert
 * @returns A lowercase slug with hyphens instead of spaces
 * @example parseIndustryToSlug("Pharmaceutical Industry") // "pharmaceutical-industry"
 */
export function parseIndustryToSlug(industry: string): string {
  return industry.replace(/\s+/g, '-').toLowerCase();
}
