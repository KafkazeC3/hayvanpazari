'use client';



export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle, Users, TrendingUp, Award } from 'lucide-react';

export const metadata = {
  title: 'Hakkımızda | HayvanPazarı.com',
  description: 'Türkiye\'nin en büyük hayvan alım satım platformu HayvanPazarı.com hakkında bilgi edinin.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Hakkımızda</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Türkiye&apos;nin en güvenilir ve en büyük hayvan alım satım platformu olarak 2020&apos;den beri hizmetinizdeyiz.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-earth-800 mb-6">Hikayemiz</h2>
            <p className="text-earth-600 leading-relaxed mb-4">
              HayvanPazarı.com, çiftçiler ve hayvan üreticileri için güvenli, hızlı ve kolay bir alım satım platformu oluşturma hayaliyle yola çıktı. 
              Teknolojinin gücünü tarım sektörüyle birleştirerek, Türkiye&apos;nin dört bir yanından binlerce üreticiyi ve alıcıyı bir araya getiriyoruz.
            </p>
            <p className="text-earth-600 leading-relaxed mb-4">
              2020 yılında Konya&apos;da kurulan platformumuz, kısa sürede sektörün öncü isimlerinden biri haline geldi. 
              Büyükbaş ve küçükbaş hayvan ticaretinde şeffaflık ve güvenilirlik ilkeleriyle hareket ediyoruz.
            </p>
            <p className="text-earth-600 leading-relaxed">
              Bugün 81 ilde faaliyet gösteren platformumuzda 5.000&apos;den fazla aktif ilan ve 3.000&apos;den fazla kayıtlı kullanıcı bulunmaktadır. 
              Amacımız, hayvan ticaretini modern ve güvenilir bir hale getirmektir.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-earth-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-earth-800 mb-4">Değerlerimiz</h2>
            <p className="text-earth-500">Her işlemde önceliğimiz güven ve şeffaflıktır.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: 'Güvenilirlik', desc: 'Onaylı satıcılar ve doğrulanmış ilanlar' },
              { icon: Users, title: 'Topluluk', desc: 'Binlerce üreticiyi bir araya getiriyoruz' },
              { icon: TrendingUp, title: 'Gelişim', desc: 'Sürekli kendini yenileyen platform' },
              { icon: Award, title: 'Kalite', desc: 'Yüksek standartlarda hizmet' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-card text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-nature-100 flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-nature-600" />
                </div>
                <h3 className="font-bold text-earth-800 mb-2">{item.title}</h3>
                <p className="text-sm text-earth-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5.000+', label: 'Aktif İlan' },
              { value: '3.000+', label: 'Kayıtlı Kullanıcı' },
              { value: '10.000+', label: 'Başarılı İşlem' },
              { value: '81', label: 'İl' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-nature-600 mb-2">{stat.value}</div>
                <div className="text-earth-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
