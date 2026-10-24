// Read page: cached/revalidated hourly (consistent with the other read pages).
export const revalidate = 60;

import ProductDetail from '@/components/ProductDetails/ProductDetails';
import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(props: ProductPageProps) {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
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
