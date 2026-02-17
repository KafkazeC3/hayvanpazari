'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Head from 'next/head';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function KVKKPage() {
  return (
    <main className="min-h-screen">
      <Head>
        <title>KVKK Aydınlatma Metni | HayvanPazarı.com</title>
        <meta name="description" content="HayvanPazarı.com Kişisel Verilerin Korunması Kanunu aydınlatma metni." />
      </Head>
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">KVKK Aydınlatma Metni</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card p-8 md:p-12">
              <p className="text-earth-600 mb-8">
                İşbu Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, 
                veri sorumlusu sıfatıyla hareket eden HayvanPazarı.com tarafından hazırlanmıştır.
              </p>

              <h2 className="text-xl font-bold text-earth-800 mb-4">1. Veri Sorumlusu</h2>
              <p className="text-earth-600 mb-6">
                <strong>Ünvan:</strong> HayvanPazarı.com<br />
                <strong>Adres:</strong> Merkez Mahallesi, Hayvan Pazarı Caddesi No:123, Selçuklu/Konya<br />
                <strong>E-posta:</strong> kvkk@hayvanpazari.com<br />
                <strong>Telefon:</strong> 0850 123 45 67
              </p>

              <h2 className="text-xl font-bold text-earth-800 mb-4">2. Kişisel Verilerin İşlenme Amacı</h2>
              <p className="text-earth-600 mb-4">Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>Üyelik işlemlerinin yürütülmesi ve yönetilmesi</li>
                <li>İlanların yayınlanması ve kullanıcılar arası iletişimin sağlanması</li>
                <li>Platform güvenliğinin sağlanması ve dolandırıcılığın önlenmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Kullanıcı deneyiminin iyileştirilmesi</li>
                <li>İletişim faaliyetlerinin yürütülmesi</li>
              </ul>

              <h2 className="text-xl font-bold text-earth-800 mb-4">3. Kişisel Verilerin Aktarılması</h2>
              <p className="text-earth-600 mb-6">
                Kişisel verileriniz, yasal yükümlülüklerin yerine getirilmesi amacıyla yetkili kamu kurum ve kuruluşlarına, 
                hizmet aldığımız iş ortaklarımıza (sunucu, bulut hizmetleri vb.) ve yasal mercilere aktarılabilir.
              </p>

              <h2 className="text-xl font-bold text-earth-800 mb-4">4. Kişisel Verilerin Toplanma Yöntemi</h2>
              <p className="text-earth-600 mb-6">
                Kişisel verileriniz, web sitesi ve mobil uygulama üzerinden elektronik ortamda, 
                çağrı merkezi ve e-posta yoluyla sözlü veya yazılı olarak toplanmaktadır.
              </p>

              <h2 className="text-xl font-bold text-earth-800 mb-4">5. KVKK&apos;nın 11. Maddesi Uyarınca Haklarınız</h2>
              <p className="text-earth-600 mb-4">Kanun kapsamında aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc pl-6 text-earth-600 mb-6 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>Kişisel verilerinizin düzeltilmesi, silinmesi veya yok edilmesine ilişkin işlemlerin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerinizin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
              </ul>

              <h2 className="text-xl font-bold text-earth-800 mb-4">6. Başvuru Yöntemi</h2>
              <p className="text-earth-600">
                Yukarıda sayılan haklarınızı kullanmak için kvkk@hayvanpazari.com adresine yazılı olarak başvuruda bulunabilirsiniz. 
                Başvurunuz en geç 30 gün içinde yanıtlanacaktır.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
