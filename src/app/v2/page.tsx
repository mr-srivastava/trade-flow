import React from 'react';

import AboutSection from '@/components/About/v2/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import SynFlowFeatures from '@/components/Features/v2/Features/Features';
import Footer from '@/components/Footer/v2/Footer';
import HeroSection from '@/components/Hero/v2/Hero';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import ResourcesSection from '@/components/Resources/v2/Resources';

import { pageContent } from '@/lib/content';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <HeroSection content={pageContent.hero} />
        <PlatformBenefits benefits={pageContent.benefits} />
        <AboutSection {...pageContent.about} />
        <ProductCategories productCategories={pageContent.productCategories} />
        <SynFlowFeatures data={pageContent.synFlowFeatures} />
        <ResourcesSection data={pageContent.resourcesData} />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
