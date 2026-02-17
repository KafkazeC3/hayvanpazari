'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { NavbarModern } from '@/components/NavbarModern';
import { FooterModern } from '@/components/FooterModern';
import { useFavorites } from '@/hooks/useFavorites';
import { useMessages } from '@/hooks/useMessages';
import { mockListings } from '@/data/mockListings';
import { 
  LayoutGrid, 
  Heart, 
  MessageCircle, 
  Settings, 
  Plus, 
  Eye, 
  Edit2, 
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';

// Mock user listings with status
const userListings = mockListings.slice(0, 3).map(l => ({
  ...l,
  status: 'ACTIVE' as const,
  viewCount: Math.floor(Math.random() * 500) + 50,
  favoriteCount: Math.floor(Math.random() * 20) + 1,
}));

type ListingStatus = 'ACTIVE' | 'PASSIVE' | 'SOLD';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState(userListings);
  const { favorites, favoritesCount } = useFavorites();
  const { getConversations, unreadCount } = useMessages();
  
  const favoriteListings = mockListings.filter(l => favorites.includes(l.id));
  const conversations = getConversations();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  const getStatusBadge = (status: ListingStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
            <CheckCircle className="w-3 h-3" />
            Aktif
          </span>
        );
      case 'PASSIVE':
        return (
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
            <XCircle className="w-3 h-3" />
            Pasif
          </span>
        );
      case 'SOLD':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
            <Package className="w-3 h-3" />
            Satıldı
          </span>
        );
    }
  };

  const handleDeleteListing = (id: string) => {
    if (confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: ListingStatus) => {
    setListings(prev => prev.map(l => 
      l.id === id ? { ...l, status: newStatus } : l
    ));
  };

  const menuItems = [
    { id: 'listings', label: 'İlanlarım', icon: LayoutGrid, count: listings.length, href: '#listings' },
    { id: 'favorites', label: 'Favorilerim', icon: Heart, count: favoritesCount, href: '#favorites' },
    { id: 'messages', label: 'Mesajlarım', icon: MessageCircle, count: unreadCount, href: '#messages' },
    { id: 'settings', label: 'Ayarlar', icon: Settings, href: '#settings' },
  ];

  return (
    <>
      <Head>
        <title>Profilim | HayvanPazarı.com</title>
        <meta name="description" content="Profilim ve ilanlarım" />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <NavbarModern />
        
        {/* Cover */}
        <div className="h-48 bg-gradient-to-r from-green-500 to-green-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 -mt-20">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                  AY
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Ahmet Yılmaz</h2>
                <p className="text-gray-500 text-sm mb-3">ahmet@email.com</p>
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Doğrulanmış
                </span>
                
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{listings.length}</div>
                    <div className="text-xs text-gray-500">İlan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">{favoritesCount}</div>
                    <div className="text-xs text-gray-500">Favori</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">4.8</div>
                    <div className="text-xs text-gray-500">Puan</div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors ${
                      activeTab === item.id 
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-500 font-semibold' 
                        : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        activeTab === item.id ? 'bg-green-200 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Listings Tab */}
              {activeTab === 'listings' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">İlanlarım</h2>
                    <Link 
                      href="/ilan-ver"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Yeni İlan
                    </Link>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {listings.reduce((acc, l) => acc + l.viewCount, 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">Toplam Görüntülenme</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {listings.reduce((acc, l) => acc + l.favoriteCount, 0)}
                          </div>
                          <div className="text-sm text-gray-500">Favori Sayısı</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {listings.filter(l => l.status === 'ACTIVE').length}
                          </div>
                          <div className="text-sm text-gray-500">Aktif İlan</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Listings List */}
                  <div className="space-y-4">
                    {listings.length === 0 ? (
                      <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Package className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz ilanınız yok</h3>
                        <p className="text-gray-500 mb-6">İlk ilanınızı vermek için tıklayın</p>
                        <Link 
                          href="/ilan-ver"
                          className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                          İlan Ver
                        </Link>
                      </div>
                    ) : (
                      listings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex gap-4">
                            <img 
                              src={listing.images?.[0] || listing.image} 
                              alt={listing.title} 
                              className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold text-gray-900 truncate mb-1">{listing.title}</h3>
                                  <p className="text-green-600 font-bold mb-2">{formatPrice(listing.price)}</p>
                                  <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {listing.city}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-4 h-4" />
                                      {listing.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Eye className="w-4 h-4" />
                                      {listing.viewCount}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      {listing.favoriteCount}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  {getStatusBadge(listing.status)}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Link 
                              href={`/ilan/${listing.id}`}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              Görüntüle
                            </Link>
                            <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                              Düzenle
                            </button>
                            <select
                              value={listing.status}
                              onChange={(e) => handleStatusChange(listing.id, e.target.value as ListingStatus)}
                              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 outline-none"
                            >
                              <option value="ACTIVE">Aktif</option>
                              <option value="PASSIVE">Pasif</option>
                              <option value="SOLD">Satıldı</option>
                            </select>
                            <button 
                              onClick={() => handleDeleteListing(listing.id)}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                            >
                              <Trash2 className="w-4 h-4" />
                              Sil
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorilerim</h2>
                  {favoriteListings.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz favori ilanınız yok</h3>
                      <p className="text-gray-500 mb-6">Beğendiğiniz ilanları favorilere ekleyebilirsiniz</p>
                      <Link 
                        href="/ilanlar"
                        className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                      >
                        İlanları Keşfet
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favoriteListings.map(listing => (
                        <Link 
                          key={listing.id}
                          href={`/ilan/${listing.id}`}
                          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex gap-4"
                        >
                          <img 
                            src={listing.images?.[0] || listing.image} 
                            alt={listing.title}
                            className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">{listing.title}</h3>
                            <p className="text-green-600 font-bold">{formatPrice(listing.price)}</p>
                            <p className="text-sm text-gray-500">{listing.city}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mesajlarım</h2>
                  {conversations.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz mesajınız yok</h3>
                      <p className="text-gray-500 mb-6">İlan sahipleriyle iletişime geçmek için mesaj gönderebilirsiniz</p>
                      <Link 
                        href="/ilanlar"
                        className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                      >
                        İlanları Keşfet
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      {conversations.map((conv) => (
                        <Link
                          key={conv.key}
                          href="/mesajlar"
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                            {conv.userName.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-gray-900">{conv.userName}</span>
                              <span className="text-xs text-gray-400">
                                {new Date(conv.lastMessageTime).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                            {conv.listingTitle && (
                              <p className="text-xs text-green-600 mb-1">İlan: {conv.listingTitle}</p>
                            )}
                            <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                              {conv.lastMessage}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Hesap Ayarları</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Ad Soyad
                      </label>
                      <input 
                        type="text" 
                        defaultValue="Ahmet Yılmaz" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        E-posta
                      </label>
                      <input 
                        type="email" 
                        defaultValue="ahmet@email.com" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Telefon
                      </label>
                      <input 
                        type="tel" 
                        defaultValue="0555 123 4567" 
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                      />
                    </div>

                    <div className="pt-4">
                      <button className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                        Değişiklikleri Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <FooterModern />
        </div>
      </div>
    </>
  );
}
