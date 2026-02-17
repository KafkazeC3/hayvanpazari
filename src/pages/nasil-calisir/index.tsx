import Head from 'next/head';

export default function HowItWorksPage() {
  return (
    <>
      <Head>
        <title>Nasıl Çalışır? | HayvanPazarı.com</title>
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
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '2rem', textAlign: 'center' }}>
            Nasıl Çalışır?
          </h1>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1c1917', marginBottom: '1rem' }}>Alıcılar İçin</h2>
            <ol style={{ color: '#57534e', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Kategori, şehir ve fiyat aralığına göre ilanları arayın</li>
              <li>Detaylı ilan bilgilerini ve fotoğrafları inceleyin</li>
              <li>Satıcıyla iletişime geçin</li>
              <li>Görüşme yapın ve anlaşın</li>
            </ol>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1c1917', marginBottom: '1rem' }}>Satıcılar İçin</h2>
            <ol style={{ color: '#57534e', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Ücretsiz hesap oluşturun</li>
              <li>Detaylı bilgiler ve fotoğraflarla ilanınızı oluşturun</li>
              <li>Potansiyel alıcıların mesajlarını yanıtlayın</li>
              <li>Satışınızı tamamlayın</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
