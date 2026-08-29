import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type FilterCategoryProps = {
  title: string;
  items: { id: string; label: string }[];
  onFilterChange: (id: string) => void;
  selected: string;
};

export const FilterCategory: React.FC<FilterCategoryProps> = ({
  title,
  items,
  onFilterChange,
  selected,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b border-line pb-4">
      <CollapsibleTrigger className="eyebrow flex w-full items-center justify-between py-3 text-left">
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-slate" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox
                id={item.id}
                onCheckedChange={() => onFilterChange(item.id)}
                checked={selected === item.id}
              />
              <Label
                htmlFor={item.id}
                className="text-slate cursor-pointer transition-colors hover:text-ink"
              >
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
