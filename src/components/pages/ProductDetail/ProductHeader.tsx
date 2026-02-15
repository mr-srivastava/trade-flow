import React from 'react';

interface ProductHeaderProps {
  name: string;
  industries: string[];
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ name }) => {
  return (
    <div>
      <h1 className='text-3xl lg:text-4xl font-bold text-white mb-3'>
        {name ?? 'Untitled Product'}
      </h1>
      {/* {industries && industries.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {industries.map((industry) => (
            <span
              key={industry}
              className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-syntara-primary/20 text-syntara-primary'
            >
              {industry}
              {industry !== industries[industries.length - 1] && ','}
            </span>
          ))}
        </div>
      )} */}
      <hr className='border-t my-4' />
    </div>
  );
};

export default ProductHeader;
