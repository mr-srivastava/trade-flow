import React from 'react';
import ProductCatalogue from '@/components/pages/ProductListing/ProductListing';
import { productService } from '@/lib/services';
import type { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

const parseToUserFriendlyName = (name: string): string =>
  decodeURIComponent(name)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const userFriendlyIndustryName = parseToUserFriendlyName(industry);

  return {
    title: `Products in ${userFriendlyIndustryName} Industry`,
    description: `Explore a wide range of products in the ${userFriendlyIndustryName} industry.`,
  };
}

export default async function Products({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const userFriendlyIndustryName = parseToUserFriendlyName(industry);

  try {
    const products: Product[] = await productService.getProductsByIndustry(
      decodeURIComponent(industry)
    );

    return (
      <ProductCatalogue
        data={products}
        title={`Product Catalog | ${userFriendlyIndustryName}`}
      />
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }
}
