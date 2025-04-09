import React from 'react';
import {
  Beaker,
  ShieldCheck,
  Activity,
  GanttChart,
  Clock,
  Globe,
  Shield,
  Award,
  Users,
} from 'lucide-react';

import AboutSection from '@/components/About/v2/About';
import ContactSection from '@/components/ContactUs/ContactUs';
import SynFlowFeatures from '@/components/Features/v2/Features/Features';
import Footer from '@/components/Footer/v2/Footer';
import HeroSection from '@/components/Hero/v2/Hero';
import NavBar from '@/components/Navbar/Navbar';
import PlatformBenefits from '@/components/PlatformBenefits/PlatformBenefits';
import ProductCategories from '@/components/ProductCategories/ProductCategories';
import ResourcesSection from '@/components/Resources/v2/Resources';

import { AboutContent, Benefit, HeroContent } from '@/lib/types';

interface PageContent {
  hero: HeroContent;
  benefits: Array<Benefit>;
  about: AboutContent;
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
  about: {
    header: {
      title: 'About Us',
      subtitle: '/Section for USP',
    },
    description: {
      paragraphs: [
        'Syntara is a leading global platform for chemical and pharmaceutical trading, connecting manufacturers, suppliers, and buyers across the world. We leverage cutting-edge technology to streamline operations and reduce costs while ensuring compliance with international standards.',
        'Our platform integrates AI-driven analytics, secure blockchain transactions, and real-time market data to provide unparalleled insights and efficiency in the chemical trading industry.',
        'With a global network spanning over 65 countries, we facilitate seamless trade operations while ensuring regulatory compliance and quality assurance at every step.',
      ],
      links: [
        { href: '#capabilities', text: 'Our Capabilities', className: 'btn-primary' },
        { href: '#partners', text: 'Our Partners', className: 'btn-outline' },
      ],
    },
    values: [
      {
        icon: <Shield className='h-6 w-6 text-syntara-primary' />,
        title: 'Compliance',
        description: 'We adhere to stringent USP and international standards',
      },
      {
        icon: <Globe className='h-6 w-6 text-syntara-primary' />,
        title: 'Global Reach',
        description: 'Operations spanning across major markets worldwide',
      },
      {
        icon: <Award className='h-6 w-6 text-syntara-primary' />,
        title: 'Quality',
        description: 'Unwavering commitment to quality in every transaction',
      },
      {
        icon: <Users className='h-6 w-6 text-syntara-primary' />,
        title: 'Partnerships',
        description: 'Building lasting relationships with industry leaders',
      },
    ],
  },
};

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <HeroSection content={pageContent.hero} />
        <PlatformBenefits benefits={pageContent.benefits} />
        <AboutSection {...pageContent.about} />
        <ProductCategories />
        <SynFlowFeatures />
        <ResourcesSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
