export const dynamic = 'force-dynamic';

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
import prisma from '@/lib/db';

async function getStats() {
  const [
    totalUsers,
    totalListings,
    pendingListings,
    activeListings,
    totalViews,
    recentUsers,
    recentListings
  ] = await Promise.all([
    prisma.user.count(),
    prisma.listing.count(),
    prisma.listing.count({ where: { isApproved: false } }),
    prisma.listing.count({ where: { status: 'ACTIVE', isApproved: true } }),
    prisma.listing.aggregate({ _sum: { viewCount: true } }),
    prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, createdAt: true }
    }),
    prisma.listing.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true } } }
    })
  ]);

  return {
    totalUsers,
    totalListings,
    pendingListings,
    activeListings,
    totalViews: totalViews._sum.viewCount || 0,
    recentUsers,
    recentListings
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

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
