import { and, arrayOverlaps, asc, eq, ne, or, sql } from 'drizzle-orm';
import { db } from './db';
import { productDetails, products } from './db/schema';
import { rowToProduct, type ProductDetailRow } from './mappers';
import type { Product, IndustryProductCountMap } from './types';

/**
 * Data access layer for products, built on the Drizzle schema in `./db/schema`.
 *
 * Server components and route handlers both call these functions, so the
 * query logic lives in exactly one place. A few queries (industry slug
 * matching, array-overlap "related products", the industry unnest/count) rely
 * on Postgres features the query builder doesn't model directly, so those stay
 * as raw `sql` fragments; everything else goes through the typed builder.
 *
 * The SQL slug transform here must stay byte-for-byte equivalent to
 * `parseIndustryToSlug` in `./api` so industry slugs round-trip correctly.
 */

// Light columns + the two detail fields the listing card needs.
const listingColumns = {
  id: products.id,
  name: products.name,
  cas_number: products.casNumber,
  molecular_formula: products.molecularFormula,
  categories: products.categories,
  industries: products.industries,
  sub_categories: products.subCategories,
  product_images: products.productImages,
  is_exclusive: products.isExclusive,
  description: productDetails.description,
  safety_and_hazard: productDetails.safetyAndHazard,
};

function listingQuery() {
  return db
    .select(listingColumns)
    .from(products)
    .leftJoin(productDetails, eq(productDetails.productId, products.id));
}

/** All products, ordered by name (for the full catalogue). */
export async function getAllProducts(): Promise<Product[]> {
  const rows = await listingQuery().orderBy(asc(products.name));
  return rows.map((row) => rowToProduct(row));
}

/**
 * Products whose industry list contains an industry matching the given slug.
 * The slug transform mirrors `parseIndustryToSlug`: lowercase, `&` -> `and`,
 * any run of non-alphanumerics -> `-`, trimmed of leading/trailing `-`.
 */
export async function getProductsByIndustrySlug(slug: string): Promise<Product[]> {
  const normalizedSlug = slug.toLowerCase();
  const rows = await listingQuery()
    .where(
      sql`exists (
        select 1 from unnest(${products.industries}) as ind
        where trim(both '-' from regexp_replace(replace(lower(ind), '&', 'and'), '[^a-z0-9]+', '-', 'g')) = ${normalizedSlug}
      )`,
    )
    .orderBy(asc(products.name));
  return rows.map((row) => rowToProduct(row));
}

// Full detail columns, plus a marker column to detect a missing `product_details` row.
const detailColumns = {
  ...listingColumns,
  detail_product_id: productDetails.productId,
  einecs_number: productDetails.einecsNumber,
  hsn_no: productDetails.hsnNo,
  iupac_name: productDetails.iupacName,
  synonyms: productDetails.synonyms,
  storage_conditions: productDetails.storageConditions,
  shelf_life: productDetails.shelfLife,
  properties: productDetails.properties,
  applications: productDetails.applications,
  storage: productDetails.storage,
  certificates: productDetails.certificates,
  faq: productDetails.faq,
  extra: productDetails.extra,
};

/**
 * A single product with its full details plus up to 3 related products
 * (sharing a category or industry). Returns null when the id doesn't exist.
 */
export async function getProductById(
  id: string,
): Promise<(Product & { relatedProducts: Product[] }) | null> {
  const rows = await db
    .select(detailColumns)
    .from(products)
    .leftJoin(productDetails, eq(productDetails.productId, products.id))
    .where(eq(products.id, id))
    .limit(1);

  if (rows.length === 0) return null;

  const row = rows[0];
  const detail: ProductDetailRow | null = row.detail_product_id
    ? {
        product_id: row.detail_product_id,
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
        extra: row.extra as Record<string, unknown> | null,
      }
    : null;

  const product = rowToProduct(row, detail);

  const relatedRows = await listingQuery()
    .where(
      and(
        ne(products.id, id),
        or(
          arrayOverlaps(products.categories, product.categories ?? []),
          arrayOverlaps(products.industries, product.industries ?? []),
        ),
      ),
    )
    .limit(3);
  const relatedProducts = relatedRows.map((r) => rowToProduct(r));

  return { ...product, relatedProducts };
}

/**
 * Featured "Top Items" for the home page, ordered by `top_rank` then name.
 * Mirrors the `is_exclusive` flag pattern; `is_top`/`top_rank` live only in the
 * WHERE/ORDER BY (straight off `products`) so they never need to surface on the
 * rich `Product` type.
 */
export async function getTopProducts(limit = 18): Promise<Product[]> {
  const rows = await listingQuery()
    .where(eq(products.isTop, true))
    .orderBy(sql`${products.topRank} nulls last`, asc(products.name))
    .limit(limit);
  return rows.map((row) => rowToProduct(row));
}

/** Count of products per industry, most populous first. */
export async function getIndustryCounts(): Promise<IndustryProductCountMap[]> {
  const result = await db.execute<{ name: string; count: string }>(sql`
    select industry as name, count(*)::text as count
    from products, unnest(industries) as industry
    where industry is not null and industry <> ''
    group by industry
    order by count(*) desc
  `);
  return result.rows.map((r) => ({ name: r.name, count: Number(r.count) }));
}
