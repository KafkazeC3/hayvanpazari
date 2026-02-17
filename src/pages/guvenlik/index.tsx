import Head from 'next/head';

export default function SecurityPage() {
  return (
    <>
      <Head>
        <title>Güvenlik | HayvanPazarı.com</title>
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
            Güvenlik
          </h1>
          <div style={{ color: '#57534e', lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Alıcılar İçin Güvenlik İpuçları</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Satıcının profilini ve yorumlarını inceleyin</li>
              <li>Hayvanı canlı görmeden kapora ödemeyin</li>
              <li>Satıcıyla telefon görüşmesi yapın</li>
              <li>Mümkünse yanınızda uzman biriyle gidin</li>
            </ul>
            
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Dolandırıcılık İşaretleri</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
              <li>Çok düşük fiyat teklifleri</li>
              <li>Görmeden kapora isteme talepleri</li>
              <li>Platform dışında iletişim kurma isteği</li>
              <li>Aceleci ve ısrarcı davranışlar</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
