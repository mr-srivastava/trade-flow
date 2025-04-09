import AboutSection from '@/components/About/v2/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import SynFlowFeatures from '@/components/Features/v2/Features/Features';
import Footer from '@/components/Footer/v2/Footer';
import HeroSection from '@/components/Hero/v2/Hero';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import ResourcesSection from '@/components/Resources/v2/Resources';
import { Benefit, HeroContent } from '@/lib/types';
import React from 'react';
import { Beaker, ShieldCheck, Activity, GanttChart, Clock, Globe } from 'lucide-react';

interface PageContent {
  hero: HeroContent;
  benefits: Array<Benefit>;
}

const pageContent: PageContent = {
  hero: {
    heading: 'Bridging Markets, Building Partnerships for Chemicals/Pharmaceuticals',
    description:
      'Connect to our global network and leverage cutting-edge technology for operational efficiency in chemical and pharmaceutical trading.',
    buttons: {
      contact: {
        text: 'Contact Us',
        href: '#contact',
      },
      explore: {
        text: 'Explore Platform',
        href: '#platform',
      },
    },
    stats: {
      title: 'From India to Global Markets',
      items: [
        {
          value: '48%',
          description: 'Cost Reduction in Supply Chain',
        },
        {
          value: '65+',
          description: 'Global Partner Network',
        },
        {
          value: '99.8%',
          description: 'Process Efficiency Improvement',
        },
      ],
    },
  },
  benefits: [
    {
      title: 'Quality Assurance',
      icon: <ShieldCheck className='h-8 w-8 text-blue-500' />,
      description: 'All products verified for compliance with international quality standards',
    },
    {
      title: 'Laboratory Testing',
      icon: <Beaker className='h-8 w-8 text-blue-500' />,
      description: 'Advanced laboratory analysis and purity verification',
    },
    {
      title: 'Market Insights',
      icon: <Activity className='h-8 w-8 text-blue-500' />,
      description: 'Real-time pricing data and market trend analysis',
    },
    {
      title: 'Supply Chain Tracking',
      icon: <GanttChart className='h-8 w-8 text-blue-500' />,
      description: 'End-to-end visibility of your chemicals throughout the supply chain',
    },
    {
      title: 'Just-in-Time Delivery',
      icon: <Clock className='h-8 w-8 text-blue-500' />,
      description: 'Optimized logistics for reduced inventory costs',
    },
    {
      title: 'Global Reach',
      icon: <Globe className='h-8 w-8 text-blue-500' />,
      description: 'Connect with partners and suppliers across 120+ countries',
    },
  ],
};

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <HeroSection content={pageContent.hero} />
        <PlatformBenefits benefits={pageContent.benefits} />
        <AboutSection />
        <ProductCategories />
        <SynFlowFeatures />
        <ResourcesSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
