import React from 'react';
import ProductCatelogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';

export default async function Products() {
  const url = `${urlMap.getProducts()}`;
  console.log('Fetching products from URL:', url);

  try {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      console.error(
        `Failed to fetch products. Status: ${response.status}, StatusText: ${response.statusText}`,
      );
      throw new Error('Failed to fetch products');
    }

    const { products } = await response.json();
    return products;
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    throw error;
  }

  return (
    <>
      <ProductCatelogue data={products} />
    </>
  );
}
