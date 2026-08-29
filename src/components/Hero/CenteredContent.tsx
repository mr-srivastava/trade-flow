import { HeroContent } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import StatCard from './Stat';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';

export default function CenteredContent({ content }: { content: HeroContent }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
      <div className="section-container">
        <div className="p-8 md:p-12 animate-fade-in bg-white/85 border border-line rounded-xl">
          <div className="max-w-4xl text-left">
            <h1 className="max-w-2xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-6 text-ink">
              {content.heading}
              {(content.industries ?? []).length > 0 && (
                <>
                  {' for '}
                  <ContainerTextFlip
                    className="block text-left max-w-2xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-brand bg-transparent whitespace-nowrap"
                    words={content.industries}
                    interval={1500}
                  />
                </>
              )}
            </h1>
            <p className="text-lg md:text-xl text-slate leading-relaxed mb-8 max-w-3xl">
              {content.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={content.buttons.contact.href}
                className="btn-primary flex items-center justify-center gap-2"
              >
                {content.buttons.contact.text} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={content.buttons.explore.href}
                className="btn-outline flex items-center justify-center gap-2"
              >
                {content.buttons.explore.text}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] mb-4 text-ink">
            {content.stats.title.split(/(\bIndia\b|\bGlobal Markets\b)/).map((part, i) => {
              if (part === 'Global Markets')
                return (
                  <span key={i} className="text-brand">
                    {part}
                  </span>
                );
              return part;
            })}
          </h2>
          <div className="bg-mist border border-line rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
