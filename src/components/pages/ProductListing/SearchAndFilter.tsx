import React from 'react';
import SearchBar from './SearchBar';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
    </div>
  );
};

export default SearchAndFilter;
