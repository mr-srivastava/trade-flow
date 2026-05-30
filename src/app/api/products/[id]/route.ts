import { query } from '@/lib/db';
import { rowToProduct, type ProductRow, type ProductDetailRow } from '@/lib/mappers';

export const revalidate = 60;

type JoinedRow = ProductRow & {
  // product_details columns (null when no detail row exists)
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

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
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

    if (rows.length === 0) {
      return new Response('Product not found', { status: 404 });
    }

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

    // Related products: share a category or industry. Uses array overlap (&&).
    const relatedRows = await query<ProductRow>(
      `select
         p.id, p.name, p.cas_number, p.molecular_formula, p.categories,
         p.industries, p.sub_categories, p.product_images, p.is_exclusive,
         d.description, d.safety_and_hazard
       from products p
       left join product_details d on d.product_id = p.id
       where p.id <> $1
         and (p.categories && $2::text[] or p.industries && $3::text[])
       limit 3`,
      [id, product.categories ?? [], product.industries ?? []],
    );
    const relatedProducts = relatedRows.map((r) => rowToProduct(r));

    return new Response(JSON.stringify({ ...product, relatedProducts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`GET /api/products/${id} failed:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
