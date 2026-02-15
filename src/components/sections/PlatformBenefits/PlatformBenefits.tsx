import React from 'react';
import { Benefit } from '@/lib/types';
import { renderIcon } from '@/lib/utils/icons';

const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = React.memo(({ icon, title, description }) => {
  return (
    <div className='glass-card p-6 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1'>
      <div className='mb-4 p-3 rounded-full bg-muted dark:bg-syntara-darker/70'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2 text-foreground'>{title}</h3>
      <p className='text-syntara-light/80'>{description}</p>
    </div>
  );
});

BenefitCard.displayName = 'BenefitCard';

const PlatformBenefitsHeader: React.FC<{ title: string; subtitle: string }> =
  React.memo(({ title, subtitle }) => {
    return (
      <div className='text-center mb-12'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4 text-foreground'>
          {title}
        </h2>
        <p className='text-syntara-light/80 max-w-2xl mx-auto'>{subtitle}</p>
      </div>
    );
  });

PlatformBenefitsHeader.displayName = 'PlatformBenefitsHeader';

const PlatformBenefits: React.FC<{ benefits: Array<Benefit> }> = ({
  benefits,
}) => {
  return (
    <section
      id='solutions'
      className='py-4 bg-gradient-to-b from-card to-background dark:from-syntara-darker dark:to-syntara-dark'
    >
      <div className='section-container'>
        <PlatformBenefitsHeader
          title='Platform Benefits'
          subtitle='Syntara brings modern technology to simplify chemical trading'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={`${benefit.title}-${index}`}
              icon={renderIcon(benefit.icon, 'h-8 w-8 text-syntara-primary')}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(PlatformBenefits);
