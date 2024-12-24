import { ReactNode } from "react";

interface CenteredContentProps {
  title: string;
  ctaButtons: ReactNode;
}

export default function CenteredContent({
  title,
  ctaButtons,
}: CenteredContentProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-screen-md">
        {title}
      </h1>
      <div className="space-x-4">{ctaButtons}</div>
    </div>
  );
}
