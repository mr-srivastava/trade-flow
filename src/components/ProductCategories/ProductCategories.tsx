import React from 'react';
import fs from 'fs';
import path from 'path';
import { ChevronRight } from 'lucide-react';
import { IndustryProductCountMap, ProductCategoriesData } from '@/lib/types';
import { getIndustryCounts } from '@/lib/products';
import { parseIndustryToSlug } from '@/lib/api';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

// Categories hidden from the UI (kept in code/data, just not displayed).
const HIDDEN_CATEGORIES = ['Beauty & Personal Care', 'Flavors & Fragrances', 'Food & Nutrition'];

/**
 * Background photo for an industry card, distil.market style. Looks for
 * `public/industries/<slug>.jpg` (slug from `parseIndustryToSlug`). Returns the
 * public URL when the file exists, otherwise null so the card falls back to the
 * flat glass-card style — tolerant of industries that have no image yet.
 */
function industryImage(name: string): string | null {
  const slug = parseIndustryToSlug(name);
  const file = path.join(process.cwd(), 'public', 'industries', `${slug}.jpg`);
  return fs.existsSync(file) ? `/industries/${slug}.jpg` : null;
}

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
          {industries.map((industry: IndustryProductCountMap, idx: number) => {
            const image = industryImage(industry.name);
            const href = `/products/industries/${parseIndustryToSlug(industry.name)}`;

            return (
              <Reveal key={industry.name} delay={idx * 0.05}>
                {image ? (
                  // Full-bleed photo card: name overlaid bottom-left, dark gradient for legibility.
                  <Link
                    href={href}
                    className='group relative block h-56 rounded-xl overflow-hidden'
                  >
                    <div
                      className='absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105'
                      style={{ backgroundImage: `url(${image})` }}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
                    <span className='absolute top-3 right-3 text-sm text-white/90 bg-black/40 backdrop-blur py-1 px-2 rounded-full'>
                      {industry.count}
                    </span>
                    <div className='absolute bottom-0 left-0 right-0 p-5'>
                      <h3 className='text-lg font-semibold text-white'>{industry.name}</h3>
                      <div className='mt-2 flex items-center text-white/90'>
                        <span className='text-sm'>Explore products</span>
                        <ChevronRight className='h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300' />
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Fallback: current flat glass-card (used until an image is dropped in).
                  <Link
                    href={href}
                    className='glass-card p-6 hover:border-syntara-primary/50 transition-all duration-300 group block'
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
                )}
              </Reveal>
            );
          })}
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
