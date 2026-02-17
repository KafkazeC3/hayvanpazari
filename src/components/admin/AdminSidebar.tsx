'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  FolderTree, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/kullanicilar', label: 'Kullanıcılar', icon: Users },
  { href: '/admin/ilanlar', label: 'İlanlar', icon: ClipboardList },
  { href: '/admin/kategoriler', label: 'Kategoriler', icon: FolderTree },
  { href: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
];

export function AdminSidebar() {
  const router = useRouter();
  const pathname = router.pathname;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-earth-900 text-white h-screen sticky top-0 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-earth-800">
        {!collapsed && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-nature flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-bold text-lg">Admin</span>
          </Link>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-earth-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive 
                  ? "bg-nature-600 text-white" 
                  : "text-earth-300 hover:bg-earth-800 hover:text-white",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-earth-800 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-earth-300 hover:bg-earth-800 hover:text-white transition-colors",
            collapsed && "justify-center"
          )}
        >
          <Home className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Siteye Dön</span>}
        </Link>
        <button
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">Çıkış</span>}
        </button>
      </div>
    </aside>
  );
}
