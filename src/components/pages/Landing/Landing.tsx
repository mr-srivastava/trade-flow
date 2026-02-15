import React from 'react';

import AboutSection from '@/components/sections/About/About';
import ContactSection from '@/components/sections/Contact/Contact';
import Footer from '@/components/layout/Footer/Footer';
import NavBar from '@/components/layout/Navbar/Navbar';
import PlatformBenefits from '@/components/sections/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/sections/ProductCategories/ProductCategories';
import Hero from '@/components/sections/Hero/Hero';
import { PageContent } from '@/lib/types';
import { contentService, productService } from '@/lib/services';

// Server action to fetch content from MongoDB
async function fetchPageContent(): Promise<PageContent> {
  try {
    // Fetch from MongoDB database using ContentService
    const content = await contentService.getPageContent();

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
          explore: { text: 'Explore Products', href: '/products' },
        },
        stats: { title: 'Our Impact', items: [] },
      },
      benefits: [],
      about: {
        header: { title: 'About Us', subtitle: 'Leading the Industry' },
        description: { paragraphs: [], links: [] },
        values: [],
      },
      productCategories: {
        title: 'Product Categories',
        subtitle: 'Explore our range',
        buttonText: 'View All',
      },
      synFlowFeatures: {
        features: [],
        sectionId: 'features',
        sectionTitle: 'SynFlow Features',
        sectionDescription: 'Discover our key features',
        learnMoreText: 'Learn More',
        learnMoreLink: '/features',
      },
      resourcesData: {
        title: 'Resources',
        subtitle: 'Helpful information',
        resources: [],
      },
    };
  }
}

export default async function Landing() {
  const [content, industries] = await Promise.all([
    fetchPageContent(),
    productService.getIndustryCounts().catch(() => []),
  ]);

  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <Hero content={content.hero} />
        {/* <HeroSection content={content.hero} /> */}
        <PlatformBenefits benefits={content.benefits} />
        <ProductCategories
          productCategories={content.productCategories}
          industries={industries}
        />
        <AboutSection {...content.about} />
        {/* <SynFlowFeatures data={content.synFlowFeatures} /> */}
        {/* <ResourcesSection data={content.resourcesData} /> */}
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
