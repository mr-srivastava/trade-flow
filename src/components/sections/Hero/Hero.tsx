import MapBackground from './MapBackground';
import CenteredContent from './CenteredContent';
import { HeroContent } from '@/lib/types';

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <MapBackground />
      <CenteredContent content={content} />
    </section>
  );
}
