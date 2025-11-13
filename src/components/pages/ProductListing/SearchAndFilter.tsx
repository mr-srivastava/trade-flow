import React, { useState } from 'react';
import SearchBar from './SearchBar';
// import FilterToggle from './FilterToggle';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onFiltersToggle: (show: boolean) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onFiltersToggle,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleToggle = () => {
    const newState = !showFilters;
    setShowFilters(newState);
    onFiltersToggle(newState);
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSubmit={onSearchSubmit}
      />
      {/* <FilterToggle showFilters={showFilters} onToggle={handleToggle} /> */}
    </div>
  );
};

export default SearchAndFilter;
