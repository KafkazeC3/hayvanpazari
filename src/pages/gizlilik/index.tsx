'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Head from 'next/head';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Head>
        <title>Gizlilik Politikası | HayvanPazarı.com</title>
        <meta name="description" content="HayvanPazarı.com gizlilik politikası ve kişisel verilerin korunması." />
      </Head>
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gizlilik Politikası</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Kişisel verilerinizin güvenliği bizim için önemli.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
              <h2 className="text-2xl font-bold text-earth-800 mb-4">1. Veri Sorumlusu</h2>
              <p className="text-earth-600 mb-6">
                HayvanPazarı.com olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında 
                veri sorumlusu sıfatıyla hareket etmekteyiz. Kişisel verilerinizin güvenliği ve gizliliği 
                bizim için en önemli önceliktir.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">2. Toplanan Veriler</h2>
              <p className="text-earth-600 mb-4">
                Platform&apos;umuzu kullanırken aşağıdaki kişisel verilerinizi toplayabiliriz:
              </p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>Kimlik bilgileri (ad, soyad)</li>
                <li>İletişim bilgileri (e-posta, telefon)</li>
                <li>Konum bilgileri (şehir, ilçe)</li>
                <li>İlan içerikleri ve fotoğraflar</li>
                <li>IP adresi ve cihaz bilgileri</li>
                <li>Platform kullanım verileri</li>
              </ul>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">3. Verilerin Kullanım Amacı</h2>
              <p className="text-earth-600 mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla kullanılmaktadır:
              </p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>Üyelik işlemlerinin yürütülmesi</li>
                <li>İlanların yayınlanması ve yönetimi</li>
                <li>Kullanıcılar arası iletişimin sağlanması</li>
                <li>Güvenlik ve dolandırıcılık önleme</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Platform iyileştirmeleri</li>
              </ul>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">4. Verilerin Saklanması</h2>
              <p className="text-earth-600 mb-6">
                Kişisel verileriniz, yasal saklama süreleri boyunca veya işleme amaçlarının gerektirdiği 
                süre boyunca saklanır. Üyeliğinizin sona ermesi durumunda verileriniz 1 yıl içinde silinir 
                veya anonimleştirilir.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">5. Veri Güvenliği</h2>
              <p className="text-earth-600 mb-6">
                Verilerinizin güvenliği için SSL şifreleme, güvenlik duvarları ve erişim kontrolleri gibi 
                teknik ve idari tedbirler alınmaktadır. Ancak internet üzerinden veri iletiminin %100 güvenli 
                olmadığını unutmayınız.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">6. Haklarınız</h2>
              <p className="text-earth-600 mb-4">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini isteme</li>
                <li>İşlemeye itiraz etme</li>
                <li>Veri taşınabilirliği hakkı</li>
              </ul>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">7. İletişim</h2>
              <p className="text-earth-600 mb-6">
                Gizlilik politikamız hakkında sorularınız veya talepleriniz için kvkk@hayvanpazari.com 
                adresine e-posta gönderebilirsiniz.
              </p>

              <h2 className="text-2xl font-bold text-earth-800 mb-4">8. Çerezler</h2>
              <p className="text-earth-600">
                Platform&apos;umuzda kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. 
                Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda bazı 
                özellikler düzgün çalışmayabilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
