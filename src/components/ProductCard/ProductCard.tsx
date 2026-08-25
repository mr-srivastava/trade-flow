import React from 'react';
import { AlertTriangle, Crown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
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
      <Card className='h-full overflow-hidden bg-Syntaraa-darker/80 border border-border/40 hover:border-Syntaraa-primary/50 transition-all duration-300 group'>
        <div className='relative h-40 bg-Syntaraa-darker/70 flex items-center justify-center p-4'>
          {product.is_exclusive && (
            <Badge
              variant='secondary'
              className='absolute top-2 right-2 flex items-center gap-1 bg-Syntaraa-primary/20 text-Syntaraa-primary'
            >
              <Crown className='h-3 w-3' /> Exclusive
            </Badge>
          )}
          {product.product_images && product.product_images.length > 0 ? (
            <Image
              src={product.product_images[0] || '/placeholder.svg'}
              alt={product.name}
              width={150}
              height={150}
              className='max-h-full max-w-full object-contain'
            />
          ) : (
            <div className='text-Syntaraa-light/30 font-medium'>No image available</div>
          )}
        </div>

        <CardContent className='p-4'>
          <h3 className='text-xl font-semibold text-slate-900 mb-2 group-hover:text-Syntaraa-primary transition-colors'>
            {product.name}
          </h3>

          <div className='inline-flex items-center px-2.5 py-1 mb-3 rounded-full text-xs font-medium bg-secondary/80 text-Syntaraa-light/90'>
            {product.categories.map((category) => (
              <span key={category} className='mr-1'>
                {category}
                {category !== product.categories[product.categories.length - 1] && ','}
              </span>
            ))}
          </div>

          {hasHazards && (
            <div className='flex items-center text-amber-500/90 mb-3'>
              <AlertTriangle className='h-4 w-4 mr-1' />
              <span className='text-xs'>Hazardous Material</span>
            </div>
          )}

          <div className='space-y-2 mt-3'>
            <div className='flex'>
              <span className='text-Syntaraa-light/70 w-24 text-sm'>CAS:</span>
              <span className='text-Syntaraa-light font-mono text-sm'>{product.cas_number}</span>
            </div>

            <div className='flex'>
              <span className='text-Syntaraa-light/70 w-24 text-sm'>Formula:</span>
              <span className='text-Syntaraa-light font-mono text-sm'>
                {product.molecular_formula}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className='p-4 pt-0 flex justify-between items-center'>
          <p className='text-xs text-Syntaraa-light/70 line-clamp-1'>{product.description}</p>
          <ChevronRight className='h-4 w-4 text-Syntaraa-primary shrink-0 ml-2 group-hover:translate-x-1 transition-transform' />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
