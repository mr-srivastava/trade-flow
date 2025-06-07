import React from 'react';
import { GET as getProductsHandler } from '@/app/api/products/route';
import { Product } from '@/lib/types';
import AdminProductManager from '@/components/Admin/AdminProductManager';
import ErrorDisplay from '@/components/Admin/ErrorDisplay';

export const dynamic = 'force-dynamic';

// Main Admin Page Component (Server Component)
export default async function AdminPage() {
  let products: Product[] = [];
  let error = null;

  try {
    const response = await getProductsHandler();
    const data = await response.json();
    products = data.products || [];
  } catch (err) {
    console.error('Error fetching products:', err);
    error = 'Failed to load products';
  }

  return (
    <div className="flex flex-col min-h-screen p-6">
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Admin - Product Management</h1>

          {error ? <ErrorDisplay message={error} /> : <AdminProductManager products={products} />}
        </div>
      </main>
    </div>
  );
}
