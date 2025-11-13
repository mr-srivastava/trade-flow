/**
 * API Endpoint Utilities
 * Centralized URL mapping for all API endpoints
 */

const urlMap = {
  /**
   * Get a specific product by ID
   * @param productId - The product ID
   */
  getProduct: (productId: string) => `/api/products/${productId}`,

  /**
   * Get all products
   */
  getProducts: () => '/api/products',

  /**
   * Get products filtered by industry
   * @param industry - The industry slug
   */
  getProductsByIndustry: (industry: string) =>
    `/api/products/industries/${industry}`,

  /**
   * Get product count per industry
   */
  getIndustriesProductCount: () => '/api/products/industries/count',
};

export default urlMap;
