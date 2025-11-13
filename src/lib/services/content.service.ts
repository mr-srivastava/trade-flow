import { contentRepository } from '../db/repositories/content.repository';
import { PageContent } from '../types';

/**
 * ContentService - Business logic layer for PageContent operations
 * Orchestrates repository calls for page content management
 */
export class ContentService {
  /**
   * Get page content
   * Returns the singleton page content document
   * Creates default content if none exists
   */
  async getPageContent(): Promise<PageContent> {
    try {
      return await contentRepository.findContent();
    } catch (error) {
      console.error('ContentService.getPageContent error:', error);
      throw error;
    }
  }

  /**
   * Update page content
   * Updates the entire page content document
   */
  async updatePageContent(updates: Partial<PageContent>): Promise<PageContent> {
    try {
      return await contentRepository.updateContent(updates);
    } catch (error) {
      console.error('ContentService.updatePageContent error:', error);
      throw error;
    }
  }

  /**
   * Update specific content section
   * Uses TypeScript generics for type-safe section updates
   */
  async updateContentSection<K extends keyof PageContent>(
    section: K,
    data: PageContent[K]
  ): Promise<PageContent> {
    try {
      return await contentRepository.updateSection(section, data);
    } catch (error) {
      console.error('ContentService.updateContentSection error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const contentService = new ContentService();
