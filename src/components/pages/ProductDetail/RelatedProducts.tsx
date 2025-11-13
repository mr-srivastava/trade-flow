import React from 'react';
import { Product } from '@/lib/types';
import ProductCard from '@/components/Features/product/ProductCard/ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className='mt-16'>
      <h2 className='text-2xl font-bold text-white mb-8'>Related Products</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {products.map((relatedProduct) => {
          const productId =
            (relatedProduct as Product & { _id?: string }).id ||
            (relatedProduct as Product & { _id?: string })._id;
          return <ProductCard key={productId} product={relatedProduct} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
