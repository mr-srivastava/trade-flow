import { productService } from '@/lib/services';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ industry: string }> }
) {
  try {
    const { industry } = await params;
    console.log('Industry:', industry);

    // Get products filtered by industry
    const filteredProducts = await productService.getProductsByIndustry(
      industry
    );

    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products by industry:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch products by industry' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
