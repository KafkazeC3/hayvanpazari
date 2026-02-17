'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  listingId: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'overlay';
}

export function FavoriteButton({ listingId, size = 'md', variant = 'default' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();
  
  if (!mounted) {
    return (
      <div className={`animate-pulse bg-gray-200 rounded-full ${size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'}`} />
    );
  }

  const favorited = isFavorite(listingId);
  
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'overlay') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(listingId);
        }}
        className={`
          ${sizeClasses[size]} 
          bg-white/90 backdrop-blur-sm rounded-full 
          flex items-center justify-center 
          transition-all duration-200 shadow-sm
          hover:scale-110 hover:bg-white
          ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
        `}
        title={favorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      >
        <Heart 
          className={`${iconSizes[size]} ${favorited ? 'fill-current' : ''}`} 
        />
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(listingId);
      }}
      className={`
        ${sizeClasses[size]} 
        rounded-full flex items-center justify-center 
        transition-all duration-200
        border
        ${favorited 
          ? 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100' 
          : 'bg-white border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'
        }
      `}
      title={favorited ? 'Favorilerden çıkar' : 'Favorilere ekle'}
    >
      <Heart 
        className={`${iconSizes[size]} ${favorited ? 'fill-current' : ''}`} 
      />
    </button>
  );
}
