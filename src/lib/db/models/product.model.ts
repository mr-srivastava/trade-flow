import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '../../types';

// Extended interface for MongoDB document
export interface ProductDocument extends Omit<Product, 'id'>, Document {}

// Product Schema
const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug_name: { type: String, required: true, unique: true },
    hsn_no: { type: String, required: true },
    cas_number: { type: String, required: true },
    iupac_name: { type: String, required: true },
    molecular_formula: { type: String, required: true },
    description: { type: String, required: true },
    industries: [{ type: String, required: true }],
    properties: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    safety_and_hazard: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    applications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    certificates: [
      {
        name: { type: String, required: true },
        issued_date: { type: Date, default: null },
        url: { type: String, default: '' },
      },
    ],
    faq: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc: Document, ret: Record<string, unknown>) {
        ret.id = ret._id;
        ret.created_at = ret.createdAt;
        ret.updated_at = ret.updatedAt;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

// Create model or use existing one
export const ProductModel =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>('Product', ProductSchema);
