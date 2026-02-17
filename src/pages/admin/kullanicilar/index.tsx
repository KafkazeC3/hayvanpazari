import Head from 'next/head';

export default function AdminUsersPage() {
  return (
    <>
      <Head>
        <title>Admin Kullanıcılar | HayvanPazarı.com</title>
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f4', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1c1917', marginBottom: '1.5rem' }}>
          Kullanıcı Yönetimi
        </h1>
        
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px' }}>
          <p style={{ color: '#78716c' }}>Kullanıcı yönetimi yakında aktif olacaktır.</p>
        </div>
      </div>
    </>
  );
}
