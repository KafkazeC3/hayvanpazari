import Head from 'next/head';

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>Çevrimdışı | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📡</div>
          <h1 style={{ color: '#111827', marginBottom: '0.5rem' }}>Çevrimdışı Mod</h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>İnternet bağlantınız yok. Lütfen bağlantınızı kontrol edin.</p>
          <a href="/" style={{ background: '#22c55e', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
            Anasayfaya Dön
          </a>
        </div>
      </div>
    </>
  );
}
