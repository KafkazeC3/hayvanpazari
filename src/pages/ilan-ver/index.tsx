import Head from 'next/head';

export default function CreateListingPage() {
  return (
    <>
      <Head>
        <title>Ücretsiz İlan Ver | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1rem', textAlign: 'center' }}>
            Ücretsiz İlan Ver
          </h1>
          <p style={{ color: '#57534e', textAlign: 'center', marginBottom: '2rem' }}>
            Hayvanınızı veya ürününüzü dakikalar içinde binlerce alıcıya ulaştırın.
          </p>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
            <p style={{ color: '#78716c', textAlign: 'center' }}>İlan formu yakında hazır olacak...</p>
          </div>
        </div>
      </div>
    </>
  );
}
