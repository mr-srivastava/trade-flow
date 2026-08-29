import React from 'react';
import ProductCatalogue from '@/components/Listing/Listing';
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
export async function generateMetadata(props: { params: Promise<{ industry: string }> }) {
  const params = await props.params;
  const userFriendlyIndustryName = parseToUserFriendlyName(params.industry);

  return {
    title: `Products in ${userFriendlyIndustryName} Industry`,
    description: `Explore a wide range of products in the ${userFriendlyIndustryName} industry.`,
  };
}

// Main component
export default async function Products(props: { params: Promise<{ industry: string }> }) {
  const params = await props.params;
  const { industry } = params;
  const userFriendlyIndustryName = parseToUserFriendlyName(industry);

  const products = await getProductsByIndustrySlug(decodeURIComponent(industry));

  return (
    <ProductCatalogue data={products} title={`Product Catalog | ${userFriendlyIndustryName}`} />
  );
}
