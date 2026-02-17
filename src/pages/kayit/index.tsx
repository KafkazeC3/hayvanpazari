'use client';

import Head from 'next/head';
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert('Şifreler eşleşmiyor!');
      return;
    }
    alert('Kayıt işlemi başarılı! Giriş yapabilirsiniz.');
  };

  return (
    <>
      <Head>
        <title>Kayıt Ol | HayvanPazarı.com</title>
        <meta name="description" content="Ücretsiz hesap oluşturun" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}>
        <NavbarSimple />
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '3rem', 
            borderRadius: '1rem', 
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', 
            maxWidth: '450px', 
            width: '100%'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
              <h1 style={{ color: '#166534', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Aramıza Katılın
              </h1>
              <p style={{ color: '#6b7280' }}>Ücretsiz hesap oluşturun</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                  placeholder="Ahmet Yılmaz"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                  E-posta
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{ width: '100%', padding: '0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                  placeholder="ornek@email.com"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Telefon
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{ width: '100%', padding: '0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                  placeholder="0555 123 4567"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Şifre
                </label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  style={{ width: '100%', padding: '0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                  placeholder="••••••••"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#374151', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Şifre Tekrar
                </label>
                <input
                  type="password"
                  required
                  value={formData.passwordConfirm}
                  onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
                  style={{ width: '100%', padding: '0.875rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem' }}
                  placeholder="••••••••"
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                  <input type="checkbox" required style={{ marginTop: '0.25rem' }} />
                  <span>
                    <a href="/kullanim-kosullari" style={{ color: '#22c55e' }}>Kullanım Koşulları</a>'nı ve{' '}
                    <a href="/gizlilik" style={{ color: '#22c55e' }}>Gizlilik Politikası</a>'nı kabul ediyorum.
                  </span>
                </label>
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
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginBottom: '1.5rem'
                }}
              >
                Hesap Oluştur
              </button>

              <p style={{ textAlign: 'center', color: '#6b7280' }}>
                Zaten hesabınız var mı?{' '}
                <a href="/giris" style={{ color: '#166534', fontWeight: 600, textDecoration: 'none' }}>
                  Giriş Yapın
                </a>
              </p>
            </form>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
