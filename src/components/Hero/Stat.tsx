'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { HeroContent } from '@/lib/types';

export default function StatCard({ stat }: { stat: HeroContent['stats']['items'][0] }) {
  const match = stat.value.match(/^(\d+\.?\d*)(\D+)?$/);
  const numberPart = match ? parseFloat(match[1]) : 0;
  const symbolPart = match && match[2] ? match[2] : '';
  const count = useCountUp(numberPart, 2000); // Adjust duration as needed

  return (
    <div key={stat.description} className='flex flex-col items-center p-4'>
      <div className='text-syntara-primary font-bold text-4xl mb-2'>
        {count}
        {symbolPart}
      </div>
      <p className='text-center text-sm text-syntara-light/80'>{stat.description}</p>
    </div>
  );
}
