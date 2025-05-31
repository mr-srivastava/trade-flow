import React from 'react';
import ProductCatalogue from '@/components/Listing/v2/Listing';
import { GET as getProductsHandler } from '@/app/api/products/route';

export const dynamic = 'force-dynamic';

// Direct API handler call for server-side rendering
export default async function Products() {
  try {
    const response = await getProductsHandler();
    const { products } = await response.json();
    return <ProductCatalogue data={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }
}
