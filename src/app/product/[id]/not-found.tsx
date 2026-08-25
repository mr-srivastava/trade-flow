import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import NavBar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Logo from '@/components/Logo/Logo';


const noProductFoundText = {
  backToProducts: 'Back to products',
  title: 'Product Not Found',
  description: "The product you're looking for doesn't exist or has been removed.",
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
              className='flex items-center text-Syntaraa-light hover:text-Syntaraa-primary transition mb-6'
            >
              <ChevronLeft className='h-4 w-4 mr-1' />
              {noProductFoundText.backToProducts}
            </Link>
            <div className='glass-card p-12 text-center'>
              <div className='flex justify-center mb-4'>
                <Logo size={40} showWordmark={false} />
              </div>
              <h1 className='text-2xl font-bold mb-4'>{noProductFoundText.title}</h1>
              <p className='text-Syntaraa-light/70 mb-8'>{noProductFoundText.description}</p>
              <Button asChild>
                <Link href='/products'>{noProductFoundText.browseAllProducts}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
