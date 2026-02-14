'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Heart, MapPin, Eye, Calendar, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPrice, formatDate } from '@/lib/utils';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';

interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description?: string;
    price: number;
    city?: string;
    district?: string;
    images: string | string[];
    viewCount: number;
    createdAt: string;
    category?: { name: string };
    user?: { name: string; avatar?: string | null; isVerified?: boolean };
    status?: string;
  };
  variant?: 'default' | 'compact' | 'horizontal';
  viewMode?: 'grid' | 'list';
  showFavorite?: boolean;
}

export function ListingCard({
  listing,
  variant = 'default',
  viewMode = 'grid',
  showFavorite = true,
}: ListingCardProps) {
  const { data: session } = useSession();
  const { isFavorite, toggleFavorite, isLoading } = useFavorites();

  const isAuthenticated = !!session?.user;
  const favorite = isFavorite(listing.id);

  // İlk resmi al
  let images: string[] = [];
  if (listing.images) {
    if (Array.isArray(listing.images)) {
      images = listing.images;
    } else {
      try {
        images = JSON.parse(listing.images);
      } catch {
        images = [listing.images];
      }
    }
  }
  const firstImage = images[0] || '/placeholder.jpg';

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = '/giris?callbackUrl=' + window.location.pathname;
      return;
    }

    await toggleFavorite(listing.id);
  };

  // Liste görünümü
  if (viewMode === 'list') {
    return (
      <Link href={`/ilan/${listing.id}`}>
        <div className="flex gap-4 p-4 bg-white rounded-xl border border-earth-200 hover:border-nature-300 hover:shadow-md transition-all">
          <div className="w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={firstImage}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-earth-800 truncate">
                  {listing.title}
                </h3>
                <p className="text-sm text-earth-500 mt-1">
                  {listing.category?.name}
                </p>
              </div>
              <p className="text-lg font-bold text-nature-600">
                {formatPrice(listing.price)}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-3 text-sm text-earth-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {listing.city}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {listing.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(listing.createdAt)}
              </span>
            </div>
          </div>
          {showFavorite && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={cn('flex-shrink-0', favorite && 'text-red-500')}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Heart className={cn('h-5 w-5', favorite && 'fill-current')} />
              )}
            </Button>
          )}
        </div>
      </Link>
    );
  }

  // Grid görünümü (varsayılan)
  return (
    <Link href={`/ilan/${listing.id}`}>
      <div className="group bg-white rounded-xl border border-earth-200 overflow-hidden hover:border-nature-300 hover:shadow-lg transition-all duration-300">
        {/* Resim */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={firstImage}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Favori butonu */}
          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={cn(
                'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all',
                favorite
                  ? 'bg-red-50 text-red-500'
                  : 'bg-white/90 text-earth-400 hover:text-red-500'
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart className={cn('h-4 w-4', favorite && 'fill-current')} />
              )}
            </button>
          )}

          {/* Fiyat */}
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-nature-600 text-white text-sm px-3 py-1">
              {formatPrice(listing.price)}
            </Badge>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-4">
          <h3 className="font-semibold text-earth-800 line-clamp-2 group-hover:text-nature-600 transition-colors">
            {listing.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 text-sm text-earth-500">
            <MapPin className="h-4 w-4" />
            <span>
              {listing.city}
              {listing.district && `, ${listing.district}`}
            </span>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-earth-100 text-xs text-earth-400">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {listing.viewCount}
            </span>
            <span>{formatDate(listing.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
