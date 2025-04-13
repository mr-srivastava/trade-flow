import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IndustryProductCountMap, ProductCategoriesData } from '@/lib/types';
import urlMap from '@/lib/endpoint';
import { apiCall } from '@/lib/api';

const fetchIndustries = async () => {
  const url = urlMap.getIndustries();
  return apiCall(url);
};

const ProductCategories: React.FC<{ productCategories: ProductCategoriesData }> = async ({
  productCategories,
}) => {
  const industries = await fetchIndustries();

  return (
    <section id='products' className='py-16 bg-gradient-to-b from-syntara-dark to-syntara-darker'>
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white'>
            {productCategories.title}
          </h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>{productCategories.subtitle}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {industries.map((industry: IndustryProductCountMap) => (
            <div
              key={industry.name}
              className='glass-card p-6 hover:border-syntara-primary/50 transition-all duration-300 group'
            >
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-medium text-white'>{industry.name}</h3>
                <span className='text-sm text-syntara-light/70 bg-syntara-darker py-1 px-2 rounded-full'>
                  {industry.count}
                </span>
              </div>
              <div className='mt-6 flex justify-between items-center'>
                <span className='text-sm text-syntara-light/70'>Explore products</span>
                <ChevronRight className='h-5 w-5 text-syntara-primary transform group-hover:translate-x-1 transition-transform duration-300' />
              </div>
            </div>
          ))}
        </div>

        <div className='mt-10 text-center'>
          <a href='#' className='btn-primary'>
            {productCategories.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
