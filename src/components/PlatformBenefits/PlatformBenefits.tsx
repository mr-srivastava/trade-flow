import React from 'react';
import { Benefit } from '@/lib/types';
import { renderIcon } from '@/lib/icon-util';
import { Reveal } from '@/components/ui/Reveal';

const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}> = ({ icon, title, description, index }) => {
  const topAccent =
    index % 2 === 0 ? 'border-t-4 border-t-syntara-primary' : 'border-t-4 border-t-syntara-tealAccent';
  return (
    <div
      className={`bg-white border border-slate-200 ${topAccent} rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 p-6 flex flex-col items-center text-center hover:-translate-y-1`}
    >
      <div className='mb-4 p-3 rounded-full bg-syntara-darker/70'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2 text-slate-900'>{title}</h3>
      <p className='text-slate-600'>{description}</p>
    </div>
  );
};

const PlatformBenefitsHeader: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className='text-center mb-12'>
      <h2 className='text-2xl md:text-3xl font-bold mb-4 text-slate-900'>{title}</h2>
      <p className='text-syntara-light/80 max-w-2xl mx-auto'>{subtitle}</p>
    </div>
  );
};

const PlatformBenefits: React.FC<{ benefits: Array<Benefit> }> = ({ benefits }) => {
  return (
    <section id='solutions' className='py-4 bg-gradient-to-b from-syntara-darker to-syntara-dark'>
      <div className='section-container'>
        <PlatformBenefitsHeader
          title='Platform Benefits'
          subtitle='Syntara brings modern technology to simplify chemical trading'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <BenefitCard
                index={index}
                icon={renderIcon(benefit.icon, 'h-8 w-8 text-syntara-primary')}
                title={benefit.title}
                description={benefit.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformBenefits;
