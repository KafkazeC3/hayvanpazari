import Head from 'next/head';

export default function ListingsPage() {
  return (
    <>
      <Head>
        <title>İlanlar | HayvanPazarı.com</title>
        <meta name="description" content="Satılık hayvan ilanları" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" style={{ color: '#166534', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
              🐄 HayvanPazarı.com
            </a>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="/" style={{ color: '#374151', textDecoration: 'none' }}>Anasayfa</a>
              <a href="/ilanlar" style={{ color: '#166534', textDecoration: 'none', fontWeight: 600 }}>İlanlar</a>
              <a href="/giris" style={{ color: '#166534', textDecoration: 'none' }}>Giriş Yap</a>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '2rem' }}>İlanlar</h1>
          <p style={{ color: '#6b7280' }}>İlanlar yakında burada olacak...</p>
        </div>
      </div>
    </>
  );
}
