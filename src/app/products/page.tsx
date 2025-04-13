import React, { Suspense } from 'react';
import ProductCatelogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';

export const dynamic = 'force-dynamic';

async function Products() {
  const url = urlMap.getProducts();

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 60 } });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const { products } = await response.json();

    return <ProductCatelogue data={products} />;
  } catch (error) {
    throw error;
  }
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <Products />
    </Suspense>
  );
}
