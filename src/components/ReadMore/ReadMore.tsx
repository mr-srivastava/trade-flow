'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function ReadMore({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div>
      <p className={cn('text-syntara-light/80', expanded ? '' : 'line-clamp-3')}>{content}</p>

      <Button
        onClick={toggleExpanded}
        className='text-syntara-primary hover:text-syntara-primary/80 p-0'
        variant='link'
      >
        {expanded ? 'Read less' : 'Read more'}
      </Button>
    </div>
  );
}
