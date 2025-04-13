import React from 'react';
import ProductCatelogue from '@/components/Listing/v2/Listing';

export default async function Products() {
  const response = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  const products = await response.json();

  return (
    <>
      <ProductCatelogue data={products} />
    </>
  );
}
