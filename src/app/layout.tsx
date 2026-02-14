import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HayvanPazarı.com - Türkiye\'nin En Büyük Hayvan Pazarı',
  description: 'HayvanPazarı.com ile güvenli ve hızlı şekilde hayvan alım satımı yapın. Büyükbaş, küçükbaş, kanatlı hayvanlar ve daha fazlası.',
  keywords: 'hayvan pazarı, büyükbaş, küçükbaş, kanatlı hayvanlar, satılık hayvan, hayvan alım satım',
  authors: [{ name: 'HayvanPazarı.com' }],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'HayvanPazarı.com - Türkiye\'nin En Büyük Hayvan Pazarı',
    description: 'Güvenli ve hızlı hayvan alım satım platformu',
    type: 'website',
    locale: 'tr_TR',
  },
};

export const viewport: Viewport = {
  themeColor: '#22c55e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
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
