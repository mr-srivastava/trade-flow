'use client';
import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronLeft,
  ExternalLink,
  FileText,
  Shield,
  Beaker,
  Package2,
  Info,
  Crown,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { products } from '@/components/Listing/v2/ProductGrid';
import NavBar from '@/components/Navbar/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer/v2/Footer';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const ProductDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || undefined;

  console.log('ID:', id);
  console.log('Search Params:', searchParams.toString());

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className='flex flex-col min-h-screen'>
        <NavBar />
        <main className='flex-grow'>
          <div className='section-container pt-8 pb-16'>
            <Link
              href='/products'
              className='flex items-center text-syntara-light hover:text-syntara-primary transition mb-6'
            >
              <ChevronLeft className='h-4 w-4 mr-1' />
              Back to products
            </Link>
            <div className='glass-card p-12 text-center'>
              <h1 className='text-2xl font-bold mb-4'>Product Not Found</h1>
              <p className='text-syntara-light/70 mb-8'>
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link href='/products'>Browse All Products</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sample product properties for demo
  const properties = [
    { name: 'Appearance', value: 'Yellow to Amber Oily Liquid' },
    { name: 'Colour in Gardner', value: '3 G' },
    { name: 'PH 5% solution', value: '6.85' },
    { name: 'Moisture %', value: '2.21' },
    { name: 'Saponification Value', value: '48' },
    { name: 'Hydroxly Value', value: '68' },
    { name: 'Acid Value', value: '1.09' },
  ];

  // Sample FAQ data
  const faqs = [
    {
      question: `How does ${product.name} impact vaccine production?`,
      answer:
        'It serves as an important excipient in vaccine formulations, helping to stabilize the active ingredients and improve delivery efficiency.',
    },
    {
      question: `What are the industrial applications of ${product.name}?`,
      answer:
        "It's used as an emulsifier in food production, a solubilizer in pharmaceuticals, and as a dispersing agent in cosmetics manufacturing.",
    },
    {
      question: `Is ${product.name} safe for consumption and topical use?`,
      answer:
        'When used at recommended concentrations, it is generally recognized as safe (GRAS) for both food and topical applications.',
    },
    {
      question: `What is the Pharmacodynamics for ${product.name}?`,
      answer:
        "It doesn't have pharmacological activity itself but enhances the bioavailability of active pharmaceutical ingredients through improved solubilization.",
    },
    {
      question: `Any specialised application for ${product.name}?`,
      answer:
        "It's used in biological research for cell lysis and protein extraction, and in specific medical device coatings.",
    },
    {
      question: `What is the food additive definition for ${product.name}?`,
      answer:
        "It's classified as an emulsifier, stabilizer, and solubilizer under food additive regulations in most jurisdictions.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <div className='section-container pt-8 pb-16'>
          <Link
            href='/products'
            className='flex items-center text-syntara-light hover:text-syntara-primary transition mb-6'
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            Back to products
          </Link>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Left Column - Product Image */}
            <div className='md:col-span-1'>
              <Card className='bg-syntara-darker/70 border border-border/50 overflow-hidden'>
                <div className='h-80 flex items-center justify-center p-6 bg-syntara-darker/90'>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300} // Replace with the desired width
                      height={300} // Replace with the desired height
                      className='max-h-full max-w-full object-contain'
                    />
                  ) : (
                    <div className='text-syntara-light/30 font-medium'>No image available</div>
                  )}
                </div>
                <CardContent className='p-4'>
                  <div className='space-y-2'>
                    <Badge
                      variant='outline'
                      className='w-full justify-center py-1.5 border-border/50 text-syntara-light/90'
                    >
                      {product.category}
                    </Badge>
                    {product.hasWarning && (
                      <Badge
                        variant='outline'
                        className='w-full justify-center py-1.5 border-amber-500/30 bg-amber-500/10 text-amber-500 flex gap-2'
                      >
                        <AlertTriangle className='h-3.5 w-3.5' /> Hazardous Material
                      </Badge>
                    )}
                    {product.exclusive && (
                      <Badge
                        variant='outline'
                        className='w-full justify-center py-1.5 border-syntara-primary/30 bg-syntara-primary/10 text-syntara-primary flex gap-2'
                      >
                        <Shield className='h-3.5 w-3.5' /> Exclusive Product
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Product Details */}
            <div className='md:col-span-2'>
              <div className='mb-6'>
                <h1 className='text-3xl md:text-4xl font-bold text-white mb-6'>{product.name}</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                  <div className='flex flex-col'>
                    <span className='text-syntara-light/70 text-sm'>CAS NUMBER</span>
                    <span className='text-white font-mono'>{product.cas}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-syntara-light/70 text-sm'>MOLECULAR FORMULA</span>
                    <span className='text-white font-mono'>{product.formula}</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-syntara-light/70 text-sm'>EINECS</span>
                    <span className='text-white font-mono'>34-18-05-90</span>
                  </div>
                  <div className='flex flex-col'>
                    <span className='text-syntara-light/70 text-sm'>HSN CODE</span>
                    <span className='text-white font-mono'>34021300</span>
                  </div>
                </div>

                <div className='mb-6'>
                  <h2 className='text-xl font-semibold text-white mb-3'>Description</h2>
                  <p className='text-syntara-light/80'>
                    {product.description}
                    <button className='text-syntara-primary hover:text-syntara-primary/80 ml-2'>
                      Read more
                    </button>
                  </p>
                </div>

                <div className='mb-6'>
                  <h2 className='text-xl font-semibold text-white mb-3'>
                    Certificates & Documentation
                  </h2>
                  <Button variant='outline' className='gap-2 mr-3'>
                    <FileText className='h-4 w-4' /> COA <ExternalLink className='h-3 w-3 ml-1' />
                  </Button>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 mt-8'>
                  <Button className='flex-1 bg-white text-syntara-darker hover:bg-white/90'>
                    Get in Touch
                  </Button>
                  <Button variant='outline' className='flex-1'>
                    Request Quote
                  </Button>
                </div>
              </div>

              <div className='mt-10'>
                <Tabs defaultValue='properties' className='w-full' onValueChange={setActiveTab}>
                  <TabsList className='w-full bg-syntara-darker border border-border/50 rounded-lg p-1 mb-6'>
                    <TabsTrigger value='properties' className='flex items-center gap-2 flex-1'>
                      <Info className='h-4 w-4' /> PROPERTIES
                    </TabsTrigger>
                    <TabsTrigger value='applications' className='flex items-center gap-2 flex-1'>
                      <Beaker className='h-4 w-4' /> APPLICATIONS
                    </TabsTrigger>
                    <TabsTrigger value='safety' className='flex items-center gap-2 flex-1'>
                      <AlertTriangle className='h-4 w-4' /> SAFETY AND HAZARD
                    </TabsTrigger>
                    <TabsTrigger value='storage' className='flex items-center gap-2 flex-1'>
                      <Package2 className='h-4 w-4' /> STORAGE
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value='properties'>
                    <Card className='border border-border/40 bg-syntara-darker/40'>
                      <CardContent className='p-0'>
                        <div className='divide-y divide-border/30'>
                          {properties.map((prop, index) => (
                            <div key={index} className='flex py-4 px-6'>
                              <div className='w-1/2 text-syntara-light/80'>{prop.name}</div>
                              <div className='w-1/2 text-white'>{prop.value}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value='applications'>
                    <Card className='border border-border/40 bg-syntara-darker/40'>
                      <CardContent className='p-6'>
                        <ul className='list-disc pl-6 space-y-3 text-syntara-light/80'>
                          <li>Pharmaceutical formulations as a solubilizer and emulsifier</li>
                          <li>Food production as an emulsifier (E433)</li>
                          <li>Cosmetic formulations for skin care products</li>
                          <li>Industrial applications in lubricants and coatings</li>
                          <li>Laboratory reagent in biochemical research</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value='safety'>
                    <Card className='border border-border/40 bg-syntara-darker/40'>
                      <CardContent className='p-6'>
                        <div className='space-y-4'>
                          <div>
                            <h3 className='text-white font-medium mb-2'>Hazard Classification</h3>
                            <p className='text-syntara-light/80'>
                              Classified as an irritant. May cause eye and skin irritation.
                            </p>
                          </div>
                          <div>
                            <h3 className='text-white font-medium mb-2'>Protective Equipment</h3>
                            <p className='text-syntara-light/80'>
                              Safety glasses, gloves, and lab coat recommended when handling.
                            </p>
                          </div>
                          <div>
                            <h3 className='text-white font-medium mb-2'>First Aid Measures</h3>
                            <p className='text-syntara-light/80'>
                              Eye Contact: Rinse with water for 15 minutes. Skin Contact: Wash with
                              soap and water.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value='storage'>
                    <Card className='border border-border/40 bg-syntara-darker/40'>
                      <CardContent className='p-6'>
                        <div className='space-y-4'>
                          <div>
                            <h3 className='text-white font-medium mb-2'>Storage Conditions</h3>
                            <p className='text-syntara-light/80'>
                              Store in tightly closed containers in a cool, dry place. Keep away
                              from direct sunlight.
                            </p>
                          </div>
                          <div>
                            <h3 className='text-white font-medium mb-2'>Temperature</h3>
                            <p className='text-syntara-light/80'>
                              Recommended storage temperature: 15-25°C (59-77°F)
                            </p>
                          </div>
                          <div>
                            <h3 className='text-white font-medium mb-2'>Shelf Life</h3>
                            <p className='text-syntara-light/80'>
                              2 years from date of manufacture when stored properly.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className='mt-16'>
            <h2 className='text-2xl font-bold text-white mb-8'>Related Products</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {products
                .filter((p) => p.id !== id && p.category === product.category)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                    <Card className='h-full overflow-hidden bg-syntara-darker/80 border border-border/40 hover:border-syntara-primary/50 transition-all duration-300 group'>
                      <div className='relative h-36 bg-syntara-darker/70 flex items-center justify-center p-4'>
                        {relatedProduct.exclusive && (
                          <Badge
                            variant='secondary'
                            className='absolute top-2 right-2 flex items-center gap-1 bg-syntara-primary/20 text-syntara-primary'
                          >
                            <Crown className='h-3 w-3' /> Exclusive
                          </Badge>
                        )}
                        {relatedProduct.image ? (
                          <Image
                            fill
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className='max-h-full max-w-full object-contain'
                          />
                        ) : (
                          <div className='text-syntara-light/30 font-medium text-xs'>
                            No image available
                          </div>
                        )}
                      </div>

                      <CardContent className='p-4'>
                        <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-syntara-primary transition-colors line-clamp-1'>
                          {relatedProduct.name}
                        </h3>

                        <div className='flex'>
                          <span className='text-syntara-light/70 w-16 text-xs'>CAS:</span>
                          <span className='text-syntara-light font-mono text-xs'>
                            {relatedProduct.cas}
                          </span>
                        </div>

                        <div className='flex'>
                          <span className='text-syntara-light/70 w-16 text-xs'>Formula:</span>
                          <span className='text-syntara-light font-mono text-xs'>
                            {relatedProduct.formula}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className='mt-16'>
            <h2 className='text-2xl font-bold text-white mb-8'>Frequently Asked Questions</h2>
            <div className='space-y-4'>
              {faqs.map((faq, index) => (
                <Collapsible
                  key={index}
                  className='border border-border/40 rounded-lg overflow-hidden'
                >
                  <CollapsibleTrigger className='flex items-center justify-between w-full p-4 bg-syntara-darker/80 text-left'>
                    <span className='font-medium text-white'>{faq.question}</span>
                    <ChevronLeft className='h-5 w-5 transform -rotate-90 text-syntara-light/70 ui-open:rotate-90 transition-transform duration-200' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='p-4 pt-0 bg-syntara-darker/40'>
                    <div className='pt-4 border-t border-border/20 text-syntara-light/80'>
                      {faq.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className='mt-16 bg-syntara-darker/30 border border-border/40 rounded-lg p-8 text-center'>
            <h2 className='text-2xl font-bold text-white mb-3'>
              Need Help Finding the Right Chemical?
            </h2>
            <p className='text-syntara-light/80 max-w-3xl mx-auto mb-6'>
              Our team of experts can help you source the exact chemical products you need for your
              application. Get personalized assistance and technical support.
            </p>
            <Button size='lg' className='bg-syntara-primary hover:bg-syntara-primary/90'>
              Contact Our Experts
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function useParams<T>(): T {
  const router = useRouter();
  return router.query as unknown as T;
}

export default ProductDetail;
