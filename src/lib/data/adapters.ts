import type { FullProduct } from './buildProduct';
import type { Product, ProductWithRelated } from '@/lib/types';
import { parseIndustryToSlug } from '@/lib/utils/slug';

/**
 * Convert a full product (local data shape with _id, $oid, $date) to app Product type.
 */
export function fullProductToProduct(full: FullProduct): Product {
  return {
    id: full._id.$oid,
    created_at: full.createdAt.$date,
    updated_at: full.updatedAt.$date,
    name: full.name,
    slug_name: full.slug_name,
    hsn_no: full.hsn_no,
    cas_number: full.cas_number,
    iupac_name: full.iupac_name,
    molecular_formula: full.molecular_formula,
    description: full.description,
    industries: full.industries,
    properties: full.properties.map((p) => ({ key: p.key, value: p.value })),
    safety_and_hazard: full.safety_and_hazard.map((p) => ({
      key: p.key,
      value: p.value,
    })),
    applications: full.applications.map((p) => ({ key: p.key, value: p.value })),
    certificates: full.certificates.map((c) => ({
      name: c.name,
      issued_date: c.issued_date ?? null,
      url: c.url ?? '',
    })),
    faq: full.faq.map((f) => ({ question: f.question, answer: f.answer })),
  };
}

/**
 * Get a product by id with related products (same industry, max 3) from local data.
 * Matches by _id.$oid or slug_name for flexibility.
 */
export function getProductWithRelatedFromLocal(
  products: FullProduct[],
  id: string
): ProductWithRelated | null {
  const found = products.find(
    (p) => p._id.$oid === id || p.slug_name === id
  );
  if (!found) return null;

  const product = fullProductToProduct(found);
  const relatedFull = products
    .filter(
      (p) =>
        p._id.$oid !== found._id.$oid &&
        p.industries.some((ind) => found.industries.includes(ind))
    )
    .slice(0, 3);

  return {
    ...product,
    relatedProducts: relatedFull.map(fullProductToProduct),
  };
}

/**
 * Filter products by industry slug (e.g. "pharmaceutical") from local data.
 */
export function getProductsByIndustryFromLocal(
  products: FullProduct[],
  industrySlug: string
): Product[] {
  return products
    .filter((p) => {
      const slugs = p.industries.map(parseIndustryToSlug);
      return slugs.includes(industrySlug);
    })
    .map(fullProductToProduct);
}
