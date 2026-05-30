import React from 'react';

import AboutSection from '@/components/About/v2/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/v2/Footer';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';

import { pageContent } from '@/lib/content';
import Hero from '@/components/Hero/Hero';

export default function LandingV2() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Hero content={pageContent.hero} />
        {/* <HeroSection content={pageContent.hero} /> */}
        <PlatformBenefits benefits={pageContent.benefits} />
        <ProductCategories productCategories={pageContent.productCategories} />
        <AboutSection {...pageContent.about} />
        {/* <SynFlowFeatures data={pageContent.synFlowFeatures} /> */}
        {/* <ResourcesSection data={pageContent.resourcesData} /> */}
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
