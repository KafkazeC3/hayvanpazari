'use client';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { mockListings } from '@/data/mockListings';

export default function ListingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const listing = mockListings.find(l => l.id === id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  if (!listing) {
    return (
      <>
        <Head>
          <title>İlan Bulunamadı | HayvanPazarı.com</title>
        </Head>
        <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
          <NavbarSimple />
          <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', color: '#111827', marginBottom: '1rem' }}>İlan Bulunamadı</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Aradığınız ilan mevcut değil veya kaldırılmış.</p>
            <a href="/ilanlar" style={{ 
              background: '#22c55e', 
              color: 'white', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.5rem', 
              textDecoration: 'none' 
            }}>
              İlanlara Dön
            </a>
          </div>
          <FooterSimple />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{listing.title} | HayvanPazarı.com</title>
        <meta name="description" content={listing.description} />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: '2rem', color: '#6b7280' }}>
            <a href="/" style={{ color: '#22c55e', textDecoration: 'none' }}>Anasayfa</a>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <a href="/ilanlar" style={{ color: '#22c55e', textDecoration: 'none' }}>İlanlar</a>
            <span style={{ margin: '0 0.5rem' }}>/</span>
            <span style={{ color: '#111827' }}>{listing.title}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Image */}
            <div>
              <div style={{ 
                borderRadius: '1rem', 
                overflow: 'hidden', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                background: 'white'
              }}>
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <div style={{ 
                background: 'white', 
                padding: '2rem', 
                borderRadius: '1rem', 
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ 
                  display: 'inline-block',
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '0.25rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  {listing.category}
                </div>
                
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                  {listing.title}
                </h1>
                
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '2rem' }}>
                  {formatPrice(listing.price)}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                    <span>📍</span>
                    <span>{listing.city}, {listing.district}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                    <span>📅</span>
                    <span>{listing.date}</span>
                  </div>
                </div>

                <a 
                  href={`tel:${listing.seller.phone}`}
                  style={{
                    display: 'block',
                    background: '#22c55e',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    marginBottom: '1rem'
                  }}
                >
                  📞 {listing.seller.phone}
                </a>

                <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Satıcı</div>
                  <div style={{ fontWeight: 600, color: '#111827' }}>{listing.seller.name}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '1rem', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            marginTop: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              İlan Açıklaması
            </h2>
            <p style={{ color: '#374151', lineHeight: '1.75', fontSize: '1.125rem' }}>
              {listing.description}
            </p>
          </div>

          {/* Safety Tips */}
          <div style={{ 
            background: '#fef3c7', 
            padding: '1.5rem', 
            borderRadius: '0.75rem', 
            marginTop: '2rem',
            border: '1px solid #fcd34d'
          }}>
            <h3 style={{ color: '#92400e', fontWeight: 600, marginBottom: '0.5rem' }}>⚠️ Güvenlik İpuçları</h3>
            <ul style={{ color: '#92400e', margin: 0, paddingLeft: '1.5rem' }}>
              <li>İlk görüşmede kapora göndermeyin</li>
              <li>Mümkünse görüntülü görüşme yapın</li>
              <li>Hayvanı canlı görmeden ödeme yapmayın</li>
              <li>Şüpheli durumlarda bize bildirin</li>
            </ul>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
