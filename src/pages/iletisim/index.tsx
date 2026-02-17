'use client';

import Head from 'next/head';
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Head>
        <title>İletişim | HayvanPazarı.com</title>
        <meta name="description" content="Bizimle iletişime geçin" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            İletişim
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem' }}>
            Bizimle iletişime geçmek için formu doldurun
          </p>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '2rem', color: '#111827', marginBottom: '2rem' }}>
                İletişim Bilgilerimiz
              </h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    📍
                  </div>
                  <div>
                    <h3 style={{ color: '#111827', fontWeight: 600 }}>Adres</h3>
                    <p style={{ color: '#6b7280' }}>Konya Teknopark, Selçuklu/Konya</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    📞
                  </div>
                  <div>
                    <h3 style={{ color: '#111827', fontWeight: 600 }}>Telefon</h3>
                    <p style={{ color: '#6b7280' }}>0332 123 45 67</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    ✉️
                  </div>
                  <div>
                    <h3 style={{ color: '#111827', fontWeight: 600 }}>E-posta</h3>
                    <p style={{ color: '#6b7280' }}>info@hayvanpazari.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '50px', height: '50px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    🕐
                  </div>
                  <div>
                    <h3 style={{ color: '#111827', fontWeight: 600 }}>Çalışma Saatleri</h3>
                    <p style={{ color: '#6b7280' }}>Pzt-Cuma: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 style={{ color: '#111827', fontWeight: 600, marginBottom: '1rem' }}>Sosyal Medya</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#22c55e',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        textDecoration: 'none',
                        fontSize: '0.75rem'
                      }}
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: '1.5rem' }}>
                Bize Mesaj Gönderin
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    placeholder="Adınızı girin"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                    placeholder="ornek@email.com"
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Konu
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
                  >
                    <option value="">Seçiniz</option>
                    <option value="general">Genel Bilgi</option>
                    <option value="support">Teknik Destek</option>
                    <option value="complaint">Şikayet</option>
                    <option value="partnership">İş Birliği</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                    Mesajınız
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', resize: 'vertical' }}
                    placeholder="Mesajınızı yazın..."
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
