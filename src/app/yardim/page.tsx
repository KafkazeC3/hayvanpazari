export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, BookOpen, Shield, CreditCard, MessageCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Yardım Merkezi | HayvanPazarı.com',
  description: 'HayvanPazarı.com yardım merkezi ve destek kaynakları.',
};

const helpCategories = [
  {
    icon: BookOpen,
    title: 'Başlangıç',
    description: 'Platformu nasıl kullanacağınızı öğrenin',
    links: [
      { label: 'Hesap Oluşturma', href: '/nasil-calisir' },
      { label: 'İlan Verme', href: '/nasil-calisir' },
      { label: 'Arama Yapma', href: '/nasil-calisir' },
    ],
  },
  {
    icon: Shield,
    title: 'Güvenlik',
    description: 'Güvenli alışveriş için ipuçları',
    links: [
      { label: 'Güvenlik Önerileri', href: '/guvenlik' },
      { label: 'Dolandırıcılıktan Korunma', href: '/guvenlik' },
      { label: 'Hesap Güvenliği', href: '/guvenlik' },
    ],
  },
  {
    icon: CreditCard,
    title: 'Ödeme',
    description: 'Ödeme ve faturalama hakkında',
    links: [
      { label: 'Ödeme Yöntemleri', href: '/sss' },
      { label: 'İlan Paketleri', href: '/sss' },
      { label: 'Fatura İşlemleri', href: '/sss' },
    ],
  },
  {
    icon: MessageCircle,
    title: 'İletişim',
    description: 'Bizimle iletişime geçin',
    links: [
      { label: 'Destek Talebi', href: '/iletisim' },
      { label: 'Şikayet Bildir', href: '/iletisim' },
      { label: 'Öneri Gönder', href: '/iletisim' },
    ],
  },
  {
    icon: FileText,
    title: 'Yasal',
    description: 'Yasal bilgiler ve politikalar',
    links: [
      { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
      { label: 'Gizlilik Politikası', href: '/gizlilik' },
      { label: 'KVKK Aydınlatma Metni', href: '/gizlilik' },
    ],
  },
  {
    icon: Search,
    title: 'Sıkça Sorulanlar',
    description: 'En çok merak edilen sorular',
    links: [
      { label: 'SSS Sayfası', href: '/sss' },
      { label: 'Ücretler', href: '/sss' },
      { label: 'İlan Süreleri', href: '/sss' },
    ],
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Yardım Merkezi</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Size nasıl yardımcı olabiliriz?
          </p>
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Yardım arayın..." 
              className="w-full h-14 pl-12 pr-4 rounded-xl border-0 focus:ring-2 focus:ring-white/50"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-nature-100 flex items-center justify-center mb-4">
                  <category.icon className="h-6 w-6 text-nature-600" />
                </div>
                <h3 className="font-bold text-earth-800 mb-2">{category.title}</h3>
                <p className="text-sm text-earth-500 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link href={link.href} className="text-sm text-nature-600 hover:text-nature-700 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-earth-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-earth-800 mb-4">Yardıma mı ihtiyacınız var?</h2>
            <p className="text-earth-600 mb-6">
              Aradığınız cevabı bulamadınız mı? Destek ekibimiz size yardımcı olmaya hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/iletisim" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-nature-600 text-white rounded-xl font-medium hover:bg-nature-700 transition-colors">
                <MessageCircle className="h-5 w-5" />
                Bize Ulaşın
              </a>
              <a href="tel:08501234567" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-nature-600 border border-nature-600 rounded-xl font-medium hover:bg-nature-50 transition-colors">
                <span>0850 123 45 67</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
