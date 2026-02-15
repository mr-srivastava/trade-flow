import React, { useMemo } from 'react';
import { HeroContent } from '@/lib/types';
import { ArrowRightIcon } from '@phosphor-icons/react/ssr';
import StatCard from './Stat';
import { ContainerTextFlip } from '@/components/ui/container-text-flip';

interface CenteredContentProps {
  content: HeroContent;
}

function CenteredContent({ content }: CenteredContentProps) {
  // Memoize the industries check to avoid recalculation on every render
  const hasIndustries = useMemo(
    () => content.industries && content.industries.length > 0,
    [content.industries],
  );

  // Memoize the heading content to prevent ContainerTextFlip from recreating
  const headingContent = useMemo(() => {
    if (!hasIndustries) {
      return content.heading;
    }

    return (
      <>
        {content.heading}
        {' for '}
        <ContainerTextFlip
          className="text-left max-w-2xl text-3xl md:text-4xl lg:text-5xl font-bold text-foreground bg-transparent dark:bg-transparent"
          words={content.industries!}
          interval={1500}
        />
      </>
    );
  }, [content.heading, content.industries, hasIndustries]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
      <div className="section-container">
        {/* Main Hero Section */}
        <section className="p-8 md:p-12 animate-fade-in bg-gradient-to-b from-syntara-darker/10 to-syntara-dark/10 backdrop-blur-sm shadow-md rounded-lg">
          <div className="max-w-4xl text-left">
            <h1 className="max-w-2xl text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {headingContent}
            </h1>

            <p className="text-lg md:text-xl text-syntara-light/90 mb-8 max-w-3xl">
              {content.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={content.buttons.contact.href}
                className="btn-primary flex items-center justify-center gap-2"
                aria-label={`${content.buttons.contact.text} - Contact us`}
              >
                {content.buttons.contact.text}
                <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={content.buttons.explore.href}
                className="btn-outline flex items-center justify-center gap-2"
                aria-label={`${content.buttons.explore.text} - Explore our products`}
              >
                {content.buttons.explore.text}
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-8 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-foreground">{content.stats.title}</h2>
          <div className="bg-card dark:bg-syntara-darker rounded-lg p-4 border border-border/25">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.stats.items.map((stat) => (
                <StatCard key={stat.description} stat={stat} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default React.memo(CenteredContent);
