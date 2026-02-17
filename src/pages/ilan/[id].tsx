'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Eye, Heart, Share2, Phone, MessageCircle, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { listings } from '@/data/mockData';
import { formatPrice, formatDate, getInitials } from '@/lib/utils';

export default function ListingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-earth-800 mb-4">İlan Bulunamadı</h1>
          <Link href="/ilanlar"><Button className="gradient-nature">İlanlara Dön</Button></Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-earth-50/30">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-earth-500 mb-6">
          <Link href="/" className="hover:text-nature-600">Anasayfa</Link><span>/</span>
          <Link href="/ilanlar" className="hover:text-nature-600">İlanlar</Link><span>/</span>
          <span className="text-earth-800">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-card">
              <div className="relative aspect-[16/10] bg-earth-100">
                <img src={listing.images[currentImageIndex]} alt={listing.title} className="w-full h-full object-cover" />
                {listing.images.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></button>
                    <button onClick={() => setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><ChevronRight className="h-5 w-5" /></button>
                  </>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => setIsFavorite(!isFavorite)} className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-earth-600'}`} /></button>
                  <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center"><Share2 className="h-5 w-5 text-earth-600" /></button>
                </div>
              </div>
              {listing.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {listing.images.map((img, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-nature-500' : 'border-transparent'}`}>
                      <img src={img} alt={`${listing.title} - ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-earth-800 mb-2">{listing.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-earth-500">
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{listing.location.city}, {listing.location.district}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(listing.createdAt)}</span>
                    <span className="flex items-center gap-1"><Eye className="h-4 w-4" />{listing.viewCount} görüntülenme</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-nature-600">{formatPrice(listing.price)}</div>
                  <Badge className="mt-2">{listing.status === 'active' ? 'Aktif' : 'Pasif'}</Badge>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-earth-800 mb-3">Açıklama</h2>
                <p className="text-earth-600 leading-relaxed">{listing.description}</p>
              </div>
              {listing.features.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h2 className="text-lg font-semibold text-earth-800 mb-4">Özellikler</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {listing.features.map((feature) => (
                        <div key={feature.key} className="flex items-center gap-3 p-3 rounded-xl bg-earth-50">
                          <div className="w-8 h-8 rounded-lg bg-nature-100 flex items-center justify-center"><span className="text-nature-600 text-xs">✓</span></div>
                          <div><p className="text-xs text-earth-500">{feature.label}</p><p className="font-medium text-earth-800">{feature.value}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="sticky top-24 bg-white rounded-2xl p-6 shadow-card">
              <h3 className="text-lg font-semibold text-earth-800 mb-4">Satıcı Bilgileri</h3>
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="w-16 h-16 border-2 border-nature-200"><AvatarImage src={listing.seller.avatar} /><AvatarFallback className="bg-nature-100 text-nature-700 text-xl">{getInitials(listing.seller.name)}</AvatarFallback></Avatar>
                <div>
                  <h4 className="font-semibold text-earth-800">{listing.seller.name}</h4>
                  <div className="flex items-center gap-2 text-sm"><span className="text-harvest-500">★</span><span className="font-medium">{listing.seller.rating}</span><span className="text-earth-400">({listing.seller.reviewCount})</span></div>
                </div>
              </div>
              <div className="space-y-3 text-sm text-earth-600 mb-6">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-earth-400" />{listing.seller.location.city}</div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-earth-400" />Üyelik: {new Date(listing.seller.memberSince).getFullYear()}</div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild><Button className="w-full gradient-nature gap-2"><MessageCircle className="h-4 w-4" />Mesaj Gönder</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>Mesaj Gönder</DialogTitle></DialogHeader>
                    <div className="space-y-4 pt-4"><textarea className="w-full h-32 p-4 rounded-xl border border-earth-200 resize-none" placeholder="Mesajınızı yazın..." /><Button className="w-full gradient-nature">Gönder</Button></div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" className="w-full gap-2"><Phone className="h-4 w-4" />{listing.seller.phone}</Button>
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-earth-400 hover:text-red-500"><Flag className="h-4 w-4" />İlanı Şikayet Et</button>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
