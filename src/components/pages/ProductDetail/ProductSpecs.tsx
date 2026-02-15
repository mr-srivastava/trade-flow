import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ProductSpecsProps {
  casNumber?: string;
  molecularFormula?: string;
  hsnNo?: string;
  isHazardous?: boolean;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({
  casNumber,
  molecularFormula,
  hsnNo,
  isHazardous,
}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
      <div className='flex flex-col'>
        <span className='text-syntara-light/70 text-sm'>CAS NUMBER</span>
        <span className='text-foreground font-mono'>{casNumber ?? '-'}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-syntara-light/70 text-sm'>MOLECULAR FORMULA</span>
        <span className='text-foreground font-mono'>{molecularFormula ?? '-'}</span>
      </div>
      <div className='flex flex-col'>
        <span className='text-syntara-light/70 text-sm'>HSN CODE</span>
        <span className='text-foreground font-mono'>{hsnNo ?? '-'}</span>
      </div>
      {isHazardous && (
        <div className='flex flex-col'>
          <span className='text-syntara-light/70 text-sm'>SAFETY</span>
          <div className='flex items-center gap-2 mt-1'>
            <span className='inline-flex items-center gap-1.5 text-amber-500/90'>
              <AlertTriangle className='h-3.5 w-3.5' />
              <span className='text-sm'>Hazardous</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecs;
