import React from 'react';

import AboutSection from '@/components/About/v2/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/v2/Footer';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import Hero from '@/components/Hero/Hero';
import { PageContent } from '@/lib/types';
import { getPageContent } from '@/lib/db';

// Server action to fetch content
async function fetchPageContent(): Promise<PageContent> {
  try {
    // Try to fetch from database first
    const content = await getPageContent();
    
    // Validate that the content has the required structure
    if (content && content.hero && content.hero.heading) {
      return content;
    } else {
      throw new Error('Invalid content structure from database');
    }
  } catch (error) {
    console.error('Error fetching from database, falling back to static content:', error);
    
    // Fallback to static content
    const { pageContent } = await import('@/lib/content');
    return pageContent;
  }
}

export default async function LandingV2() {
  const content = await fetchPageContent();
  
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Hero content={content.hero} />
        {/* <HeroSection content={content.hero} /> */}
        <PlatformBenefits benefits={content.benefits} />
        <ProductCategories productCategories={content.productCategories} />
        <AboutSection {...content.about} />
        {/* <SynFlowFeatures data={content.synFlowFeatures} /> */}
        {/* <ResourcesSection data={content.resourcesData} /> */}
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
