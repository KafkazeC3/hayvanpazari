import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Hakkımızda | HayvanPazarı.com</title>
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
            Hakkımızda
          </h1>
          <div style={{ color: '#57534e', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1rem' }}>
              HayvanPazarı.com, çiftçiler ve hayvan üreticileri için güvenli, hızlı ve kolay bir alım satım platformu oluşturma hayaliyle yola çıktı.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              2020 yılında Konya&apos;da kurulan platformumuz, kısa sürede sektörün öncü isimlerinden biri haline geldi.
              Büyükbaş ve küçükbaş hayvan ticaretinde şeffaflık ve güvenilirlik ilkeleriyle hareket ediyoruz.
            </p>
            <p>
              Amacımız, hayvan ticaretini modern ve güvenilir bir hale getirmektir.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
