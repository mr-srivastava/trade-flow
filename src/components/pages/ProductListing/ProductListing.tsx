'use client';
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/layout/Footer/Footer';
import NavBar from '@/components/layout/Navbar/Navbar';
import { Product } from '@/lib/types';
import ProductFilters from './ProductFilters/ProductFilters';
import SearchAndFilter from './SearchAndFilter';
import ProductGrid from './ProductGrid';
import {
  filterProducts,
  paginateProducts,
  FilterCriteria,
} from '@/lib/utils/productFilters';

// Main ProductListing Component
const Products: React.FC<{ data: Array<Product>; title?: string }> = ({
  data,
  title = 'Products Catalog',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearchParams();

  const productsPerPage = 12;

  const currentIndustry = searchParams.get('industries') || '';

  // Apply filtering logic using the child component's logic
  const filteredProducts = useMemo(() => {
    const criteria: FilterCriteria = {
      searchQuery,
      industry: currentIndustry,
    };
    return filterProducts(data, criteria);
  }, [data, searchQuery, currentIndustry]);

  const totalProducts = filteredProducts.length;

  // Apply pagination
  const paginatedProducts = useMemo(() => {
    return paginateProducts(filteredProducts, currentPage, productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleFiltersToggle = (show: boolean) => setShowFilters(show);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <div className='section-container pt-8 pb-16'>
          <header className='mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              {title}
            </h1>
            <SearchAndFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearch}
              onFiltersToggle={handleFiltersToggle}
            />
          </header>

          <div className='flex flex-col md:flex-row gap-6'>
            {showFilters && (
              <aside className='w-full md:w-72 shrink-0'>
                <ProductFilters
                  products={data}
                  appliedFilters={{
                    industries: currentIndustry,
                  }}
                />
              </aside>
            )}

            <ProductGrid
              products={paginatedProducts}
              currentPage={currentPage}
              totalPages={Math.ceil(totalProducts / productsPerPage)}
              totalProducts={totalProducts}
              productsPerPage={productsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
