import type { Product } from './types';

/** Row shape from the `products` table (optionally joined with a few detail fields for listings). */
export interface ProductRow {
  id: string;
  name: string;
  cas_number: string | null;
  molecular_formula: string | null;
  categories: string[] | null;
  industries: string[] | null;
  sub_categories: string[] | null;
  product_images: string[] | null;
  is_exclusive: boolean | null;
  // Optional fields the listing LEFT JOINs from product_details (ProductCard needs them).
  description?: string | null;
  safety_and_hazard?: unknown;
}

/** Row shape from the `product_details` table. */
export interface ProductDetailRow {
  product_id: string;
  description: string | null;
  einecs_number: string | null;
  hsn_no: string | null;
  iupac_name: string | null;
  synonyms: string | null;
  shelf_life: string | null;
  storage_conditions: string | null;
  properties: unknown;
  safety_and_hazard: unknown;
  applications: unknown;
  storage: unknown;
  certificates: unknown;
  faq: unknown;
  extra: Record<string, unknown> | null;
}

/**
 * Rehydrate the split DB rows back into the rich `Product` shape the React
 * components expect, so no component needs to change. `extra` carries any
 * fields from the original Product type that weren't promoted to columns.
 */
export function rowToProduct(p: ProductRow, d?: ProductDetailRow | null): Product {
  const extra = (d?.extra ?? {}) as Record<string, unknown>;
  return {
    ...extra,
    id: p.id,
    name: p.name,
    cas_number: p.cas_number ?? '',
    molecular_formula: p.molecular_formula ?? '',
    categories: p.categories ?? [],
    industries: p.industries ?? [],
    sub_categories: p.sub_categories ?? [],
    product_images: p.product_images ?? [],
    is_exclusive: p.is_exclusive ?? false,
    description: (d?.description ?? p.description ?? '') as string,
    einecs_number: d?.einecs_number ?? '',
    hsn_no: d?.hsn_no ?? '',
    iupac_name: d?.iupac_name ?? '',
    synonyms: d?.synonyms ?? null,
    shelf_life: d?.shelf_life ?? '',
    properties: (d?.properties ?? []) as Product['properties'],
    safety_and_hazard: (d?.safety_and_hazard ??
      p.safety_and_hazard ??
      []) as Product['safety_and_hazard'],
    applications: (d?.applications ?? []) as Product['applications'],
    storage: (d?.storage ?? []) as Product['storage'],
    certificates: (d?.certificates ?? []) as Product['certificates'],
    faq: (d?.faq ?? []) as Product['faq'],
  } as Product;
}
