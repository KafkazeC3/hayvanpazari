import Head from 'next/head';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Hesap Oluştur | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1.5rem', textAlign: 'center' }}>
            Hesap Oluştur
          </h1>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
            <p style={{ color: '#78716c', textAlign: 'center' }}>Kayıt formu yakında hazır olacak...</p>
            <p style={{ color: '#57534e', textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
              Zaten hesabınız var mı? <a href="/giris" style={{ color: '#16a34a' }}>Giriş Yap</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
