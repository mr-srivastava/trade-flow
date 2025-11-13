import { Types } from 'mongoose';
import { PageContentModel } from '../models/page-content.model';
import { PageContent } from '../../types';
import { ensureConnection } from '../connection';

// === TYPE DEFINITIONS FOR MONGODB DOCUMENTS ===

/**
 * MongoDB document interface for PageContent collection
 */
interface MongoPageContentDocument {
  _id?: Types.ObjectId;
  hero: PageContent['hero'];
  benefits: PageContent['benefits'];
  about: PageContent['about'];
  productCategories: PageContent['productCategories'];
  synFlowFeatures: PageContent['synFlowFeatures'];
  resourcesData: PageContent['resourcesData'];
}

// === HELPER FUNCTIONS ===

/**
 * Transform MongoDB lean document to PageContent type
 * Uses JSON serialization to ensure all nested objects are plain JavaScript objects
 */
function transformPageContent(doc: unknown): PageContent {
  const mongoDoc = doc as MongoPageContentDocument;
  // Use JSON parse/stringify to remove any MongoDB-specific fields like _id
  return JSON.parse(
    JSON.stringify({
      hero: mongoDoc.hero,
      benefits: mongoDoc.benefits,
      about: mongoDoc.about,
      productCategories: mongoDoc.productCategories,
      synFlowFeatures: mongoDoc.synFlowFeatures,
      resourcesData: mongoDoc.resourcesData,
    })
  );
}

/**
 * Get default page content structure
 */
function getDefaultContent(): PageContent {
  return {
    hero: {
      heading: 'Welcome to Trade Flow',
      description: 'Your trusted partner in pharmaceutical trading',
      industries: [],
      buttons: {
        contact: { text: 'Contact Us', href: '/contact' },
        explore: { text: 'Explore Products', href: '/products' },
      },
      stats: { title: 'Our Impact', items: [] },
    },
    benefits: [],
    about: {
      header: { title: 'About Us', subtitle: 'Leading the Industry' },
      description: { paragraphs: [], links: [] },
      values: [],
    },
    productCategories: {
      title: 'Product Categories',
      subtitle: 'Explore our range',
      buttonText: 'View All',
    },
    synFlowFeatures: {
      features: [],
      sectionId: 'features',
      sectionTitle: 'SynFlow Features',
      sectionDescription: 'Discover our key features',
      learnMoreText: 'Learn More',
      learnMoreLink: '/features',
    },
    resourcesData: {
      title: 'Resources',
      subtitle: 'Helpful information',
      resources: [],
    },
  };
}

// === CONTENT REPOSITORY ===

/**
 * ContentRepository - Pure data access layer for PageContent collection
 * Handles singleton pattern for page content
 */
export class ContentRepository {
  /**
   * Find page content (singleton document)
   * Creates default content if none exists
   */
  async findContent(): Promise<PageContent> {
    await ensureConnection();
    let content = await PageContentModel.findOne({}).lean();

    // If no content exists, create default content
    if (!content) {
      const defaultContent = getDefaultContent();
      const newContent = new PageContentModel(defaultContent);
      content = await newContent.save();
    }

    return transformPageContent(content);
  }

  /**
   * Update page content (full update)
   * Creates new content if none exists
   */
  async updateContent(updates: Partial<PageContent>): Promise<PageContent> {
    await ensureConnection();
    // Find existing content or create new one
    let content = await PageContentModel.findOne({});

    if (!content) {
      // Create new content with updates
      content = new PageContentModel(updates);
    } else {
      // Update existing content
      Object.assign(content, updates);
    }

    const savedContent = await content.save();
    return savedContent.toJSON() as PageContent;
  }

  /**
   * Update specific content section
   * Uses TypeScript generics for type-safe section updates
   */
  async updateSection<K extends keyof PageContent>(
    section: K,
    data: PageContent[K]
  ): Promise<PageContent> {
    await ensureConnection();
    let content = await PageContentModel.findOne({});

    if (!content) {
      // Create new content with just this section
      const newContent: Partial<PageContent> = {};
      newContent[section] = data;
      content = new PageContentModel(newContent);
    } else {
      // Update specific section
      content[section] = data;
    }

    const savedContent = await content.save();
    return savedContent.toJSON() as PageContent;
  }
}

// Export singleton instance
export const contentRepository = new ContentRepository();
