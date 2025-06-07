import mongoose, { Schema, Document } from 'mongoose';
import { Product, PageContent } from './types';

// Extended interfaces for MongoDB documents
export interface ProductDocument extends Omit<Product, 'id'>, Document {}
export interface PageContentDocument extends PageContent, Document {}

// Product Schema
const ProductSchema = new Schema<ProductDocument>({
  name: { type: String, required: true },
  slug_name: { type: String, required: true, unique: true },
  hsn_no: { type: String, required: true },
  cas_number: { type: String, required: true },
  iupac_name: { type: String, required: true },
  molecular_formula: { type: String, required: true },
  description: { type: String, required: true },
  industries: [{ type: String, required: true }],
  properties: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  safety_and_hazard: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  applications: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  certificates: [{
    name: { type: String, required: true },
    issued_date: { type: Date, default: null },
    url: { type: String, default: '' }
  }],
  faq: [{
    question: { type: String, required: true },
    answer: { type: String, required: true }
  }]
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: Document, ret: Record<string, unknown>) {
      ret.id = ret._id;
      ret.created_at = ret.createdAt;
      ret.updated_at = ret.updatedAt;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    }
  }
});

// Page Content Schema
const PageContentSchema = new Schema<PageContentDocument>({
  hero: {
    heading: { type: String, required: true },
    description: { type: String, required: true },
    industries: [{ type: String }],
    buttons: {
      contact: {
        text: { type: String, required: true },
        href: { type: String, required: true }
      },
      explore: {
        text: { type: String, required: true },
        href: { type: String, required: true }
      }
    },
    stats: {
      title: { type: String, required: true },
      items: [{
        value: { type: String, required: true },
        description: { type: String, required: true }
      }]
    }
  },
  benefits: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }
  }],
  about: {
    header: {
      title: { type: String, required: true },
      subtitle: { type: String, required: false, default: '' }
    },
    description: {
      paragraphs: [{ type: String, required: true }],
      links: [{
        text: { type: String, required: true },
        href: { type: String, required: true },
        className: { type: String, required: false, default: '' }
      }]
    },
    values: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: false, default: '' }
    }]
  },
  productCategories: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    buttonText: { type: String, required: true }
  },
  synFlowFeatures: {
    features: [{
      id: { type: Number, required: false },
      title: { type: String, required: true },
      description: { type: String, required: true },
      icon: { type: String, required: true }
    }],
    sectionId: { type: String, required: true },
    sectionTitle: { type: String, required: true },
    sectionDescription: { type: String, required: true },
    learnMoreText: { type: String, required: true },
    learnMoreLink: { type: String, required: true }
  },
  resourcesData: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    resources: [{
      title: { type: String, required: true },
      description: { type: String, required: true },
      link: { type: String, required: true },
      icon: { type: String, required: true }
    }]
  }
}, {
  timestamps: true,
  collection: 'page_content'
});

// Create models or use existing ones
export const ProductModel = mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
export const PageContentModel = mongoose.models.PageContent || mongoose.model<PageContentDocument>('PageContent', PageContentSchema);

// Export models
export { ProductModel as Product, PageContentModel as PageContent }; 