// Read page: cached/revalidated hourly (consistent with the product API).
export const revalidate = 60;

import ProductDetail from '@/components/ProductDetails/v2/ProductDetails';
import { notFound } from 'next/navigation';
import urlMap from '@/lib/endpoint';
import type { Product } from '@/lib/types';

type ProductWithRelated = Product & { relatedProducts: Array<Product> };

interface ProductPageProps {
  params: {
    id: string;
  };
}

/**
 * Returns the product, or null when it doesn't exist (404).
 * Throws only on genuine server/network errors so those still surface.
 */
const fetchProductById = async (id: string): Promise<ProductWithRelated | null> => {
  const res = await fetch(urlMap.getProduct(id), { next: { revalidate: 60 } });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}: ${res.status}`);
  }
  return res.json();
};

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return { title: 'Product Not Found | Syntara' };
  }

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
