import Link from 'next/link';
import { Search, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Sayfa Bulunamadı | HayvanPazarı.com',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-earth-50/30">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-nature-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-nature-100 flex items-center justify-center">
              <Search className="h-12 w-12 text-nature-500" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-earth-800 mb-3">
          Sayfa Bulunamadı
        </h1>
        
        <p className="text-earth-500 mb-8 text-lg">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </p>
        
        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/ilanlar">
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-earth-100">
              <h3 className="font-semibold text-earth-800 mb-1">İlanları Gör</h3>
              <p className="text-sm text-earth-500">Tüm ilanları keşfedin</p>
            </div>
          </Link>
          <Link href="/ilan-ver">
            <div className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-earth-100">
              <h3 className="font-semibold text-earth-800 mb-1">İlan Ver</h3>
              <p className="text-sm text-earth-500">Ücretsiz ilan oluşturun</p>
            </div>
          </Link>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Geri Git
          </Button>
          
          <Link href="/">
            <Button className="gradient-nature text-white gap-2">
              <Home className="h-4 w-4" />
              Anasayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
