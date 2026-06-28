import React from 'react';
import Link from 'next/link';

import { getTopProducts } from '@/lib/products';
import { TopProductsContent } from '@/lib/types';
import TopProductsMarquee from './TopProductsMarquee';

/**
 * Home-page "Top Products" section: an auto-scrolling marquee of the molecules
 * flagged `is_top` in the DB (ordered by `top_rank`). Async server component —
 * same fetch-on-the-server pattern as `ProductCategories`.
 */
const TopProducts: React.FC<{ topProducts: TopProductsContent }> = async ({ topProducts }) => {
  const products = await getTopProducts();
  if (!products.length) return null;

  return (
    <section id='top-products' className='py-4 bg-gradient-to-b from-Syntaraa-dark to-Syntaraa-darker'>
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-slate-900'>{topProducts.title}</h2>
          <p className='text-Syntaraa-light/80 max-w-2xl mx-auto'>{topProducts.subtitle}</p>
        </div>
      </div>

      <TopProductsMarquee products={products} />

      <div className='mt-10 text-center'>
        <Link href='/products' className='btn-primary'>
          {topProducts.buttonText}
        </Link>
      </div>
    </section>
  );
};

export default TopProducts;
