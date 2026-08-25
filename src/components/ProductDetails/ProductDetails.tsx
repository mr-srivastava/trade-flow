import React from 'react';
import { AlertTriangle, ChevronLeft, ExternalLink, FileText, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import NavBar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard/ProductCard';
import ReadMore from '@/components/ReadMore/ReadMore';
import PropertyList from '@/components/PropertyList/PropertyList';
import { ProductInquiryForm } from '@/components/ContactForm/ProductInquiryForm';
import { RequestQuoteForm } from '@/components/RequestQuoteForm/RequestQuoteForm';

interface ProductDetailProps {
  product: Product & { relatedProducts: Array<Product> };
}

// Toggle to show/hide the Certificates & Documentation section. Currently disabled.
const SHOW_CERTIFICATES = false;

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const hasHazards =
    product.safety_and_hazard &&
    product.safety_and_hazard.some(
      (item) =>
        item.value.includes('hazardous') ||
        item.value.includes('Toxic') ||
        item.value.includes('Corrosive'),
    );

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <div className='section-container pt-8 pb-16'>
        <Link
          href='/products'
          className='flex items-center text-sm text-slate hover:text-brand transition-colors duration-150 mb-6'
        >
          <ChevronLeft className='h-4 w-4 mr-1' />
          Back to products
        </Link>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Left Column - Product Image */}
          <div className='md:col-span-1'>
            <Card className='bg-white border border-line overflow-hidden'>
              <div className='h-80 flex items-center justify-center p-6 bg-mist'>
                {product.product_images && product.product_images.length > 0 ? (
                  <Image
                    src={product.product_images[0] || '/placeholder.svg'}
                    alt={product.name}
                    width={150}
                    height={150}
                    className='max-h-full max-w-full object-contain'
                  />
                ) : (
                  <div className='text-sm text-slate/60'>No image available</div>
                )}
              </div>
              <CardContent className='p-4'>
                <div className='space-y-2'>
                  <Badge variant='outline' className='w-full justify-center py-1.5'>
                    {product.categories.map((category) => (
                      <span key={category} className='mr-1'>
                        {category}
                        {category !== product.categories[product.categories.length - 1] && ','}
                      </span>
                    ))}
                  </Badge>
                  {hasHazards && (
                    <Badge
                      variant='warning'
                      className='w-full justify-center py-1.5 flex gap-2'
                      aria-label='Hazardous material'
                    >
                      <AlertTriangle className='h-3.5 w-3.5' aria-hidden='true' /> Hazardous
                      Material
                    </Badge>
                  )}
                  {product.is_exclusive && (
                    <Badge
                      variant='outline'
                      className='w-full justify-center py-1.5 border-transparent bg-brand-50 text-brand-700 flex gap-2'
                    >
                      <Crown className='h-3.5 w-3.5' /> Exclusive Product
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Details */}
          <div className='md:col-span-2'>
            <div className='mb-6'>
              <h1 className='text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-ink mb-6'>{product.name}</h1>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                <div className='flex flex-col'>
                  <span className='eyebrow'>CAS Number</span>
                  <span className='mt-1 font-mono text-sm text-ink'>{product.cas_number}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='eyebrow'>Molecular Formula</span>
                  <span className='mt-1 font-mono text-sm text-ink'>{product.molecular_formula}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='eyebrow'>EINECS</span>
                  <span className='mt-1 font-mono text-sm text-ink'>{product.einecs_number ?? '-'}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='eyebrow'>HSN Code</span>
                  <span className='mt-1 font-mono text-sm text-ink'>{product.hsn_no ?? '-'}</span>
                </div>
              </div>

              <div className='mb-6'>
                <h2 className='text-lg md:text-xl font-semibold text-ink mb-3'>Description</h2>
                <ReadMore content={product.description} />
              </div>

              {/* Certificates & Documentation section is disabled (hidden from UI,
                  kept in code). Set SHOW_CERTIFICATES to true to re-enable. */}
              {SHOW_CERTIFICATES && (
                <div className='mb-6'>
                  <h2 className='text-lg md:text-xl font-semibold text-ink mb-3'>
                    Certificates & Documentation
                  </h2>
                  {product.certificates.length > 0 ? (
                    product.certificates.map((cert, i) => (
                      <Button key={i} variant='outline' className='gap-2 mr-3'>
                        <Link
                          href={cert.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2'
                        >
                          <FileText className='h-4 w-4' /> {cert.name}{' '}
                          <ExternalLink className='h-3 w-3 ml-1' />
                        </Link>
                      </Button>
                    ))
                  ) : (
                    <p className='text-slate'>
                      No certificates available for this product.
                    </p>
                  )}
                </div>
              )}

              <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                <ProductInquiryForm product={product} />
                <RequestQuoteForm product={product} buttonClassName='' />
              </div>
            </div>

            <div className='mt-10'>
              <PropertyList product={product} />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className='mt-16'>
          <h2 className='text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink mb-8'>Related Products</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {product.relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className='mt-16'>
          <h2 className='text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink mb-8'>
            Frequently Asked Questions
          </h2>
          <div className='space-y-4'>
            {product.faq.map((faq, index) => (
              <Collapsible
                key={index}
                className='border border-line rounded-lg overflow-hidden'
              >
                <CollapsibleTrigger className='flex items-center justify-between w-full p-4 bg-mist text-left transition-colors duration-150 hover:bg-line'>
                  <span className='font-medium text-ink'>{faq.key}</span>
                  <ChevronLeft className='h-5 w-5 transform -rotate-90 text-slate ui-open:rotate-90 transition-transform duration-200' />
                </CollapsibleTrigger>
                <CollapsibleContent className='p-4 pt-0 bg-white'>
                  <div className='pt-4 border-t border-line text-slate leading-relaxed'>
                    {faq.value}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className='mt-16 bg-mist border border-line rounded-lg p-8 text-center'>
          <h2 className='text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink mb-3'>
            Need Help Finding the Right Chemical?
          </h2>
          <p className='text-slate leading-relaxed max-w-3xl mx-auto mb-6'>
            Our team of experts can help you source the exact chemical products you need for your
            application. Get personalized assistance and technical support.
          </p>
          <Button size='lg'>
            Contact Our Experts
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
