import React from 'react';
import { Product } from '@/lib/types';
import { FilterCategory } from './FilterCategory';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function getFilterData(products: Array<Product>) {
  const mapToFilterItems = (items: string[]) =>
    Array.from(new Set(items)).map((item) => ({
      id: item.toLowerCase().replace(/\s+/g, '-'),
      label: item,
    }));

  return {
    industries: mapToFilterItems(products.flatMap((product) => product.industries)),
    categories: mapToFilterItems(products.flatMap((product) => product.categories)),
    subcategories: mapToFilterItems(products.flatMap((product) => product.sub_categories || [])),
  };
}

const ProductFilters: React.FC<{
  products: Array<Product>;
  appliedFilters: { industries: string; categories: string; subcategories: string };
}> = ({ products, appliedFilters }) => {
  const { industries, categories, subcategories } = getFilterData(products);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateFilters = (key: string, value: string, resetKeys: string[] = []) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === appliedFilters[key as keyof typeof appliedFilters]) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    resetKeys.forEach((resetKey) => params.delete(resetKey));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    ['industries', 'categories', 'subcategories'].forEach((key) => params.delete(key));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='glass-card p-5'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-white'>Filters</h2>
        {(appliedFilters.industries ||
          appliedFilters.categories ||
          appliedFilters.subcategories) && (
          <Button
            variant='link'
            className='text-syntara-primary text-sm hover:text-syntara-primary/80 transition'
            onClick={clearFilters}
          >
            Clear all
          </Button>
        )}
      </div>

      <div className='space-y-1'>
        <FilterCategory
          title='Industries'
          items={industries}
          onFilterChange={(value) => updateFilters('industries', value)}
          selected={appliedFilters.industries}
        />
        <FilterCategory
          title='Categories'
          items={categories}
          onFilterChange={(value) => updateFilters('categories', value)}
          selected={appliedFilters.categories}
        />
        <FilterCategory
          title='Sub-Categories'
          items={subcategories}
          onFilterChange={(value) => updateFilters('subcategories', value)}
          selected={appliedFilters.subcategories}
        />
      </div>
    </div>
  );
};

export default ProductFilters;
