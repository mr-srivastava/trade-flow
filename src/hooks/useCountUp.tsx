'use client'; // only used on client side

import { useEffect, useState } from 'react';

export function useCountUp(to: number, duration: number = 2000): number {
  const [count, setCount] = useState(to); // start at final value for SSR

  useEffect(() => {
    let animationId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(to * progress);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };
    
    // Start animation from 0
    setCount(0);
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [to, duration]);

  return count;
}
