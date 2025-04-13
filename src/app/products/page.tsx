import React from 'react';
import ProductCatalogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';
import { apiCall } from '@/lib/api';

export const dynamic = 'force-dynamic';

// Extract API call logic into a separate utility function
const fetchProducts = async () => {
  const url = urlMap.getProducts();
  return apiCall(url);
};

// Separate the data-fetching logic from the component
export default async function Products() {
  try {
    const { products } = await fetchProducts();
    return <ProductCatalogue data={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }
}
