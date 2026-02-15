import React from 'react';
import ProductCatalogue from '@/components/pages/ProductListing/ProductListing';
import { PRODUCTS_DATA } from '@/lib/data/data';
import { fullProductToProduct } from '@/lib/data/adapters';

export const dynamic = 'force-dynamic';

export default async function Products() {
  const products = PRODUCTS_DATA.map(fullProductToProduct);
  return <ProductCatalogue data={products} />;
}
