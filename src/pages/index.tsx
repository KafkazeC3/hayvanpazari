import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HayvanPazarı.com - Ana Sayfa</title>
        <meta name="description" content="Türkiye'nin en büyük hayvan alım satım platformu" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
        {/* Navbar */}
        <nav style={{ background: 'rgba(255,255,255,0.95)', padding: '1rem 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ color: '#166534', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
              🐄 HayvanPazarı.com
            </h1>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>Anasayfa</a>
              <a href="/ilanlar" style={{ color: '#374151', textDecoration: 'none', fontWeight: 500 }}>İlanlar</a>
              <a href="/giris" style={{ color: '#166534', textDecoration: 'none', fontWeight: 600 }}>Giriş Yap</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Türkiye'nin En Büyük<br />Hayvan Pazarı
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
            Güvenli ve hızlı şekilde hayvan alım satımı yapın
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/ilanlar" style={{ background: 'white', color: '#166534', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}>
              İlanları Gör
            </a>
            <a href="/ilan-ver" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600, border: '2px solid white' }}>
              Ücretsiz İlan Ver
            </a>
          </div>
        </div>

        {/* Features */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>Güvenli Alışveriş</h3>
              <p style={{ color: '#6b7280' }}>Onaylı kullanıcılar ve güvenilir ilanlar</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>Hızlı İlan</h3>
              <p style={{ color: '#6b7280' }}>Dakikalar içinde ilanınızı oluşturun</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
              <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>Geniş Ağ</h3>
              <p style={{ color: '#6b7280' }}>Türkiye'nin dört bir yanından kullanıcılar</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
              <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>7/24 Destek</h3>
              <p style={{ color: '#6b7280' }}>Uzman destek ekibimiz yanınızda</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer style={{ background: '#1f2937', color: 'white', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
          <p>&copy; 2024 HayvanPazarı.com - Tüm hakları saklıdır.</p>
        </footer>
      </div>
    </>
  );
}
