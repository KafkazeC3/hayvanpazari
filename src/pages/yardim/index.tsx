import Head from 'next/head';

export default function HelpPage() {
  return (
    <>
      <Head>
        <title>Yardım Merkezi | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '2rem', textAlign: 'center' }}>
            Yardım Merkezi
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Başlangıç</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Hesap oluşturma, ilan verme ve arama yapma</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Güvenlik</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Güvenli alışveriş için ipuçları</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Ödeme</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Ödeme yöntemleri ve faturalama</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>İletişim</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Destek talebi ve şikayet bildirimi</p>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#dcfce7', padding: '2rem', borderRadius: '12px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>Yardıma mı ihtiyacınız var?</h2>
            <p style={{ color: '#166534', marginBottom: '1rem' }}>Aradığınız cevabı bulamadınız mı?</p>
            <a href="/iletisim" style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>Bize Ulaşın</a>
          </div>
        </div>
      </div>
    </>
  );
}
