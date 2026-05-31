import { getAllProducts } from '@/lib/products';

// Cached/revalidated hourly — product data changes rarely (see caching strategy).
export const revalidate = 60;

export async function GET() {
  try {
    const products = await getAllProducts();

    return new Response(
      JSON.stringify({ total_products: products.length, products }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
