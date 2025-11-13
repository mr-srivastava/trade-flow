import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        'group relative w-full max-w-sm overflow-hidden border-0 bg-gradient-to-br from-sky-50 to-sky-100 p-8 transition-all hover:shadow-2xl dark:from-sky-900 dark:to-sky-800',
        className
      )}
    >
      {/* Gradient Orb Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-sky-400 blur-3xl transition-all duration-500 group-hover:bg-sky-500" />
        <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-sky-300 blur-3xl transition-all duration-500 group-hover:bg-sky-400" />
      </div>

      {/* Content Container */}
      <div className="relative">
        {/* 3D Icon Container */}
        <div className="mb-8 flex justify-center">
          <div
            className={cn(
              'relative h-20 w-20 transform-gpu transition-all duration-500'
            )}
          >
            {/* Isometric Icon */}
            <div className="absolute inset-0">
              <div className="absolute flex items-center justify-center left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-xl border border-sky-200 bg-brand/50 shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:translate-y-[-60%] dark:border-sky-700 dark:bg-sky-800/50">
                {icon}
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-semibold tracking-tight text-sky-900 dark:text-sky-100">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-sky-700 dark:text-sky-300">
            {description}
          </p>
        </div>

        {/* Hover Line Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-gradient-to-r from-sky-400 to-sky-600 opacity-0 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
        </div>
      </div>
    </Card>
  );
}
