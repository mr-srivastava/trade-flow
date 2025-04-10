'use client';
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductGrid from './ProductGrid';
import NavBar from '@/components/Navbar/Navbar';
import ProductFilters from './ProductFilters';
import Footer from '@/components/Footer/v2/Footer';
import ProductPagination from './ProductPagination';

const Products: React.FC = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const totalProducts = 50;
  const productsPerPage = 12;

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search logic would go here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <div className='section-container pt-8 pb-16'>
          <div className='mb-8'>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-6'>Products Catalog</h1>

            <form
              onSubmit={handleSearch}
              className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'
            >
              <div className='relative flex-grow'>
                <div className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  <Search className='h-5 w-5 text-syntara-light/50' />
                </div>
                <Input
                  type='text'
                  placeholder='Search by name, CAS, formula...'
                  className='w-full pl-10 py-2.5 bg-syntara-darker border border-border rounded-md text-syntara-light/90 focus:outline-none focus:ring-2 focus:ring-syntara-primary/50'
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
          </div>

          <div className='flex flex-col md:flex-row gap-6'>
            {showFilters && (
              <div className='w-full md:w-72 shrink-0'>
                <ProductFilters />
              </div>
            )}

            <div className='flex-grow'>
              <ProductGrid />

              <div className='mt-12'>
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalProducts / productsPerPage)}
                  onPageChange={setCurrentPage}
                  totalProducts={totalProducts}
                  productsPerPage={productsPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
