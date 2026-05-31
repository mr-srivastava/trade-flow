import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IndustryProductCountMap, ProductCategoriesData } from '@/lib/types';
import { getIndustryCounts } from '@/lib/products';
import { parseIndustryToSlug } from '@/lib/api';
import Link from 'next/link';

// Categories hidden from the UI (kept in code/data, just not displayed).
const HIDDEN_CATEGORIES = ['Beauty & Personal Care', 'Flavors & Fragrances', 'Food & Nutrition'];

const ProductCategories: React.FC<{ productCategories: ProductCategoriesData }> = async ({
  productCategories,
}) => {
  const allIndustries = await getIndustryCounts();
  const industries = allIndustries.filter(
    (industry: IndustryProductCountMap) => !HIDDEN_CATEGORIES.includes(industry.name),
  );

  return (
    <section id='products' className='py-4 bg-gradient-to-b from-syntara-darker to-syntara-dark'>
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-slate-900'>
            {productCategories.title}
          </h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>{productCategories.subtitle}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {industries.map((industry: IndustryProductCountMap) => (
            <Link
              href={`/products/industries/${parseIndustryToSlug(industry.name)}`}
              key={industry.name}
              className='glass-card p-6 hover:border-syntara-primary/50 transition-all duration-300 group'
            >
              <div className='flex justify-between items-center'>
                <h3 className='text-lg font-medium text-slate-900'>{industry.name}</h3>
                <span className='text-sm text-syntara-light/70 bg-syntara-darker py-1 px-2 rounded-full'>
                  {industry.count}
                </span>
              </div>
              <div className='mt-6 flex justify-between items-center'>
                <span className='text-sm text-syntara-light/70'>Explore products</span>
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

export default ProductCategories;
