import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
}

export default function ProductList({ products, onView, onEdit }: ProductListProps) {
  if (products.length === 0) {
    return <div className="text-gray-500 text-center py-8">No products found</div>;
  }

  return (
    <div className="space-y-4">
      {products.map((product: Product, index: number) => (
        <ProductCard key={product.id || index} product={product} onView={onView} onEdit={onEdit} />
      ))}
    </div>
  );
}
