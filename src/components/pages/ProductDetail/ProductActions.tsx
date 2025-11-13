import React from 'react';
import { Product } from '@/lib/types';
import { ContactForm } from '@/components/Features/forms/ContactForm/ContactForm';
import { RequestQuoteForm } from '@/components/Features/forms/RequestQuoteForm/RequestQuoteForm';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  return (
    <div className='flex flex-col sm:flex-row gap-4 mt-8'>
      <ContactForm
        product={product}
        buttonClassName='bg-white text-syntara-darker hover:text-syntara-darker hover:bg-white/90'
      />
      <RequestQuoteForm product={product} buttonClassName='' />
    </div>
  );
};

export default ProductActions;
