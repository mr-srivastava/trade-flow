import React from 'react';
import ProductCatalogue from '@/components/pages/ProductListing/ProductListing';
import { productService } from '@/lib/services';

export const dynamic = 'force-dynamic';

// Server-side rendering using ProductService directly
export default async function Products() {
  try {
    const { products } = await productService.getAllProducts();
    return <ProductCatalogue data={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }
}
