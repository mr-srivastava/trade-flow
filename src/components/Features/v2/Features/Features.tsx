import React from 'react';
import { Handshake, TrendingUp, ChevronRight, Zap, Activity } from 'lucide-react';

const SynFlowFeatures: React.FC = () => {
  return (
    <section id='capabilities' className='py-16 bg-syntara-dark'>
      <div className='section-container'>
        <div className='glass-card p-8 md:p-12'>
          <div className='flex flex-col md:flex-row gap-6 items-start md:items-center mb-12'>
            <div className='bg-gradient-to-r from-syntara-primary to-syntara-accent p-3 rounded-full'>
              <Zap className='h-6 w-6 text-white' />
            </div>
            <div>
              <h2 className='text-2xl md:text-3xl font-bold text-white'>
                Elevate your workflow with SynFlow
              </h2>
              <p className='text-syntara-light/80 mt-2'>
                Our AI-powered platform streamlines every aspect of chemical trade operations
              </p>
            </div>
          </div>

          <div className='space-y-8'>
            <div className='bg-syntara-darker/70 rounded-lg p-6 border border-border/30 hover:border-syntara-primary/50 transition-all duration-300'>
              <div className='flex gap-4 items-start'>
                <div className='bg-syntara-primary/10 p-3 rounded-full flex-shrink-0'>
                  <Activity className='h-6 w-6 text-syntara-primary' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-syntara-primary/20 text-syntara-primary text-xs font-medium px-2 py-1 rounded-full'>
                      1
                    </span>
                    <h3 className='text-lg font-medium text-white'>Supply Chain Intelligence</h3>
                  </div>
                  <p className='text-syntara-light/80 mt-2 text-sm'>
                    Seamless procurement, Real-Time Tracking and Insights
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-syntara-darker/70 rounded-lg p-6 border border-border/30 hover:border-syntara-primary/50 transition-all duration-300'>
              <div className='flex gap-4 items-start'>
                <div className='bg-syntara-primary/10 p-3 rounded-full flex-shrink-0'>
                  <Handshake className='h-6 w-6 text-syntara-primary' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-syntara-primary/20 text-syntara-primary text-xs font-medium px-2 py-1 rounded-full'>
                      2
                    </span>
                    <h3 className='text-lg font-medium text-white'>Smart Deal Flow</h3>
                  </div>
                  <p className='text-syntara-light/80 mt-2 text-sm'>
                    Supplier Matching, AI Handles negotiations, paperworks and Automated payment
                    Journeys
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-syntara-darker/70 rounded-lg p-6 border border-border/30 hover:border-syntara-primary/50 transition-all duration-300'>
              <div className='flex gap-4 items-start'>
                <div className='bg-syntara-primary/10 p-3 rounded-full flex-shrink-0'>
                  <TrendingUp className='h-6 w-6 text-syntara-primary' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='bg-syntara-primary/20 text-syntara-primary text-xs font-medium px-2 py-1 rounded-full'>
                      3
                    </span>
                    <h3 className='text-lg font-medium text-white'>Pricing Intelligence</h3>
                  </div>
                  <p className='text-syntara-light/80 mt-2 text-sm'>
                    Real-time price, Supply and demand AI Forecast to spots the best deals
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-10 flex justify-center'>
            <a
              href='#'
              className='flex items-center gap-2 text-syntara-primary hover:text-syntara-accent transition-colors duration-300'
            >
              <span>Learn more about our AI capabilities</span>
              <ChevronRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SynFlowFeatures;
