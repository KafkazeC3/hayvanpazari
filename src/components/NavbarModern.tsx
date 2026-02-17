'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Menu, 
  X, 
  PlusCircle, 
  Heart, 
  User, 
  MessageCircle,
  LogOut,
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';

export function NavbarModern() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock auth - ileride gerçek auth ile değiştirilecek
  const isAuthenticated = false; 
  const user = null;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-xl">
                🐄
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">
                Hayvan<span className="text-green-600">Pazarı</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Anasayfa
            </Link>
            <Link href="/ilanlar" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              İlanlar
            </Link>
            <Link href="/kategoriler" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Kategoriler
            </Link>
            <Link href="/hakkimizda" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Hakkımızda
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <Link 
              href="/ilanlar"
              className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Add Listing Button */}
            <Link 
              href="/ilan-ver"
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full font-medium hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
            >
              <PlusCircle className="w-4 h-4" />
              <span>İlan Ver</span>
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <Link href="/profil" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                      <User className="w-4 h-4" />
                      Profilim
                    </Link>
                    <Link href="/profil" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                      <LayoutDashboard className="w-4 h-4" />
                      İlanlarım
                    </Link>
                    <Link href="/profil" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      Favoriler
                    </Link>
                    <Link href="/profil" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Mesajlar
                    </Link>
                    <hr className="my-2" />
                    <button className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full transition-colors">
                      <LogOut className="w-4 h-4" />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/giris"
                  className="text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-full hover:bg-green-50 transition-all"
                >
                  Giriş Yap
                </Link>
                <Link 
                  href="/kayit"
                  className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-all"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
              Anasayfa
            </Link>
            <Link href="/ilanlar" className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
              İlanlar
            </Link>
            <Link href="/kategoriler" className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
              Kategoriler
            </Link>
            <Link href="/hakkimizda" className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors">
              Hakkımızda
            </Link>
            <hr className="my-2" />
            <Link href="/ilan-ver" className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
              <PlusCircle className="w-4 h-4" />
              İlan Ver
            </Link>
            <Link href="/giris" className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Giriş Yap
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
