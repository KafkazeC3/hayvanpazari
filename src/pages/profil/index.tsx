import Head from 'next/head';

export default function ProfilePage() {
  return (
    <>
      <Head>
        <title>Profilim | HayvanPazarı.com</title>
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
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1.5rem' }}>
            Profilim
          </h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
            <p style={{ color: '#57534e' }}>Profil sayfanız yakında hazır olacaktır.</p>
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e7e5e4' }}>
              <a href="/ilan-ver" style={{ color: '#16a34a', textDecoration: 'none' }}>+ Yeni İlan Ver</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
