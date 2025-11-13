import React from 'react';
import ProductCatalogue from '@/components/pages/ProductListing/ProductListing';
import { GET as getProductsByIndustryHandler } from '@/app/api/products/industries/[industry]/route';
import { Product } from '@/lib/types';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// Utility function to convert industry name to a user-friendly format
const parseToUserFriendlyName = (name: string): string =>
  decodeURIComponent(name)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Direct API handler call for server-side rendering
const fetchProductsByIndustry = async (
  industry: string
): Promise<Product[]> => {
  // Create a mock request and params object for the API handler
  const mockRequest = new NextRequest(
    'http://localhost:3000/api/products/industries/' + industry
  );
  const response = await getProductsByIndustryHandler(mockRequest, {
    params: Promise.resolve({ industry }),
  });
  return response.json();
};

// Generate metadata dynamically
export async function generateMetadata({
  params,
}: {
  params: { industry: string };
}) {
  const userFriendlyIndustryName = parseToUserFriendlyName(params.industry);

  return {
    title: `Products in ${userFriendlyIndustryName} Industry`,
    description: `Explore a wide range of products in the ${userFriendlyIndustryName} industry.`,
  };
}

// Main component
export default async function Products({
  params,
}: {
  params: { industry: string };
}) {
  const { industry } = params;
  const userFriendlyIndustryName = parseToUserFriendlyName(industry);

  try {
    const products = await fetchProductsByIndustry(
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
