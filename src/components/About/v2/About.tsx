import React from 'react';
import { AboutContent } from '@/lib/types';
import { renderIcon } from '@/lib/icon-util';

const AboutSection: React.FC<AboutContent> = ({ header, description, values }) => {
  return (
    <section id='about' className='py-4 bg-gradient-to-b from-syntara-darker to-syntara-dark'>
      <div className='section-container'>
        <div className='glass-card p-8 md:p-12'>
          <Header header={header} />
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-8'>
            <Description description={description} />
            <CoreValues values={values} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Header: React.FC<{ header: AboutContent['header'] }> = ({ header }) => (
  <h2 className='text-2xl md:text-3xl font-bold mb-8 text-white'>
    {header.title} <span className='text-syntara-light/70 text-xl'>{header.subtitle}</span>
  </h2>
);

const Description: React.FC<{ description: AboutContent['description'] }> = ({ description }) => (
  <div className='lg:col-span-3'>
    {description.paragraphs.map((paragraph, index) => (
      <p key={index} className='text-syntara-light mb-6 leading-relaxed'>
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
  <div className='lg:col-span-2 bg-syntara-darker rounded-lg p-6 border border-border/30'>
    <h3 className='text-xl font-semibold mb-6 text-white'>Our Core Values</h3>
    <ul className='space-y-6'>
      {values.map((value, index) => (
        <li key={index} className='flex items-start gap-4'>
          <div className='flex-shrink-0 bg-secondary/50 p-3 rounded-full'>
            {renderIcon(value.icon, 'h-6 w-6 text-syntara-primary')}
          </div>
          <div>
            <h4 className='font-semibold text-white'>{value.title}</h4>
            <p className='text-sm text-syntara-light/80 leading-relaxed'>{value.description}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default AboutSection;
