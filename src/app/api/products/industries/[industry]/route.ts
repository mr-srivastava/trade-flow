import { parseIndustryToSlug } from '@/lib/api';
import { productsData } from '@/lib/data';

export async function GET(request: Request, { params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const { products } = productsData;
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
}
