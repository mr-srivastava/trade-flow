import React from 'react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className='relative flex-grow' role='search'>
      <MagnifyingGlassIcon className='absolute top-2 left-3 h-5 w-5 text-syntara-light/50 pointer-events-none' aria-hidden />
      <Input
        id='product-search'
        type='search'
        name='q'
        autoComplete='off'
        aria-label='Search products by name, CAS number, or formula'
        placeholder='Search by name, CAS, formula…'
        className='w-full pl-10 py-2.5 placeholder:text-muted-foreground bg-card dark:bg-syntara-darker border border-border rounded-md text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-syntara-primary/50'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
