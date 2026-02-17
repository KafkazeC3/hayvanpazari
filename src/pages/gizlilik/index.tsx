import Head from 'next/head';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Gizlilik Politikası | HayvanPazarı.com</title>
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
            Gizlilik Politikası
          </h1>
          <div style={{ color: '#57534e', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>1. Veri Sorumlusu</h2>
            <p>HayvanPazarı.com olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>2. Toplanan Veriler</h2>
            <p>Platformumuzu kullanırken ad, soyad, e-posta, telefon ve konum bilgilerinizi toplayabiliriz.</p>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>3. İletişim</h2>
            <p>Gizlilik politikamız hakkında sorularınız için kvkk@hayvanpazari.com adresine e-posta gönderebilirsiniz.</p>
          </div>
        </div>
      </div>
    </>
  );
}
