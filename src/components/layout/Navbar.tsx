'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { 
  Menu, X, Search, PlusCircle, Heart, User, MessageCircle, 
  LogIn, UserPlus, Bell, ChevronDown, Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn, getInitials } from '@/lib/utils';
import { useFavorites } from '@/contexts/FavoritesContext';

const navLinks = [
  { href: '/', label: 'Anasayfa' },
  { href: '/ilanlar', label: 'İlanlar' },
  { href: '/kategoriler', label: 'Kategoriler' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  
  const { data: session, status } = useSession();
  const { favorites } = useFavorites();
  
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;
  
  // Mock bildirim sayısı - gerçek uygulamada API'den gelecek
  const unreadMessages = 2;
  const unreadNotifications = 3;

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Menü açıkken body scroll'unu engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/ilanlar?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
    setIsMenuOpen(false);
  };

  if (status === 'loading') {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-earth-400" />
        </div>
      </header>
    );
  }

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-soft" 
            : "bg-white/80 backdrop-blur-sm"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-xl gradient-nature flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="hidden sm:block font-bold text-xl text-earth-800">
                HayvanPazarı.com
              </span>
            </Link>

            {/* Search - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400 group-focus-within:text-nature-500 transition-colors" />
                <Input
                  type="search"
                  placeholder="İlan ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-10 bg-earth-50 border-earth-200 rounded-full focus:bg-white focus:border-nature-300 transition-all"
                />
              </div>
            </form>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                    pathname === link.href 
                      ? 'text-nature-600 bg-nature-50' 
                      : 'text-earth-600 hover:text-nature-600 hover:bg-earth-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* İlan Ver Button */}
              <Link href="/ilan-ver" className="hidden sm:block">
                <Button className="gradient-nature hover:opacity-90 text-white rounded-full gap-2 shadow-glow hover:shadow-glow-lg transition-shadow">
                  <PlusCircle className="h-4 w-4" />
                  <span className="hidden xl:inline">İlan Ver</span>
                </Button>
              </Link>

              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative rounded-full hidden md:flex">
                        <Bell className="h-5 w-5 text-earth-600" />
                        {unreadNotifications > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-harvest-500 text-[10px] border-2 border-white">
                            {unreadNotifications}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="px-3 py-2 font-semibold text-sm border-b">
                        Bildirimler
                      </div>
                      <div className="py-2">
                        <DropdownMenuItem className="cursor-pointer">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">Yeni mesajınız var</span>
                            <span className="text-xs text-muted-foreground">Ahmet Yılmaz mesaj gönderdi</span>
                          </div>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Messages */}
                  <Link href="/mesajlar" className="hidden md:block">
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      <MessageCircle className="h-5 w-5 text-earth-600" />
                      {unreadMessages > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-harvest-500 text-[10px] border-2 border-white">
                          {unreadMessages}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {/* Favorites */}
                  <Link href="/favoriler" className="hidden md:block">
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      <Heart className="h-5 w-5 text-earth-600" />
                      {favorites.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-harvest-500 text-[10px] border-2 border-white">
                          {favorites.length}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2 rounded-full pl-2 pr-3">
                        <Avatar className="h-8 w-8 border-2 border-nature-200">
                          <AvatarImage src={user?.image || ''} />
                          <AvatarFallback className="bg-nature-100 text-nature-700 text-sm">
                            {user?.name ? getInitials(user.name) : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-earth-400 hidden sm:block" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-semibold">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                      {user?.role === 'ADMIN' && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/admin">Admin Paneli</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link href="/profil">Profilim</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profil/ilanlarim">İlanlarım</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/favoriler">Favorilerim</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/mesajlar">Mesajlar</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Çıkış Yap
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Guest Buttons */}
                  <Link href="/giris" className="hidden sm:block">
                    <Button variant="ghost" className="rounded-full gap-2">
                      <LogIn className="h-4 w-4" />
                      Giriş
                    </Button>
                  </Link>
                  <Link href="/kayit" className="hidden sm:block">
                    <Button className="gradient-nature text-white rounded-full gap-2">
                      <UserPlus className="h-4 w-4" />
                      Kayıt
                    </Button>
                  </Link>
                  <Link href="/giris" className="sm:hidden">
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden rounded-full" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-white z-40 lg:hidden overflow-y-auto animate-fade-in-down">
            <div className="container mx-auto px-4 py-6 space-y-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
                  <Input 
                    type="search" 
                    placeholder="İlan ara..." 
                    className="w-full pl-10 h-12 bg-earth-50 rounded-xl text-base"
                  />
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'px-4 py-3.5 rounded-xl text-base font-medium transition-colors',
                      pathname === link.href 
                        ? 'text-nature-600 bg-nature-50' 
                        : 'text-earth-700 hover:bg-earth-50'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Actions */}
              {isAuthenticated ? (
                <div className="space-y-2 pt-4 border-t border-earth-200">
                  <p className="px-4 text-sm font-semibold text-earth-500 uppercase tracking-wider">
                    Hesabım
                  </p>
                  <Link href="/profil" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                      <User className="h-5 w-5" /> Profilim
                    </Button>
                  </Link>
                  <Link href="/mesajlar" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                      <MessageCircle className="h-5 w-5" /> 
                      Mesajlar
                      {unreadMessages > 0 && (
                        <Badge className="ml-auto bg-harvest-500">{unreadMessages}</Badge>
                      )}
                    </Button>
                  </Link>
                  <Link href="/favoriler" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                      <Heart className="h-5 w-5" /> 
                      Favorilerim
                      {favorites.length > 0 && (
                        <Badge className="ml-auto bg-harvest-500">{favorites.length}</Badge>
                      )}
                    </Button>
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-base">
                        <span className="w-5 h-5 rounded bg-nature-100 flex items-center justify-center text-xs font-bold text-nature-600">A</span>
                        Admin Paneli
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start gap-3 h-12 text-base text-red-600"
                    onClick={handleLogout}
                  >
                    <LogIn className="h-5 w-5" /> Çıkış Yap
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-4 border-t border-earth-200">
                  <Link href="/giris" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 text-base gap-2">
                      <LogIn className="h-5 w-5" /> Giriş Yap
                    </Button>
                  </Link>
                  <Link href="/kayit" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full gradient-nature text-white h-12 text-base gap-2">
                      <UserPlus className="h-5 w-5" /> Kayıt Ol
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile İlan Ver */}
              <div className="pt-4 border-t border-earth-200">
                <Link href="/ilan-ver" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full gradient-harvest text-white h-14 text-base gap-2 rounded-xl">
                    <PlusCircle className="h-5 w-5" /> 
                    Ücretsiz İlan Ver
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
