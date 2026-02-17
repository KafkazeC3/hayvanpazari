'use client';



export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Kullanım Koşulları | HayvanPazarı.com',
  description: 'HayvanPazarı.com kullanım koşulları ve üyelik sözleşmesi.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Kullanım Koşulları</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Son güncelleme: 13 Şubat 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
              <h2 className="text-2xl font-bold text-earth-800 mb-4">1. Giriş</h2>
              <p className="text-earth-600 mb-6">
                Bu Kullanım Koşulları, HayvanPazarı.com web sitesini ve mobil uygulamasını (bundan böyle "Platform" olarak anılacaktır) 
                kullanımınıza ilişkin şartları ve koşulları belirler. Platform&apos;u kullanarak bu koşulları kabul etmiş sayılırsınız. 
                Bu koşulları kabul etmiyorsanız, Platform&apos;u kullanmamalısınız.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">2. Üyelik</h2>
              <p className="text-earth-600 mb-4">
                Platform&apos;un bazı özelliklerini kullanmak için üye olmanız gerekmektedir. Üyelik sırasında:
              </p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>Doğru, eksiksiz ve güncel bilgiler vermelisiniz.</li>
                <li>Hesap bilgilerinizin gizliliğini korumak sizin sorumluluğunuzdadır.</li>
                <li>Hesabınızda gerçekleşen tüm işlemlerden siz sorumlusunuz.</li>
                <li>18 yaşını doldurmuş olmalısınız.</li>
              </ul>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">3. İlan Verme Kuralları</h2>
              <p className="text-earth-600 mb-4">
                Platform&apos;da ilan verirken aşağıdaki kurallara uymanız gerekmektedir:
              </p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>İlanlarınızda gerçek ve doğru bilgiler verilmelidir.</li>
                <li>Yanıltıcı fotoğraflar kullanılamaz.</li>
                <li>Satışı yasak olan hayvanlar için ilan verilemez.</li>
                <li>Hayvanların sağlık durumu hakkında dürüst olunmalıdır.</li>
                <li>Aynı hayvan için birden fazla ilan verilemez.</li>
              </ul>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">4. Yasaklı İçerikler</h2>
              <p className="text-earth-600 mb-4">
                Platform&apos;da aşağıdaki içerikler kesinlikle yasaktır:
              </p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>SAhibi olmadığınız hayvanların satışı</li>
                <li>Çalıntı hayvanların satışı</li>
                <li>Koruma altındaki türlerin ticareti</li>
                <li>Sahte belgelerle yapılan satışlar</li>
                <li>Tedavi edilmemiş hastalıklı hayvanların satışı</li>
              </ul>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">5. Sorumluluk Reddi</h2>
              <p className="text-earth-600 mb-6">
                HayvanPazarı.com, kullanıcılar arasındaki ticari ilişkilerden doğrudan sorumlu değildir. 
                Platform, alıcı ve satıcıları bir araya getiren bir aracıdır. Satış işlemlerinin yasalara uygun 
                olduğundan ve hayvanların sağlık durumundan taraflar sorumludur.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">6. Hesap Askıya Alma ve Silme</h2>
              <p className="text-earth-600 mb-6">
                Kullanım koşullarını ihlal eden hesaplar uyarılmaksızın askıya alınabilir veya silinebilir. 
                Ciddi ihlallerde yasal işlem başlatılabilir.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">7. Değişiklikler</h2>
              <p className="text-earth-600 mb-6">
                Bu kullanım koşulları zaman zaman güncellenebilir. Önemli değişikliklerde kullanıcılara bildirim 
                yapılacaktır. Platform&apos;u kullanmaya devam etmeniz, güncel koşulları kabul ettiğiniz anlamına gelir.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">8. İletişim</h2>
              <p className="text-earth-600">
                Bu koşullar hakkında sorularınız için info@hayvanpazari.com adresine e-posta gönderebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
