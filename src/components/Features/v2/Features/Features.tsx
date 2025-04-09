import React from 'react';
import { Handshake, TrendingUp, ChevronRight, Zap, Activity } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
}

interface SynFlowConstants {
  features: Feature[];
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  learnMoreText: string;
  learnMoreLink: string;
}

const SYN_FLOW_CONSTANTS: SynFlowConstants = {
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
};

const SynFlowFeatures: React.FC = () => {
  return (
    <section id={SYN_FLOW_CONSTANTS.sectionId} className='py-16 bg-syntara-dark'>
      <div className='section-container'>
        <div className='glass-card p-8 md:p-12'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center mb-12'>
            <div className='bg-gradient-to-r from-syntara-primary to-syntara-accent p-3 rounded-full'>
              <Zap className='h-6 w-6 text-white' />
            </div>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold text-white'>
                {SYN_FLOW_CONSTANTS.sectionTitle}
              </h2>
              <p className='text-syntara-light/80 mt-2'>{SYN_FLOW_CONSTANTS.sectionDescription}</p>
            </div>
          </div>

          <div className='space-y-8'>
            {SYN_FLOW_CONSTANTS.features.map((feature) => (
              <div
                key={feature.id}
                className='bg-syntara-darker/70 rounded-lg p-6 border border-border/30 hover:border-syntara-primary/50 transition-all duration-300'
              >
                <div className='flex gap-4 items-start'>
                  <div className='bg-syntara-primary/10 p-3 rounded-full flex-shrink-0'>
                    <feature.icon className='h-6 w-6 text-syntara-primary' />
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='bg-syntara-primary/20 text-syntara-primary text-xs font-medium px-2 py-1 rounded-full'>
                        {feature.id}
                      </span>
                      <h3 className='text-lg font-medium text-white'>{feature.title}</h3>
                    </div>
                    <p className='text-syntara-light/80 mt-2 text-sm'>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-10 flex justify-center'>
            <a
              href={SYN_FLOW_CONSTANTS.learnMoreLink}
              className='flex items-center gap-2 text-syntara-primary hover:text-syntara-accent transition-colors duration-300'
            >
              <span>{SYN_FLOW_CONSTANTS.learnMoreText}</span>
              <ChevronRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SynFlowFeatures;
