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
        <meta name="description" content="HayvanPazarı.com ile güvenli ve hızlı şekilde hayvan alım satımı yapın." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavbarModern />
        <HeroModern />

        {/* Categories Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategoriler</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              İhtiyacınız olan kategoriyi seçin, binlerce ilan arasından size en uygununu bulun.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.id}
                href={`/ilanlar?category=${category.id}`}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-green-600 text-sm font-medium">{category.count} ilan</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/kategoriler"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              Tüm Kategoriler
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Recent Listings Section */}
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
                { icon: Shield, title: 'Güvenli Alışveriş', desc: 'Onaylı kullanıcılar ve güvenilir ilanlar' },
                { icon: Clock, title: 'Hızlı İlan', desc: 'Dakikalar içinde ilanınızı oluşturun' },
                { icon: Users, title: 'Geniş Ağ', desc: 'Türkiye\'nin dört bir yanından kullanıcılar' },
                { icon: Headphones, title: '7/24 Destek', desc: 'Uzman destek ekibimiz yanınızda' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              ))}
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
      </div>
    </>
  );
}
