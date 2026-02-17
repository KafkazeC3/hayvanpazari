import Head from 'next/head';

export default function AdminDashboard() {
  return (
    <>
      <Head>
        <title>Admin Dashboard | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1.5rem' }}>
          Admin Dashboard
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
            <p style={{ color: '#78716c', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Toplam Kullanıcı</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1c1917' }}>-</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
            <p style={{ color: '#78716c', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Toplam İlan</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1c1917' }}>-</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
            <p style={{ color: '#78716c', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Bekleyen İlan</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1c1917' }}>-</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
            <p style={{ color: '#78716c', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Toplam Görüntülenme</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1c1917' }}>-</p>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px' }}>
          <p style={{ color: '#78716c' }}>Dashboard yakında aktif olacaktır.</p>
        </div>
      </div>
    </>
  );
}
