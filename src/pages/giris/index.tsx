'use client';



import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Başarılı giriş
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setError('Giriş yapılırken bir hata oluştu');
    } finally {
      setIsLoading(false);
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
              HayvanPazarı.com&apos;a<br />Hoş Geldiniz
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              Türkiye&apos;nin en büyük hayvan alım satım platformuna giriş yapın.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-earth-50/30">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl gradient-nature flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
            </Link>
            <h2 className="text-2xl font-bold text-earth-800 mt-4">Giriş Yap</h2>
            <p className="text-earth-500 mt-2">Hesabınıza giriş yaparak devam edin</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                <Input 
                  type="email" 
                  placeholder="ornek@email.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="pl-11 h-12" 
                  required 
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
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
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  disabled={isLoading}
                />
                <label htmlFor="remember" className="text-sm text-earth-600">
                  Beni hatırla
                </label>
              </div>
              <Link href="/sifremi-unuttum" className="text-sm text-nature-600 font-medium hover:underline">
                Şifremi unuttum
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 gradient-nature text-base font-semibold gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <Separator className="my-6" />
          
          <p className="text-center text-earth-600">
            Hesabınız yok mu?{' '}
            <Link href="/kayit" className="text-nature-600 font-semibold hover:underline">
              Kayıt Ol
            </Link>
          </p>

          {/* Test Credentials */}
          <div className="mt-8 p-4 bg-earth-50 rounded-xl">
            <p className="text-sm font-medium text-earth-700 mb-2">Test Giriş Bilgileri:</p>
            <div className="space-y-1 text-sm text-earth-600">
              <p><strong>Admin:</strong> admin@hayvanpazari.com / admin123</p>
              <p><strong>User:</strong> ahmet@email.com / user123</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
