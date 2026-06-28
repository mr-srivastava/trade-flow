import React from 'react';
import { ChevronRight, Zap } from 'lucide-react';
import { SynFlowData } from '@/lib/types';
import { renderIcon } from '@/lib/icon-util';

const SynFlowFeatures: React.FC<{ data: SynFlowData }> = ({ data }) => {
  return (
    <section id={data.sectionId} className='py-16 bg-Syntaraa-dark'>
      <div className='section-container'>
        <div className='glass-card p-8 md:p-12'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center mb-12'>
            <div className='bg-gradient-to-r from-Syntaraa-primary to-Syntaraa-accent p-3 rounded-full'>
              <Zap className='h-6 w-6 text-white' />
            </div>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold text-white'>{data.sectionTitle}</h2>
              <p className='text-Syntaraa-light/80 mt-2'>{data.sectionDescription}</p>
            </div>
          </div>

          <div className='space-y-8'>
            {data.features.map((feature) => (
              <div
                key={feature.id}
                className='bg-Syntaraa-darker/70 rounded-lg p-6 border border-border/30 hover:border-Syntaraa-primary/50 transition-all duration-300'
              >
                <div className='flex gap-4 items-start'>
                  <div className='bg-Syntaraa-primary/10 p-3 rounded-full flex-shrink-0'>
                    {renderIcon(feature.icon, 'h-6 w-6 text-Syntaraa-primary')}
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <span className='bg-Syntaraa-primary/20 text-Syntaraa-primary text-xs font-medium px-2 py-1 rounded-full'>
                        {feature.id}
                      </span>
                      <h3 className='text-lg font-medium text-white'>{feature.title}</h3>
                    </div>
                    <p className='text-Syntaraa-light/80 mt-2 text-sm'>{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-10 flex justify-center'>
            <a
              href={data.learnMoreLink}
              className='flex items-center gap-2 text-Syntaraa-primary hover:text-Syntaraa-accent transition-colors duration-300'
            >
              <span>{data.learnMoreText}</span>
              <ChevronRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SynFlowFeatures;
