'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Shield, 
  UserX, 
  UserCheck,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  district: string;
  type: string;
  isActive: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  avatar: string | null;
  rating: number;
  listingCount: number;
  createdAt: string;
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-800">Kullanıcılar</h1>
          <p className="text-earth-500 mt-1">Toplam {users.length} kayıtlı kullanıcı</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrele
          </Button>
          <Button className="gradient-nature gap-2">
            + Yeni Kullanıcı
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
            <Input 
              placeholder="Kullanıcı ara..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-2 border-nature-500 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-earth-500">
              Kullanıcı bulunamadı
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-earth-200">
                    <th className="text-left py-3 px-4 font-medium text-earth-700">Kullanıcı</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">İletişim</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">Konum</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">Durum</th>
                    <th className="text-left py-3 px-4 font-medium text-earth-700">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-earth-100 hover:bg-earth-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || ''} />
                            <AvatarFallback className="bg-nature-100 text-nature-700">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-earth-800">{user.name}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-earth-500">
                                {user.type === 'BUSINESS' ? 'İşletme' : 'Bireysel'}
                              </span>
                              {user.isVerified && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                  Doğrulanmış
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-earth-600">
                            <Mail className="h-3.5 w-3.5" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-earth-600">
                            <Phone className="h-3.5 w-3.5" />
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 text-sm text-earth-600">
                          <MapPin className="h-3.5 w-3.5" />
                          {user.city}, {user.district}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Badge className={user.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {user.isActive ? 'Aktif' : 'Pasif'}
                          </Badge>
                          {user.isAdmin && (
                            <Badge className="bg-purple-100 text-purple-700">
                              <Shield className="h-3 w-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toggleUserStatus(user.id, user.isActive)}
                            className={user.isActive ? 'text-red-500' : 'text-green-500'}
                          >
                            {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
