import React, { Suspense } from 'react';
import ProductCatalogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';

export const dynamic = 'force-dynamic';

// Extract API call logic into a separate utility function
const apiCall = async (url: string) => {
  const response = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new Error('Unauthorized access. Please log in.');
      case 403:
        throw new Error('Forbidden access. You do not have permission.');
      case 404:
        throw new Error('Products not found.');
      default:
        if (response.status >= 500) {
          throw new Error('Server error. Please try again later.');
        }
        throw new Error('Failed to fetch products');
    }
  }

  return response.json();
};

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
