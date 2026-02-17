'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, Phone } from 'lucide-react';
import Head from 'next/head';

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      <Head>
        <title>Güvenlik | HayvanPazarı.com</title>
        <meta name="description" content="HayvanPazarı.com güvenlik önerileri ve dolandırıcılıktan korunma yöntemleri." />
      </Head>
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-16 w-16 text-white mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Güvenlik</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Güvenli alışveriş için önerilerimiz ve dolandırıcılıktan korunma yöntemleri.
          </p>
        </div>
      </section>

      {/* Warnings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-bold text-red-800 mb-2">Önemli Uyarı</h2>
                  <p className="text-red-700">
                    HayvanPazarı.com dışında iletişime geçen, kapora isteyen veya şüpheli bağlantılar gönderen 
                    kişilere karşı dikkatli olun. Asla görmediğiniz bir hayvan için kapora ödemeyin.
                  </p>
                </div>
              </div>
            </div>

            {/* Safety Tips for Buyers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-earth-800 mb-6">Alıcılar İçin Güvenlik İpuçları</h2>
              <div className="space-y-4">
                {[
                  'Satıcının profilini ve yorumlarını mutlaka inceleyin',
                  'Hayvanı canlı görmeden ve kontrol etmeden kapora ödemeyin',
                  'Satıcıyla telefon görüşmesi yapın, sesli iletişim kurun',
                  'Hayvanın sağlık belgelerini ve küpe numarasını isteyin',
                  'Mümkünse yanınızda veteriner veya bilgili biriyle gidin',
                  'Ödemeyi banka havalesi veya EFT ile yapın, nakit önermeyin',
                  'Alışverişi kalabalık ve güvenli bir yerde yapın',
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <CheckCircle className="h-5 w-5 text-nature-600 flex-shrink-0 mt-0.5" />
                    <span className="text-earth-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Tips for Sellers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-earth-800 mb-6">Satıcılar İçin Güvenlik İpuçları</h2>
              <div className="space-y-4">
                {[
                  'Alıcıyla yüz yüze görüşmeden ödeme kabul etmeyin',
                  'Hayvanın tüm belgelerini ve sağlık raporlarını hazır bulundurun',
                  'Şüpheli davranan alıcılara karşı dikkatli olun',
                  'Ödeme almadan hayvanı teslim etmeyin',
                  'Satış sözleşmesi yapın ve imzalayın',
                  'Tanımadığınız kişilere hayvan hakkında detaylı bilgi vermeyin',
                  'İlanınızda hassas bilgiler (tam adres vb.) paylaşmayın',
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                    <CheckCircle className="h-5 w-5 text-harvest-600 flex-shrink-0 mt-0.5" />
                    <span className="text-earth-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-earth-800 mb-6">Dolandırıcılık İşaretleri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Çok düşük fiyat teklifleri',
                  'Görmeden kapora isteme talepleri',
                  'Platform dışında iletişim kurma isteği',
                  'Aceleci ve ısrarcı davranışlar',
                  'Şüpheli bağlantılar gönderme',
                  'Sahte evrak veya belgeler',
                  'Anonim veya sahte profiller',
                  'Yurtdışından alım vaatleri',
                ].map((flag, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-800 text-sm">{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Precautions */}
            <div className="bg-nature-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-earth-800 mb-6">Bizim Aldığımız Önlemler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-nature-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-earth-800 mb-1">İlan Denetimi</h3>
                    <p className="text-sm text-earth-600">Tüm ilanlar yayınlanmadan önce kontrol edilir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-nature-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-earth-800 mb-1">Veri Güvenliği</h3>
                    <p className="text-sm text-earth-600">Kişisel verileriniz şifrelenerek saklanır.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-nature-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-earth-800 mb-1">Şikayet Sistemi</h3>
                    <p className="text-sm text-earth-600">Şüpheli hesaplar hızlıca incelenir ve engellenir.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-nature-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-earth-800 mb-1">7/24 Destek</h3>
                    <p className="text-sm text-earth-600">Güvenlik sorunlarında anında yardım alabilirsiniz.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report */}
            <div className="mt-12 text-center p-8 bg-earth-50 rounded-2xl">
              <h3 className="text-xl font-bold text-earth-800 mb-2">Şüpheli Bir Durum mu Fark Ettiniz?</h3>
              <p className="text-earth-600 mb-4">
                Dolandırıcılık girişimi veya şüpheli bir kullanıcı bildirin.
              </p>
              <a href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors">
                <AlertTriangle className="h-5 w-5" />
                Şikayet Bildir
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
