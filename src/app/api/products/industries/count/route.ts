import { query } from '@/lib/db';
import { IndustryProductCountMap } from '@/lib/types';

export const revalidate = 60;

export async function GET() {
  try {
    const rows = await query<{ name: string; count: string }>(
      `select industry as name, count(*)::text as count
       from products, unnest(industries) as industry
       where industry is not null and industry <> ''
       group by industry
       order by count(*) desc`,
    );

    const industries: Array<IndustryProductCountMap> = rows.map((r) => ({
      name: r.name,
      count: Number(r.count),
    }));

    return new Response(JSON.stringify(industries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET /api/products/industries/count failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch industry counts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
