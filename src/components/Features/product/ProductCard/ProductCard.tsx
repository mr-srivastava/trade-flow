import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Product } from '@/lib/types';
import {
  hasHazardousMaterials,
  getProductId,
} from '@/lib/utils/productHelpers';

// Extend Product type to handle MongoDB _id field
type ProductWithId = Product & { _id?: string };

const ProductCard: React.FC<{ product: ProductWithId }> = ({ product }) => {
  const hasHazards = hasHazardousMaterials(product);
  const productId = getProductId(product);

  return (
    <Link href={`/product/${productId}`}>
      <Card className='h-full overflow-hidden bg-syntara-darker/80 border border-border/40 hover:border-syntara-primary/50 transition-all duration-300 group'>
        <CardContent className='p-4'>
          <h3 className='text-xl font-semibold text-white group-hover:text-syntara-primary transition-colors'>
            {product.name}
          </h3>

          <div className='space-y-3'>
            <div className='flex justify-between align-center'>
              <div>
                <span className='text-syntara-light/70 w-24 text-sm mr-2'>
                  HSN:
                </span>
                <span className='text-syntara-light font-mono text-sm'>
                  {product.hsn_no}
                </span>
              </div>
              {hasHazards && (
                <div className='flex items-center text-amber-500/90'>
                  <AlertTriangle className='h-3 w-3 mr-1' />
                  <span className='text-xs'>Hazardous</span>
                </div>
              )}
            </div>

            <hr />

            <div className='space-y-2'>
              <div className='flex'>
                <span className='text-syntara-light/70 w-24 text-sm'>CAS:</span>
                <span className='text-syntara-light font-mono text-sm'>
                  {product.cas_number}
                </span>
              </div>

              <div className='flex'>
                <span className='text-syntara-light/70 w-24 text-sm'>
                  Formula:
                </span>
                <span className='text-syntara-light font-mono text-sm'>
                  {product.molecular_formula}
                </span>
              </div>
            </div>
          </div>
          <p className='text-syntara-light/70 text-sm line-clamp-3 mt-4'>
            {product.description === '#N/A' ? '' : product.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
