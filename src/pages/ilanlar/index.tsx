'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NavbarModern } from '@/components/NavbarModern';
import { ListingCardModern } from '@/components/ListingCardModern';
import { FooterModern } from '@/components/FooterModern';
import { mockListings, categories } from '@/data/mockListings';
import { sortedCities, getDistricts } from '@/data/cities';
import { Search, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react';

export default function ListingsPage() {
  const router = useRouter();
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const districts = selectedCity ? getDistricts(selectedCity) : [];

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...mockListings];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(l => 
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (selectedCategory) {
      result = result.filter(l => l.category === selectedCategory);
    }
    
    // City filter
    if (selectedCity) {
      result = result.filter(l => l.city === selectedCity);
    }
    
    // District filter
    if (selectedDistrict) {
      result = result.filter(l => l.district === selectedDistrict);
    }
    
    // Price filter
    if (minPrice) {
      result = result.filter(l => l.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      result = result.filter(l => l.price <= parseInt(maxPrice));
    }
    
    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    
    return result;
  }, [searchQuery, selectedCategory, selectedCity, selectedDistrict, minPrice, maxPrice, sortBy]);

  const activeFiltersCount = [
    selectedCategory, selectedCity, selectedDistrict, minPrice, maxPrice
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCity('');
    setSelectedDistrict('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setSelectedDistrict('');
  };

  return (
    <>
      <Head>
        <title>İlanlar | HayvanPazarı.com</title>
        <meta name="description" content="Satılık hayvan ilanları" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavbarModern />

        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">İlanlar</h1>
            <p className="text-green-100">{filteredListings.length} aktif ilan arasından size uygun olanı bulun</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
            {/* Search & Main Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="İlan ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-700"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtrele
                {activeFiltersCount > 0 && (
                  <span className="bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:flex flex-col lg:flex-row gap-4`}>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-w-[180px]"
                >
                  <option value="">Tüm Kategoriler</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>

                <select 
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-w-[180px]"
                >
                  <option value="">Tüm Şehirler</option>
                  {sortedCities.map(city => (
                    <option key={city.id} value={city.name}>{city.name}</option>
                  ))}
                </select>

                <select 
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedCity}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-w-[180px] disabled:bg-gray-100"
                >
                  <option value="">Tüm İlçeler</option>
                  {districts.map(district => (
                    <option key={district.id} value={district.name}>{district.name}</option>
                  ))}
                </select>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-w-[150px]"
                >
                  <option value="newest">En Yeni</option>
                  <option value="price_asc">Fiyat: Düşük-Yüksek</option>
                  <option value="price_desc">Fiyat: Yüksek-Düşük</option>
                </select>
              </div>
            </div>

            {/* Price Range & Advanced Filters */}
            <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:flex items-center gap-4 pt-4 border-t border-gray-100`}>
              <span className="text-sm text-gray-500">Fiyat Aralığı:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min TL"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max TL"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="ml-auto flex items-center gap-1 text-red-500 hover:text-red-600 text-sm font-medium"
                >
                  <X className="w-4 h-4" />
                  Filtreleri Temizle
                </button>
              )}
            </div>

            {/* Active Filters & View Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">
                  <span className="font-medium">{filteredListings.length}</span> ilan bulundu
                </span>
                
                {/* Active filter badges */}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedCity && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    {selectedCity}
                    <button onClick={() => setSelectedCity('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedDistrict && (
                  <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                    {selectedDistrict}
                    <button onClick={() => setSelectedDistrict('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {(minPrice || maxPrice) && (
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                    {minPrice || '0'} - {maxPrice || '∞'} TL
                    <button onClick={() => { setMinPrice(''); setMaxPrice(''); }}><X className="w-3 h-3" /></button>
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">İlan Bulunamadı</h2>
              <p className="text-gray-600 mb-6">Arama kriterlerinize uygun ilan bulunmamaktadır.</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                <X className="w-5 h-5" />
                Filtreleri Temizle
              </button>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
              {filteredListings.map((listing) => (
                <ListingCardModern key={listing.id} {...listing} />
              ))}
            </div>
          )}

          {/* Pagination - Only show if results exist */}
          {filteredListings.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                  Önceki
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  3
                </button>
                <span className="px-2 text-gray-400">...</span>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  Sonraki
                </button>
              </div>
            </div>
          )}
        </div>

        <FooterModern />
      </div>
    </>
  );
}
