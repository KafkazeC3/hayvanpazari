'use client';



import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities } from '@/data/mockData';

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    type: 'INDIVIDUAL' as 'INDIVIDUAL' | 'BUSINESS',
    password: '',
    agreeTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone || !formData.city) {
        setError('Lütfen tüm alanları doldurun');
        return;
      }
      setStep(2);
    } else {
      if (!formData.password || formData.password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır');
        return;
      }
      if (!formData.agreeTerms) {
        setError('Kullanım koşullarını kabul etmelisiniz');
        return;
      }

      setIsLoading(true);

      try {
        // Kayıt API'sine gönder
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city: formData.city,
            district: formData.district,
            type: formData.type,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Kayıt oluşturulurken bir hata oluştu');
          setIsLoading(false);
          return;
        }

        // Otomatik giriş yap
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          setError('Kayıt başarılı ancak giriş yapılamadı. Lütfen manuel giriş yapın.');
          router.push('/giris');
        } else {
          router.push('/');
          router.refresh();
        }
      } catch (error) {
        setError('Kayıt oluşturulurken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-nature-900/80 to-nature-800/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80" 
          alt="Farm" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-12 text-white">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              HayvanPazarı.com&apos;a<br />Katılın
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              Ücretsiz hesap oluşturun, ilanlarınızı yayınlayın.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Ücretsiz ilan verme',
                'Binlerce potansiyel alıcı',
                'Güvenli mesajlaşma'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-harvest-400" />
                  <span className="text-white/90">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-earth-50/30 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="w-full max-w-md py-8"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl gradient-nature flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-earth-800 mt-4">Hesap Oluştur</h2>
            <p className="text-earth-500 mt-2">
              {step === 1 ? 'Bilgilerinizi girerek başlayın' : 'Şifrenizi belirleyin'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-nature-500' : 'bg-earth-200'}`} />
            <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-nature-500' : 'bg-earth-200'}`} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Ad Soyad
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                      <Input 
                        type="text" 
                        placeholder="Ahmet Yılmaz" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        className="pl-11 h-12" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                      <Input 
                        type="email" 
                        placeholder="ornek@email.com" 
                        value={formData.email} 
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        className="pl-11 h-12" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Telefon Numarası
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                      <Input 
                        type="tel" 
                        placeholder="05XX XXX XX XX" 
                        value={formData.phone} 
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                        className="pl-11 h-12" 
                        required 
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Şehir
                    </label>
                    <Select 
                      value={formData.city} 
                      onValueChange={(v) => setFormData({ ...formData, city: v })}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Şehir seçin" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Account Type */}
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Hesap Tipi
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'INDIVIDUAL' })}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          formData.type === 'INDIVIDUAL' 
                            ? 'border-nature-500 bg-nature-50 text-nature-700' 
                            : 'border-earth-200 hover:border-earth-300'
                        }`}
                        disabled={isLoading}
                      >
                        Bireysel
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'BUSINESS' })}
                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                          formData.type === 'BUSINESS' 
                            ? 'border-nature-500 bg-nature-50 text-nature-700' 
                            : 'border-earth-200 hover:border-earth-300'
                        }`}
                        disabled={isLoading}
                      >
                        İşletme
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                      <Input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder="••••••••" 
                        value={formData.password} 
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        className="pl-11 pr-11 h-12" 
                        required 
                        disabled={isLoading}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-earth-400 hover:text-earth-600 transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-earth-500 mt-1">
                      En az 6 karakter olmalıdır
                    </p>
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-2">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeTerms}
                      onCheckedChange={(c) => setFormData({ ...formData, agreeTerms: c as boolean })}
                      disabled={isLoading}
                    />
                    <label htmlFor="terms" className="text-sm text-earth-600 leading-relaxed">
                      <Link href="/kullanim-kosullari" className="text-nature-600 hover:underline">
                        Kullanım Koşulları
                      </Link>{' '}
                      ve{' '}
                      <Link href="/gizlilik" className="text-nature-600 hover:underline">
                        Gizlilik Politikası
                      </Link>
                      &apos;nı kabul ediyorum.
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              {step === 2 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-12" 
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                >
                  Geri
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1 h-12 gradient-nature text-base font-semibold gap-2"
                disabled={step === 2 && !formData.agreeTerms || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    İşleniyor...
                  </>
                ) : step === 1 ? (
                  <>
                    Devam Et
                    <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  'Hesap Oluştur'
                )}
              </Button>
            </div>
          </form>

          <Separator className="my-6" />
          
          <p className="text-center text-earth-600">
            Zaten hesabınız var mı?{' '}
            <Link href="/giris" className="text-nature-600 font-semibold hover:underline">
              Giriş Yap
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
