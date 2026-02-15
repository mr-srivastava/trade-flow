import { productRepository } from '../db/repositories/product.repository';
import { parseIndustryToSlug } from '../utils/slug';
import {
  Product,
  ProductWithRelated,
  ProductsResponse,
  IndustryProductCountMap,
} from '../types';
import type { CreateProductInput, UpdateProductInput } from '../schemas/product.schema';
export type { ProductWithRelated } from '../types';

/**
 * ProductService - Business logic layer for Product operations
 * Orchestrates repository calls and implements domain logic
 */
export class ProductService {
  /**
   * Get all products
   * Returns products list with total count
   */
  async getAllProducts(): Promise<ProductsResponse> {
    try {
      const products = await productRepository.findAll();
      return {
        products,
        total_products: products.length,
      };
    } catch (error) {
      console.error('ProductService.getAllProducts error:', error);
      throw error;
    }
  }

  /**
   * Get product by ID
   * Returns null if not found
   */
  async getProductById(id: string): Promise<Product | null> {
    try {
      return await productRepository.findById(id);
    } catch (error) {
      console.error('ProductService.getProductById error:', error);
      throw error;
    }
  }

  /**
   * Get product by slug
   * Returns null if not found
   */
  async getProductBySlug(slug: string): Promise<Product | null> {
    try {
      return await productRepository.findBySlug(slug);
    } catch (error) {
      console.error('ProductService.getProductBySlug error:', error);
      throw error;
    }
  }

  /**
   * Get product with related products
   * Related products are those sharing at least one industry
   * Limited to 3 related products
   */
  async getProductWithRelated(id: string): Promise<ProductWithRelated | null> {
    try {
      const product = await productRepository.findById(id);
      if (!product) return null;

      // Get all products to find related ones
      const allProducts = await productRepository.findAll();

      // Find related products based on shared industries
      const relatedProducts = allProducts
        .filter(
          (p) =>
            p.id !== id &&
            p.industries.some((ind) => product.industries.includes(ind))
        )
        .slice(0, 3);

      return { ...product, relatedProducts };
    } catch (error) {
      console.error('ProductService.getProductWithRelated error:', error);
      throw error;
    }
  }

  /**
   * Create a new product
   */
  async createProduct(productData: CreateProductInput): Promise<Product> {
    try {
      return await productRepository.create(productData);
    } catch (error) {
      console.error('ProductService.createProduct error:', error);
      throw error;
    }
  }

  /**
   * Update an existing product
   * Returns null if product not found
   */
  async updateProduct(
    id: string,
    updates: UpdateProductInput
  ): Promise<Product | null> {
    try {
      return await productRepository.update(id, updates);
    } catch (error) {
      console.error('ProductService.updateProduct error:', error);
      throw error;
    }
  }

  /**
   * Delete a product
   * Returns true if deleted, false if not found
   */
  async deleteProduct(id: string): Promise<boolean> {
    try {
      return await productRepository.delete(id);
    } catch (error) {
      console.error('ProductService.deleteProduct error:', error);
      throw error;
    }
  }

  /**
   * Search products by query
   * Searches in name, description, and industries
   */
  async searchProducts(query: string): Promise<ProductsResponse> {
    try {
      const products = await productRepository.search(query);
      return {
        products,
        total_products: products.length,
      };
    } catch (error) {
      console.error('ProductService.searchProducts error:', error);
      throw error;
    }
  }

  /**
   * Get products by industry slug
   * Filters products that have the specified industry
   */
  async getProductsByIndustry(industrySlug: string): Promise<Product[]> {
    try {
      const allProducts = await productRepository.findAll();
      return allProducts.filter((product) => {
        const industrySlugs = product.industries.map(parseIndustryToSlug);
        return industrySlugs.includes(industrySlug);
      });
    } catch (error) {
      console.error('ProductService.getProductsByIndustry error:', error);
      throw error;
    }
  }

  /**
   * Get industry counts
   * Returns count of products per industry
   */
  async getIndustryCounts(): Promise<IndustryProductCountMap[]> {
    try {
      const allProducts = await productRepository.findAll();

      // Aggregate counts by industry
      const countMap = allProducts.reduce(
        (acc: Record<string, number>, product) => {
          if (product.industries && Array.isArray(product.industries)) {
            product.industries.forEach((industry) => {
              if (industry) {
                acc[industry] = (acc[industry] || 0) + 1;
              }
            });
          }
          return acc;
        },
        {}
      );

      // Convert to array format
      return Object.entries(countMap).map(([name, count]) => ({
        name,
        count,
      }));
    } catch (error) {
      console.error('ProductService.getIndustryCounts error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const productService = new ProductService();
