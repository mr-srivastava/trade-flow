'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-ink group-[.toaster]:border-line group-[.toaster]:rounded-lg group-[.toaster]:shadow-[0_8px_24px_-8px_rgba(20,12,41,0.18)]',
          description: 'group-[.toast]:text-slate',
          actionButton: 'group-[.toast]:bg-brand group-[.toast]:text-white',
          cancelButton: 'group-[.toast]:bg-mist group-[.toast]:text-slate',
          success:
            'group-[.toaster]:bg-success-bg group-[.toaster]:text-success group-[.toaster]:border-success/20',
          warning:
            'group-[.toaster]:bg-warning-bg group-[.toaster]:text-warning group-[.toaster]:border-warning/20',
          error:
            'group-[.toaster]:bg-error-bg group-[.toaster]:text-error group-[.toaster]:border-error/20',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
