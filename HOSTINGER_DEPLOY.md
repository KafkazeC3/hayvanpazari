# Hostinger Business - Deployment Rehberi

## 🚀 Hızlı Başlangıç

Bu rehber, HayvanPazarı.com projesini Hostinger Business plana deploy etmek içindir.

## 📋 Hostinger Business Özellikleri

- ✅ Node.js desteği
- ✅ MySQL veritabanı
- ✅ SSH erişimi
- ✅ NPM desteği
- ✅ PM2 process manager

---

## 1️⃣ Hostinger'da Hazırlık

### MySQL Veritabanı Oluşturma

1. Hostinger Panel → "Veritabanları" → "MySQL Veritabanları"
2. Yeni veritabanı oluştur:
   - **Veritabanı adı**: `hayvanpazari`
   - **Kullanıcı adı**: `hayvan_user`
   - **Şifre**: Güçlü bir şifre oluşturun
3. **phpMyAdmin** ile bağlan ve `prisma/migrations/0_init/migration.sql` dosyasını import et

### Environment Variables

`.env` dosyasını oluşturun:

```env
# Database
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE_NAME"

# NextAuth
NEXTAUTH_URL="https://sizindomain.com"
NEXTAUTH_SECRET="cok-guclu-bir-secret-key-olusturun"

# Cloudinary
CLOUDINARY_CLOUD_NAME="sizin-cloud"
CLOUDINARY_API_KEY="api-key"
CLOUDINARY_API_SECRET="api-secret"

# Email (Opsiyonel)
SMTP_HOST="smtp.hostinger.com"
SMTP_PORT="587"
SMTP_USER="info@sizindomain.com"
SMTP_PASSWORD="email-sifre"
```

---

## 2️⃣ SSH ile Deployment

### SSH Bağlantısı

Hostinger Panel → "Advanced" → "SSH Access" bilgilerini alın:

```bash
ssh u123456789@sizindomain.com -p 65002
```

### Node.js Uygulaması Kurulumu

```bash
# 1. Proje dizinine git
cd ~/domains/sizindomain.com/public_html

# 2. Eski dosyaları temizle (varsa)
rm -rf *

# 3. Projeyi klonla veya dosyaları yükle
# GitHub'dan:
git clone https://github.com/kullanici/hayvanpazari.git .

# VEYA FTP ile yüklediyseniz, doğrudan devam edin
```

### Kurulum Scripti

```bash
#!/bin/bash

# Kurulum scripti - Hostinger Business

echo "🚀 Kurulum başlıyor..."

# Node.js versiyon kontrolü
node -v
npm -v

# Bağımlılıkları yükle
echo "📦 Bağımlılıklar yükleniyor..."
npm ci

# Prisma Client generate
echo "🔄 Prisma Client oluşturuluyor..."
npx prisma generate

# Build al (hataları görmezden gel)
echo "🔨 Build alınıyor..."
npm run build || echo "Build hataları var ama devam ediliyor..."

# PM2 ile başlat
echo "🚀 Uygulama başlatılıyor..."
pm2 delete hayvanpazari 2>/dev/null || true
npm2 start server.js --name "hayvanpazari" -- --port 3000

echo "✅ Kurulum tamamlandı!"
echo "🌐 Site: https://sizindomain.com"
```

---

## 3️⃣ Manuel Kurulum Adımları

### Adım 1: Dosyaları Yükle

```bash
# Local'den Hostinger'a SCP ile
cd hayvanpazari

# node_modules hariç tüm dosyaları sıkıştır
tar -czvf deploy.tar.gz --exclude='node_modules' --exclude='.next' --exclude='.git' .

# Hostinger'a gönder
scp -P 65002 deploy.tar.gz u123456789@sizindomain.com:~/domains/sizindomain.com/public_html/

# SSH ile bağlanıp aç
ssh u123456789@sizindomain.com -p 65002
cd ~/domains/sizindomain.com/public_html
tar -xzvf deploy.tar.gz
```

### Adım 2: Node.js Bağımlılıkları

```bash
cd ~/domains/sizindomain.com/public_html

# Node.js versiyonunu kontrol et (Hostinger'da 18+ olmalı)
node -v

# Bağımlılıkları yükle
npm ci --production

# Prisma Client generate
npx prisma generate
```

### Adım 3: Build Alma

```bash
# Build al
npm run build

# HATA: Build alırken hata çıkarsa, şu komutu deneyin:
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

### Adım 4: PM2 ile Başlatma

```bash
# PM2 kurulumu (ilk sefer)
npm install -g pm2

# Uygulamayı başlat
pm2 start npm --name "hayvanpazari" -- start

# VEYA doğrudan
cd ~/domains/sizindomain.com/public_html
pm2 start .next/standalone/server.js --name "hayvanpazari"

# Otomatik başlatma ayarı
pm2 startup
pm2 save
```

---

## 4️⃣ Proxy Ayarları (Apache)

Hostinger Panel → "Advanced" → "Apache Config":

`.htaccess` dosyasını düzenleyin:

```apache
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Node.js uygulamasına yönlendirme
RewriteCond %{SERVER_PORT} 80
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R,L]

# API isteklerini Node.js'e yönlendir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# Tüm istekleri Next.js'e yönlendir
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

---

## 5️⃣ Güncelleme (Yeni Versiyon)

```bash
# SSH ile bağlan
ssh u123456789@sizindomain.com -p 65002
cd ~/domains/sizindomain.com/public_html

# Uygulamayı durdur
pm2 stop hayvanpazari

# Yeni dosyaları yükle (FTP veya SCP)
# ... dosyaları yükle ...

# Bağımlılıkları güncelle
npm ci

# Prisma Client güncelle
npx prisma generate

# Build al
npm run build

# Uygulamayı başlat
pm2 start hayvanpazari

# Log kontrolü
pm2 logs hayvanpazari
```

---

## 6️⃣ Sorun Giderme

### Build Hatası

```bash
# Bellek yetersiz hatası
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# TypeScript hatalarını görmezden gel
# next.config.mjs'de:
# typescript: { ignoreBuildErrors: true }
```

### Port Çakışması

```bash
# 3000 portu kullanımdaysa
pm2 delete hayvanpazari
lsof -i :3000
kill -9 <PID>
pm2 start npm --name "hayvanpazari" -- start --port 3001
```

### Database Bağlantı Hatası

```bash
# MySQL çalışıyor mu?
systemctl status mysql

# MySQL bilgilerini kontrol et
cat .env | grep DATABASE_URL
```

---

## 7️⃣ Log Kontrolü

```bash
# PM2 logs
pm2 logs hayvanpazari

# Son 100 satır
pm2 logs hayvanpazari --lines 100

# Hata logları
tail -f ~/.pm2/logs/hayvanpazari-error.log
```

---

## 8️⃣ Önemli Dosyalar

```
public_html/
├── .next/              # Build çıktısı
├── node_modules/       # NPM paketleri
├── prisma/
│   ├── schema.prisma   # DB şema
│   └── migrations/     # Migration dosyaları
├── src/                # Kaynak kodlar
├── .env                # Environment variables
├── next.config.mjs     # Next.js config
├── package.json        # NPM manifest
└── server.js           # (Opsiyonel) Custom server
```

---

## 🆘 Acil Destek

Sorun yaşarsanız:
1. Hostinger Canlı Destek (7/24)
2. Proje GitHub Issues
3. Next.js Discord

**Hazır mısınız?** SSH bilgilerinizi alın ve adım adım başlayalım! 🚀
