import { parseIndustryToSlug } from '@/lib/api';
import { getAllProducts } from '@/lib/mongodb-db';

export async function GET(request: Request, { params }: { params: Promise<{ industry: string }> }) {
  try {
    const { industry } = await params;
    const { products } = await getAllProducts();
    console.log('Industry:', industry);

    // Filter products based on the industry parameter
    const filteredProducts = products.filter((product) => {
      const industrySlugs = product.industries.map(parseIndustryToSlug);
      return industrySlugs.includes(industry);
    });

    return new Response(JSON.stringify(filteredProducts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products by industry:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products by industry' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
