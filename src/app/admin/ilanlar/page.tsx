'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  MapPin,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  city: string;
  district: string;
  images: string;
  status: string;
  isApproved: boolean;
  isFeatured: boolean;
  viewCount: number;
  favoriteCount: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  category: {
    name: string;
  };
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch('/api/admin/listings');
      const data = await res.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (listingId: string, isApproved: boolean) => {
    try {
      const res = await fetch(`/api/admin/listings/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !isApproved }),
      });
      if (res.ok) {
        fetchListings();
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(search.toLowerCase()) ||
    listing.user.name.toLowerCase().includes(search.toLowerCase()) ||
    listing.city.toLowerCase().includes(search.toLowerCase())
  );

  const parseImages = (images: string) => {
    try {
      return JSON.parse(images);
    } catch {
      return [];
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-800">İlanlar</h1>
          <p className="text-earth-500 mt-1">Toplam {listings.length} ilan</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
            <Input 
              placeholder="İlan ara..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Listings Table */}
      <Card>
        <CardHeader>
          <CardTitle>İlan Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-nature-500 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-8 text-earth-500">
              İlan bulunamadı
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-earth-200">
                    <th className="text-left py-3 px-4 font-medium text-earth-700">İlan</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">Satıcı</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">Fiyat</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">Durum</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => {
                    const images = parseImages(listing.images);
                    return (
                      <tr key={listing.id} className="border-b border-earth-100 hover:bg-earth-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-earth-100 overflow-hidden flex-shrink-0">
                              {images[0] ? (
                                <img src={images[0]} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-earth-400">
                                  <Eye className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-earth-800 line-clamp-1">{listing.title}</p>
                              <div className="flex items-center gap-2 text-xs text-earth-500">
                                <span>{listing.category.name}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {listing.city}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-sm text-earth-600">
                            <User className="h-3.5 w-3.5" />
                            {listing.user.name}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-medium text-earth-800">
                            {formatPrice(listing.price, listing.currency)}
                          </p>
                          <p className="text-xs text-earth-500">
                            {listing.viewCount} görüntülenme
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Badge className={listing.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                              {listing.isApproved ? 'Onaylı' : 'Beklemede'}
                            </Badge>
                            {listing.isFeatured && (
                              <Badge className="bg-harvest-100 text-harvest-700">
                                Öne Çıkan
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => toggleApproval(listing.id, listing.isApproved)}
                              className={listing.isApproved ? 'text-red-500' : 'text-green-500'}
                              title={listing.isApproved ? 'Onayı Kaldır' : 'Onayla'}
                            >
                              {listing.isApproved ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
