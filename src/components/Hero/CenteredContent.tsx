import { HeroContent } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import StatCard from './Stat';

export default function CenteredContent({ content }: { content: HeroContent }) {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center text-center z-10'>
      <div className='section-container'>
        <div className='p-8 md:p-12 animate-fade-in bg-syntara-darker/10 backdrop-blur-sm shadow-md rounded-lg'>
          <div className='max-w-4xl text-left'>
            <h1 className='max-w-2xl text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white'>
              {content.heading}
            </h1>
            <p className='text-lg md:text-xl text-syntara-light/90 mb-8 max-w-3xl'>
              {content.description}
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <a
                href={content.buttons.contact.href}
                className='btn-primary flex items-center justify-center gap-2'
              >
                {content.buttons.contact.text} <ArrowRight className='h-4 w-4' />
              </a>
              <a
                href={content.buttons.explore.href}
                className='btn-outline flex items-center justify-center gap-2'
              >
                {content.buttons.explore.text}
              </a>
            </div>
          </div>
        </div>

        <div className='mt-8 p-6 md:p-8'>
          <h2 className='text-xl md:text-2xl font-medium mb-4 text-white'>{content.stats.title}</h2>
          <div className='bg-syntara-darker rounded-lg p-4 border border-border/25'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {content.stats.items.map((stat) => (
                <StatCard key={stat.description} stat={stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
