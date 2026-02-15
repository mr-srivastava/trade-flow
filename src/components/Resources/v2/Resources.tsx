import React from 'react';
import { ResourcesData } from '@/lib/types';
import { renderIcon } from '@/lib/utils/icons';

const ResourcesSection: React.FC<{ data: ResourcesData }> = ({ data }) => {
  return (
    <section
      id='resources'
      className='py-16 bg-gradient-to-b from-syntara-darker to-syntara-dark'
    >
      <div className='section-container'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white'>
            {data.title}
          </h2>
          <p className='text-syntara-light/80 max-w-2xl mx-auto'>
            {data.subtitle}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {data.resources.map((resource, index) => (
            <a
              href={resource.link}
              key={index}
              className='glass-card p-6 text-center hover:bg-syntara-primary/5 transition-all duration-300'
            >
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-syntara-primary/10 text-syntara-primary mb-4'>
                {renderIcon(resource.icon, 'h-6 w-6')}
              </div>
              <h3 className='text-lg font-medium mb-2 text-white'>
                {resource.title}
              </h3>
              <p className='text-sm text-syntara-light/80'>
                {resource.description}
              </p>
            </a>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <a href='#' className='btn-outline'>
            Browse All Resources
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
