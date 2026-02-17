'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Camera, User, Search } from 'lucide-react';

export function MobileBottomNav() {
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {/* Ana Sayfa */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
            isActive('/') 
              ? 'text-green-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Home className="w-6 h-6" strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Ana Sayfa</span>
        </Link>

        {/* Ara */}
        <Link
          href="/ilanlar"
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
            isActive('/ilanlar') 
              ? 'text-green-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Search className="w-6 h-6" strokeWidth={isActive('/ilanlar') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Ara</span>
        </Link>

        {/* Hızlı İlan (Kamera) - Ortada büyük buton */}
        <Link
          href="/ilan-ver"
          className="relative -top-4 flex flex-col items-center"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all active:scale-95">
            <Camera className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <span className="text-[10px] font-medium text-gray-500 mt-1">İlan Ver</span>
        </Link>

        {/* Profil */}
        <Link
          href="/profil"
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
            isActive('/profil') 
              ? 'text-green-600' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <User className="w-6 h-6" strokeWidth={isActive('/profil') ? 2.5 : 2} />
          <span className="text-[10px] font-medium">Profilim</span>
        </Link>
      </div>
    </nav>
  );
}
