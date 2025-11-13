import { productService } from '@/lib/services';

export async function GET() {
  try {
    const industries = await productService.getIndustryCounts();

    return new Response(JSON.stringify(industries), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching industry counts:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch industry counts' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
