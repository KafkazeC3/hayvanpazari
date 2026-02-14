'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Listing } from '@/types';
import { listings as mockListings } from '@/data/mockData';

interface FavoritesContextType {
  favorites: string[];
  favoriteListings: Listing[];
  isLoading: boolean;
  addFavorite: (listingId: string) => Promise<void>;
  removeFavorite: (listingId: string) => Promise<void>;
  toggleFavorite: (listingId: string) => Promise<void>;
  isFavorite: (listingId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Kullanıcı giriş yapmışsa localStorage'dan, değilse boş dizi
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const storageKey = `favorites_${session.user.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFavorites(parsed.favorites || []);
        } catch (error) {
          console.error('Favorites load error:', error);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [session, status]);

  // Favorileri kaydet
  const saveFavorites = useCallback((newFavorites: string[]) => {
    if (status === 'authenticated' && session?.user?.id) {
      const storageKey = `favorites_${session.user.id}`;
      localStorage.setItem(storageKey, JSON.stringify({ favorites: newFavorites }));
    }
  }, [session, status]);

  const addFavorite = useCallback(async (listingId: string) => {
    if (status !== 'authenticated') return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newFavorites = [...favorites, listingId];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    } finally {
      setIsLoading(false);
    }
  }, [favorites, saveFavorites, status]);

  const removeFavorite = useCallback(async (listingId: string) => {
    if (status !== 'authenticated') return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const newFavorites = favorites.filter(id => id !== listingId);
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    } finally {
      setIsLoading(false);
    }
  }, [favorites, saveFavorites, status]);

  const toggleFavorite = useCallback(async (listingId: string) => {
    if (status !== 'authenticated') return;
    
    if (favorites.includes(listingId)) {
      await removeFavorite(listingId);
    } else {
      await addFavorite(listingId);
    }
  }, [favorites, addFavorite, removeFavorite, status]);

  const isFavorite = useCallback((listingId: string) => {
    return favorites.includes(listingId);
  }, [favorites]);

  const favoriteListings = mockListings.filter(listing => favorites.includes(listing.id));

  const value: FavoritesContextType = {
    favorites,
    favoriteListings,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
