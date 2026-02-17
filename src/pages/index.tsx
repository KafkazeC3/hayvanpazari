'use client';

import Head from 'next/head';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>HayvanPazarı.com - Türkiye'nin En Büyük Hayvan Pazarı</title>
        <meta name="description" content="HayvanPazarı.com ile güvenli ve hızlı şekilde hayvan alım satımı yapın." />
      </Head>
      
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
        <NavbarSimple />
        
        {/* Hero */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center', color: 'white' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
            Türkiye'nin En Büyük<br />Hayvan Pazarı
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.95, maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Güvenli ve hızlı şekilde hayvan alım satımı yapın. Binlerce ilan arasından size uygun olanı bulun.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/ilanlar" style={{ 
              background: 'white', 
              color: '#166534', 
              padding: '1rem 2.5rem', 
              borderRadius: '0.5rem', 
              textDecoration: 'none', 
              fontWeight: 600,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}>
              İlanları Gör
            </a>
            <a href="/ilan-ver" style={{ 
              background: 'rgba(255,255,255,0.2)', 
              color: 'white', 
              padding: '1rem 2.5rem', 
              borderRadius: '0.5rem', 
              textDecoration: 'none', 
              fontWeight: 600, 
              border: '2px solid white',
              transition: 'all 0.2s'
            }}>
              Ücretsiz İlan Ver
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>5.000+</div>
              <div style={{ opacity: 0.9 }}>Aktif İlan</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>3.000+</div>
              <div style={{ opacity: 0.9 }}>Kayıtlı Kullanıcı</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>10.000+</div>
              <div style={{ opacity: 0.9 }}>Başarılı İşlem</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '0.75rem', textAlign: 'center', backdropFilter: 'blur(10px)' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>81</div>
              <div style={{ opacity: 0.9 }}>Şehir</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ background: 'white', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#111827', marginBottom: '3rem' }}>
              Neden <span style={{ color: '#22c55e' }}>HayvanPazarı.com</span>?
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              <div style={{ padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
                <h3 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Güvenli Alışveriş</h3>
                <p style={{ color: '#6b7280' }}>Onaylı kullanıcılar ve güvenilir ilanlarla güvenle alışveriş yapın.</p>
              </div>
              <div style={{ padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Hızlı İlan</h3>
                <p style={{ color: '#6b7280' }}>Dakikalar içinde ilanınızı oluşturun, binlerce kişiye ulaşın.</p>
              </div>
              <div style={{ padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                <h3 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.25rem' }}>Geniş Ağ</h3>
                <p style={{ color: '#6b7280' }}>Türkiye'nin dört bir yanından alıcı ve satıcılarla bağlantı kurun.</p>
              </div>
              <div style={{ padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
                <h3 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.25rem' }}>7/24 Destek</h3>
                <p style={{ color: '#6b7280' }}>Uzman destek ekibimiz her zaman yanınızda.</p>
              </div>
            </div>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
