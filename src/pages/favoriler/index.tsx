'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useUI } from '@/contexts/UIContext';
import { useAuth } from '@/contexts/AuthContext';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function FavoritesPage() {
  const { isAuthenticated } = useAuth();
  const { favoriteListings, removeFavorite, isLoading } = useFavorites();
  const { showToast } = useUI();

  const handleClearAll = async () => {
    if (confirm('Tüm favorilerinizi silmek istediğinize emin misiniz?')) {
      // Her bir favoriyi sırayla kaldır
      for (const listing of favoriteListings) {
        await removeFavorite(listing.id);
      }
      showToast('Tüm favoriler silindi', 'info');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-earth-100 flex items-center justify-center">
              <Heart className="h-10 w-10 text-earth-400" />
            </div>
            <h1 className="text-2xl font-bold text-earth-800 mb-2">
              Giriş Yapın
            </h1>
            <p className="text-earth-500 mb-6">
              Favorilerinizi görmek için giriş yapmalısınız.
            </p>
            <Link href="/giris">
              <Button className="gradient-nature text-white gap-2">
                Giriş Yap <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Favorilerim</h1>
              <p className="text-white/80">
                {favoriteListings.length} ilan favorilerinizde
              </p>
            </div>
            {favoriteListings.length > 0 && (
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 gap-2"
                onClick={handleClearAll}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4" />
                Tümünü Temizle
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {favoriteListings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-earth-100 flex items-center justify-center">
                <Heart className="h-12 w-12 text-earth-400" />
              </div>
              <h2 className="text-xl font-bold text-earth-800 mb-2">
                Henüz Favori İlanınız Yok
              </h2>
              <p className="text-earth-500 mb-6">
                Beğendiğiniz ilanları favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz.
              </p>
              <Link href="/ilanlar">
                <Button className="gradient-nature text-white gap-2">
                  İlanları Keşfet <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favoriteListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
