import { getProductsByIndustrySlug } from '@/lib/products';

export const revalidate = 60;

export async function GET(_request: Request, { params }: { params: { industry: string } }) {
  const { industry } = params;

  try {
    const products = await getProductsByIndustrySlug(industry);

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
