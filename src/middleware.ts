import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Admin rotaları için yetki kontrolü
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token;
      
      // Token yoksa giriş sayfasına yönlendir
      if (!token) {
        return NextResponse.redirect(new URL('/giris?callbackUrl=/admin', req.url));
      }
      
      // Rol admin değilse anasayfaya yönlendir
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        // Her durumda true dönüyoruz, yukarıdaki middleware'de detaylı kontrol yapıyoruz
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/profil/:path*', '/mesajlar/:path*'],
};
