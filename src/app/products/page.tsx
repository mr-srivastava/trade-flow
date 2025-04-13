import React from 'react';
import ProductCatelogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';

export default async function Products() {
  const url = `${urlMap.getProducts()}`;
  console.log('Fetching products from URL:', url);
  const response = await fetch(url, { cache: 'no-store' });
  const products = await response.json();

  return (
    <>
      <ProductCatelogue data={products} />
    </>
  );
}
