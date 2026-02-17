'use client';

import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <title>HayvanPazarı.com - Türkiye'nin En Büyük Hayvan Pazarı</title>
        <meta name="description" content="HayvanPazarı.com ile güvenli ve hızlı şekilde hayvan alım satımı yapın." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#22c55e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      </head>
      <body>
        <SessionProvider>
          <FavoritesProvider>
            <div className="min-h-screen bg-earth-50/30">
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" />
          </FavoritesProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
