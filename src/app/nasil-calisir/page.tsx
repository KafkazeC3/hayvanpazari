export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, PlusCircle, MessageCircle, HandshakeIcon } from 'lucide-react';

export const metadata = {
  title: 'Nasıl Çalışır? | HayvanPazarı.com',
  description: 'HayvanPazarı.com\'u nasıl kullanacağınızı öğrenin. Kolay adımlarla ilan verin ve hayvan bulun.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nasıl Çalışır?</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            HayvanPazarı.com&apos;u kullanmak çok kolay! İşte adım adım rehberimiz.
          </p>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-nature-600 font-semibold text-sm uppercase tracking-wider">Alıcılar İçin</span>
            <h2 className="text-3xl font-bold text-earth-800 mt-2">Hayvan Nasıl Bulunur?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', icon: Search, title: 'Ara', desc: 'Kategori, şehir ve fiyat aralığına göre ilanları filtreleyin' },
              { step: '02', icon: PlusCircle, title: 'İncele', desc: 'Detaylı ilan bilgilerini ve fotoğrafları inceleyin' },
              { step: '03', icon: MessageCircle, title: 'İletişime Geç', desc: 'Satıcıyla güvenli mesajlaşma sistemiyle iletişime geçin' },
              { step: '04', icon: HandshakeIcon, title: 'Anlaş', desc: 'Görüşme yapın ve güvenli bir şekilde anlaşın' },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-nature flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-4xl font-bold text-nature-200 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{item.step}</span>
                <h3 className="font-bold text-earth-800 mb-2">{item.title}</h3>
                <p className="text-sm text-earth-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-16 bg-earth-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-nature-600 font-semibold text-sm uppercase tracking-wider">Satıcılar İçin</span>
            <h2 className="text-3xl font-bold text-earth-800 mt-2">İlan Nasıl Verilir?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', icon: PlusCircle, title: 'Hesap Oluştur', desc: 'Ücretsiz hesap oluşturun ve profilinizi tamamlayın' },
              { step: '02', icon: PlusCircle, title: 'İlan Ver', desc: 'Detaylı bilgiler ve fotoğraflarla ilanınızı oluşturun' },
              { step: '03', icon: MessageCircle, title: 'Teklif Al', desc: 'Potansiyel alıcıların mesajlarını yanıtlayın' },
              { step: '04', icon: HandshakeIcon, title: 'Satış Yap', desc: 'Güvenli bir şekilde satışınızı tamamlayın' },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-harvest flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <span className="text-4xl font-bold text-harvest-200 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{item.step}</span>
                <h3 className="font-bold text-earth-800 mb-2">{item.title}</h3>
                <p className="text-sm text-earth-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-earth-800 mb-8 text-center">Başarılı İlan İçin İpuçları</h2>
            <div className="space-y-6">
              {[
                'Kaliteli ve net fotoğraflar yükleyin',
                'Detaylı ve dürüst açıklamalar yazın',
                'Hayvanın sağlık durumunu belirtin',
                'Fiyatınızı piyasa koşullarına göre belirleyin',
                'Müşteri mesajlarına hızlı yanıt verin',
                'Güvenilir iletişim bilgileri paylaşın',
              ].map((tip, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-nature-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-nature-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-earth-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
