// Read page: cached/revalidated hourly (consistent with the other read pages).
export const revalidate = 60;

import ProductDetail from '@/components/ProductDetails/ProductDetails';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    return { title: 'Product Not Found | Syntaraa' };
  }

  return {
    title: `${product.name} | Trade Now at Syntaraa`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}
