'use client';

import Link from 'next/link';

export function FooterSimple() {
  return (
    <footer style={{ 
      background: '#1f2937', 
      color: 'white', 
      padding: '3rem 2rem', 
      marginTop: '4rem' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ color: '#22c55e', marginBottom: '1rem' }}>🐄 HayvanPazarı.com</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
              Türkiye'nin en büyük hayvan alım satım platformu.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Hızlı Bağlantılar</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Anasayfa</Link>
              <Link href="/ilanlar" style={{ color: '#9ca3af', textDecoration: 'none' }}>İlanlar</Link>
              <Link href="/kategoriler" style={{ color: '#9ca3af', textDecoration: 'none' }}>Kategoriler</Link>
              <Link href="/hakkimizda" style={{ color: '#9ca3af', textDecoration: 'none' }}>Hakkımızda</Link>
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Yardım</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/yardim" style={{ color: '#9ca3af', textDecoration: 'none' }}>Yardım Merkezi</Link>
              <Link href="/iletisim" style={{ color: '#9ca3af', textDecoration: 'none' }}>İletişim</Link>
              <Link href="/gizlilik" style={{ color: '#9ca3af', textDecoration: 'none' }}>Gizlilik</Link>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', color: '#9ca3af' }}>
          © 2024 HayvanPazarı.com - Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
