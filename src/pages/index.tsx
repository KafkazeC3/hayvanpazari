'use client';

import Head from 'next/head';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { mockListings, categories } from '@/data/mockListings';

export default function HomePage() {
  const recentListings = mockListings.slice(0, 4);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  return (
    <>
      <Head>
        <title>HayvanPazarı.com - Türkiye'nin En Büyük Hayvan Pazarı</title>
        <meta name="description" content="HayvanPazarı.com ile güvenli ve hızlı şekilde hayvan alım satımı yapın." />
      </Head>
      
      <div style={{ minHeight: '100vh' }}>
        <NavbarSimple />
        
        {/* Hero */}
        <div style={{ 
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)', 
          padding: '6rem 2rem',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            background: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
            opacity: 0.1
          }} />
          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
              Türkiye'nin En Büyük<br />Hayvan Pazarı
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.95, lineHeight: '1.6' }}>
              Güvenli ve hızlı şekilde hayvan alım satımı yapın.<br />
              Binlerce ilan arasından size uygun olanı bulun.
            </p>
            
            {/* Search Box */}
            <div style={{ 
              background: 'rgba(255,255,255,0.95)', 
              padding: '1rem', 
              borderRadius: '1rem',
              display: 'flex',
              gap: '1rem',
              maxWidth: '700px',
              margin: '0 auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <input 
                type="text" 
                placeholder="Ne arıyorsunuz?"
                style={{ 
                  flex: 1, 
                  padding: '1rem', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
              <a 
                href="/ilanlar"
                style={{ 
                  background: '#22c55e', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: '0.5rem', 
                  textDecoration: 'none',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                🔍 Ara
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <a href="/ilanlar" style={{ 
                background: 'white', 
                color: '#166534', 
                padding: '1rem 2.5rem', 
                borderRadius: '0.5rem', 
                textDecoration: 'none', 
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
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
                border: '2px solid white'
              }}>
                Ücretsiz İlan Ver
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ background: '#16a34a', padding: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1.5rem'
            }}>
              {[
                { value: '5.000+', label: 'Aktif İlan' },
                { value: '3.000+', label: 'Kayıtlı Kullanıcı' },
                { value: '10.000+', label: 'Başarılı İşlem' },
                { value: '81', label: 'Şehir' },
              ].map((stat, idx) => (
                <div key={idx} style={{ textAlign: 'center', color: 'white' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{stat.value}</div>
                  <div style={{ opacity: 0.9 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ padding: '5rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#111827', marginBottom: '1rem' }}>
              Kategoriler
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>
              İhtiyacınız olan kategoriyi seçin
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {categories.slice(0, 4).map((cat) => (
                <a
                  key={cat.id}
                  href={`/ilanlar?category=${cat.id}`}
                  style={{
                    background: '#f9fafb',
                    padding: '2rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#22c55e';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{cat.icon}</div>
                  <h3 style={{ color: '#111827', marginBottom: '0.25rem' }}>{cat.name}</h3>
                  <p style={{ color: '#22c55e', fontSize: '0.875rem' }}>{cat.count} ilan</p>
                </a>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="/kategoriler" style={{ color: '#22c55e', textDecoration: 'none', fontWeight: 600 }}>
                Tüm Kategoriler →
              </a>
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        <div style={{ padding: '5rem 2rem', background: '#f9fafb' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#111827', marginBottom: '1rem' }}>
              Son İlanlar
            </h2>
            <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3rem' }}>
              En yeni ilanları keşfedin
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {recentListings.map((listing) => (
                <a 
                  key={listing.id} 
                  href={`/ilan/${listing.id}`}
                  style={{ 
                    background: 'white', 
                    borderRadius: '1rem', 
                    overflow: 'hidden',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ position: 'relative', height: '180px' }}>
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '0.5rem', 
                      left: '0.5rem',
                      background: 'rgba(34, 197, 94, 0.9)',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem'
                    }}>
                      {listing.category}
                    </div>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.5rem' }}>
                      {listing.title}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#16a34a' }}>
                        {formatPrice(listing.price)}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        {listing.city}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="/ilanlar" style={{ 
                background: '#22c55e', 
                color: 'white', 
                padding: '1rem 2rem', 
                borderRadius: '0.5rem', 
                textDecoration: 'none',
                fontWeight: 600
              }}>
                Tüm İlanları Gör
              </a>
            </div>
          </div>
        </div>

        {/* Features */}
        <div style={{ padding: '5rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#111827', marginBottom: '3rem' }}>
              Neden <span style={{ color: '#22c55e' }}>HayvanPazarı.com</span>?
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              {[
                { icon: '🛡️', title: 'Güvenli Alışveriş', desc: 'Onaylı kullanıcılar ve güvenilir ilanlar' },
                { icon: '⚡', title: 'Hızlı İlan', desc: 'Dakikalar içinde ilanınızı oluşturun' },
                { icon: '👥', title: 'Geniş Ağ', desc: 'Türkiye\'nin dört bir yanından kullanıcılar' },
                { icon: '🎧', title: '7/24 Destek', desc: 'Uzman destek ekibimiz her zaman yanınızda' },
              ].map((feature, idx) => (
                <div key={idx} style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                  <h3 style={{ color: '#166534', marginBottom: '0.5rem' }}>{feature.title}</h3>
                  <p style={{ color: '#6b7280' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
          padding: '4rem 2rem', 
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hemen İlan Verin</h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9 }}>
            Hayvanlarınızı binlerce potansiyel alıcıya ulaştırın
          </p>
          <a href="/ilan-ver" style={{ 
            background: 'white', 
            color: '#166534', 
            padding: '1rem 2.5rem', 
            borderRadius: '0.5rem', 
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.125rem'
          }}>
            Ücretsiz İlan Ver
          </a>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
