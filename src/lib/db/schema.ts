import { sql } from 'drizzle-orm';
import { boolean, integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

/**
 * Drizzle schema, kept in sync with `schema.sql` (the source of truth for
 * columns/constraints actually applied to the Supabase database).
 */

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  casNumber: text('cas_number'),
  molecularFormula: text('molecular_formula'),
  categories: text('categories')
    .array()
    .default(sql`'{}'::text[]`),
  industries: text('industries')
    .array()
    .default(sql`'{}'::text[]`),
  subCategories: text('sub_categories')
    .array()
    .default(sql`'{}'::text[]`),
  productImages: text('product_images')
    .array()
    .default(sql`'{}'::text[]`),
  isExclusive: boolean('is_exclusive').default(false),
  // "Top Items" feature on the home page (mirrors is_exclusive flag pattern).
  isTop: boolean('is_top').default(false),
  topRank: integer('top_rank'), // lower = shown first; null = unranked
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const productDetails = pgTable('product_details', {
  productId: text('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  description: text('description'),
  einecsNumber: text('einecs_number'),
  hsnNo: text('hsn_no'),
  iupacName: text('iupac_name'),
  synonyms: text('synonyms'),
  shelfLife: text('shelf_life'),
  storageConditions: text('storage_conditions'),
  // Structured / repeating sections kept as jsonb (arrays of {key,value} etc.)
  properties: jsonb('properties').default([]),
  safetyAndHazard: jsonb('safety_and_hazard').default([]),
  applications: jsonb('applications').default([]),
  storage: jsonb('storage').default([]),
  certificates: jsonb('certificates').default([]),
  faq: jsonb('faq').default([]),
  // Any remaining fields from the rich Product type, preserved verbatim.
  extra: jsonb('extra').default({}),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const leads = pgTable('leads', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(), // check (type in ('contact','quote')), enforced at the DB level
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  phone: text('phone'),
  subject: text('subject'),
  message: text('message'),
  quantity: text('quantity'),
  requirements: text('requirements'),
  // Product-detail inquiries/quotes link back to the product they came from.
  productId: text('product_id').references(() => products.id, { onDelete: 'set null' }),
  productName: text('product_name'), // denormalized snapshot, survives product deletion
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});
