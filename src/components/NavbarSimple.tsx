'use client';

import Link from 'next/link';

export function NavbarSimple() {
  return (
    <nav style={{ 
      background: 'rgba(255,255,255,0.95)', 
      padding: '1rem 2rem', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <Link href="/" style={{ 
          color: '#166534', 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          textDecoration: 'none' 
        }}>
          🐄 HayvanPazarı.com
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ color: '#374151', textDecoration: 'none' }}>Anasayfa</Link>
          <Link href="/ilanlar" style={{ color: '#374151', textDecoration: 'none' }}>İlanlar</Link>
          <Link href="/kategoriler" style={{ color: '#374151', textDecoration: 'none' }}>Kategoriler</Link>
          <Link href="/ilan-ver" style={{ color: '#166534', textDecoration: 'none', fontWeight: 600 }}>+ İlan Ver</Link>
          <Link href="/giris" style={{ color: '#166534', textDecoration: 'none' }}>Giriş</Link>
        </div>
      </div>
    </nav>
  );
}
