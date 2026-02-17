'use client';

import Head from 'next/head';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';

export default function AboutPage() {
  const values = [
    { icon: '🤝', title: 'Güven', desc: 'Kullanıcılarımızın güveni bizim için en değerli varlığımızdır.' },
    { icon: '⚡', title: 'Hız', desc: 'İlanlarınızı hızlı ve kolay bir şekilde yayınlayın.' },
    { icon: '🛡️', title: 'Güvenlik', desc: 'Verileriniz ve işlemleriniz en üst düzey güvenlikle korunur.' },
    { icon: '💚', title: 'Şeffaflık', desc: 'Açık ve dürüst iletişim ile güvenilir ilişkiler kurarız.' },
  ];

  const team = [
    { name: 'Ahmet Yılmaz', role: 'Kurucu & CEO', image: '👨‍💼' },
    { name: 'Mehmet Kaya', role: 'Teknik Direktör', image: '👨‍💻' },
    { name: 'Fatma Şahin', role: 'Operasyon Müdürü', image: '👩‍💼' },
    { name: 'Ali Demir', role: 'Müşteri İlişkileri', image: '👨‍🌾' },
  ];

  return (
    <>
      <Head>
        <title>Hakkımızda | HayvanPazarı.com</title>
        <meta name="description" content="HayvanPazarı.com hakkında bilgi edinin" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '5rem 2rem', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Hakkımızda
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Türkiye'nin en güvenilir hayvan alım satım platformu
          </p>
        </div>

        {/* Story */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '1.5rem' }}>
                Hikayemiz
              </h2>
              <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1rem' }}>
                HayvanPazarı.com, 2024 yılında Konya'da kurulan ve Türkiye'nin dört bir yanından 
                hayvan üreticileri ile alıcıları buluşturan dijital bir pazar yeridir.
              </p>
              <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1rem' }}>
                Amacımız, geleneksel hayvan pazarlarının modern bir alternatifini sunarak, 
                üreticilerin daha geniş kitlelere ulaşmasını ve alıcıların güvenilir kaynaklardan 
                hayvan temin etmesini sağlamaktır.
              </p>
              <p style={{ color: '#6b7280', lineHeight: '1.8' }}>
                Teknolojiyi kullanarak, hayvan ticaretini daha şeffaf, güvenli ve erişilebilir 
                hale getiriyoruz.
              </p>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', 
              padding: '3rem', 
              borderRadius: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '8rem' }}>🐄</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div style={{ background: 'white', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#111827', marginBottom: '3rem' }}>
              Değerlerimiz
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              {values.map((value, idx) => (
                <div key={idx} style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{value.icon}</div>
                  <h3 style={{ color: '#166534', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{value.title}</h3>
                  <p style={{ color: '#6b7280' }}>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: '#22c55e', padding: '4rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem',
              textAlign: 'center'
            }}>
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>2024</div>
                <div>Kuruluş Yılı</div>
              </div>
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>81</div>
                <div>Şehir</div>
              </div>
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>10K+</div>
                <n>Müşteri</n>
              </div>
              <div style={{ color: 'white' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>%98</div>
                <div>Memnuniyet</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div style={{ padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#111827', marginBottom: '3rem' }}>
              Ekibimiz
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '2rem' 
            }}>
              {team.map((member, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{member.image}</div>
                  <h3 style={{ color: '#111827', fontSize: '1.25rem' }}>{member.name}</h3>
                  <p style={{ color: '#22c55e' }}>{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div style={{ background: 'white', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '1.5rem' }}>
              Misyonumuz
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.25rem', lineHeight: '1.8' }}>
              "Türkiye'nin her köşesinden hayvan üreticilerini ve alıcılarını güvenilir, 
              hızlı ve modern bir platformda buluşturmak, hayvan ticaretini daha şeffaf 
              ve erişilebilir hale getirmek."
            </p>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
