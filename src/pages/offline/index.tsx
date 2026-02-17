'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-earth-50/30">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-earth-100 flex items-center justify-center">
          <WifiOff className="h-12 w-12 text-earth-500" />
        </div>

        <h1 className="text-2xl font-bold text-earth-800 mb-2">
          İnternet Bağlantısı Yok
        </h1>

        <p className="text-earth-500 mb-8">
          Şu anda çevrimdışı görünüyorsunuz. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="w-full gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Yeniden Dene
          </Button>

          <Link href="/">
            <Button className="w-full gradient-nature text-white gap-2">
              <Home className="h-4 w-4" />
              Anasayfaya Dön
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-white rounded-xl border border-earth-200">
          <h3 className="font-medium text-earth-800 mb-2">
            Çevrimdışı Yapabilecekleriniz:
          </h3>
          <ul className="text-sm text-earth-600 space-y-1 text-left">
            <li>• Önceden yüklenen ilanları görüntüleme</li>
            <li>• Favorilerinize göz atma</li>
            <li>• Profil bilgilerinizi görüntüleme</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
