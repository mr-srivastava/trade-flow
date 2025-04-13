import { productsData } from '@/lib/data';
import { IndustryProductCountMap } from '@/lib/types';

export async function GET() {
  const industries: Array<IndustryProductCountMap> = Object.entries(
    productsData.products.reduce((acc: Record<string, number>, product) => {
      if (product.industries && Array.isArray(product.industries)) {
        product.industries.forEach((industry) => {
          if (industry) {
            acc[industry] = (acc[industry] || 0) + 1;
          }
        });
      }
      return acc;
    }, {}),
  ).map(([name, count]) => ({ name, count }));

  return new Response(JSON.stringify(industries), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
