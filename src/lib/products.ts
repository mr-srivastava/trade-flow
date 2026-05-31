import { query } from './db';
import {
  rowToProduct,
  type ProductRow,
  type ProductDetailRow,
} from './mappers';
import type { Product, IndustryProductCountMap } from './types';

/**
 * Direct database access layer for products.
 *
 * Server components and route handlers both call these functions, so the SQL
 * lives in exactly one place. This replaces the previous pattern where server
 * components fetched the app's own HTTP API over an absolute URL (which used
 * `headers()` and broke under static generation / ISR).
 *
 * The SQL slug transform here must stay byte-for-byte equivalent to
 * `parseIndustryToSlug` in `./api` so industry slugs round-trip correctly.
 */

// Light columns + the two detail fields the listing card needs.
const LISTING_SELECT = `
  p.id, p.name, p.cas_number, p.molecular_formula, p.categories,
  p.industries, p.sub_categories, p.product_images, p.is_exclusive,
  d.description, d.safety_and_hazard
  from products p
  left join product_details d on d.product_id = p.id`;

/** All products, ordered by name (for the full catalogue). */
export async function getAllProducts(): Promise<Product[]> {
  const rows = await query<ProductRow>(
    `select ${LISTING_SELECT} order by p.name`,
  );
  return rows.map((row) => rowToProduct(row));
}

/**
 * Products whose industry list contains an industry matching the given slug.
 * The slug transform mirrors `parseIndustryToSlug`: lowercase, `&` -> `and`,
 * any run of non-alphanumerics -> `-`, trimmed of leading/trailing `-`.
 */
export async function getProductsByIndustrySlug(slug: string): Promise<Product[]> {
  const rows = await query<ProductRow>(
    `select ${LISTING_SELECT}
     where exists (
       select 1 from unnest(p.industries) as ind
       where trim(both '-' from regexp_replace(replace(lower(ind), '&', 'and'), '[^a-z0-9]+', '-', 'g')) = $1
     )
     order by p.name`,
    [slug.toLowerCase()],
  );
  return rows.map((row) => rowToProduct(row));
}

type JoinedRow = ProductRow & {
  d_product_id: string | null;
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
};

/**
 * A single product with its full details plus up to 3 related products
 * (sharing a category or industry). Returns null when the id doesn't exist.
 */
export async function getProductById(
  id: string,
): Promise<(Product & { relatedProducts: Product[] }) | null> {
  const rows = await query<JoinedRow>(
    `select
       p.id, p.name, p.cas_number, p.molecular_formula, p.categories,
       p.industries, p.sub_categories, p.product_images, p.is_exclusive,
       d.product_id as d_product_id, d.description, d.einecs_number, d.hsn_no,
       d.iupac_name, d.synonyms, d.shelf_life, d.storage_conditions,
       d.properties, d.safety_and_hazard, d.applications, d.storage,
       d.certificates, d.faq, d.extra
     from products p
     left join product_details d on d.product_id = p.id
     where p.id = $1
     limit 1`,
    [id],
  );

  if (rows.length === 0) return null;

  const row = rows[0];
  const detail: ProductDetailRow | null = row.d_product_id
    ? {
        product_id: row.d_product_id,
        description: row.description,
        einecs_number: row.einecs_number,
        hsn_no: row.hsn_no,
        iupac_name: row.iupac_name,
        synonyms: row.synonyms,
        shelf_life: row.shelf_life,
        storage_conditions: row.storage_conditions,
        properties: row.properties,
        safety_and_hazard: row.safety_and_hazard,
        applications: row.applications,
        storage: row.storage,
        certificates: row.certificates,
        faq: row.faq,
        extra: row.extra,
      }
    : null;

  const product = rowToProduct(row, detail);

  const relatedRows = await query<ProductRow>(
    `select ${LISTING_SELECT}
     where p.id <> $1
       and (p.categories && $2::text[] or p.industries && $3::text[])
     limit 3`,
    [id, product.categories ?? [], product.industries ?? []],
  );
  const relatedProducts = relatedRows.map((r) => rowToProduct(r));

  return { ...product, relatedProducts };
}

/** Count of products per industry, most populous first. */
export async function getIndustryCounts(): Promise<IndustryProductCountMap[]> {
  const rows = await query<{ name: string; count: string }>(
    `select industry as name, count(*)::text as count
     from products, unnest(industries) as industry
     where industry is not null and industry <> ''
     group by industry
     order by count(*) desc`,
  );
  return rows.map((r) => ({ name: r.name, count: Number(r.count) }));
}
