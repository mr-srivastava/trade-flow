import { getIndustryCounts } from '@/lib/products';

export const revalidate = 60;

export async function GET() {
  try {
    const industries = await getIndustryCounts();

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
