'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function FooterModern() {
  const footerLinks = {
    platform: [
      { label: 'Hakkımızda', href: '/hakkimizda' },
      { label: 'Nasıl Çalışır?', href: '/nasil-calisir' },
      { label: 'Sıkça Sorulan Sorular', href: '/sss' },
      { label: 'Güvenlik', href: '/guvenlik' },
    ],
    categories: [
      { label: 'Büyükbaş Hayvanlar', href: '/ilanlar?category=1' },
      { label: 'Küçükbaş Hayvanlar', href: '/ilanlar?category=2' },
      { label: 'Kanatlı Hayvanlar', href: '/ilanlar?category=3' },
      { label: 'Atlar', href: '/ilanlar?category=4' },
    ],
    support: [
      { label: 'Yardım Merkezi', href: '/yardim' },
      { label: 'İletişim', href: '/iletisim' },
      { label: 'Gizlilik Politikası', href: '/gizlilik' },
      { label: 'Kullanım Koşulları', href: '/kullanim-kosullari' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                H
              </div>
              <span className="text-2xl font-bold">
                Hayvan<span className="text-green-500">Pazarı</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Türkiye'nin en büyük hayvan alım satım platformu. Güvenli, hızlı ve kolay.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-green-500" />
                <span>0332 123 45 67</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-green-500" />
                <span>info@hayvanpazari.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-green-500" />
                <span>Konya Teknopark, Türkiye</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Destek</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 HayvanPazarı.com. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/gizlilik" className="hover:text-green-500 transition-colors">
                Gizlilik
              </Link>
              <Link href="/kullanim-kosullari" className="hover:text-green-500 transition-colors">
                Kullanım Koşulları
              </Link>
              <Link href="/kvkk" className="hover:text-green-500 transition-colors">
                KVKK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
