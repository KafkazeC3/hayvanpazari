'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  ClipboardList, 
  Eye, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStats {
  totalUsers: number;
  totalListings: number;
  pendingListings: number;
  activeListings: number;
  totalViews: number;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: string;
  }>;
  recentListings: Array<{
    id: string;
    title: string;
    isApproved: boolean;
    user: { name: string };
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // API'den veri çek
        const [usersRes, listingsRes] = await Promise.all([
          fetch('/api/admin/users'),
          fetch('/api/admin/listings')
        ]);
        
        const usersData = await usersRes.json();
        const listingsData = await listingsRes.json();
        
        const totalUsers = usersData.users?.length || 0;
        const totalListings = listingsData.listings?.length || 0;
        const pendingListings = listingsData.listings?.filter((l: any) => !l.isApproved)?.length || 0;
        const activeListings = listingsData.listings?.filter((l: any) => l.status === 'ACTIVE' && l.isApproved)?.length || 0;
        const totalViews = listingsData.listings?.reduce((sum: number, l: any) => sum + (l.viewCount || 0), 0) || 0;
        
        setStats({
          totalUsers,
          totalListings,
          pendingListings,
          activeListings,
          totalViews,
          recentUsers: usersData.users?.slice(0, 5) || [],
          recentListings: listingsData.listings?.slice(0, 5) || [],
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Mock data fallback
        setStats({
          totalUsers: 0,
          totalListings: 0,
          pendingListings: 0,
          activeListings: 0,
          totalViews: 0,
          recentUsers: [],
          recentListings: [],
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-earth-200 rounded w-48 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-earth-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Toplam Kullanıcı',
      value: stats.totalUsers,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Toplam İlan',
      value: stats.totalListings,
      change: '+8%',
      trend: 'up',
      icon: ClipboardList,
      color: 'bg-nature-500',
    },
    {
      title: 'Bekleyen İlan',
      value: stats.pendingListings,
      change: stats.pendingListings > 0 ? 'Dikkat' : 'Yok',
      trend: stats.pendingListings > 0 ? 'down' : 'up',
      icon: Clock,
      color: 'bg-harvest-500',
    },
    {
      title: 'Toplam Görüntülenme',
      value: stats.totalViews.toLocaleString('tr-TR'),
      change: '+24%',
      trend: 'up',
      icon: Eye,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-800">Dashboard</h1>
        <p className="text-earth-500 mt-1">Platform genel görünümü ve istatistikler</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-earth-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-earth-800">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                    {stat.change}
                  </span>
                  <span className="text-earth-400 text-sm">bu hafta</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son Kayıt Olanlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers.length === 0 ? (
                <p className="text-earth-500 text-center py-4">Henüz kullanıcı yok</p>
              ) : (
                stats.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                    <div>
                      <p className="font-medium text-earth-800">{user.name}</p>
                      <p className="text-sm text-earth-500">{user.email}</p>
                    </div>
                    <span className="text-xs text-earth-400">
                      {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Son Eklenen İlanlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentListings.length === 0 ? (
                <p className="text-earth-500 text-center py-4">Henüz ilan yok</p>
              ) : (
                stats.recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 bg-earth-50 rounded-lg">
                    <div>
                      <p className="font-medium text-earth-800 line-clamp-1">{listing.title}</p>
                      <p className="text-sm text-earth-500">{listing.user.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        listing.isApproved 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {listing.isApproved ? 'Onaylı' : 'Beklemede'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
