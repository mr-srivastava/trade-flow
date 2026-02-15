export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { productService } from '@/lib/services';
import ProductDetail from '@/components/pages/ProductDetail/ProductDetails';
import type { ProductWithRelated } from '@/lib/types';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await productService.getProductWithRelated(id);

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
  const product: ProductWithRelated | null =
    await productService.getProductWithRelated(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}
