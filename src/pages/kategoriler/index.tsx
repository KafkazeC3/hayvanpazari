import Head from 'next/head';

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>Kategoriler | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4' }}>
        {/* Simple navbar */}
        <nav style={{ background: 'white', padding: '1rem 2rem', borderBottom: '1px solid #e7e5e4' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a', textDecoration: 'none' }}>
            HayvanPazarı.com
          </a>
        </nav>
        {/* Simple content */}
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1rem', textAlign: 'center' }}>
            Kategoriler
          </h1>
          <p style={{ color: '#57534e', textAlign: 'center', marginBottom: '2rem' }}>
            İhtiyacınız olan kategoriyi seçin, binlerce ilan arasından size en uygununu bulun.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Büyükbaş Hayvanlar</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Sığır, manda, at</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Küçükbaş Hayvanlar</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Koyun, keçi</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Kümes Hayvanları</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Tavuk, ördek, hindi</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
              <h3 style={{ fontWeight: 'bold', color: '#1c1917', marginBottom: '0.5rem' }}>Evcil Hayvanlar</h3>
              <p style={{ color: '#57534e', fontSize: '0.875rem' }}>Köpek, kedi</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
