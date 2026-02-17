'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { FavoriteButton } from '@/components/FavoriteButton';
import { useFavorites } from '@/hooks/useFavorites';
import { mockListings } from '@/data/mockListings';
import { MapPin, Calendar, Phone, User, ChevronLeft, ChevronRight, X, Heart, Share2, Flag, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Benzer İlanlar Komponenti
function SimilarListings({ currentListing }: { currentListing: typeof mockListings[0] }) {
  const similarListings = mockListings
    .filter(l => l.id !== currentListing.id && l.category === currentListing.category)
    .slice(0, 4);
  
  if (similarListings.length === 0) return null;

  return (
    <div style={{ marginTop: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
          Benzer İlanlar
        </h2>
        <Link 
          href={`/ilanlar?category=${currentListing.category}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#22c55e',
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          Tümünü Gör
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {similarListings.map(listing => (
          <Link
            key={listing.id}
            href={`/ilan/${listing.id}`}
            style={{
              background: 'white',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            <div style={{ position: 'relative', height: '160px' }}>
              <img 
                src={listing.images?.[0] || listing.image} 
                alt={listing.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0.5rem',
                left: '0.5rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                {new Intl.NumberFormat('tr-TR').format(listing.price)} ₺
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ 
                fontWeight: 600, 
                color: '#111827', 
                marginBottom: '0.5rem',
                fontSize: '0.9375rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {listing.title}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                📍 {listing.city}, {listing.district}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ListingDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
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

  const images = listing.images || [listing.image || 'https://via.placeholder.com/800x600?text=No+Image'];
  const mainImage = images[selectedImage];

  return (
    <>
      <Head>
        <title>{listing.title} | HayvanPazarı.com</title>
        <meta name="description" content={`${listing.description.slice(0, 155)}... Fiyat: ${formatPrice(listing.price)} - ${listing.city}`} />
        <meta name="keywords" content={`${listing.category}, ${listing.city}, hayvan, satılık, ${listing.title.toLowerCase()}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={listing.title} />
        <meta property="og:description" content={listing.description.slice(0, 155)} />
        <meta property="og:image" content={images[0]} />
        <meta property="og:url" content={`https://hayvanpazari.com/ilan/${listing.id}`} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={listing.price.toString()} />
        <meta property="product:price:currency" content="TRY" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={listing.title} />
        <meta name="twitter:description" content={listing.description.slice(0, 155)} />
        <meta name="twitter:image" content={images[0]} />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://hayvanpazari.com/ilan/${listing.id}`} />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": listing.title,
            "description": listing.description,
            "image": images,
            "offers": {
              "@type": "Offer",
              "price": listing.price,
              "priceCurrency": "TRY",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Person",
                "name": listing.seller.name
              }
            },
            "category": listing.category,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": "10"
            }
          })
        }} />
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
            {/* Image Gallery */}
            <div>
              <div style={{ 
                borderRadius: '1rem', 
                overflow: 'hidden', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                background: 'white',
                position: 'relative'
              }}>
                <img 
                  src={mainImage} 
                  alt={listing.title}
                  style={{ width: '100%', height: '400px', objectFit: 'cover', cursor: 'zoom-in' }}
                  onClick={() => setLightboxOpen(true)}
                />
                
                {/* Image Counter */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500
                }}>
                  {selectedImage + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ 
                  display: 'flex', 
                  gap: '0.75rem', 
                  marginTop: '1rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem'
                }}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        flexShrink: 0,
                        width: '80px',
                        height: '80px',
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        border: selectedImage === idx ? '3px solid #22c55e' : '3px solid transparent',
                        padding: 0,
                        cursor: 'pointer'
                      }}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>
              )}
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

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                    <MapPin className="w-5 h-5 text-green-500" />
                    <span>{listing.city}, {listing.district}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280' }}>
                    <Calendar className="w-5 h-5" />
                    <span>{listing.date}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <FavoriteButton listingId={listing.id} size="lg" variant="default" />
                  </div>
                  <button 
                    onClick={() => {
                      const text = `HayvanPazarı.com'da ilan buldum: ${listing.title} - ${formatPrice(listing.price)}`;
                      const url = `https://wa.me/?text=${encodeURIComponent(text + '\n' + window.location.href)}`;
                      window.open(url, '_blank');
                    }}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem',
                      border: '1px solid #22c55e',
                      borderRadius: '0.5rem',
                      background: '#22c55e',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </button>
                  <button 
                    style={{
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      background: 'white',
                      color: '#6b7280',
                      cursor: 'pointer'
                    }}
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>

                <a 
                  href={`/mesajlar?to=${listing.id}&listingId=${listing.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
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
                  <MessageCircle className="w-5 h-5" />
                  Mesaj Gönder
                </a>

                <a 
                  href={`tel:${listing.seller.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    marginBottom: '1rem'
                  }}
                >
                  <Phone className="w-5 h-5" />
                  {listing.seller.phone}
                </a>

                <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Satıcı</div>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{listing.seller.name}</div>
                  </div>
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
            <p style={{ color: '#374151', lineHeight: '1.75', fontSize: '1.125rem', whiteSpace: 'pre-line' }}>
              {listing.description}
            </p>
          </div>

          {/* Similar Listings */}
          <SimilarListings currentListing={listing} />

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

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1);
                }}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1);
                }}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: 'white',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <img 
            src={mainImage}
            alt={listing.title}
            style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />

          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            background: 'rgba(0,0,0,0.5)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px'
          }}>
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
