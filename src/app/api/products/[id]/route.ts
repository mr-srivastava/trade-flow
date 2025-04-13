import { productsData } from '@/lib/data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productsData.products.find((product) => product.id === id);

  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  const relatedProducts = productsData.products
    .filter(
      (p) =>
        p.id !== id &&
        (p.categories.some((cat) => product.categories.includes(cat)) ||
          p.industries.some((ind) => product.industries.includes(ind))),
    )
    .slice(0, 4);
  return new Response(JSON.stringify({ ...product, relatedProducts }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
