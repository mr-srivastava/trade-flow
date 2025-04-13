export default function Loading() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin'></div>
      <p className='mt-4'>Loading...</p>
    </div>
  );
}
