'use client';

import Head from 'next/head';
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Giriş yapılıyor...');
  };

  return (
    <>
      <Head>
        <title>Giriş Yap | HayvanPazarı.com</title>
        <meta name="description" content="Hesabınıza giriş yapın" />
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
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🐄</div>
              <h1 style={{ color: '#166534', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Tekrar Hoşgeldiniz
              </h1>
              <p style={{ color: '#6b7280' }}>Hesabınıza giriş yapın</p>
            </div>
            
            <form onSubmit={handleSubmit}>
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

              <div style={{ marginBottom: '1.5rem' }}>
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

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                  <input type="checkbox" /> Beni hatırla
                </label>
                <a href="#" style={{ color: '#22c55e', fontSize: '0.875rem', textDecoration: 'none' }}>
                  Şifremi unuttum
                </a>
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
                Giriş Yap
              </button>

              <div style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem' }}>
                veya
              </div>

              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '1.5rem'
                }}
              >
                Google ile Giriş Yap
              </button>

              <p style={{ textAlign: 'center', color: '#6b7280' }}>
                Hesabınız yok mu?{' '}
                <a href="/kayit" style={{ color: '#166534', fontWeight: 600, textDecoration: 'none' }}>
                  Hemen Kaydolun
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
