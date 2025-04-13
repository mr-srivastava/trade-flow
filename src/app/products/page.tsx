import React from 'react';
import ProductCatelogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';

export default async function Products() {
  const response = await fetch(urlMap.getProducts(), { cache: 'no-store' });
  const products = await response.json();

  return (
    <>
      <ProductCatelogue data={products} />
    </>
  );
}
