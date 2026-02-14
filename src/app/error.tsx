'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-earth-50/30">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-earth-800 mb-2">
          Bir Hata Oluştu
        </h1>
        
        <p className="text-earth-500 mb-6">
          Üzgünüz, sayfa yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-left overflow-auto">
            <p className="text-sm font-mono text-red-600">{error.message}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={reset}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Tekrar Dene
          </Button>
          
          <Link href="/">
            <Button className="gradient-nature text-white gap-2">
              <Home className="h-4 w-4" />
              Anasayfa
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
