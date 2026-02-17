'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, Grid3X3, List, X, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  city: string;
  district: string;
  images: string;
  viewCount: number;
  createdAt: string;
  category: { name: string };
  user: { name: string; avatar: string | null; isVerified: boolean };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Konya', 'Adana', 'Kayseri'];
const sortOptions = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'price_asc', label: 'Fiyat: Düşükten Yükseğe' },
  { value: 'price_desc', label: 'Fiyat: Yüksekten Düşüğe' },
  { value: 'popular', label: 'En Çok Görüntülenen' },
];

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || '';

  const [listings, setListings] = useState<Listing[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    query: initialQuery,
    categoryId: initialCategory,
    city: initialCity,
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
  });

  // İlanları getir
  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('limit', '20');
      if (filters.query) params.set('q', filters.query);
      if (filters.categoryId) params.set('categoryId', filters.categoryId);
      if (filters.city) params.set('city', filters.city);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      params.set('sortBy', filters.sortBy);

      const response = await fetch(`/api/listings?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setListings(data.listings);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const activeFiltersCount = [
    filters.categoryId,
    filters.city,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({
      query: '',
      categoryId: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest',
    });
  };

  return (
    <main className="min-h-screen bg-earth-50/30">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-earth-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-earth-800">İlanlar</h1>
              <p className="text-earth-500 mt-1">
                {pagination?.total || 0} ilan bulundu
              </p>
            </div>

            {/* Arama */}
            <div className="flex gap-2 max-w-xl w-full">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                <Input
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                  placeholder="İlan ara..."
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtrele
                {activeFiltersCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Filtreler */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t"
            >
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Şehir */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-1 block">Şehir</label>
                    <Select
                      value={filters.city}
                      onValueChange={(v) => setFilters({ ...filters, city: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tümü" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Min Fiyat */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-1 block">Min Fiyat</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                  </div>

                  {/* Max Fiyat */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-1 block">Max Fiyat</label>
                    <Input
                      type="number"
                      placeholder="∞"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                  </div>

                  {/* Sıralama */}
                  <div>
                    <label className="text-sm font-medium text-earth-700 mb-1 block">Sıralama</label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(v) => setFilters({ ...filters, sortBy: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Temizle */}
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      onClick={clearFilters}
                      disabled={activeFiltersCount === 0}
                      className="w-full"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Temizle
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-earth-100 flex items-center justify-center">
              <Search className="h-8 w-8 text-earth-400" />
            </div>
            <h3 className="text-lg font-semibold text-earth-800">İlan bulunamadı</h3>
            <p className="text-earth-500 mt-1">Farklı filtreler deneyin</p>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
