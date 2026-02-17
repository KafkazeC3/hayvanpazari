'use client';

import { useState } from 'react';
import Head from 'next/head';
import { NavbarModern } from '@/components/NavbarModern';
import { ListingCardModern } from '@/components/ListingCardModern';
import { FooterModern } from '@/components/FooterModern';
import { mockListings, categories } from '@/data/mockListings';
import { sortedCities, getDistricts } from '@/data/cities';
import { Search, SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';

export default function ListingsPage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const districts = selectedCity ? getDistricts(selectedCity) : [];

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
            <p className="text-green-100">{mockListings.length}+ aktif ilan arasından size uygun olanı bulun</p>
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
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-gray-700"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtrele
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:flex flex-col lg:flex-row gap-4`}>
                <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-w-[180px]">
                  <option value="">Tüm Kategoriler</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
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

                <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none min-w-[150px]">
                  <option value="">Sıralama</option>
                  <option value="newest">En Yeni</option>
                  <option value="price_asc">Fiyat: Düşük-Yüksek</option>
                  <option value="price_desc">Fiyat: Yüksek-Düşük</option>
                </select>
              </div>
            </div>

            {/* Active Filters & View Toggle */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{mockListings.length}</span> ilan bulundu
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
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {mockListings.map((listing) => (
              <ListingCardModern key={listing.id} {...listing} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
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
        </div>

        <FooterModern />
      </div>
    </>
  );
}
