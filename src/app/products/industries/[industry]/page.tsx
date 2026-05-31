import React from 'react';
import ProductCatalogue from '@/components/Listing/v2/Listing';
import { getProductsByIndustrySlug } from '@/lib/products';

// Read page: cached/revalidated hourly. Now valid since we query the DB
// directly (no `headers()` / self-fetch to conflict with ISR).
export const revalidate = 60;

// Utility function to convert industry slug to a user-friendly format
const parseToUserFriendlyName = (name: string): string =>
  decodeURIComponent(name)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { industry: string } }) {
  const userFriendlyIndustryName = parseToUserFriendlyName(params.industry);

  return {
    title: `Products in ${userFriendlyIndustryName} Industry`,
    description: `Explore a wide range of products in the ${userFriendlyIndustryName} industry.`,
  };
}

// Main component
export default async function Products({ params }: { params: { industry: string } }) {
  const { industry } = params;
  const userFriendlyIndustryName = parseToUserFriendlyName(industry);

  const products = await getProductsByIndustrySlug(decodeURIComponent(industry));

  return (
    <ProductCatalogue data={products} title={`Product Catalog | ${userFriendlyIndustryName}`} />
  );
}
