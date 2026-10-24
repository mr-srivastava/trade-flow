export default function Loading() {
  return (
    <output aria-live="polite" className="flex flex-col justify-center items-center h-screen">
      <div className="w-10 h-10 border-2 border-line border-t-brand rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-slate">Loading...</p>
    </output>
  );
}
