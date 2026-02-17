import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import './globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HayvanPazarı.com - Türkiye'nin En Büyük Hayvan Pazarı</title>
        <meta name="description" content="Türkiye'nin en güvenilir hayvan pazarı. Büyükbaş, küçükbaş, kanatlı hayvanlar ve daha fazlası." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Turkish" />
        <meta name="author" content="HayvanPazarı.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          body { 
            font-family: 'Inter', sans-serif; 
            margin: 0; 
            padding: 0; 
          }
          /* Mobil alt bar için güvenli alan padding'i */
          .safe-area-pb {
            padding-bottom: env(safe-area-inset-bottom, 0px);
          }
          /* Sayfa içeriğinin alt bar'ın arkasına gitmemesi için */
          @media (max-width: 768px) {
            main {
              padding-bottom: 80px;
            }
          }
        `}</style>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Component {...pageProps} />
        <MobileBottomNav />
      </div>
    </>
  );
}
