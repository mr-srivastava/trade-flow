import React from 'react';
import { CaretLeftIcon } from '@phosphor-icons/react/ssr';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQProps {
  faqs?: FAQ[];
}

const ProductFAQ: React.FC<ProductFAQProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className='mt-16'>
      <h2 className='text-2xl font-bold text-foreground mb-8'>
        Frequently Asked Questions
      </h2>
      <div className='space-y-4'>
        {faqs.map((faq, index) => (
          <Collapsible
            key={index}
            className='border border-border/40 rounded-lg overflow-hidden'
          >
            <CollapsibleTrigger className='flex items-center justify-between w-full p-4 bg-card/80 dark:bg-syntara-darker/80 text-left'>
              <span className='font-medium text-foreground'>{faq.question}</span>
              <CaretLeftIcon className='h-5 w-5 transform -rotate-90 text-syntara-light/70 ui-open:rotate-90 transition-transform duration-200' />
            </CollapsibleTrigger>
            <CollapsibleContent className='p-4 pt-0 bg-muted/50 dark:bg-syntara-darker/40'>
              <div className='pt-4 border-t border-border/20 text-syntara-light/80'>
                {faq.answer}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default ProductFAQ;
