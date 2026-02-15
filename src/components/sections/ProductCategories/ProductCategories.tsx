'use client';

import React from 'react';
import { CaretRightIcon } from '@phosphor-icons/react';
import { IndustryProductCountMap, ProductCategoriesData } from '@/lib/types';
import { parseIndustryToSlug } from '@/lib/utils/slug';
import Link from 'next/link';

const ProductCategories: React.FC<{
  productCategories: ProductCategoriesData;
  industries: IndustryProductCountMap[];
}> = ({ productCategories, industries }) => {
  return (
    <section
      id='products'
      className='py-4 bg-gradient-to-b from-card to-background dark:from-syntara-darker dark:to-syntara-dark'
    >
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-foreground'>
            {productCategories.title}
          </h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>
            {productCategories.subtitle}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {industries.map((industry: IndustryProductCountMap) => (
            <Link
              href={`/products/industries/${parseIndustryToSlug(industry.name)}`}
              key={industry.name}
              className='glass-card p-6 hover:border-syntara-primary/50 transition-colors duration-300 group'
            >
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-medium text-foreground'>
                  {industry.name}
                </h3>
                <span className='text-sm text-syntara-light/70 bg-syntara-darker py-1 px-2 rounded-full'>
                  {industry.count}
                </span>
              </div>
              <div className='mt-6 flex justify-between items-center'>
                <span className='text-sm text-syntara-light/70'>
                  Explore products
                </span>
                <CaretRightIcon className='h-5 w-5 text-syntara-primary transform group-hover:translate-x-1 transition-transform duration-300' />
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-10 text-center'>
          <Link href='/products' className='btn-primary'>
            {productCategories.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProductCategories);
