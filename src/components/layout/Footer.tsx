'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  platform: [
    { label: 'Hakkımızda', href: '/hakkimizda' },
    { label: 'Nasıl Çalışır?', href: '/nasil-calisir' },
    { label: 'Sıkça Sorulan Sorular', href: '/sss' },
    { label: 'Blog', href: '/blog' },
  ],
  categories: [
    { label: 'Büyükbaş Hayvanlar', href: '/ilanlar?category=1' },
    { label: 'Küçükbaş Hayvanlar', href: '/ilanlar?category=2' },
    { label: 'Yem & Saman', href: '/ilanlar?category=3' },
    { label: 'Çiftlik Malzemeleri', href: '/ilanlar?category=4' },
  ],
  support: [
    { label: 'İletişim', href: '/iletisim' },
    { label: 'Yardım Merkezi', href: '/yardim' },
    { label: 'Güvenlik', href: '/guvenlik' },
  ],
  legal: [
    { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
    { label: 'Gizlilik', href: '/gizlilik' },
    { label: 'KVKK', href: '/kvkk' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-earth-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-nature flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl">HayvanPazarı.com</span>
            </Link>
            <p className="text-earth-300 text-sm leading-relaxed mb-6 max-w-sm">
              Türkiye&apos;nin en büyük hayvan alım satım platformu.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@hayvanpazari.com" className="flex items-center gap-3 text-earth-300 hover:text-white">
                <Mail className="h-4 w-4" />info@hayvanpazari.com
              </a>
              <a href="tel:+908501234567" className="flex items-center gap-3 text-earth-300 hover:text-white">
                <Phone className="h-4 w-4" />0850 123 45 67
              </a>
              <div className="flex items-center gap-3 text-earth-300">
                <MapPin className="h-4 w-4" />Konya, Türkiye
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-earth-300 hover:text-white text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kategoriler</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-earth-300 hover:text-white text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Destek</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-earth-300 hover:text-white text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-earth-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-earth-400 text-sm">© {new Date().getFullYear()} HayvanPazarı.com. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-earth-800 flex items-center justify-center text-earth-400 hover:bg-nature-600 hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
