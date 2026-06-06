'use client'; // only used on client side

import { useEffect, useLayoutEffect, useState } from 'react';

// useLayoutEffect on client, no-op fallback on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useCountUp(to: number, duration: number = 1200): number {
  const [count, setCount] = useState(to);

  // Before the browser paints on the client, jump to a small non-zero value
  // so the user never sees a stuck "0".
  useIsomorphicLayoutEffect(() => {
    const seed = Number.isInteger(to)
      ? Math.max(1, Math.floor(to * 0.05))
      : Number((to * 0.05).toFixed(1));
    setCount(seed);
  }, [to]);

  useEffect(() => {
    let raf = 0;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // cubic ease-out: snappy start, gentle landing
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * to;
      setCount(Number.isInteger(to) ? Math.floor(value) : Number(value.toFixed(1)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(to);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return count;
}
