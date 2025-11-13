import mongoose, { Schema, Document } from 'mongoose';
import { PageContent } from '../../types';

// Extended interface for MongoDB document
export interface PageContentDocument extends PageContent, Document {}

// Page Content Schema
const PageContentSchema = new Schema<PageContentDocument>(
  {
    hero: {
      heading: { type: String, required: true },
      description: { type: String, required: true },
      industries: [{ type: String }],
      buttons: {
        contact: {
          text: { type: String, required: true },
          href: { type: String, required: true },
        },
        explore: {
          text: { type: String, required: true },
          href: { type: String, required: true },
        },
      },
      stats: {
        title: { type: String, required: true },
        items: [
          {
            value: { type: String, required: true },
            description: { type: String, required: true },
          },
        ],
      },
    },
    benefits: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        icon: { type: String, required: true },
      },
    ],
    about: {
      header: {
        title: { type: String, required: true },
        subtitle: { type: String, required: false, default: '' },
      },
      description: {
        paragraphs: [{ type: String, required: true }],
        links: [
          {
            text: { type: String, required: true },
            href: { type: String, required: true },
            className: { type: String, required: false, default: '' },
          },
        ],
      },
      values: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          icon: { type: String, required: false, default: '' },
        },
      ],
    },
    productCategories: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      buttonText: { type: String, required: true },
    },
    synFlowFeatures: {
      features: [
        {
          id: { type: Number, required: false },
          title: { type: String, required: true },
          description: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
      sectionId: { type: String, required: true },
      sectionTitle: { type: String, required: true },
      sectionDescription: { type: String, required: true },
      learnMoreText: { type: String, required: true },
      learnMoreLink: { type: String, required: true },
    },
    resourcesData: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      resources: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          link: { type: String, required: true },
          icon: { type: String, required: true },
        },
      ],
    },
  },
  {
    timestamps: true,
    collection: 'page_content',
  }
);

// Create model or use existing one
export const PageContentModel =
  mongoose.models.PageContent ||
  mongoose.model<PageContentDocument>('PageContent', PageContentSchema);
