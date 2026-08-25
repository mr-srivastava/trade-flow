import React from 'react';

import AboutSection from '@/components/About/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/Footer';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import TopProducts from '@/components/TopProducts/TopProducts';

import { pageContent } from '@/lib/content';
import Hero from '@/components/Hero/Hero';

export default function Landing() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Hero content={pageContent.hero} />
        <PlatformBenefits benefits={pageContent.benefits} />
        <ProductCategories productCategories={pageContent.productCategories} />
        <TopProducts topProducts={pageContent.topProducts} />
        <AboutSection {...pageContent.about} />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
