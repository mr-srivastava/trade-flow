import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Content {
  heading: string;
  description: string;
  buttons: {
    contact: {
      text: string;
      href: string;
    };
    explore: {
      text: string;
      href: string;
    };
  };
  stats: {
    title: string;
    items: {
      value: string;
      description: string;
    }[];
  };
}

const content: Content = {
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
};

const HeroSection: React.FC = () => {
  return (
    <section className='relative py-16 md:py-24'>
      <div className='section-container'>
        <div className='glass-card p-8 md:p-12 animate-fade-in'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight'>
              {content.heading}
            </h1>
            <p className='text-lg md:text-xl text-syntara-light/90 mb-8 max-w-3xl'>
              {content.description}
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <a
                href={content.buttons.contact.href}
                className='btn-primary flex items-center justify-center gap-2'
              >
                {content.buttons.contact.text} <ArrowRight className='h-4 w-4' />
              </a>
              <a
                href={content.buttons.explore.href}
                className='btn-outline flex items-center justify-center gap-2'
              >
                {content.buttons.explore.text}
              </a>
            </div>
          </div>
        </div>

        <div className='mt-12 glass-card p-6 md:p-8'>
          <h2 className='text-xl md:text-2xl font-medium mb-4 text-white'>{content.stats.title}</h2>
          <div className='bg-syntara-darker/50 rounded-lg p-4 border border-border/25'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {content.stats.items.map((stat, index) => (
                <div key={index} className='flex flex-col items-center p-4'>
                  <div className='text-syntara-primary font-bold text-4xl mb-2'>{stat.value}</div>
                  <p className='text-center text-sm text-syntara-light/80'>{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
