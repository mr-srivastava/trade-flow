import { HeroContent } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import StatCard from './Stat';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';

export default function CenteredContent({ content }: { content: HeroContent }) {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center text-center z-10'>
      <div className='section-container'>
        <div className='p-8 md:p-12 animate-fade-in bg-gradient-to-b from-white/20 to-slate-50/20 backdrop-blur-sm shadow-lg rounded-lg'>
          <div className='max-w-4xl text-left'>
            <h1 className='max-w-2xl text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-slate-900'>
              {content.heading}
              {(content.industries ?? []).length > 0 && (
                <>
                  {' for '}
                  <ContainerTextFlip
                    className='block text-left max-w-2xl text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 bg-transparent dark:bg-transparent whitespace-nowrap'
                    words={content.industries}
                    interval={1500}
                  />
                </>
              )}
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
          <h2 className='text-xl md:text-2xl font-semibold mb-4 text-slate-900'>
            {content.stats.title.split(/(\bIndia\b|\bGlobal Markets\b)/).map((part, i) => {
              if (part === 'India')
                return (
                  <span key={i} className='text-syntara-primary'>
                    {part}
                  </span>
                );
              if (part === 'Global Markets')
                return (
                  <span key={i} className='text-syntara-tealAccent'>
                    {part}
                  </span>
                );
              return part;
            })}
          </h2>
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
