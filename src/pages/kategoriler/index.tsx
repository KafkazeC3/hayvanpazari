'use client';

import Head from 'next/head';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { categories } from '@/data/mockListings';

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>Kategoriler | HayvanPazarı.com</title>
        <meta name="description" content="Hayvan kategorileri - Büyükbaş, küçükbaş, kanatlı hayvanlar ve daha fazlası" />
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <NavbarSimple />
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', padding: '4rem 2rem', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Kategoriler
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem' }}>
            Aradığınız hayvan kategorisini seçin
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/ilanlar?category=${category.id}`}
                style={{
                  background: 'white',
                  padding: '2.5rem',
                  borderRadius: '1rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: '4px',
                  background: 'linear-gradient(90deg, #22c55e, #16a34a)'
                }} />
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>{category.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#111827', 
                  marginBottom: '0.5rem' 
                }}>
                  {category.name}
                </h3>
                <p style={{ color: '#22c55e', fontWeight: 600 }}>
                  {category.count.toLocaleString('tr-TR')} ilan
                </p>
              </a>
            ))}
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
