export const dynamic = 'force-dynamic';

import ProductDetail from '@/components/ProductDetails/v2/ProductDetails';
import { notFound } from 'next/navigation';
import urlMap from '@/lib/endpoint';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const url = `${urlMap.getProduct(params.id)}`;
  const response = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!response.ok) {
    return {
      title: 'Product Not Found | Syntara',
    };
  }

  const product = await response.json();

  return {
    title: `${product.name} | Trade Now at Syntara`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  let response;
  try {
    response = await fetch(urlMap.getProduct(params.id), { next: { revalidate: 60 * 60 } });

    if (!response.ok) {
      console.error(`Failed to fetch product: ${response.statusText}`);
      notFound();
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
  const product = await response.json();

  if (!product) {
    notFound();
  }
  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}
