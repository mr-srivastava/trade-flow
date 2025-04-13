export const dynamic = 'force-dynamic';

import ProductCatelogue from '@/components/Listing/v2/Listing';
import urlMap from '@/lib/endpoint';

export default async function Products() {
  const url = `${urlMap.getProducts()}`;
  console.log('Fetching products from URL:', url);

  try {
    const response = await fetch(url, { next: { revalidate: 60 * 60 } });

    if (!response.ok) {
      console.error(
        `Failed to fetch products. Status: ${response.status}, StatusText: ${response.statusText}`,
      );
      throw new Error('Failed to fetch products');
    }

    const { products } = await response.json();

    return (
      <>
        <ProductCatelogue data={products} />
      </>
    );
  } catch (error) {
    console.error('An error occurred while fetching products:', error);
    throw error;
  }
}
