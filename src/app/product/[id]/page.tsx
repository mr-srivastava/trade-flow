export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import ProductDetail from '@/components/pages/ProductDetail/ProductDetails';
import type { ProductWithRelated } from '@/lib/types';
import { PRODUCTS_DATA } from '@/lib/data/data';
import { getProductWithRelatedFromLocal } from '@/lib/data/adapters';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductWithRelatedFromLocal(PRODUCTS_DATA, id);

  if (!product) {
    return {
      title: 'Product Not Found | Syntara',
      description: 'The requested product could not be found.',
    };
  }

  return {
    title: `${product.name} | Trade Now at Syntara`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product: ProductWithRelated | null = getProductWithRelatedFromLocal(
    PRODUCTS_DATA,
    id
  );

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}
