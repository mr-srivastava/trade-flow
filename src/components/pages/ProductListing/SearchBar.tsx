import React from 'react';
import { Search } from 'lucide-react';
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
    <form onSubmit={onSubmit} className='relative flex-grow'>
      <Search className='absolute top-2 left-3 h-5 w-5 text-syntara-light/50 pointer-events-none' />
      <Input
        type='text'
        placeholder='Search by name, CAS, formula...'
        className='w-full pl-10 py-2.5 placeholder:text-syntara-light/50 bg-syntara-darker border border-border rounded-md text-syntara-light/90 focus:outline-none focus:ring-2 focus:ring-syntara-primary/50'
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
