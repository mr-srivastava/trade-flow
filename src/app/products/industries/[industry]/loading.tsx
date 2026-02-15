import Footer from '@/components/layout/Footer/Footer';
import NavBar from '@/components/layout/Navbar/Navbar';

import { Skeleton } from '@/components/ui/skeleton';

const SHOW_FILTERS = false;

export default function Loading() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <main className='flex-grow'>
        <div className='section-container pt-8 pb-16'>
          <header className='mb-8'>
            <Skeleton className='h-10 w-64 mb-6' />

            <div className='flex flex-col md:flex-row gap-4 items-stretch md:items-center'>
              <div className='relative flex-grow'>
                <Skeleton className='h-10 w-full' />
              </div>
              <Skeleton className='h-10 w-32' />
            </div>
          </header>

          <div className='flex flex-col md:flex-row gap-6'>
            {SHOW_FILTERS && (
              <aside className='w-full md:w-72 shrink-0'>
                <div className='space-y-4'>
                  <Skeleton className='h-8 w-24' />
                  <div className='space-y-2'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className='flex items-center space-x-2'>
                        <Skeleton className='h-4 w-4' />
                        <Skeleton className='h-4 w-20' />
                      </div>
                    ))}
                  </div>
                  <Skeleton className='h-8 w-24' />
                  <div className='space-y-2'>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className='flex items-center space-x-2'>
                        <Skeleton className='h-4 w-4' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            )}

            <section className='flex-grow'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className='bg-card dark:bg-syntara-darker rounded-lg p-6 border border-border/20'
                  >
                    <Skeleton className='h-48 w-full mb-4' />
                    <Skeleton className='h-6 w-3/4 mb-2' />
                    <Skeleton className='h-4 w-full mb-2' />
                    <Skeleton className='h-4 w-2/3 mb-4' />
                    <div className='flex justify-between items-center'>
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-8 w-20' />
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-12 flex flex-col items-center space-y-4'>
                <div className='flex space-x-2'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className='h-8 w-8' />
                  ))}
                </div>
                <Skeleton className='h-4 w-48' />
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
