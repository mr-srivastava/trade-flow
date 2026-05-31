'use client';
import React, { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import NavBar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/v2/Footer';
import ProductPagination from './ProductPagination';
import { Product } from '@/lib/types';
import ProductFilters from '@/components/ProductFilters/v2/ProductFilters';
import ProductCard from '@/components/ProductCard/v2/ProductCard';
import { useSearchParams } from 'next/navigation';
import { parseIndustryToSlug } from '@/lib/api';

const productsPerPage = 12;

const Products: React.FC<{ data: Array<Product>; title?: string }> = ({
  data,
  title = 'Products Catalog',
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  const currentIndustry = searchParams.get('industries') || '';
  const currentCategory = searchParams.get('categories') || '';
  const currentSubcategory = searchParams.get('subcategories') || '';
  const pageParam = Number(searchParams.get('page')) || 1;

  // Honor the `page` URL param (filters write it); keep it in state for client paging.
  const [currentPage, setCurrentPage] = useState(pageParam);

  // null-safe search across the relevant fields
  const matchesQuery = (product: Product, q: string) =>
    [product.name, product.description, product.cas_number, product.molecular_formula].some(
      (field) => (field ?? '').toLowerCase().includes(q),
    );

  const query = searchQuery.toLowerCase();
  const matched = data.filter((product) => {
    const matchesSearch = matchesQuery(product, query);
    const matchesIndustry = currentIndustry
      ? product.industries.map(parseIndustryToSlug).includes(currentIndustry)
      : true;
    const matchesCategory = currentCategory
      ? product.categories.map(parseIndustryToSlug).includes(currentCategory)
      : true;
    const matchesSubcategory = currentSubcategory
      ? product.sub_categories?.map(parseIndustryToSlug).includes(currentSubcategory)
      : true;

    return matchesSearch && matchesIndustry && matchesCategory && matchesSubcategory;
  });

  const totalFiltered = matched.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / productsPerPage));

  // Reset to page 1 whenever the search query or any filter changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, currentIndustry, currentCategory, currentSubcategory]);

  // Keep the page index within bounds of the filtered result set.
  const safePage = Math.min(currentPage, totalPages);
  const pageItems = matched.slice(
    (safePage - 1) * productsPerPage,
    safePage * productsPerPage,
  );

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <div className='section-container pt-8 pb-16'>
          <header className='mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-900 mb-6'>{title}</h1>
            <form
              onSubmit={handleSearch}
              className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'
            >
              <div className='relative flex-grow'>
                <Search className='absolute top-2 left-3 h-5 w-5 text-syntara-light/50 pointer-events-none' />
                <Input
                  type='text'
                  placeholder='Search by name, CAS, formula...'
                  className='w-full pl-10 py-2.5 placeholder:text-syntara-light/50 bg-syntara-darker border border-border rounded-md text-syntara-light/90 focus:outline-none focus:ring-2 focus:ring-syntara-primary/50'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                onClick={toggleFilters}
                variant='outline'
                className='whitespace-nowrap flex items-center gap-2'
              >
                <Filter className='h-4 w-4' />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </form>
          </header>

          <div className='flex flex-col md:flex-row gap-6'>
            {showFilters && (
              <aside className='w-full md:w-72 shrink-0'>
                <ProductFilters
                  products={data}
                  appliedFilters={{
                    industries: currentIndustry,
                    categories: currentCategory,
                    subcategories: currentSubcategory,
                  }}
                />
              </aside>
            )}

            <section className='flex-grow'>
              {pageItems.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {pageItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className='text-center text-syntara-light/70 py-16'>
                  No products match your search or filters.
                </div>
              )}

              {totalFiltered > 0 && (
                <div className='mt-12'>
                  <ProductPagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalProducts={totalFiltered}
                    productsPerPage={productsPerPage}
                  />
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
