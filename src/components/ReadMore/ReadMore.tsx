'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ReadMore({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div>
      <p className={cn('text-slate leading-relaxed', expanded ? '' : 'line-clamp-3')}>{content}</p>

      <Button
        onClick={toggleExpanded}
        className="text-brand text-sm font-medium hover:underline p-0 h-auto"
        variant="link"
      >
        {expanded ? 'Read less' : 'Read more'}
      </Button>
    </div>
  );
}
