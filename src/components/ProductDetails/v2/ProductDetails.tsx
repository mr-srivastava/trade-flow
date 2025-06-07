import React from 'react';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import NavBar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer/v2/Footer';
import { Product } from '@/lib/types';
import ProductCard from '@/components/ProductCard/v2/ProductCard';
import ReadMore from '@/components/ReadMore/ReadMore';
import PropertyList from '@/components/PropertyList/v2/PropertyList';
import { ContactForm } from '@/components/ContactForm/ContactForm';
import { RequestQuoteForm } from '@/components/RequestQuoteForm/RequestQuoteForm';
import { BeakerIcon } from 'lucide-react';

interface ProductDetailProps {
  product: Product & { relatedProducts: Array<Product> };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  // Add error handling for undefined product
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="section-container pt-8 pb-16">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
            <p className="text-syntara-light/80 mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/products" className="text-syntara-primary hover:underline">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hasHazards =
    product.safety_and_hazard &&
    Array.isArray(product.safety_and_hazard) &&
    product.safety_and_hazard.some(
      (item) =>
        item && item.value &&
        (item.value.includes('hazardous') ||
        item.value.includes('Toxic') ||
        item.value.includes('Corrosive')),
    );

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="section-container pt-8 pb-16">
        <Link
          href="/products"
          className="flex items-center text-syntara-light hover:text-syntara-primary transition mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Product Image */}
          <div className="md:col-span-1">
            <Card className="bg-syntara-darker/70 border border-border/50 overflow-hidden">
              <div className="relative h-64 lg:h-96 bg-syntara-darker/70 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BeakerIcon className="h-24 w-24 text-syntara-light/30" />
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {product.industries && product.industries.length > 0 && (
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-1.5 border-border/50 text-syntara-light/90"
                    >
                      {product.industries.map((industry) => (
                        <span key={industry} className="mr-1">
                          {industry}
                          {industry !== product.industries[product.industries.length - 1] && ','}
                        </span>
                      ))}
                    </Badge>
                  )}
                  {hasHazards && (
                    <Badge
                      variant="outline"
                      className="w-full justify-center py-1.5 border-amber-500/30 bg-amber-500/10 text-amber-500 flex gap-2"
                    >
                      <AlertTriangle className="h-3.5 w-3.5" /> Hazardous Material
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Product Details */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">{product.name ?? 'Untitled Product'}</h1>
                {product.industries && product.industries.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.industries.map((industry) => (
                      <span
                        key={industry}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-syntara-primary/20 text-syntara-primary"
                      >
                        {industry}
                        {industry !== product.industries[product.industries.length - 1] && ','}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-syntara-light/70 text-sm">CAS NUMBER</span>
                  <span className="text-white font-mono">{product.cas_number ?? '-'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-syntara-light/70 text-sm">MOLECULAR FORMULA</span>
                  <span className="text-white font-mono">{product.molecular_formula ?? '-'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-syntara-light/70 text-sm">HSN CODE</span>
                  <span className="text-white font-mono">{product.hsn_no ?? '-'}</span>
                </div>
              </div>

              {product.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
                  <ReadMore content={product.description} />
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Certificates & Documentation
                </h2>
                {product.certificates && product.certificates.length > 0 ? (
                  product.certificates.map((cert, i) => (
                    <span key={i} className="text-syntara-light/80">
                      {cert.name}
                      {i !== product.certificates.length - 1 && ', '}
                    </span>
                    // <Button key={i} variant='outline' className='gap-2 mr-3'>
                    //   <Link
                    //     href={cert.url}
                    //     target='_blank'
                    //     rel='noopener noreferrer'
                    //     className='flex items-center gap-2'
                    //   >
                    //     <FileText className='h-4 w-4' /> {cert.name}{' '}
                    //     <ExternalLink className='h-3 w-3 ml-1' />
                    //   </Link>
                    // </Button>
                  ))
                ) : (
                  <p className="text-syntara-light/80">
                    No certificates available for this product.
                  </p>
                )}
              </div>

              {/* <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                <Button className='flex-1 bg-white text-syntara-darker hover:bg-white/90'>
                  Get in Touch
                </Button>
                <Button variant='outline' className='flex-1'>
                  Request Quote
                </Button>
              </div> */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <ContactForm
                  product={product}
                  buttonClassName="bg-white text-syntara-darker hover:text-syntara-darker hover:bg-white/90"
                />
                <RequestQuoteForm product={product} buttonClassName="" />
              </div>
            </div>

            <div className="mt-10">
              <PropertyList product={product} />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.relatedProducts.map((relatedProduct) => {
                const productId =
                  (relatedProduct as Product & { _id?: string }).id ||
                  (relatedProduct as Product & { _id?: string })._id;
                return <ProductCard key={productId} product={relatedProduct} />;
              })}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {product.faq && product.faq.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {product.faq.map((faq, index) => (
                <Collapsible
                  key={index}
                  className="border border-border/40 rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-syntara-darker/80 text-left">
                    <span className="font-medium text-white">{faq.question}</span>
                    <ChevronLeft className="h-5 w-5 transform -rotate-90 text-syntara-light/70 ui-open:rotate-90 transition-transform duration-200" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 pt-0 bg-syntara-darker/40">
                    <div className="pt-4 border-t border-border/20 text-syntara-light/80">
                      {faq.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-syntara-darker/30 border border-border/40 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need Help Finding the Right Chemical?
          </h2>
          <p className="text-syntara-light/80 max-w-3xl mx-auto mb-6">
            Our team of experts can help you source the exact chemical products you need for your
            application. Get personalized assistance and technical support.
          </p>
          <Button size="lg" className="bg-syntara-primary hover:bg-syntara-primary/90">
            Contact Our Experts
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
