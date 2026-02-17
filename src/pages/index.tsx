'use client';



import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { CategorySection } from '@/components/home/CategorySection';
import { RecentListings } from '@/components/home/RecentListings';
import { Shield, Clock, Users, Headphones, CheckCircle, TrendingUp } from 'lucide-react';

const features = [
  { icon: Shield, title: 'Güvenli Alışveriş', description: 'Onaylı kullanıcılar ve güvenilir ilanlarla güvenle alışveriş yapın.' },
  { icon: Clock, title: 'Hızlı İlan', description: 'Dakikalar içinde ilanınızı oluşturun, binlerce kişiye ulaşın.' },
  { icon: Users, title: 'Geniş Ağ', description: 'Türkiye\'nin dört bir yanından alıcı ve satıcılarla bağlantı kurun.' },
  { icon: Headphones, title: '7/24 Destek', description: 'Uzman destek ekibimiz her zaman yanınızda.' },
];

const stats = [
  { value: '5.000+', label: 'Aktif İlan', icon: TrendingUp },
  { value: '3.000+', label: 'Kayıtlı Kullanıcı', icon: Users },
  { value: '10.000+', label: 'Başarılı İşlem', icon: CheckCircle },
  { value: '81', label: 'Şehir', icon: Shield },
];


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CategorySection />
      <RecentListings />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-earth-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-nature-100 text-nature-700 font-semibold text-sm uppercase tracking-wider mb-4">
              Neden Biz?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-earth-800 mt-3">
              HayvanPazarı.com Avantajları
            </h2>
            <p className="text-earth-500 mt-4 text-lg">
              Binlerce kullanıcının tercih ettiği platformun avantajlarından siz de yararlanın.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="group text-center p-8 rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 border border-earth-100"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-nature-100 to-nature-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="h-8 w-8 text-nature-600" />
                  </div>
                  <h3 className="text-lg font-bold text-earth-800 mb-2">{feature.title}</h3>
                  <p className="text-sm text-earth-500 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-nature-600 to-nature-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-harvest-500 to-harvest-600" />
            <div 
              className="absolute inset-0 opacity-20" 
              style={{ 
                backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }} 
            />
            <div className="relative z-10 px-8 py-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Hemen İlan Verin
              </h2>
              <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
                Hayvanlarınızı veya çiftlik ürünlerinizi binlerce potansiyel alıcıya ulaştırın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/ilan-ver" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-harvest-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                  Ücretsiz İlan Ver
                </a>
                <a 
                  href="/ilanlar" 
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30 transition-colors"
                >
                  İlanları İncele
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
