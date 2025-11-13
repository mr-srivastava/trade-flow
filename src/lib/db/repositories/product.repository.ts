import { Types } from 'mongoose';
import { ProductModel } from '../models/product.model';
import { Product, Property, FAQ } from '../../types';
import { ensureConnection } from '../connection';

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

// === HELPER FUNCTIONS ===

/**
 * Transform MongoDB lean document to Product type
 * Ensures all nested objects are plain JavaScript objects without MongoDB _id fields
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
    // Serialize nested arrays to plain objects
    properties: mongoDoc.properties.map((prop) => ({
      key: prop.key,
      value: prop.value,
    })),
    safety_and_hazard: mongoDoc.safety_and_hazard.map((item) => ({
      key: item.key,
      value: item.value,
    })),
    applications: mongoDoc.applications.map((app) => ({
      key: app.key,
      value: app.value,
    })),
    certificates:
      mongoDoc.certificates?.map((cert) => ({
        name: cert.name,
        issued_date: cert.issued_date?.toISOString() || null,
        url: cert.url,
      })) || [],
    faq: mongoDoc.faq.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  };
}

// === PRODUCT REPOSITORY ===

/**
 * ProductRepository - Pure data access layer for Product collection
 * Contains only database operations without business logic
 */
export class ProductRepository {
  /**
   * Find all products
   * Uses .lean() for better performance by returning plain JavaScript objects
   */
  async findAll(): Promise<Product[]> {
    await ensureConnection();
    const products = await ProductModel.find({}).lean();
    return products.map(transformProduct);
  }

  /**
   * Find product by ID
   * Validates ObjectId format before querying
   * Returns null if not found or invalid ID
   */
  async findById(id: string): Promise<Product | null> {
    // Validate the ID parameter
    if (!id || id === 'undefined' || id === 'null') {
      return null;
    }

    // Check if it's a valid MongoDB ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return null;
    }

    await ensureConnection();
    const product = await ProductModel.findById(id).lean();

    if (!product) return null;

    return transformProduct(product);
  }

  /**
   * Find product by slug
   * Returns null if not found
   */
  async findBySlug(slug: string): Promise<Product | null> {
    await ensureConnection();
    const product = await ProductModel.findOne({ slug_name: slug }).lean();

    if (!product) return null;

    return transformProduct(product);
  }

  /**
   * Create a new product
   * Returns the created product with generated ID and timestamps
   */
  async create(
    productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Product> {
    await ensureConnection();
    const product = new ProductModel(productData);
    const savedProduct = await product.save();

    return savedProduct.toJSON() as Product;
  }

  /**
   * Update an existing product
   * Returns null if product not found
   * Validates updates before applying
   */
  async update(
    id: string,
    updates: Partial<Omit<Product, 'id' | 'created_at'>>
  ): Promise<Product | null> {
    await ensureConnection();
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { ...updates, updated_at: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProduct) return null;

    return transformProduct(updatedProduct);
  }

  /**
   * Delete a product by ID
   * Returns true if deleted, false if not found
   */
  async delete(id: string): Promise<boolean> {
    await ensureConnection();
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  /**
   * Search products by name, description, or industries
   * Uses regex for case-insensitive partial matching
   */
  async search(query: string): Promise<Product[]> {
    await ensureConnection();
    const products = await ProductModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { industries: { $in: [new RegExp(query, 'i')] } },
      ],
    }).lean();

    return products.map(transformProduct);
  }
}

// Export singleton instance
export const productRepository = new ProductRepository();
