/**
 * One-time migration: load the bundled products from src/lib/data.ts into
 * Supabase (`products` + `product_details`).
 *
 * Run:  npx tsx scripts/migrate-products.ts
 * Requires DATABASE_URL in the environment (loaded from .env.local).
 *
 * Idempotent: re-running upserts the same rows.
 */
import 'dotenv/config';
import { Pool } from 'pg';
import { productsData } from '../src/lib/data';
import type { Product } from '../src/lib/types';

// Fields promoted to real columns; everything else goes into product_details.extra.
const DETAIL_KEYS = new Set([
  'description',
  'einecs_number',
  'hsn_no',
  'iupac_name',
  'synonyms',
  'shelf_life',
  'properties',
  'safety_and_hazard',
  'applications',
  'storage',
  'certificates',
  'faq',
]);
const PRODUCT_KEYS = new Set([
  'id',
  'name',
  'cas_number',
  'molecular_formula',
  'categories',
  'industries',
  'sub_categories',
  'product_images',
  'is_exclusive',
]);

function buildExtra(product: Product): Record<string, unknown> {
  const extra: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(product)) {
    if (!DETAIL_KEYS.has(key) && !PRODUCT_KEYS.has(key)) {
      extra[key] = value;
    }
  }
  return extra;
}

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  const products = productsData.products;
  console.log(`Migrating ${products.length} products...`);

  let migrated = 0;
  for (const product of products) {
    const client = await pool.connect();
    try {
      await client.query('begin');

      await client.query(
        `insert into products
           (id, name, cas_number, molecular_formula, categories, industries,
            sub_categories, product_images, is_exclusive, updated_at)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9, now())
         on conflict (id) do update set
           name = excluded.name,
           cas_number = excluded.cas_number,
           molecular_formula = excluded.molecular_formula,
           categories = excluded.categories,
           industries = excluded.industries,
           sub_categories = excluded.sub_categories,
           product_images = excluded.product_images,
           is_exclusive = excluded.is_exclusive,
           updated_at = now()`,
        [
          product.id,
          product.name,
          product.cas_number ?? null,
          product.molecular_formula ?? null,
          product.categories ?? [],
          product.industries ?? [],
          product.sub_categories ?? [],
          product.product_images ?? [],
          product.is_exclusive ?? false,
        ],
      );

      await client.query(
        `insert into product_details
           (product_id, description, einecs_number, hsn_no, iupac_name, synonyms,
            shelf_life, properties, safety_and_hazard, applications, storage,
            certificates, faq, extra, updated_at)
         values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, now())
         on conflict (product_id) do update set
           description = excluded.description,
           einecs_number = excluded.einecs_number,
           hsn_no = excluded.hsn_no,
           iupac_name = excluded.iupac_name,
           synonyms = excluded.synonyms,
           shelf_life = excluded.shelf_life,
           properties = excluded.properties,
           safety_and_hazard = excluded.safety_and_hazard,
           applications = excluded.applications,
           storage = excluded.storage,
           certificates = excluded.certificates,
           faq = excluded.faq,
           extra = excluded.extra,
           updated_at = now()`,
        [
          product.id,
          product.description ?? null,
          product.einecs_number ?? null,
          product.hsn_no ?? null,
          product.iupac_name ?? null,
          product.synonyms ?? null,
          product.shelf_life ?? null,
          JSON.stringify(product.properties ?? []),
          JSON.stringify(product.safety_and_hazard ?? []),
          JSON.stringify(product.applications ?? []),
          JSON.stringify(product.storage ?? []),
          JSON.stringify(product.certificates ?? []),
          JSON.stringify(product.faq ?? []),
          JSON.stringify(buildExtra(product)),
        ],
      );

      await client.query('commit');
      migrated += 1;
    } catch (err) {
      await client.query('rollback');
      console.error(`Failed on product ${product.id} (${product.name}):`, err);
      throw err;
    } finally {
      client.release();
    }
  }

  console.log(`Done. Migrated ${migrated} products.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
