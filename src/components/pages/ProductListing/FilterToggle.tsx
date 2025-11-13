import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterToggleProps {
  showFilters: boolean;
  onToggle: () => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({
  showFilters,
  onToggle,
}) => {
  return (
    <Button
      onClick={onToggle}
      variant='outline'
      className='whitespace-nowrap flex items-center gap-2'
    >
      <Filter className='h-4 w-4' />
      {showFilters ? 'Hide Filters' : 'Show Filters'}
    </Button>
  );
};

export default FilterToggle;
