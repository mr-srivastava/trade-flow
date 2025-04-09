import React from 'react';
import { Beaker, ShieldCheck, Activity, GanttChart, Clock, Globe } from 'lucide-react';

const benefits = [
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
];

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className='glass-card p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1'>
      <div className='mb-4 p-3 rounded-full bg-syntara-darker/70'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2 text-white'>{title}</h3>
      <p className='text-syntara-light/80'>{description}</p>
    </div>
  );
};

const PlatformBenefitsHeader: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className='text-center mb-12'>
      <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white'>{title}</h2>
      <p className='text-syntara-light/80 max-w-2xl mx-auto'>{subtitle}</p>
    </div>
  );
};

const PlatformBenefits: React.FC = () => {
  return (
    <section id='benefits' className='py-16 bg-syntara-dark'>
      <div className='section-container'>
        <PlatformBenefitsHeader
          title='Platform Benefits'
          subtitle='Syntara brings modern technology to simplify chemical trading'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;
