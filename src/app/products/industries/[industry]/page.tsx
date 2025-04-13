import React from 'react';
import ProductCatalogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';
import { apiCall } from '@/lib/api';
import { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Utility function to convert industry name to a user-friendly format
const parseToUserFriendlyName = (name: string): string =>
  decodeURIComponent(name)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Fetch products by industry
const fetchProductsByIndustry = async (industry: string): Promise<Product[]> => {
  const url = urlMap.getProductsByIndustry(industry);
  return apiCall(url);
};

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

  try {
    const products = await fetchProductsByIndustry(decodeURIComponent(industry));

    return (
      <ProductCatalogue data={products} title={`Product Catalog | ${userFriendlyIndustryName}`} />
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products. Please try again later.</div>;
  }
}
