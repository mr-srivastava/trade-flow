import { connectToDatabase } from './mongodb';
import { Product as ProductModel, PageContent as PageContentModel } from './models';
import { Product, ProductsResponse, PageContent } from './types';
import { Types } from 'mongoose';
import { Property, FAQ } from './types';

// === TYPE DEFINITIONS FOR MONGODB DOCUMENTS ===

/**
 * MongoDB document interface for Product collection
 */
interface MongoProductDocument {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  slug_name: string;
  hsn_no: string;
  cas_number: string;
  iupac_name: string;
  molecular_formula: string;
  description: string;
  industries: string[];
  properties: Property[];
  safety_and_hazard: Property[];
  applications: Property[];
  certificates?: Array<{
    name: string;
    issued_date?: Date;
    url: string;
  }>;
  faq: FAQ[];
}

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
 * Transform MongoDB lean document to Product type
 */
function transformProduct(doc: unknown): Product {
  const mongoDoc = doc as MongoProductDocument;
  return {
    id: mongoDoc._id.toString(),
    created_at: mongoDoc.createdAt?.toISOString() || new Date().toISOString(),
    updated_at: mongoDoc.updatedAt?.toISOString() || new Date().toISOString(),
    name: mongoDoc.name,
    slug_name: mongoDoc.slug_name,
    hsn_no: mongoDoc.hsn_no,
    cas_number: mongoDoc.cas_number,
    iupac_name: mongoDoc.iupac_name,
    molecular_formula: mongoDoc.molecular_formula,
    description: mongoDoc.description,
    industries: mongoDoc.industries,
    properties: mongoDoc.properties,
    safety_and_hazard: mongoDoc.safety_and_hazard,
    applications: mongoDoc.applications,
    certificates:
      mongoDoc.certificates?.map((cert) => ({
        name: cert.name,
        issued_date: cert.issued_date?.toISOString() || null,
        url: cert.url,
      })) || [],
    faq: mongoDoc.faq,
  };
}

/**
 * Transform MongoDB lean document to PageContent type
 */
function transformPageContent(doc: unknown): PageContent {
  const mongoDoc = doc as MongoPageContentDocument;
  return {
    hero: mongoDoc.hero,
    benefits: mongoDoc.benefits,
    about: mongoDoc.about,
    productCategories: mongoDoc.productCategories,
    synFlowFeatures: mongoDoc.synFlowFeatures,
    resourcesData: mongoDoc.resourcesData,
  };
}

// === PRODUCT OPERATIONS ===

/**
 * Get all products
 */
export async function getAllProducts(): Promise<ProductsResponse> {
  await connectToDatabase();

  const products = await ProductModel.find({}).lean();

  return {
    products: products.map(transformProduct),
    total_products: products.length,
  };
}

/**
 * Add a new product
 */
export async function addProduct(
  productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>,
): Promise<Product> {
  await connectToDatabase();

  const product = new ProductModel(productData);
  const savedProduct = await product.save();

  return savedProduct.toJSON() as Product;
}

/**
 * Update an existing product
 */
export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'created_at'>>,
): Promise<Product | null> {
  await connectToDatabase();

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    { ...updates, updated_at: new Date() },
    { new: true, runValidators: true },
  ).lean();

  if (!updatedProduct) return null;

  return transformProduct(updatedProduct);
}

/**
 * Delete a product
 */
export async function deleteProduct(id: string): Promise<boolean> {
  await connectToDatabase();

  const result = await ProductModel.findByIdAndDelete(id);
  return !!result;
}

/**
 * Get product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  await connectToDatabase();

  // Validate the ID parameter
  if (!id || id === 'undefined' || id === 'null') {
    return null;
  }

  // Check if it's a valid MongoDB ObjectId format
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return null;
  }

  const product = await ProductModel.findById(id).lean();

  if (!product) return null;

  return transformProduct(product);
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectToDatabase();

  const product = await ProductModel.findOne({ slug_name: slug }).lean();

  if (!product) return null;

  return transformProduct(product);
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<ProductsResponse> {
  await connectToDatabase();

  const products = await ProductModel.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { industries: { $in: [new RegExp(query, 'i')] } },
    ],
  }).lean();

  return {
    products: products.map(transformProduct),
    total_products: products.length,
  };
}

// === CONTENT OPERATIONS ===

/**
 * Get page content (singleton document)
 */
export async function getPageContent(): Promise<PageContent> {
  await connectToDatabase();

  let content = await PageContentModel.findOne({}).lean();

  // If no content exists, create default content
  if (!content) {
    const defaultContent: PageContent = {
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
      resourcesData: { title: 'Resources', subtitle: 'Helpful information', resources: [] },
    };

    const newContent = new PageContentModel(defaultContent);
    content = await newContent.save();
  }

  return transformPageContent(content);
}

/**
 * Update page content
 */
export async function updatePageContent(updates: Partial<PageContent>): Promise<PageContent> {
  await connectToDatabase();

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
 */
export async function updateContentSection<K extends keyof PageContent>(
  section: K,
  data: PageContent[K],
): Promise<PageContent> {
  await connectToDatabase();

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

// === MIGRATION HELPERS ===

/**
 * Migrate data from JSON file to MongoDB
 */
export async function migrateFromJsonData(
  productsData: ProductsResponse,
  pageContent?: PageContent,
): Promise<void> {
  await connectToDatabase();

  // Migrate products
  if (productsData.products && productsData.products.length > 0) {
    // Check if products already exist
    const existingCount = await ProductModel.countDocuments();
    if (existingCount === 0) {
      await ProductModel.insertMany(productsData.products);
      console.log(`✅ Migrated ${productsData.products.length} products to MongoDB`);
    } else {
      console.log(`ℹ️ Products already exist in MongoDB (${existingCount} documents)`);
    }
  }

  // Migrate content
  if (pageContent) {
    const existingContent = await PageContentModel.findOne({});
    if (!existingContent) {
      await PageContentModel.create(pageContent);
      console.log('✅ Migrated page content to MongoDB');
    } else {
      console.log('ℹ️ Page content already exists in MongoDB');
    }
  }
}

// === UTILITY FUNCTIONS ===

/**
 * Check if admin is authorized (same as existing implementation)
 */
export function isAuthorizedAdmin(authHeader: string | null): boolean {
  if (!authHeader) return false;

  const token = authHeader.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN;

  return !!(adminToken && token === adminToken);
}
