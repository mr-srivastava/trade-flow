import { query } from '@/lib/db';
import { rowToProduct, type ProductRow } from '@/lib/mappers';

// Cached/revalidated hourly — product data changes rarely (see caching strategy).
export const revalidate = 60;

export async function GET() {
  try {
    // Listing needs the light columns + description & safety_and_hazard (for the
    // card preview and hazard badge), so we LEFT JOIN only those two detail fields.
    const rows = await query<ProductRow>(
      `select
         p.id, p.name, p.cas_number, p.molecular_formula, p.categories,
         p.industries, p.sub_categories, p.product_images, p.is_exclusive,
         d.description, d.safety_and_hazard
       from products p
       left join product_details d on d.product_id = p.id
       order by p.name`,
    );

    const countRows = await query<{ count: string }>(
      `select count(*)::text as count from products`,
    );
    const totalProducts = Number(countRows[0]?.count ?? rows.length);

    const products = rows.map((row) => rowToProduct(row));

    return new Response(JSON.stringify({ total_products: totalProducts, products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
