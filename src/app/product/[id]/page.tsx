export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { GET as getProductHandler } from '@/app/api/products/[id]/route';
import { NextRequest } from 'next/server';
import ProductDetail from '@/components/pages/ProductDetail/ProductDetails';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await fetchProductById(params.id);

  return {
    title: `${product.name} | Trade Now at Syntara`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}

// Direct API handler call for server-side rendering
const fetchProductById = async (id: string) => {
  // Create a mock request and params object for the API handler
  const mockRequest = new NextRequest(
    'http://localhost:3000/api/products/' + id
  );
  const response = await getProductHandler(mockRequest, { params: { id } });
  return response.json();
};
