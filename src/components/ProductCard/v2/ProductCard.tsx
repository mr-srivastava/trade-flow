import React from 'react';
import { AlertTriangle, ChevronRight, BeakerIcon } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Product } from '@/lib/types';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const hasHazards =
    product.safety_and_hazard &&
    product.safety_and_hazard.some(
      (item) =>
        item.value.includes('hazardous') ||
        item.value.includes('Toxic') ||
        item.value.includes('Corrosive'),
    );
  return (
    <Link href={`/product/${product.id}`} key={product.id}>
      <Card className='h-full overflow-hidden bg-syntara-darker/80 border border-border/40 hover:border-syntara-primary/50 transition-all duration-300 group'>
        <div className='relative h-40 bg-syntara-darker/70 flex items-center justify-center p-4'>
          <div className='card-image aspect-video bg-gradient-to-br from-syntara-darker to-gray-900 flex items-center justify-center'>
            <BeakerIcon className='h-12 w-12 text-syntara-light/30' />
          </div>
        </div>

        <CardContent className='p-4'>
          <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-syntara-primary transition-colors'>
            {product.name}
          </h3>

          <p className='text-syntara-light/70 text-sm line-clamp-3 mb-4'>{product.description}</p>

          <div className='space-y-3'>
            <div className='flex flex-wrap gap-2'>
              <span className='text-syntara-light/80 text-sm'>Industries:</span>
              {product.industries.map((industry) => (
                <span key={industry} className='text-syntara-primary text-sm font-medium'>
                  {industry}
                  {industry !== product.industries[product.industries.length - 1] && ','}
                </span>
              ))}
            </div>

            {hasHazards && (
              <div className='flex items-center text-amber-500/90'>
                <AlertTriangle className='h-4 w-4 mr-1' />
                <span className='text-xs'>Hazardous Material</span>
              </div>
            )}

            <div className='space-y-2'>
              <div className='flex'>
                <span className='text-syntara-light/70 w-24 text-sm'>CAS:</span>
                <span className='text-syntara-light font-mono text-sm'>{product.cas_number}</span>
              </div>

              <div className='flex'>
                <span className='text-syntara-light/70 w-24 text-sm'>Formula:</span>
                <span className='text-syntara-light font-mono text-sm'>
                  {product.molecular_formula}
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className='p-4 pt-0 flex justify-between items-center'>
          <span className='text-xs text-syntara-light/70 line-clamp-1'>View Details</span>
          <ChevronRight className='h-4 w-4 text-syntara-primary shrink-0 ml-2 group-hover:translate-x-1 transition-transform' />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
