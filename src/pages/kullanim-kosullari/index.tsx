import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Kullanım Koşulları | HayvanPazarı.com</title>
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
            Kullanım Koşulları
          </h1>
          <div style={{ color: '#57534e', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Giriş</h2>
            <p>Bu Kullanım Koşulları, HayvanPazarı.com web sitesini kullanımınıza ilişkin şartları ve koşulları belirler.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Üyelik</h2>
            <p>Platform&apos;un bazı özelliklerini kullanmak için üye olmanız gerekmektedir. Doğru ve güncel bilgiler vermelisiniz.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. İlan Verme Kuralları</h2>
            <p>İlanlarınızda gerçek ve doğru bilgiler verilmelidir. Yanıltıcı fotoğraflar kullanılamaz.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>4. İletişim</h2>
            <p>Bu koşullar hakkında sorularınız için info@hayvanpazari.com adresine e-posta gönderebilirsiniz.</p>
          </div>
        </div>
      </div>
    </>
  );
}
