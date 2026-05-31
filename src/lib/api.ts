/**
 * Convert an industry / category name into a URL-safe slug.
 *
 * Must stay byte-for-byte equivalent to the SQL slug transform used in
 * `src/lib/products.ts` so that slugs round-trip between the link href, the
 * URL param, and the database match. Handles `&` (-> "and"), slashes,
 * parentheses, and any other non-alphanumeric runs.
 *
 * Examples:
 *   "Industrial Chemicals"      -> "industrial-chemicals"
 *   "Beauty & Personal Care"    -> "beauty-and-personal-care"
 *   "Flavors & Fragrances"      -> "flavors-and-fragrances"
 */
export const parseIndustryToSlug = (industry: string): string =>
  industry
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
