import Head from 'next/head';

export default function FavoritesPage() {
  return (
    <>
      <Head>
        <title>Favorilerim | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1rem' }}>
            Favorilerim
          </h1>
          <p style={{ color: '#57534e' }}>Favori ilanlarınızı buradan görüntüleyebilirsiniz.</p>
        </div>
      </div>
    </>
  );
}
