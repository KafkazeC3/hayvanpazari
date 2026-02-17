'use client';

import Head from 'next/head';
import Link from 'next/link';
import { NavbarModern } from '@/components/NavbarModern';
import { HeroModern } from '@/components/HeroModern';
import { ListingCardModern } from '@/components/ListingCardModern';
import { FooterModern } from '@/components/FooterModern';
import { mockListings, categories } from '@/data/mockListings';
import { Shield, Clock, Users, Headphones, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const recentListings = mockListings.slice(0, 8);

  return (
    <>
      <Head>
        <title>HayvanPazarı.com - Türkiye'nin En Büyük Hayvan Pazarı</title>
        <meta name="description" content="Türkiye'nin en güvenilir hayvan pazarı. Büyükbaş, küçükbaş, kanatlı hayvanlar ve daha fazlası. Ücretsiz ilan ver, hemen satış yap!" />
        <meta name="keywords" content="hayvan pazarı, satılık inek, satılık koyun, satılık keçi, büyükbaş hayvan, küçükbaş hayvan, hayvan alım satım" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HayvanPazarı.com - Türkiye'nin En Büyük Hayvan Pazarı" />
        <meta property="og:description" content="Türkiye'nin en güvenilir hayvan pazarı. Ücretsiz ilan ver, hemen satış yap!" />
        <meta property="og:image" content="https://hayvanpazari.com/og-image.jpg" />
        <meta property="og:url" content="https://hayvanpazari.com" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HayvanPazarı.com" />
        <meta name="twitter:description" content="Türkiye'nin en güvenilir hayvan pazarı" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://hayvanpazari.com" />
        
        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "HayvanPazarı.com",
            "url": "https://hayvanpazari.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://hayvanpazari.com/ilanlar?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HayvanPazarı.com",
            "url": "https://hayvanpazari.com",
            "logo": "https://hayvanpazari.com/logo.png",
            "sameAs": [
              "https://facebook.com/hayvanpazari",
              "https://instagram.com/hayvanpazari"
            ]
          })
        }} />
      </Head>

      <main>
        <NavbarModern />
        <HeroModern />

        {/* Recent Listings Section -->
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Son İlanlar</h2>
                <p className="text-gray-600">En yeni ilanları keşfedin, fırsatları kaçırmayın.</p>
              </div>
              <Link 
                href="/ilanlar"
                className="hidden md:inline-flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors"
              >
                Tüm İlanları Gör
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentListings.map((listing) => (
                <ListingCardModern key={listing.id} {...listing} />
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link 
                href="/ilanlar"
                className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition-colors"
              >
                Tüm İlanları Gör
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Neden Biz?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Binlerce kullanıcının tercih ettiği platformun avantajlarından siz de yararlanın.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Güvenli Alışveriş', desc: 'Onaylı kullanıcılar ve güvenilir ilanlar' },
                { title: 'Hızlı İlan', desc: 'Dakikalar içinde ilanınızı oluşturun' },
                { title: 'Geniş Ağ', desc: 'Türkiye\'nin dört bir yanından kullanıcılar' },
                { title: '7/24 Destek', desc: 'Uzman destek ekibimiz yanınızda' },
              ].map((feature, idx) => {
                const icons = [
                  <svg key="1" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
                  <svg key="2" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                  <svg key="3" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
                  <svg key="4" className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
                ];
                return (
                  <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      {icons[idx]}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-green-500 to-green-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="max-w-4xl mx-auto px-4 text-center relative">
            <h2 className="text-4xl font-bold text-white mb-6">
              Hemen İlan Verin
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Hayvanlarınızı veya çiftlik ürünlerinizi binlerce potansiyel alıcıya ulaştırın. 
              Ücretsiz ilan vermek için hemen başlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/ilan-ver"
                className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Ücretsiz İlan Ver
              </Link>
              <Link 
                href="/ilanlar"
                className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-800 transition-colors"
              >
                İlanları İncele
              </Link>
            </div>
          </div>
        </section>

        <FooterModern />
      </main>
    </>
  );
}
