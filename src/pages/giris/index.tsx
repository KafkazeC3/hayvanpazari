import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Giriş Yap | HayvanPazarı.com</title>
        <meta name="description" content="Hesabınıza giriş yapın" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', maxWidth: '400px', width: '90%' }}>
          <h1 style={{ textAlign: 'center', color: '#166534', marginBottom: '2rem' }}>Giriş Yap</h1>
          <form>
            <div style={{ marginBottom: '1rem' }}>
              <input type="email" placeholder="E-posta" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <input type="password" placeholder="Şifre" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
              Giriş Yap
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6b7280' }}>
            Hesabınız yok mu? <a href="/kayit" style={{ color: '#166534' }}>Kayıt Ol</a>
          </p>
        </div>
      </div>
    </>
  );
}
