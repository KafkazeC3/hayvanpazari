'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-earth-900 group-[.toaster]:border-earth-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-earth-500',
          actionButton:
            'group-[.toast]:bg-nature-600 group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-earth-100 group-[.toast]:text-earth-500',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
