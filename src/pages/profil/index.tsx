'use client';

import Head from 'next/head';
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { mockListings } from '@/data/mockListings';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('listings');
  const userListings = mockListings.slice(0, 3);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR').format(price) + ' ₺';
  };

  return (
    <>
      <Head>
        <title>Profilim | HayvanPazarı.com</title>
        <meta name="description" content="Profilim ve ilanlarım" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        {/* Cover */}
        <div style={{ height: '200px', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', marginTop: '-100px' }}>
            {/* Sidebar */}
            <div>
              {/* Profile Card */}
              <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  background: '#dcfce7', 
                  borderRadius: '50%', 
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  border: '4px solid white'
                }}>
                  👨‍🌾
                </div>
                <h2 style={{ color: '#111827', marginBottom: '0.25rem' }}>Ahmet Yılmaz</h2>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>ahmet@email.com</p>
                <div style={{ 
                  display: 'inline-block',
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '0.25rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  ✓ Doğrulanmış
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#111827' }}>5</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>İlan</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#111827' }}>12</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Favori</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 'bold', color: '#111827' }}>4.8</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Puan</div>
                  </div>
                </div>
              </div>

              {/* Menu */}
              <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                {[
                  { id: 'listings', label: '📋 İlanlarım', href: '#' },
                  { id: 'favorites', label: '❤️ Favorilerim', href: '#' },
                  { id: 'messages', label: '💬 Mesajlarım', href: '#' },
                  { id: 'settings', label: '⚙️ Ayarlar', href: '#' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      border: 'none',
                      background: activeTab === item.id ? '#dcfce7' : 'white',
                      color: activeTab === item.id ? '#166534' : '#374151',
                      cursor: 'pointer',
                      fontWeight: activeTab === item.id ? 600 : 400,
                      borderLeft: activeTab === item.id ? '4px solid #22c55e' : '4px solid transparent'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div>
              {activeTab === 'listings' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', color: '#111827' }}>İlanlarım</h2>
                    <a href="/ilan-ver" style={{ background: '#22c55e', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
                      + Yeni İlan
                    </a>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {userListings.map((listing) => (
                      <div key={listing.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', gap: '1.5rem' }}>
                        <img src={listing.image} alt={listing.title} style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                        <div style={{ flex: 1 }}>
                          <h3 style={{ color: '#111827', marginBottom: '0.25rem' }}>{listing.title}</h3>
                          <p style={{ color: '#22c55e', fontWeight: 600, marginBottom: '0.5rem' }}>{formatPrice(listing.price)}</p>
                          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>📍 {listing.city} • 📅 {listing.date}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <button style={{ padding: '0.5rem 1rem', background: '#22c55e', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                            Düzenle
                          </button>
                          <button style={{ padding: '0.5rem 1rem', background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}>
                            Sil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❤️</div>
                  <h3 style={{ color: '#111827', marginBottom: '0.5rem' }}>Henüz favori ilanınız yok</h3>
                  <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Beğendiğiniz ilanları favorilere ekleyebilirsiniz</p>
                  <a href="/ilanlar" style={{ background: '#22c55e', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
                    İlanları Keşfet
                  </a>
                </div>
              )}

              {activeTab === 'messages' && (
                <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
                  <h3 style={{ color: '#111827', marginBottom: '0.5rem' }}>Henüz mesajınız yok</h3>
                  <p style={{ color: '#6b7280' }}>İlan sahipleriyle iletişime geçmek için mesaj gönderebilirsiniz</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem' }}>
                  <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1.5rem' }}>Hesap Ayarları</h2>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                      Ad Soyad
                    </label>
                    <input type="text" defaultValue="Ahmet Yılmaz" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                      E-posta
                    </label>
                    <input type="email" defaultValue="ahmet@email.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                      Telefon
                    </label>
                    <input type="tel" defaultValue="0555 123 4567" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }} />
                  </div>

                  <button style={{ background: '#22c55e', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>
                    Değişiklikleri Kaydet
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <FooterSimple />
        </div>
      </div>
    </>
  );
}
