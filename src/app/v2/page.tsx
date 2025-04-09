import AboutSection from '@/components/About/v2/About';
import SynFlowFeatures from '@/components/Features/v2/Features/Features';
import HeroSection from '@/components/Hero/v2/Hero';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import React from 'react';

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <HeroSection />
        <PlatformBenefits />
        <AboutSection />
        <ProductCategories />
        <SynFlowFeatures />
      </main>
    </div>
  );
}
