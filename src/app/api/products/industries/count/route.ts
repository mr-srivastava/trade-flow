import { getAllProducts } from '@/lib/mongodb-db';
import { IndustryProductCountMap } from '@/lib/types';

export async function GET() {
  try {
    const { products } = await getAllProducts();
    
    const industries: Array<IndustryProductCountMap> = Object.entries(
      products.reduce((acc: Record<string, number>, product) => {
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
  } catch (error) {
    console.error('Error fetching industry counts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch industry counts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
