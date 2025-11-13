'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { IndustryProductCountMap, ProductCategoriesData } from '@/lib/types';
import { apiCall, parseIndustryToSlug, urlMap } from '@/lib/utils';
import Link from 'next/link';

const ProductCategories: React.FC<{
  productCategories: ProductCategoriesData;
}> = ({ productCategories }) => {
  const [industries, setIndustries] = useState<IndustryProductCountMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setLoading(true);
        const data = await apiCall(urlMap.getIndustriesProductCount());
        setIndustries(data);
      } catch (err) {
        setError('Failed to load industries');
        console.error('Error fetching industries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  if (error) {
    return (
      <section
        id='products'
        className='py-4 bg-gradient-to-b from-syntara-darker to-syntara-dark'
      >
        <div className='section-container'>
          <div className='text-center'>
            <p className='text-red-400'>
              Error loading product categories. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id='products'
      className='py-4 bg-gradient-to-b from-syntara-darker to-syntara-dark'
    >
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white'>
            {productCategories.title}
          </h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>
            {productCategories.subtitle}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {loading
            ? // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='glass-card p-6 animate-pulse'>
                  <div className='flex justify-between items-center'>
                    <div className='h-6 bg-syntara-light/20 rounded w-3/4'></div>
                    <div className='h-6 bg-syntara-light/20 rounded-full w-8'></div>
                  </div>
                  <div className='mt-6 flex justify-between items-center'>
                    <div className='h-4 bg-syntara-light/20 rounded w-1/2'></div>
                    <div className='h-5 w-5 bg-syntara-light/20 rounded'></div>
                  </div>
                </div>
              ))
            : industries.map((industry: IndustryProductCountMap) => (
                <Link
                  href={`/products/industries/${parseIndustryToSlug(
                    industry.name
                  )}`}
                  key={industry.name}
                  className='glass-card p-6 hover:border-syntara-primary/50 transition-all duration-300 group'
                >
                  <div className='flex justify-between items-center'>
                    <h3 className='text-lg font-medium text-white'>
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
                    <ChevronRight className='h-5 w-5 text-syntara-primary transform group-hover:translate-x-1 transition-transform duration-300' />
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
