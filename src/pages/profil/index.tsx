'use client';



import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Calendar, Edit2, Camera, CheckCircle, Star, Package, Heart, MessageCircle, Settings } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { currentUser, listings } from '@/data/mockData';
import { getInitials } from '@/lib/utils';
import { ListingCard } from '@/components/listings/ListingCard';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('listings');
  const userListings = listings.filter((l) => l.seller.id === 's1');
  const favoriteListings = listings.filter((l) => currentUser.favorites.includes(l.id));

  return (
    <main className="min-h-screen bg-earth-50/30">
      <Navbar />
      <div className="h-48 md:h-64 bg-gradient-to-r from-nature-600 to-nature-700 relative">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      </div>

      <div className="container mx-auto px-4 -mt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="relative w-28 h-28 mx-auto mb-4">
                <Avatar className="w-28 h-28 border-4 border-white shadow-lg"><AvatarImage src={currentUser.avatar} /><AvatarFallback className="bg-nature-100 text-nature-700 text-3xl">{getInitials(currentUser.name)}</AvatarFallback></Avatar>
                <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-nature-500 text-white flex items-center justify-center"><Camera className="h-4 w-4" /></button>
              </div>
              <div className="text-center mb-6">
                <h1 className="text-xl font-bold text-earth-800">{currentUser.name}</h1>
                <p className="text-earth-500 text-sm">{currentUser.email}</p>
                {currentUser.isVerified && <Badge className="mt-2 bg-nature-100 text-nature-700"><CheckCircle className="h-3 w-3 mr-1" />Doğrulanmış</Badge>}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center"><div className="text-xl font-bold text-earth-800">{userListings.length}</div><div className="text-xs text-earth-500">İlan</div></div>
                <div className="text-center"><div className="text-xl font-bold text-earth-800">{currentUser.favorites.length}</div><div className="text-xs text-earth-500">Favori</div></div>
                <div className="text-center"><div className="text-xl font-bold text-earth-800">4.8</div><div className="text-xs text-earth-500">Puan</div></div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-earth-600"><Phone className="h-4 w-4 text-earth-400" />{currentUser.phone}</div>
                <div className="flex items-center gap-3 text-earth-600"><MapPin className="h-4 w-4 text-earth-400" />{currentUser.location.city}</div>
                <div className="flex items-center gap-3 text-earth-600"><Calendar className="h-4 w-4 text-earth-400" />Üyelik: {new Date(currentUser.memberSince).getFullYear()}</div>
              </div>
              <Button variant="outline" className="w-full mt-6 gap-2"><Edit2 className="h-4 w-4" />Profili Düzenle</Button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-card mt-4">
              <nav className="space-y-1">
                {[{ id: 'listings', icon: Package, label: 'İlanlarım' }, { id: 'favorites', icon: Heart, label: 'Favorilerim' }, { id: 'messages', icon: MessageCircle, label: 'Mesajlarım' }, { id: 'settings', icon: Settings, label: 'Ayarlar' }].map((item) => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === item.id ? 'bg-nature-50 text-nature-700' : 'text-earth-600 hover:bg-earth-50'}`}>
                    <item.icon className="h-4 w-4" />{item.label}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-3">
            {activeTab === 'listings' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-earth-800">İlanlarım</h2>
                  <Link href="/ilan-ver"><Button className="gradient-nature gap-2"><Package className="h-4 w-4" />Yeni İlan</Button></Link>
                </div>
                {userListings.length === 0 ? (
                  <div className="text-center py-12"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-earth-100 flex items-center justify-center"><Package className="h-8 w-8 text-earth-400" /></div><h3 className="text-lg font-semibold text-earth-800 mb-2">Henüz İlanınız Yok</h3><Link href="/ilan-ver"><Button className="gradient-nature">İlan Ver</Button></Link></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{userListings.map((listing) => <ListingCard key={listing.id} listing={listing} variant="compact" showFavorite={false} />)}</div>
                )}
              </div>
            )}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold text-earth-800 mb-6">Favorilerim</h2>
                {favoriteListings.length === 0 ? (
                  <div className="text-center py-12"><div className="w-16 h-16 mx-auto mb-4 rounded-full bg-earth-100 flex items-center justify-center"><Heart className="h-8 w-8 text-earth-400" /></div><h3 className="text-lg font-semibold text-earth-800 mb-2">Henüz Favori İlanınız Yok</h3><Link href="/ilanlar"><Button className="gradient-nature">İlanlara Göz At</Button></Link></div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{favoriteListings.map((listing) => <ListingCard key={listing.id} listing={listing} variant="compact" showFavorite={true} />)}</div>
                )}
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-bold text-earth-800 mb-6">Hesap Ayarları</h2>
                <div className="space-y-6">
                  <div><label className="block text-sm font-medium text-earth-700 mb-2">Ad Soyad</label><Input defaultValue={currentUser.name} /></div>
                  <div><label className="block text-sm font-medium text-earth-700 mb-2">E-posta</label><Input defaultValue={currentUser.email} type="email" /></div>
                  <div><label className="block text-sm font-medium text-earth-700 mb-2">Telefon</label><Input defaultValue={currentUser.phone} /></div>
                  <div className="flex gap-3"><Button variant="outline">İptal</Button><Button className="gradient-nature">Kaydet</Button></div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
