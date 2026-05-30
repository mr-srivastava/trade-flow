/** Temporary generator: emit batched INSERT SQL (JSON-literal based) for Supabase load. */
import { writeFileSync, mkdirSync } from 'fs';
import { productsData } from '../src/lib/data';
import type { Product } from '../src/lib/types';

const OUT = '/sessions/inspiring-quirky-franklin/mnt/outputs/sqlgen2';
mkdirSync(OUT, { recursive: true });

const DETAIL_KEYS = new Set([
  'description', 'einecs_number', 'hsn_no', 'iupac_name', 'synonyms', 'shelf_life',
  'properties', 'safety_and_hazard', 'applications', 'storage', 'certificates', 'faq',
]);
const PRODUCT_KEYS = new Set([
  'id', 'name', 'cas_number', 'molecular_formula', 'categories', 'industries',
  'sub_categories', 'product_images', 'is_exclusive',
]);

const products = productsData.products;

const productRows = products.map((p) => ({
  id: p.id,
  name: p.name,
  cas_number: p.cas_number ?? null,
  molecular_formula: p.molecular_formula ?? null,
  categories: p.categories ?? [],
  industries: p.industries ?? [],
  sub_categories: p.sub_categories ?? [],
  product_images: p.product_images ?? [],
  is_exclusive: p.is_exclusive ?? false,
}));

const detailRows = products.map((p: Product) => {
  // extra omitted for this load — live UI renders only promoted columns.
  const extra: Record<string, unknown> = {};
  return {
    product_id: p.id,
    description: p.description ?? null,
    einecs_number: p.einecs_number ?? null,
    hsn_no: p.hsn_no ?? null,
    iupac_name: p.iupac_name ?? null,
    synonyms: p.synonyms ?? null,
    shelf_life: p.shelf_life ?? null,
    properties: p.properties ?? [],
    safety_and_hazard: p.safety_and_hazard ?? [],
    applications: p.applications ?? [],
    storage: p.storage ?? [],
    certificates: p.certificates ?? [],
    faq: p.faq ?? [],
    extra,
  };
});

function chunk<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function productSQL(rows: typeof productRows): string {
  const json = JSON.stringify(rows);
  return `insert into products
  (id,name,cas_number,molecular_formula,categories,industries,sub_categories,product_images,is_exclusive)
select id,name,cas_number,molecular_formula,categories,industries,sub_categories,product_images,is_exclusive
from jsonb_to_recordset($JSON$${json}$JSON$::jsonb) as x(
  id text, name text, cas_number text, molecular_formula text,
  categories text[], industries text[], sub_categories text[], product_images text[], is_exclusive boolean
)
on conflict (id) do nothing;`;
}

function detailSQL(rows: typeof detailRows): string {
  const json = JSON.stringify(rows);
  return `insert into product_details
  (product_id,description,einecs_number,hsn_no,iupac_name,synonyms,shelf_life,properties,safety_and_hazard,applications,storage,certificates,faq,extra)
select product_id,description,einecs_number,hsn_no,iupac_name,synonyms,shelf_life,properties,safety_and_hazard,applications,storage,certificates,faq,extra
from jsonb_to_recordset($JSON$${json}$JSON$::jsonb) as x(
  product_id text, description text, einecs_number text, hsn_no text, iupac_name text,
  synonyms text, shelf_life text, properties jsonb, safety_and_hazard jsonb,
  applications jsonb, storage jsonb, certificates jsonb, faq jsonb, extra jsonb
)
on conflict (product_id) do nothing;`;
}

const files: string[] = [];
// products: all in one (small)
writeFileSync(`${OUT}/00_products.sql`, productSQL(productRows));
files.push('00_products.sql');

// details: batch to keep each statement modest
chunk(detailRows, 10).forEach((b, i) => {
  const name = `${String(i + 1).padStart(2, '0')}_details.sql`;
  writeFileSync(`${OUT}/${name}`, detailSQL(b));
  files.push(name);
});

console.log(`products=${products.length}`);
console.log('files:', files.join(', '));
