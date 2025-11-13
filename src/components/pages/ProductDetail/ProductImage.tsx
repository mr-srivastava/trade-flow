import React from 'react';
import { AlertTriangle, BeakerIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProductImageProps {
  industries: string[];
  hasHazards: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  industries,
  hasHazards,
}) => {
  return (
    <Card className='bg-syntara-darker/70 border border-border/50 overflow-hidden'>
      <div className='relative h-64 lg:h-96 bg-syntara-darker/70 rounded-lg overflow-hidden flex items-center justify-center'>
        <div className='w-full h-full flex items-center justify-center'>
          <BeakerIcon className='h-24 w-24 text-syntara-light/30' />
        </div>
      </div>
      <CardContent className='p-4'>
        <div className='space-y-2'>
          {industries && industries.length > 0 && (
            <Badge
              variant='outline'
              className='w-full justify-center py-1.5 border-border/50 text-syntara-light/90'
            >
              {industries.map((industry) => (
                <span key={industry} className='mr-1'>
                  {industry}
                  {industry !== industries[industries.length - 1] && ','}
                </span>
              ))}
            </Badge>
          )}
          {hasHazards && (
            <Badge
              variant='outline'
              className='w-full justify-center py-1.5 border-amber-500/30 bg-amber-500/10 text-amber-500 flex gap-2'
            >
              <AlertTriangle className='h-3.5 w-3.5' /> Hazardous
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductImage;
