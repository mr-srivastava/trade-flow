import React from 'react';
import { Benefit } from '@/lib/types';
import { renderIcon } from '@/lib/icon-util';
import { Reveal } from '@/components/ui/Reveal';

const BenefitCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="h-full bg-white border border-line rounded-lg p-6 flex flex-col items-center text-center transition-colors duration-150 hover:border-brand-200">
      {/* The accent lives in the icon tile now, not an alternating top stripe. */}
      <div className="mb-4 p-3 rounded-lg bg-brand-50 text-brand">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-ink">{title}</h3>
      <p className="text-slate leading-relaxed">{description}</p>
    </div>
  );
};

const PlatformBenefitsHeader: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  return (
    <div className="text-center mb-12">
      <span className="eyebrow">Platform</span>
      <h2 className="mt-3 mb-4 text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-ink">
        {title}
      </h2>
      <p className="text-slate max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
    </div>
  );
};

const PlatformBenefits: React.FC<{ benefits: Array<Benefit> }> = ({ benefits }) => {
  return (
    <section id="solutions" className="py-4 bg-mist">
      <div className="section-container">
        <PlatformBenefitsHeader
          title="Platform Benefits"
          subtitle="Syntaraa brings modern technology to simplify chemical trading"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <BenefitCard
                icon={renderIcon(benefit.icon, 'h-8 w-8')}
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
