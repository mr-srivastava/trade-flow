import React from 'react';
import { Button } from '@/components/ui/button';

const HelpSection: React.FC = () => {
  return (
    <div className='mt-16 bg-muted/50 dark:bg-syntara-darker/30 border border-border/40 rounded-lg p-8 text-center'>
      <h2 className='text-2xl font-bold text-foreground mb-3'>
        Need Help Finding the Right Chemical?
      </h2>
      <p className='text-syntara-light/80 max-w-3xl mx-auto mb-6'>
        Our team of experts can help you source the exact chemical products you
        need for your application. Get personalized assistance and technical
        support.
      </p>
      <Button
        size='lg'
        className='bg-syntara-primary hover:bg-syntara-primary/90'
      >
        Contact Our Experts
      </Button>
    </div>
  );
};

export default HelpSection;
