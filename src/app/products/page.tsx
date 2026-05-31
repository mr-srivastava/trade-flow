import React from 'react';
import ProductCatalogue from '@/components/Listing/v2/Listing';
import { getAllProducts } from '@/lib/products';

// Read page: cached/revalidated hourly. Now valid since we query the DB
// directly (no `headers()` / self-fetch to conflict with ISR).
export const revalidate = 60;

export default async function Products() {
  const products = await getAllProducts();
  return <ProductCatalogue data={products} />;
}
