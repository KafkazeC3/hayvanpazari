'use client';

import Head from 'next/head';
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { categories } from '@/data/mockListings';
import { sortedCities, getDistricts } from '@/data/cities';

export default function CreateListingPage() {
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    city: '',
    district: '',
    description: '',
    phone: '',
    images: [] as string[]
  });

  const districts = selectedCity ? getDistricts(selectedCity) : [];

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setFormData({ ...formData, city: cityName, district: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('İlanınız başarıyla oluşturuldu! Onay sürecinden sonra yayınlanacak.');
  };

  return (
    <>
      <Head>
        <title>Ücretsiz İlan Ver | HayvanPazarı.com</title>
        <meta name="description" content="Hayvanınızı ücretsiz ilan verin" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '3rem 2rem', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Ücretsiz İlan Ver
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>
            Hayvanınızı dakikalar içinde binlerce kişiye ulaştırın
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
          {/* Steps */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: step >= s ? '#22c55e' : '#e5e7eb',
                  color: step >= s ? 'white' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {s}
                </div>
                {s < 3 && <div style={{ width: '60px', height: '2px', background: step > s ? '#22c55e' : '#e5e7eb' }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1.5rem' }}>Temel Bilgiler</h2>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    İlan Başlığı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    placeholder="Örn: 3 Yaşında Holstein İneği"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Kategori *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                  >
                    <option value="">Kategori Seçin</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Fiyat (TL) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    placeholder="45000"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Şehir *
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                  >
                    <option value="">Şehir Seçin</option>
                    {sortedCities.map(city => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    İlçe *
                  </label>
                  <select
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    disabled={!selectedCity}
                    style={{ 
                      width: '100%', 
                      padding: '0.75rem', 
                      border: '1px solid #d1d5db', 
                      borderRadius: '0.5rem',
                      backgroundColor: !selectedCity ? '#f3f4f6' : 'white'
                    }}
                  >
                    <option value="">{selectedCity ? 'İlçe Seçin' : 'Önce şehir seçin'}</option>
                    {districts.map(district => (
                      <option key={district.id} value={district.name}>{district.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Devam Et →
                </button>
              </div>
            )}

            {/* Step 2: Description */}
            {step === 2 && (
              <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1.5rem' }}>Detaylı Bilgiler</h2>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Açıklama *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    placeholder="Hayvanınızın özellikleri, yaşı, sağlık durumu vb."
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    İletişim Telefonu *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    placeholder="0555 123 4567"
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: '#e5e7eb',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ← Geri
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Devam Et →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Images & Submit */}
            {step === 3 && (
              <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1.5rem' }}>Fotoğraflar</h2>
                
                <div style={{ 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '0.5rem', 
                  padding: '3rem', 
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📷</div>
                  <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                    Fotoğrafları sürükleyip bırakın veya tıklayarak seçin
                  </p>
                  <input type="file" multiple accept="image/*" style={{ display: 'none' }} />
                  <button
                    type="button"
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#f3f4f6',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer'
                    }}
                  >
                    Fotoğraf Seç
                  </button>
                </div>

                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
                  <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                    ℹ️ İpuçları:
                  </p>
                  <ul style={{ color: '#92400e', fontSize: '0.875rem', margin: '0.5rem 0 0 1rem' }}>
                    <li>En az 3 fotoğraf yükleyin</li>
                    <li>Hayvanı farklı açılardan çekin</li>
                    <li>Gün ışığında çekim yapın</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: '#e5e7eb',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    ← Geri
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.5rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    İlanı Yayınla 🚀
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
