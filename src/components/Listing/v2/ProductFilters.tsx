import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type FilterCategoryProps = {
  title: string;
  items: { id: string; label: string }[];
};

const FilterCategory: React.FC<FilterCategoryProps> = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='border-b border-border/30 pb-4'>
      <CollapsibleTrigger className='flex w-full items-center justify-between py-3 text-left font-medium text-white'>
        {title}
        {isOpen ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='mt-2 space-y-2'>
          {items.map((item) => (
            <div key={item.id} className='flex items-center space-x-2'>
              <Checkbox id={item.id} />
              <Label htmlFor={item.id} className='text-syntara-light/80 cursor-pointer'>
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const ProductFilters: React.FC = () => {
  const industries = [
    { id: 'pharmaceutical', label: 'Pharmaceutical' },
    { id: 'industrial-chemicals', label: 'Industrial Chemicals' },
    { id: 'agrochemicals', label: 'Agrochemicals' },
    { id: 'flavors-fragrances', label: 'Flavors & Fragrances' },
    { id: 'food-nutrition', label: 'Food & Nutrition' },
    { id: 'beauty-personal', label: 'Beauty & Personal Care' },
  ];

  const categories = [
    { id: 'pharma-actives', label: 'Pharmaceutical Actives & Precursors' },
    { id: 'inorganic-chemicals', label: 'Inorganic Chemicals' },
    { id: 'thermoplastic-polymers', label: 'Thermoplastic Polymers' },
    { id: 'crop-protection', label: 'Crop Protection & Pest Control' },
    { id: 'additives', label: 'Additives' },
    { id: 'elastomers', label: 'Elastomers' },
    { id: 'waxes', label: 'Waxes' },
    { id: 'uv-absorbers', label: 'UV Absorbers' },
    { id: 'light-stabilizers', label: 'Light Stabilizers' },
    { id: 'fragrance-ingredients', label: 'Fragrance Ingredients' },
    { id: 'essential-oils', label: 'Essential Oils' },
    { id: 'pigments-colorants', label: 'Pigments & Colorants' },
    { id: 'food-additives', label: 'Food Additives' },
    { id: 'uv-filters', label: 'UV Filters' },
  ];

  const subcategories = [
    { id: 'sub-cat-1', label: 'Surfactants' },
    { id: 'sub-cat-2', label: 'Solvents' },
    { id: 'sub-cat-3', label: 'Catalysts' },
    { id: 'sub-cat-4', label: 'Intermediates' },
  ];

  const properties = [
    { id: 'prop-solid', label: 'Solid' },
    { id: 'prop-liquid', label: 'Liquid' },
    { id: 'prop-gas', label: 'Gas' },
    { id: 'prop-flammable', label: 'Flammable' },
    { id: 'prop-reactive', label: 'Reactive' },
  ];

  return (
    <div className='glass-card p-5'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold text-white'>Filters</h2>
        <button className='text-syntara-primary text-sm hover:text-syntara-primary/80 transition'>
          Clear all
        </button>
      </div>

      <div className='space-y-1'>
        <FilterCategory title='Industries' items={industries} />
        <FilterCategory title='Categories' items={categories} />
        <FilterCategory title='Sub-Categories' items={subcategories} />
        <FilterCategory title='Properties' items={properties} />
      </div>
    </div>
  );
};

export default ProductFilters;
