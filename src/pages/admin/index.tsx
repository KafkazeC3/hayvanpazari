'use client';

import Head from 'next/head';
import { useState } from 'react';
import { NavbarSimple } from '@/components/NavbarSimple';
import { FooterSimple } from '@/components/FooterSimple';
import { mockListings } from '@/data/mockListings';

export default function AdminDashboard() {
  const [period, setPeriod] = useState('week');

  const stats = [
    { title: 'Toplam Kullanıcı', value: '3,456', change: '+12%', color: '#3b82f6' },
    { title: 'Toplam İlan', value: '5,234', change: '+8%', color: '#22c55e' },
    { title: 'Bekleyen İlan', value: '45', change: '5 yeni', color: '#f59e0b' },
    { title: 'Toplam Görüntülenme', value: '128.5K', change: '+24%', color: '#8b5cf6' },
  ];

  const recentUsers = [
    { name: 'Ali Yılmaz', email: 'ali@email.com', date: '2024-02-17' },
    { name: 'Ayşe Demir', email: 'ayse@email.com', date: '2024-02-17' },
    { name: 'Mehmet Kaya', email: 'mehmet@email.com', date: '2024-02-16' },
    { name: 'Fatma Şahin', email: 'fatma@email.com', date: '2024-02-16' },
    { name: 'Hasan Çelik', email: 'hasan@email.com', date: '2024-02-15' },
  ];

  const recentListings = mockListings.slice(0, 5);

  return (
    <>
      <Head>
        <title>Admin Panel | HayvanPazarı.com</title>
      </Head>
      
      <div style={{ minHeight: '100vh', background: '#f3f4f6' }}>
        <NavbarSimple />
        
        <div style={{ display: 'flex' }}>
          {/* Sidebar */}
          <div style={{ width: '250px', background: '#1f2937', minHeight: 'calc(100vh - 64px)', padding: '1.5rem' }}>
            <div style={{ color: '#22c55e', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              🐄 Admin Panel
            </div>
            
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { icon: '📊', label: 'Dashboard', active: true, href: '/admin' },
                { icon: '👥', label: 'Kullanıcılar', href: '/admin/kullanicilar' },
                { icon: '📋', label: 'İlanlar', href: '/admin/ilanlar' },
                { icon: '🏷️', label: 'Kategoriler', href: '/admin/kategoriler' },
                { icon: '⚙️', label: 'Ayarlar', href: '/admin/ayarlar' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    background: item.active ? '#22c55e' : 'transparent',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'background 0.2s'
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: '2rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', color: '#111827' }}>Dashboard</h1>
              <select 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
                style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem' }}
              >
                <option value="today">Bugün</option>
                <option value="week">Bu Hafta</option>
                <option value="month">Bu Ay</option>
                <option value="year">Bu Yıl</option>
              </select>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {stats.map((stat, idx) => (
                <div key={idx} style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{stat.title}</div>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: stat.color, 
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem'
                    }}>
                      📈
                    </div>
                  </div>
                  <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: stat.color }}>
                    {stat.change} bu {period === 'today' ? 'gün' : period === 'week' ? 'hafta' : period === 'month' ? 'ay' : 'yıl'}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {/* Recent Users */}
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.125rem', color: '#111827', marginBottom: '1rem' }}>Son Kayıt Olanlar</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recentUsers.map((user, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 500, color: '#111827' }}>{user.name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{user.email}</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{user.date}</div>
                    </div>
                  ))}
                </div>
                <a href="/admin/kullanicilar" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#22c55e', textDecoration: 'none' }}>
                  Tümünü Gör →
                </a>
              </div>

              {/* Recent Listings */}
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.125rem', color: '#111827', marginBottom: '1rem' }}>Son Eklenen İlanlar</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recentListings.map((listing) => (
                    <div key={listing.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                      <div>
                        <div style={{ fontWeight: 500, color: '#111827', fontSize: '0.875rem' }}>{listing.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{listing.seller.name}</div>
                      </div>
                      <div style={{ 
                        padding: '0.25rem 0.75rem', 
                        background: '#dcfce7', 
                        color: '#166534', 
                        borderRadius: '9999px', 
                        fontSize: '0.75rem' 
                      }}>
                        Onaylı
                      </div>
                    </div>
                  ))}
                </div>
                <a href="/admin/ilanlar" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#22c55e', textDecoration: 'none' }}>
                  Tümünü Gör →
                </a>
              </div>
            </div>
          </div>
        </div>

        <FooterSimple />
      </div>
    </>
  );
}
