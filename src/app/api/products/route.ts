import { productsData } from '@/lib/data';

export async function GET() {
  return new Response(JSON.stringify(productsData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
