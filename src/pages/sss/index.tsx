import Head from 'next/head';

export default function FAQPage() {
  return (
    <>
      <Head>
        <title>Sıkça Sorulan Sorular | HayvanPazarı.com</title>
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
            Sıkça Sorulan Sorular
          </h1>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>HayvanPazarı.com kullanımı ücretli mi?</h3>
            <p style={{ color: '#57534e' }}>Hayır, hesap oluşturmak ve ilanları incelemek tamamen ücretsizdir.</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>Nasıl ilan verebilirim?</h3>
            <p style={{ color: '#57534e' }}>Ücretsiz hesap oluşturduktan sonra &quot;İlan Ver&quot; butonuna tıklayarak ilanınızı oluşturabilirsiniz.</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>Satıcılar güvenilir mi?</h3>
            <p style={{ color: '#57534e' }}>Platformumuzda satıcı doğrulama sistemi bulunmaktadır. Onaylı satıcılar mavi tik işareti ile belirtilir.</p>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: '600', color: '#1c1917', marginBottom: '0.5rem' }}>Ödeme nasıl yapılır?</h3>
            <p style={{ color: '#57534e' }}>Alıcı ve satıcı kendi aralarında ödeme yöntemi belirler. Güvenliğiniz için resmi sözleşme yapmanızı öneririz.</p>
          </div>
          
          <div style={{ backgroundColor: '#dcfce7', padding: '1.5rem', borderRadius: '12px', marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#166534', marginBottom: '1rem' }}>Aradığınız cevabı bulamadınız mı?</p>
            <a href="/iletisim" style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}>Bize Ulaşın</a>
          </div>
        </div>
      </div>
    </>
  );
}
