# HayvanPazarı.com - Proje Özeti

## 🚀 Canlı Demo Bilgileri

**Development Server:** `http://localhost:3001`

**Prisma Studio:** `http://localhost:5555` (Veritabanı yönetimi)

---

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Root layout (SessionProvider)
│   ├── giris/             # Giriş sayfası (/giris)
│   ├── kayit/             # Kayıt sayfası (/kayit)
│   ├── admin/             # Admin paneli
│   │   ├── page.tsx       # Dashboard
│   │   ├── kullanicilar/  # Kullanıcı yönetimi
│   │   ├── ilanlar/       # İlan yönetimi
│   │   └── kategoriler/   # Kategori yönetimi
│   ├── api/               # API Routes
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts  # NextAuth.js
│   │       └── register/route.ts       # Kayıt API
│   ├── ilanlar/           # İlan listesi
│   ├── ilan/              # İlan detay
│   └── ...
├── components/
│   ├── ui/                # shadcn/ui bileşenleri
│   ├── layout/            # Navbar, Footer
│   ├── home/              # Hero, CategorySection
│   └── admin/             # AdminSidebar
├── contexts/              # React Contexts
├── lib/                   # Utils, db
├── types/                 # TypeScript types
└── data/                  # Mock data
```

---

## 🔐 Kimlik Doğrulama (NextAuth.js)

### Entegre Edilen Özellikler:
- ✅ Credentials Provider (Email/Şifre)
- ✅ bcrypt.js ile şifre hash'leme
- ✅ JWT tabanlı session
- ✅ Middleware ile admin koruma
- ✅ Rol bazlı erişim (USER/ADMIN)

### API Endpoints:
| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/auth/[...nextauth]` | ALL | NextAuth.js handler |
| `/api/auth/register` | POST | Yeni kullanıcı kaydı |

### Test Hesapları:
```
Admin:  admin@hayvanpazari.com / admin123
User:   ahmet@email.com / user123
```

---

## 🎨 Ana Sayfa Bileşenleri

### 1. Hero Section
- Arka plan: Unsplash çiftlik görseli + gradient overlay
- Arama formu (Anahtar kelime + Kategori + Şehir)
- Hızlı kategori erişim butonları
- Framer Motion animasyonları

### 2. Category Section
- 4 ana kategori kartı (Büyükbaş, Küçükbaş, Yem, Ekipman)
- Her kart: Görsel, başlık, açıklama, ilan sayısı
- Hover efektleri ve animasyonlar

### 3. Features Section
- 4 özellik kartı (Güvenli, Hızlı, Geniş Ağ, Destek)
- İkonlar ve açıklamalar

### 4. Stats Section
- Platform istatistikleri (5000+ ilan, 3000+ kullanıcı vb.)
- Gradient arka plan

### 5. CTA Section
- "Hemen İlan Ver" çağrısı

---

## 👤 Giriş Sayfası (/giris)

### Tasarım:
- **Sol taraf**: Tam ekran görsel + karşılama metni
- **Sağ taraf**: Giriş formu

### Form Özellikleri:
- Email input (validasyon)
- Şifre input (göster/gizle)
- "Beni hatırla" checkbox
- Hata mesajları
- Loading state
- NextAuth `signIn()` entegrasyonu

---

## 📝 Kayıt Sayfası (/kayit)

### 2 Adımlı Form:

**Adım 1 - Kişisel Bilgiler:**
- Ad Soyad
- Email
- Telefon
- Şehir (Select)
- Hesap tipi (Bireysel/Kurumsal)

**Adım 2 - Güvenlik:**
- Şifre (6+ karakter)
- Kullanım koşulları onayı

### Validasyon:
- Tüm alanlar zorunlu
- Email format kontrolü
- Şifre uzunluğu
- Şartlar onayı

---

## 🎛️ Admin Paneli (/admin)

### Layout:
- **Sidebar**: Koyu tema, collapsible menü
- **Ana içerik**: Beyaz arka plan

### Menü Öğeleri:
1. Dashboard
2. Kullanıcılar
3. İlanlar
4. Kategoriler
5. Ayarlar

### Dashboard İçeriği:
- 4 istatistik kartı:
  - Toplam Kullanıcı
  - Toplam İlan
  - Bekleyen İlan
  - Toplam Görüntülenme
- Son kayıt olan kullanıcılar
- Son eklenen ilanlar

### Koruma:
- Middleware ile `/admin/*` rotaları korunuyor
- Sadece `role === 'ADMIN'` kullanıcılar erişebilir
- Olmayanlar anasayfaya yönlendirilir

---

## 🗄️ Veritabanı Şeması (Prisma)

### Ana Modeller:

```prisma
model User {
  id, email, password, name, phone
  city, district, type (INDIVIDUAL/BUSINESS)
  isVerified, isActive, isAdmin
  listings, favorites, messages
}

model Listing {
  id, title, description, price
  status (ACTIVE/PASSIVE/SOLD/PENDING)
  isApproved, isFeatured
  city, district, images
  category, subcategory
  user (relation)
}

model Category {
  id, name, slug, description
  icon, image, order
  subcategories, listings
}
```

---

## 🛠️ Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını sync et
npx prisma generate

# Development server
npm run dev
# → http://localhost:3001

# Prisma Studio (DB yönetimi)
npx prisma studio
# → http://localhost:5555
```

---

## 🔧 Önemli Dosyalar

| Dosya | Açıklama |
|-------|----------|
| `src/lib/auth/options.ts` | NextAuth.js yapılandırması |
| `src/middleware.ts` | Admin rotaları koruma |
| `src/types/next-auth.d.ts` | Auth TypeScript tipleri |
| `prisma/schema.prisma` | Veritabanı şeması |
| `src/app/layout.tsx` | SessionProvider entegrasyonu |

---

## ⚠️ Bilinen Sorunlar

1. **Build Timeout**: Next.js 14 static generation timeout sorunu
   - Çözüm: `export const dynamic = 'force-dynamic'` eklendi
   
2. **Client Component Props**: Radix UI + Server Components uyumsuzluğu
   - Çözüm: UI bileşenlerine `'use client'` eklendi

---

## 🎯 Sonraki Adımlar

1. ✅ API endpoint'lerinin test edilmesi
2. ✅ Form validasyonlarının kontrolü
3. 🔄 Deployment (Vercel önerilir)
4. 🔄 Email doğrulama entegrasyonu
5. 🔄 Şifre sıfırlama özelliği

---

*Son Güncelleme: 13.02.2026*
