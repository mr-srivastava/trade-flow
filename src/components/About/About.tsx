import React from 'react';
import { AboutContent } from '@/lib/types';
import { renderIcon } from '@/lib/icon-util';
import { Reveal } from '@/components/ui/Reveal';

const AboutSection: React.FC<AboutContent> = ({ header, description, values }) => {
  return (
    <section id='about' className='py-4 bg-white'>
      <div className='section-container'>
        <Reveal>
          <div className='surface-card p-8 md:p-12'>
            <Header header={header} />
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
              <Description description={description} />
              <CoreValues values={values} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Header: React.FC<{ header: AboutContent['header'] }> = ({ header }) => (
  <h2 className='text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-8 text-ink'>
    {header.title} <span className='text-slate text-lg'>{header.subtitle}</span>
  </h2>
);

const Description: React.FC<{ description: AboutContent['description'] }> = ({ description }) => (
  <div className='lg:col-span-3'>
    {description.paragraphs.map((paragraph, index) => (
      <p key={index} className='text-slate mb-6 leading-relaxed'>
        {paragraph}
      </p>
    ))}
    <div className='flex flex-col sm:flex-row gap-4 mt-8'>
      {description.links.map((link, index) => (
        <a key={index} href={link.href} className={link.className}>
          {link.text}
        </a>
      ))}
    </div>
  </div>
);

const CoreValues: React.FC<{ values: AboutContent['values'] }> = ({ values }) => (
  <div className='lg:col-span-2 bg-mist border border-line rounded-lg p-6'>
    <h3 className='text-lg md:text-xl font-semibold mb-6 text-ink'>Our Core Values</h3>
    <ul className='space-y-6'>
      {values.map((value, index) => (
        <li key={index} className='flex items-start gap-4'>
          <div className='flex-shrink-0 bg-brand-50 text-brand p-3 rounded-lg'>
            {renderIcon(value.icon, 'h-6 w-6')}
          </div>
          <div>
            <h4 className='font-semibold text-ink'>{value.title}</h4>
            <p className='text-sm text-slate leading-relaxed'>{value.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AboutSection;
