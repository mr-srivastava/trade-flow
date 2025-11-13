import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/Features/product/ProductCard/ProductCard';
import ProductPagination from './ProductPagination';

interface ProductGridProps {
  products: Product[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  currentPage,
  totalPages,
  totalProducts,
  productsPerPage,
  onPageChange,
}) => {
  return (
    <section className='flex-grow'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className='mt-12'>
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalProducts={totalProducts}
          productsPerPage={productsPerPage}
        />
      </div>
    </section>
  );
};

export default ProductGrid;
