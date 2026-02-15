'use client';
import { cn } from '@/lib/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';

export default function ReadMore({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(
          textRef.current.scrollHeight > textRef.current.clientHeight
        );
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [content]);

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div>
      <p
        ref={textRef}
        className={cn('text-syntara-light/80', expanded ? '' : 'line-clamp-3')}
      >
        {content}
      </p>

      {isTruncated && (
        <Button
          onClick={toggleExpanded}
          className='text-syntara-primary hover:text-syntara-primary/80 p-0'
          variant='link'
        >
          {expanded ? 'Read less' : 'Read more'}
        </Button>
      )}
    </div>
  );
}
