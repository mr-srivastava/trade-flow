import React from 'react';
import ProductCatalogue from '@/components/pages/ProductListing/ProductListing';
import { PRODUCTS_DATA } from '@/lib/data/data';
import { getProductsByIndustryFromLocal } from '@/lib/data/adapters';

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
  const industrySlug = decodeURIComponent(industry);
  const userFriendlyIndustryName = parseToUserFriendlyName(industry);

  const products = getProductsByIndustryFromLocal(PRODUCTS_DATA, industrySlug);

  return (
    <ProductCatalogue
      data={products}
      title={`Product Catalog | ${userFriendlyIndustryName}`}
    />
  );
}
