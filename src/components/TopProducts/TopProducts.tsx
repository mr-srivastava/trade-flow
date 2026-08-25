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
    <section id='top-products' className='py-4 bg-mist'>
      <div className='section-container'>
        <div className='text-center mb-12'>
          <span className='eyebrow'>Catalog</span>
          <h2 className='mt-3 mb-4 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink'>
            {topProducts.title}
          </h2>
          <p className='text-slate max-w-2xl mx-auto leading-relaxed'>{topProducts.subtitle}</p>
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
