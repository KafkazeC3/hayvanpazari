'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories, cities } from '@/data/mockData';

const quickCategories = [
  { id: '1', name: 'Büyükbaş', color: 'bg-nature-100 text-nature-600' },
  { id: '2', name: 'Küçükbaş', color: 'bg-harvest-100 text-harvest-600' },
  { id: '3', name: 'Yem & Saman', color: 'bg-earth-100 text-earth-600' },
  { id: '4', name: 'Ekipman', color: 'bg-blue-100 text-blue-600' },
];

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedCategory) params.append('category', selectedCategory);
    window.location.href = `/ilanlar?${params.toString()}`;
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-nature-900/90 via-nature-800/85 to-earth-900/90" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80')` }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-harvest-400 animate-pulse" />
              Türkiye&apos;nin En Büyük Hayvan Pazarı
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Hayvan Alım Satımının<span className="block text-harvest-300">En Kolay Yolu</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Büyükbaş, küçükbaş hayvanlar, yem, saman ve çiftlik ekipmanları için güvenilir ilan platformu.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                <Input type="text" placeholder="Ne arıyorsunuz?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 h-14 bg-earth-50 border-earth-200 rounded-xl" />
              </div>
              <div className="md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-14"><SelectValue placeholder="Kategori" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:w-48">
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="h-14">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-earth-400" /><SelectValue placeholder="Şehir" /></div>
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {cities.slice(0, 20).map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSearch} className="h-14 px-8 gradient-harvest text-white rounded-xl font-semibold gap-2">
                <Search className="h-5 w-5" />Ara
              </Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8">
            <p className="text-white/60 text-sm mb-4">Popüler Kategoriler</p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickCategories.map((cat) => {
                return (
                  <Link key={cat.id} href={`/ilanlar?category=${cat.id}`} className="group">
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors">
                      <div className={`w-8 h-8 rounded-full ${cat.color} flex items-center justify-center text-xs font-bold`}>
                        {cat.name.charAt(0)}
                      </div>
                      <span className="text-white font-medium text-sm">{cat.name}</span>
                      <ChevronDown className="h-3 w-3 text-white/50 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[{ value: '5.000+', label: 'Aktif İlan' }, { value: '3.000+', label: 'Mutlu Kullanıcı' }, { value: '81', label: 'Şehir' }].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
