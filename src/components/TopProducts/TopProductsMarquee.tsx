'use client';

import React from 'react';

import ProductCard from '@/components/ProductCard/ProductCard';
import { Product } from '@/lib/types';

/**
 * Continuously auto-scrolling horizontal marquee of the "Top Products".
 *
 * Dependency-free (pure CSS keyframes). The product list is rendered twice
 * back-to-back; translating the track by -50% lands exactly on the start of the
 * duplicate set, so the loop is seamless. Spacing uses per-slide horizontal
 * padding (not flex `gap`) so the gap across the seam matches every other gap.
 * Pauses on hover, and falls back to a normal scrollable row when the user
 * prefers reduced motion.
 */
const SLIDE = 'w-[260px] md:w-[280px] shrink-0 px-2.5';

const TopProductsMarquee: React.FC<{ products: Product[] }> = ({ products }) => {
  // Speed scales with item count so the row always reads calmly.
  const durationSeconds = Math.max(30, products.length * 4);

  return (
    <section aria-label="Top products" className="tp-marquee group relative w-full overflow-hidden">
      <div
        className="tp-track flex w-max"
        style={{ ['--tp-duration' as string]: `${durationSeconds}s` } as React.CSSProperties}
      >
        {products.map((product) => (
          <div key={`a-${product.id}`} className={SLIDE}>
            <ProductCard product={product} />
          </div>
        ))}
        {/* Duplicate set — hidden from assistive tech / tab order to avoid double stops. */}
        {products.map((product) => (
          <div
            key={`b-${product.id}`}
            aria-hidden="true"
            className={`${SLIDE} [&_a]:pointer-events-none`}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <style>{`
        .tp-marquee {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
        }
        .tp-track {
          animation: tp-marquee var(--tp-duration, 40s) linear infinite;
          will-change: transform;
        }
        .tp-marquee:hover .tp-track { animation-play-state: paused; }
        @keyframes tp-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tp-marquee { overflow-x: auto; }
          .tp-track { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default TopProductsMarquee;
