'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Loader2,
  MapPin,
  Tag,
  FileText,
  Image as ImageIcon,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/upload/ImageUpload';

interface Category {
  id: string;
  name: string;
  subcategories: Array<{ id: string; name: string }>;
}

interface ListingFormData {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  subcategoryId: string;
  city: string;
  district: string;
  images: Array<{ url: string; publicId: string }>;
  phone: string;
  features: string[];
}

const steps = [
  { id: 1, title: 'Temel Bilgiler', icon: FileText },
  { id: 2, title: 'Kategori & Konum', icon: Tag },
  { id: 3, title: 'Resimler', icon: ImageIcon },
  { id: 4, title: 'İletişim', icon: Phone },
];

const cities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
  'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
  'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
  'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
  'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
  'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis',
  'Kırıkkale', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
  'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
  'Rize', 'Sakarya', 'Samsun', 'Şanlıurfa', 'Siirt', 'Sinop', 'Şırnak', 'Sivas',
  'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
];

export function ListingForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<ListingFormData>({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    subcategoryId: '',
    city: '',
    district: '',
    images: [],
    phone: '',
    features: [],
  });

  // Kategorileri yükle
  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch(console.error);
  }, []);

  // Giriş kontrolü
  if (status === 'unauthenticated') {
    router.push('/giris?callbackUrl=/ilan-ver');
    return null;
  }

  const updateField = (field: keyof ListingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.title.trim() || formData.title.length < 10) {
          setError('Başlık en az 10 karakter olmalıdır');
          return false;
        }
        if (!formData.description.trim() || formData.description.length < 50) {
          setError('Açıklama en az 50 karakter olmalıdır');
          return false;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
          setError('Geçerli bir fiyat girin');
          return false;
        }
        return true;
      case 2:
        if (!formData.categoryId) {
          setError('Kategori seçin');
          return false;
        }
        if (!formData.city) {
          setError('Şehir seçin');
          return false;
        }
        return true;
      case 3:
        if (formData.images.length === 0) {
          setError('En az bir resim yükleyin');
          return false;
        }
        return true;
      case 4:
        if (!formData.phone || formData.phone.length < 10) {
          setError('Geçerli bir telefon numarası girin');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError('');
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          images: formData.images.map((img) => img.url),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      // Başarılı
      router.push('/profil/ilanlarim');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === formData.categoryId);

  return (
    <Card className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex flex-col items-center ${
                    isActive ? 'text-nature-600' : isCompleted ? 'text-green-600' : 'text-earth-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isActive
                        ? 'border-nature-600 bg-nature-50'
                        : isCompleted
                        ? 'border-green-600 bg-green-50'
                        : 'border-earth-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium hidden sm:block">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 h-0.5 mx-2 ${
                      isCompleted ? 'bg-green-600' : 'bg-earth-200'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 min-h-[400px]">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Temel Bilgiler */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                İlan Başlığı *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Örn: 2 Yaşında Holstein Dana"
                maxLength={100}
              />
              <p className="text-xs text-earth-500 mt-1">
                {formData.title.length}/100 karakter
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Açıklama *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Hayvanınızın özelliklerini, sağlık durumunu ve diğer detayları yazın..."
                rows={6}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-nature-500"
              />
              <p className="text-xs text-earth-500 mt-1">
                En az 50 karakter ({formData.description.length} karakter)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Fiyat (TL) *
              </label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                placeholder="15000"
                min={0}
              />
            </div>
          </div>
        )}

        {/* Step 2: Kategori & Konum */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Kategori *
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => {
                  updateField('categoryId', e.target.value);
                  updateField('subcategoryId', '');
                }}
                className="w-full h-10 px-3 border border-input rounded-md"
              >
                <option value="">Kategori seçin</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory?.subcategories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Alt Kategori
                </label>
                <select
                  value={formData.subcategoryId}
                  onChange={(e) => updateField('subcategoryId', e.target.value)}
                  className="w-full h-10 px-3 border border-input rounded-md"
                >
                  <option value="">Alt kategori seçin</option>
                  {selectedCategory.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  Şehir *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full h-10 px-3 border border-input rounded-md"
                >
                  <option value="">Şehir seçin</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-earth-700 mb-2">
                  İlçe
                </label>
                <Input
                  value={formData.district}
                  onChange={(e) => updateField('district', e.target.value)}
                  placeholder="İlçe"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Resimler */}
        {currentStep === 3 && (
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-4">
              İlan Resimleri *
            </label>
            <ImageUpload
              onImagesChange={(images) => updateField('images', images)}
              maxImages={10}
            />
          </div>
        )}

        {/* Step 4: İletişim */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-earth-700 mb-2">
                Telefon Numarası *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="0555 123 4567"
                type="tel"
              />
              <p className="text-sm text-earth-500 mt-1">
                İlanınızda görünecek iletişim numarası
              </p>
            </div>

            <div className="bg-earth-50 p-4 rounded-lg">
              <h4 className="font-medium text-earth-800 mb-2">İlan Özeti</h4>
              <ul className="text-sm text-earth-600 space-y-1">
                <li><strong>Başlık:</strong> {formData.title}</li>
                <li><strong>Fiyat:</strong> {parseFloat(formData.price).toLocaleString('tr-TR')} TL</li>
                <li><strong>Kategori:</strong> {selectedCategory?.name}</li>
                <li><strong>Konum:</strong> {formData.city}{formData.district ? `, ${formData.district}` : ''}</li>
                <li><strong>Resim:</strong> {formData.images.length} adet</li>
              </ul>
            </div>

            <p className="text-sm text-earth-500">
              İlanınızı yayınladığınızda admin onayına gönderilecektir. Onay süreci genellikle 24 saat içinde tamamlanır.
            </p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="p-6 border-t flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1 || loading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Geri
        </Button>

        {currentStep === steps.length ? (
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="gradient-nature text-white"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                İlanı Yayınla
              </>
            )}
          </Button>
        ) : (
          <Button onClick={handleNext} className="gradient-nature text-white">
            Devam
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
}
