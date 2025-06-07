import React from 'react';

import AboutSection from '@/components/About/v2/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import Footer from '@/components/Footer/v2/Footer';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import Hero from '@/components/Hero/Hero';
import { PageContent } from '@/lib/types';
import { getPageContent } from '@/lib/mongodb-db';

// Server action to fetch content from MongoDB
async function fetchPageContent(): Promise<PageContent> {
  try {
    // Fetch from MongoDB database
    const content = await getPageContent();
    
    // Validate that the content has the required structure
    if (content && content.hero && content.hero.heading) {
      return content;
    } else {
      throw new Error('Invalid content structure from database');
    }
  } catch (error) {
    console.error('Error fetching from database:', error);
    
    // Return a minimal default content structure if database fails
    return {
      hero: {
        heading: 'Welcome to Trade Flow',
        description: 'Your trusted partner in pharmaceutical trading',
        industries: [],
        buttons: { 
          contact: { text: 'Contact Us', href: '/contact' }, 
          explore: { text: 'Explore Products', href: '/products' } 
        },
        stats: { title: 'Our Impact', items: [] }
      },
      benefits: [],
      about: {
        header: { title: 'About Us', subtitle: 'Leading the Industry' },
        description: { paragraphs: [], links: [] },
        values: []
      },
      productCategories: { title: 'Product Categories', subtitle: 'Explore our range', buttonText: 'View All' },
      synFlowFeatures: {
        features: [],
        sectionId: 'features',
        sectionTitle: 'SynFlow Features',
        sectionDescription: 'Discover our key features',
        learnMoreText: 'Learn More',
        learnMoreLink: '/features'
      },
      resourcesData: { title: 'Resources', subtitle: 'Helpful information', resources: [] }
    };
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
