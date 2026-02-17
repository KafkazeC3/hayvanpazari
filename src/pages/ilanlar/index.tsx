'use client';

import { useState } from 'react';
import Head from 'next/head';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { mockListings, categories } from '@/data/mockListings';
import { sortedCities, getDistricts } from '@/data/cities';

export default function ListingsPage() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  
  const districts = selectedCity ? getDistricts(selectedCity) : [];

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setSelectedDistrict('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  return (
    <>
      <Head>
        <title>İlanlar | HayvanPazarı.com</title>
        <meta name="description" content="Satılık hayvan ilanları - Büyükbaş, küçükbaş, kanatlı hayvanlar ve daha fazlası" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              İlanlar
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem' }}>
              {mockListings.length}+ aktif ilan arasından size uygun olanı bulun
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          {/* Filter Bar */}
          <div style={{ 
            background: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.75rem', 
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <select style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', minWidth: '180px' }}>
              <option value="">Tüm Kategoriler</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <select 
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', minWidth: '180px' }}
            >
              <option value="">Tüm Şehirler</option>
              {sortedCities.map(city => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}
            </select>
            
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedCity}
              style={{ 
                padding: '0.75rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem', 
                minWidth: '180px',
                backgroundColor: !selectedCity ? '#f3f4f6' : 'white'
              }}
            >
              <option value="">{selectedCity ? 'Tüm İlçeler' : 'Önce şehir seçin'}</option>
              {districts.map(district => (
                <option key={district.id} value={district.name}>{district.name}</option>
              ))}
            </select>
            
            <select style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', minWidth: '150px' }}>
              <option value="">Sıralama</option>
              <option value="newest">En Yeni</option>
              <option value="price_asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price_desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
            
            <input 
              type="text" 
              placeholder="İlan ara..." 
              style={{ 
                flex: 1, 
                minWidth: '200px', 
                padding: '0.75rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '0.5rem' 
              }} 
            />
          </div>

          {/* Listings Grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}>
            {mockListings.map((listing) => (
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
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img 
                    src={listing.image} 
                    alt={listing.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ 
                    position: 'absolute', 
                    top: '0.75rem', 
                    left: '0.75rem',
                    background: 'rgba(34, 197, 94, 0.9)',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {listing.category}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 600, 
                    color: '#111827', 
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {listing.title}
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.875rem', 
                    marginBottom: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {listing.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#16a34a' }}>
                      {formatPrice(listing.price)}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      {listing.date}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      📍 {listing.city}, {listing.district}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#22c55e', fontWeight: 500 }}>
                      {listing.seller.name}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'white', cursor: 'pointer' }}>Önceki</button>
            <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', background: '#22c55e', color: 'white', cursor: 'pointer' }}>1</button>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'white', cursor: 'pointer' }}>2</button>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'white', cursor: 'pointer' }}>3</button>
            <button style={{ padding: '0.5rem 1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', background: 'white', cursor: 'pointer' }}>Sonraki</button>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
