'use client';

import React, { useState, useLayoutEffect, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const emptySubscribe = () => () => {};

/**
 * True once mounted on the client, false during SSR. `useSyncExternalStore`'s
 * server snapshot lets this be read directly during render instead of via a
 * `useEffect` + `setState` hydration-guard, which would trigger an extra
 * render.
 */
function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

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
  const hasMounted = useHasMounted();
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
        'relative inline-block bg-transparent pt-2 pb-3 text-center text-4xl font-bold md:text-7xl',
        className,
      )}
    >
      <Wrapper
        {...(hasMounted && {
          transition: { duration: animationDuration / 1000, ease: 'easeInOut' },
        })}
        className={cn('inline-block', textClassName)}
        ref={textRef}
        key={currentWord}
      >
        <div className="inline-block">
          {currentWord.split('').map((letter, index) => {
            const Span = hasMounted ? motion.span : 'span';
            return (
              <Span
                key={`${currentWord}-${index}`}
                {...(hasMounted && {
                  initial: { opacity: 0, filter: 'blur(10px)' },
                  animate: { opacity: 1, filter: 'blur(0px)' },
                  transition: { delay: index * 0.02 },
                })}
                className="inline-block"
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
