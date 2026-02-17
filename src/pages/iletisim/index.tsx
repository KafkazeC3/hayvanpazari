'use client';



import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';


export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="bg-gradient-to-br from-nature-600 to-nature-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">İletişim</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya şikayetleriniz için bize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-earth-800 mb-6">Bize Ulaşın</h2>
              <p className="text-earth-600 mb-8">
                7/24 hizmetinizdeyiz. Aşağıdaki kanallardan bizimle iletişime geçebilir veya formu doldurabilirsiniz.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nature-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-800">E-posta</h3>
                    <p className="text-earth-500">info@hayvanpazari.com</p>
                    <p className="text-earth-500">destek@hayvanpazari.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nature-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-800">Telefon</h3>
                    <p className="text-earth-500">0850 123 45 67</p>
                    <p className="text-earth-500">0 332 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nature-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-800">Adres</h3>
                    <p className="text-earth-500">Merkez Mahallesi, Hayvan Pazarı Caddesi No:123</p>
                    <p className="text-earth-500">Selçuklu/Konya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-nature-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-nature-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-earth-800">Çalışma Saatleri</h3>
                    <p className="text-earth-500">Pazartesi - Cuma: 08:00 - 18:00</p>
                    <p className="text-earth-500">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h3 className="text-xl font-bold text-earth-800 mb-6">İletişim Formu</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-earth-800 mb-2">Mesajınız Gönderildi!</h4>
                  <p className="text-earth-500">En kısa sürede size dönüş yapacağız.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Ad Soyad</label>
                    <Input 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      placeholder="Adınız ve soyadınız" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">E-posta</label>
                    <Input 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                      placeholder="ornek@email.com" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Konu</label>
                    <Input 
                      value={formData.subject} 
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
                      placeholder="Mesajınızın konusu" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Mesajınız</label>
                    <textarea 
                      value={formData.message} 
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })} 
                      placeholder="Mesajınızı yazın..." 
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-earth-200 focus:outline-none focus:ring-2 focus:ring-nature-400 resize-none"
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-nature gap-2">
                    <Send className="h-4 w-4" />
                    Gönder
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
