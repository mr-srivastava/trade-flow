import { PageContent } from '@/lib/types';

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
  Handshake,
  TrendingUp,
  BookOpen,
  FileText,
  Video,
  Download,
} from 'lucide-react';

export const pageContent: PageContent = {
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
  productCategories: {
    title: 'Product Categories',
    subtitle: 'Entry Point to Products',
    buttonText: 'View All Product Categories',
    categories: [
      { name: 'Pharmaceutical Intermediates', count: '342' },
      { name: 'API & Bulk Drugs', count: '156' },
      { name: 'Fine Chemicals', count: '278' },
      { name: 'Specialty Chemicals', count: '193' },
      { name: 'Agrochemicals', count: '114' },
      { name: 'Lab Reagents', count: '327' },
    ],
  },
  synFlowFeatures: {
    features: [
      {
        id: 1,
        icon: Activity,
        title: 'Supply Chain Intelligence',
        description: 'Seamless procurement, Real-Time Tracking and Insights',
      },
      {
        id: 2,
        icon: Handshake,
        title: 'Smart Deal Flow',
        description:
          'Supplier Matching, AI Handles negotiations, paperworks and Automated payment Journeys',
      },
      {
        id: 3,
        icon: TrendingUp,
        title: 'Pricing Intelligence',
        description: 'Real-time price, Supply and demand AI Forecast to spots the best deals',
      },
    ],
    sectionId: 'capabilities',
    sectionTitle: 'Elevate your workflow with SynFlow',
    sectionDescription:
      'Our AI-powered platform streamlines every aspect of chemical trade operations',
    learnMoreText: 'Learn more about our AI capabilities',
    learnMoreLink: '#',
  },
  resourcesData: {
    title: 'Educational Resources',
    subtitle: 'Explore our knowledge base to stay updated with industry trends and best practices',
    resources: [
      {
        icon: <BookOpen className='h-6 w-6' />,
        title: 'Industry Reports',
        description: 'In-depth analysis of chemical industry trends',
        link: '#',
      },
      {
        icon: <FileText className='h-6 w-6' />,
        title: 'Whitepapers',
        description: 'Expert insights on supply chain optimization',
        link: '#',
      },
      {
        icon: <Video className='h-6 w-6' />,
        title: 'Webinars',
        description: 'Interactive sessions with industry experts',
        link: '#',
      },
      {
        icon: <Download className='h-6 w-6' />,
        title: 'Case Studies',
        description: 'Real-world success stories from our clients',
        link: '#',
      },
    ],
  },
};
