'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFilters {
  query: string;
  minPrice: number;
  maxPrice: number;
  hasPhoto: boolean;
  isVerified: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}

export function AdvancedSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    minPrice: 0,
    maxPrice: 100000,
    hasPhoto: false,
    isVerified: false,
    sortBy: 'newest',
  });

  const sortOptions = [
    { value: 'newest', label: 'En Yeni' },
    { value: 'price_asc', label: 'Fiyat: Düşükten Yükseğe' },
    { value: 'price_desc', label: 'Fiyat: Yüksekten Düşüğe' },
    { value: 'popular', label: 'En Çok Görüntülenen' },
  ];

  const activeFiltersCount = [
    filters.minPrice > 0,
    filters.maxPrice < 100000,
    filters.hasPhoto,
    filters.isVerified,
  ].filter(Boolean).length;

  return (
    <div className="w-full">
      {/* Temel Arama */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
          <Input
            type="text"
            placeholder="İlan ara..."
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            className="pl-10 h-12"
          />
        </div>
        <Button
          variant="outline"
          className="h-12 px-4 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal className="h-5 w-5 mr-2" />
          Filtrele
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-harvest-500 text-white text-xs rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </div>

      {/* Gelişmiş Filtreler */}
      {isOpen && (
        <Card className="mt-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Fiyat Aralığı */}
            <div>
              <label className="text-sm font-medium text-earth-700 mb-2 block">
                Fiyat Aralığı (TL)
              </label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                  className="h-10"
                />
                <span className="text-earth-400 self-center">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                  className="h-10"
                />
              </div>
            </div>

            {/* Sıralama */}
            <div>
              <label className="text-sm font-medium text-earth-700 mb-2 block">
                Sıralama
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                className="w-full h-10 rounded-md border border-input bg-background px-3"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox Filtreler */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.hasPhoto}
                  onCheckedChange={(checked) => 
                    setFilters({ ...filters, hasPhoto: checked as boolean })
                  }
                />
                <span className="text-sm text-earth-700">Sadece fotoğraflı ilanlar</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={filters.isVerified}
                  onCheckedChange={(checked) => 
                    setFilters({ ...filters, isVerified: checked as boolean })
                  }
                />
                <span className="text-sm text-earth-700">Onaylı satıcılar</span>
              </label>
            </div>
          </div>

          {/* Filtreleri Temizle */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({
                  query: '',
                  minPrice: 0,
                  maxPrice: 100000,
                  hasPhoto: false,
                  isVerified: false,
                  sortBy: 'newest',
                })}
                className="text-earth-500"
              >
                <X className="h-4 w-4 mr-1" />
                Filtreleri Temizle
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
