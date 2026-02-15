import Link from 'next/link';
import { CaretLeftIcon } from '@phosphor-icons/react/ssr';

import { Button } from '@/components/ui/button';
import NavBar from '@/components/layout/Navbar/Navbar';

import Footer from '@/components/layout/Footer/Footer';

const noProductFoundText = {
  backToProducts: 'Back to products',
  title: 'Product Not Found',
  description:
    "The product you're looking for doesn't exist or has been removed.",
  browseAllProducts: 'Browse All Products',
};

export default function ProductNotFound() {
  return (
    <div>
      <NavBar />
      <main className='flex-grow'>
        <div>
          <div className='section-container pt-8 pb-16'>
            <Link
              href='/products'
              className='flex items-center text-syntara-light hover:text-syntara-primary transition mb-6'
            >
              <CaretLeftIcon className='h-4 w-4 mr-1' />
              {noProductFoundText.backToProducts}
            </Link>
            <div className='glass-card p-12 text-center'>
              <h1 className='text-2xl font-bold mb-4'>
                {noProductFoundText.title}
              </h1>
              <p className='text-syntara-light/70 mb-8'>
                {noProductFoundText.description}
              </p>
              <Button asChild>
                <Link href='/products'>
                  {noProductFoundText.browseAllProducts}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
