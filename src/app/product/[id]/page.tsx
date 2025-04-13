export const dynamic = 'force-dynamic';

import ProductDetail from '@/components/ProductDetails/v2/ProductDetails';
import { notFound } from 'next/navigation';
import urlMap from '@/lib/endpoint';
import { apiCall } from '@/lib/api';

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

const fetchProductById = async (id: string) => {
  const url = urlMap.getProduct(id);
  return apiCall(url);
};
