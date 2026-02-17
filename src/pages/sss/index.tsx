'use client';



import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'HayvanPazarı.com kullanımı ücretli mi?',
    answer: 'HayvanPazarı.com\'da hesap oluşturmak ve ilanları incelemek tamamen ücretsizdir. İlan vermek için ise çeşitli paketler sunuyoruz. Temel ilan paketimiz ücretsiz olup, öne çıkan ilanlar için uygun fiyatlı paketlerimiz bulunmaktadır.',
  },
  {
    question: 'Nasıl ilan verebilirim?',
    answer: 'İlan vermek için önce ücretsiz bir hesap oluşturmalısınız. Ardından "İlan Ver" butonuna tıklayarak kategori seçimi yapın, hayvanınızın bilgilerini ve fotoğraflarını yükleyin, fiyat belirleyin ve ilanınızı yayınlayın. İlanınız onaylandıktan sonra yayına alınacaktır.',
  },
  {
    question: 'İlanım ne kadar sürede yayınlanır?',
    answer: 'İlanlarınız genellikle 24 saat içerisinde kontrol edilip yayınlanır. Yoğunluk durumuna göre bu süre uzayabilir. İlanınızın durumunu profil sayfanızdan takip edebilirsiniz.',
  },
  {
    question: 'Satıcılar güvenilir mi?',
    answer: 'Platformumuzda satıcı doğrulama sistemi bulunmaktadır. Onaylı satıcılar mavi tik işareti ile belirtilir. Ayrıca kullanıcı puanlama ve yorum sistemi sayesinde satıcıların güvenilirliğini değerlendirebilirsiniz.',
  },
  {
    question: 'Hayvanları nasıl görüntüleyebilirim?',
    answer: 'İlan detay sayfalarında hayvanların çoklu fotoğraflarını yüksek çözünürlükte inceleyebilirsiniz. Ayrıca satıcıyla iletişime geçerek ek fotoğraf ve video talep edebilirsiniz.',
  },
  {
    question: 'Ödeme nasıl yapılır?',
    answer: 'Platformumuzda doğrudan ödeme sistemi bulunmamaktadır. Alıcı ve satıcı kendi aralarında ödeme yöntemi belirler. Ancak güvenliğiniz için resmi sözleşme yapmanızı ve ödemeleri banka havalesi gibi izlenebilir yöntemlerle yapmanızı öneririz.',
  },
  {
    question: 'İlanımı nasıl güncelleyebilir veya silebilirim?',
    answer: 'Profil sayfanızdaki "İlanlarım" bölümünden tüm ilanlarınızı görüntüleyebilir, düzenleyebilir veya silebilirsiniz. İlanınızı sildiğinizde geri getirilemez, bu nedenle silme işlemini dikkatli yapın.',
  },
  {
    question: 'Şikayet ve önerilerimi nasıl iletebilirim?',
    answer: 'Şikayet ve önerilerinizi info@hayvanpazari.com e-posta adresine gönderebilir veya iletişim sayfamızdaki formu doldurabilirsiniz. Ekibimiz en kısa sürede size dönüş yapacaktır.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-earth-200 last:border-0">
      <button onClick={onClick} className="w-full py-5 flex items-center justify-between text-left">
        <span className="font-semibold text-earth-800 pr-4">{question}</span>
        <ChevronDown className={`h-5 w-5 text-nature-600 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-earth-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            HayvanPazarı.com hakkında merak edilenler ve yanıtları.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-nature-100 flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-nature-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-earth-800">Merak Edilenler</h2>
                  <p className="text-sm text-earth-500">Toplam {faqs.length} soru ve yanıt</p>
                </div>
              </div>
              <div className="divide-y divide-earth-100">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 text-center p-8 bg-earth-50 rounded-2xl">
              <p className="text-earth-600 mb-4">Aradığınız cevabı bulamadınız mı?</p>
              <a href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
                Bize Ulaşın
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
