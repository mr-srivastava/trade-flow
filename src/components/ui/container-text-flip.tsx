'use client';

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ['better', 'modern', 'beautiful', 'awesome'],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useLayoutEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    setHasMounted(true);
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  const currentWord = words[currentWordIndex];
  const Wrapper = hasMounted ? motion.div : 'div';

  return (
    <Wrapper
      {...(hasMounted && {
        layout: true,
        animate: width ? { width } : {},
        transition: { duration: animationDuration / 2000 },
      })}
      className={cn(
        'relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl dark:text-white',
        className,
      )}
      key={currentWord}
    >
      <Wrapper
        {...(hasMounted && {
          transition: { duration: animationDuration / 1000, ease: 'easeInOut' },
        })}
        className={cn('inline-block', textClassName)}
        ref={textRef}
      >
        <div className='inline-block'>
          {currentWord.split('').map((letter, index) => {
            const Span = hasMounted ? motion.span : 'span';
            return (
              <Span
                key={index}
                {...(hasMounted && {
                  initial: { opacity: 0, filter: 'blur(10px)' },
                  animate: { opacity: 1, filter: 'blur(0px)' },
                  transition: { delay: index * 0.02 },
                })}
                className='inline-block'
              >
                {letter}
              </Span>
            );
          })}
        </div>
      </Wrapper>
    </Wrapper>
  );
}
