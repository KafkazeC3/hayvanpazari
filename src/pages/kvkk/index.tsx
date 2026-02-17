import Head from 'next/head';

export default function KVKKPage() {
  return (
    <>
      <Head>
        <title>KVKK Aydınlatma Metni | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', backgroundColor: 'white', marginTop: '2rem', borderRadius: '12px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1.5rem' }}>
            KVKK Aydınlatma Metni
          </h1>
          <div style={{ color: '#57534e', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1rem' }}>
              İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca hazırlanmıştır.
            </p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Veri Sorumlusu</h2>
            <p>Ünvan: HayvanPazarı.com<br />Adres: Selçuklu/Konya<br />E-posta: kvkk@hayvanpazari.com</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. İşlenme Amacı</h2>
            <p>Kişisel verileriniz üyelik işlemleri, ilan yayınlama ve platform güvenliği amacıyla işlenmektedir.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. Haklarınız</h2>
            <p>KVKK kapsamında verilerinizin düzeltilmesini, silinmesini veya işlenmeye itiraz etme hakkına sahipsiniz.</p>
          </div>
        </div>
      </div>
    </>
  );
}
