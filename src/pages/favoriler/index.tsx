'use client';

import Head from 'next/head';
import Link from 'next/link';
import { NavbarModern } from '@/components/NavbarModern';
import { FooterModern } from '@/components/FooterModern';
import { ListingCardModern } from '@/components/ListingCardModern';
import { useFavorites } from '@/hooks/useFavorites';
import { mockListings } from '@/data/mockListings';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, favoritesCount, clearFavorites, mounted } = useFavorites();
  
  const favoriteListings = mockListings.filter(listing => favorites.includes(listing.id));

  return (
    <>
      <Head>
        <title>Favorilerim | HayvanPazarı.com</title>
        <meta name="description" content="Favori ilanlarınızı görüntüleyin ve yönetin" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavbarModern />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Favorilerim</h1>
                <p className="text-gray-600">
                  {mounted ? `${favoritesCount} ilan favorilerinizde` : 'Yükleniyor...'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          {!mounted ? (
            // Loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : favoriteListings.length === 0 ? (
            // Empty state
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Henüz Favori İlanınız Yok
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Beğendiğiniz ilanları favorilere ekleyerek daha sonra kolayca erişebilirsiniz.
              </p>
              <Link
                href="/ilanlar"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                İlanlara Göz At
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            // Favorites grid
            <>
              {/* Actions bar */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{favoriteListings.length}</span> ilan listeleniyor
                </p>
                <button
                  onClick={clearFavorites}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Tümünü Temizle
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {favoriteListings.map((listing) => (
                  <ListingCardModern key={listing.id} {...listing} />
                ))}
              </div>

              {/* Browse more */}
              <div className="mt-12 text-center">
                <p className="text-gray-600 mb-4">Daha fazla ilan keşfetmek ister misiniz?</p>
                <Link
                  href="/ilanlar"
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
                >
                  Tüm İlanları Gör
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </>
          )}
        </main>

        <FooterModern />
      </div>
    </>
  );
}
