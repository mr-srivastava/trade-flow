export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='w-10 h-10 border-2 border-border border-t-primary rounded-full animate-spin'></div>
      <p className='mt-4'>Loading...</p>
    </div>
  );
}
