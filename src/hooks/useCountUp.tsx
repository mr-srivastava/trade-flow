'use client'; // only used on client side

import { useEffect, useState } from 'react';

export function useCountUp(to: number, duration: number = 2000): number {
  const [count, setCount] = useState(to); // start at final value for SSR

  useEffect(() => {
    let start = 0;
    const increment = to / (duration / 16);

    const handle = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [to, duration]);

  return count;
}
