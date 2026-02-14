'use client';

import { useUI } from '@/contexts/UIContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-amber-500 text-white',
  info: 'bg-blue-500 text-white',
};

export function ToastContainer() {
  const { toasts, hideToast } = useUI();

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = toastIcons[toast.type];
          
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[300px] max-w-[400px]',
                toastStyles[toast.type]
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm font-medium">{toast.message}</p>
              <button
                onClick={() => hideToast(toast.id)}
                className="p-1 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
