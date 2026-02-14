'use client';

import { ReactNode } from 'react';
import { SessionProvider } from './SessionProvider';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { UIProvider } from '@/contexts/UIContext';
import { ErrorBoundary } from './ErrorBoundary';
import { ToastContainer } from './ToastContainer';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <SessionProvider>
        <UIProvider>
          <FavoritesProvider>
            {children}
            <ToastContainer />
          </FavoritesProvider>
        </UIProvider>
      </SessionProvider>
    </ErrorBoundary>
  );
}
