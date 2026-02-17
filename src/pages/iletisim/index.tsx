import Head from 'next/head';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>İletişim | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1.5rem', textAlign: 'center' }}>
            İletişim
          </h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>E-posta</h3>
              <p style={{ color: '#57534e' }}>info@hayvanpazari.com</p>
              <p style={{ color: '#57534e' }}>destek@hayvanpazari.com</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>Telefon</h3>
              <p style={{ color: '#57534e' }}>0850 123 45 67</p>
            </div>
            <div>
              <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>Adres</h3>
              <p style={{ color: '#57534e' }}>Merkez Mahallesi, Hayvan Pazarı Caddesi No:123</p>
              <p style={{ color: '#57534e' }}>Selçuklu/Konya</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
