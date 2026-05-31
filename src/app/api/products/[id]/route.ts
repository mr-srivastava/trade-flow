import { getProductById } from '@/lib/products';

export const revalidate = 60;

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await getProductById(id);

    if (!product) {
      return new Response('Product not found', { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`GET /api/products/${id} failed:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
