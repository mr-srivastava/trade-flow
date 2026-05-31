import { query } from '@/lib/db';
import { rowToProduct, type ProductRow } from '@/lib/mappers';

export const revalidate = 60;

export async function GET(_request: Request, { params }: { params: { industry: string } }) {
  const { industry } = params;

  try {
    // Match the slug against each industry name slugified the same way as
    // parseIndustryToSlug (lowercase, whitespace -> hyphen), done in SQL.
    const rows = await query<ProductRow>(
      `select
         p.id, p.name, p.cas_number, p.molecular_formula, p.categories,
         p.industries, p.sub_categories, p.product_images, p.is_exclusive,
         d.description, d.safety_and_hazard
       from products p
       left join product_details d on d.product_id = p.id
       where exists (
         select 1 from unnest(p.industries) as ind
         where regexp_replace(lower(ind), '\\s+', '-', 'g') = $1
       )
       order by p.name`,
      [industry.toLowerCase()],
    );

    const products = rows.map((row) => rowToProduct(row));

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`GET /api/products/industries/${industry} failed:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
