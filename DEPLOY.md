# Hostinger Deployment Rehberi

## 🚀 Hızlı Başlangıç

Bu rehber, HayvanPazarı.com projesini Hostinger'a deploy etmek için adım adım talimatları içerir.

## 📋 Ön Gereksinimler

1. **Hostinger Hesabı**: Business veya Premium plan önerilir
2. **Domain**: Hostinger'da satın alınmış veya nameserver'ları Hostinger'a yönlendirilmiş
3. **Node.js**: Local bilgisayarınızda v18+ yüklü olmalı

## 🔧 1. Hostinger'da Hazırlık

### 1.1 MySQL Veritabanı Oluşturma

1. Hostinger Panel'e giriş yapın
2. "Veritabanları" > "MySQL Veritabanları" bölümüne gidin
3. Yeni veritabanı oluşturun:
   - Veritabanı adı: `hayvanpazari`
   - Kullanıcı adı: `hayvan_user`
   - Şifre: Güçlü bir şifre oluşturun
4. **Veritabanı bilgilerini not edin** (Host, Port, DB Adı, Kullanıcı, Şifre)

### 1.2 Cloudflare (Önerilir)

1. Domain DNS ayarlarına gidin
2. Nameserver'ları Hostinger'a yönlendirin:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
3. SSL/TLS ayarlarında "Full (Strict)" modunu seçin

## 💻 2. Proje Build Alma

### 2.1 Environment Variables Ayarla

`.env.hostinger` dosyasını oluşturun (`.env.hostinger.example` dosyasından kopyalayın):

```bash
# Linux/Mac
cp .env.hostinger.example .env.hostinger

# Windows
copy .env.hostinger.example .env.hostinger
```

Dosyayı düzenleyin:

```env
DATABASE_URL="mysql://kullanici:sifre@localhost:3306/hayvanpazari"
NEXTAUTH_URL="https://sizindomain.com"
NEXTAUTH_SECRET="cok-guclu-secret-key"
CLOUDINARY_CLOUD_NAME="sizin-cloud"
CLOUDINARY_API_KEY="api-key"
CLOUDINARY_API_SECRET="api-secret"
```

### 2.2 Build Alma

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Prisma Client generate et
npx prisma generate

# 3. Veritabanı şemasını senkronize et (production'da migrate yerine deploy kullanın)
npx prisma db push

# 4. Hostinger config ile build al
npm run build:hostinger
```

**Not**: `npm run build:hostinger` komutu package.json'a eklenecek.

### 2.3 Seed Data (Opsiyonel)

İlk verileri yüklemek için:

```bash
npx prisma db seed
```

## 📤 3. Hostinger'a Yükleme

### 3.1 FTP/SFTP ile Yükleme

**FileZilla kullanarak:**

1. Hostinger Panel > FTP Hesapları > Yeni FTP Hesabı
2. FileZilla'ya bağlanın:
   - Host: `ftp.sizindomain.com`
   - Kullanıcı: FTP kullanıcı adı
   - Şifre: FTP şifre
   - Port: `21` (SFTP için `22`)

3. **Önemli Dosyaları Yükle**:
   ```
   public_html/
   ├── .next/              # Build çıktısı (varsa)
   ├── dist/              # Static export çıktısı
   ├── prisma/            # Schema dosyası
   ├── package.json
   ├── next.config.js
   └── .env               # Environment variables
   ```

### 3.2 Node.js Uygulaması Olarak Çalıştırma (Önerilen)

Hostinger Business/Premium planlarda:

1. **"Advanced"** > **"Node.js"** bölümüne gidin
2. Yeni Node.js uygulaması oluşturun:
   - Uygulama kök dizini: `/home/u123456789/domains/sizindomain.com/public_html`
   - Başlangıç dosyası: `server.js` (veya `node_modules/.bin/next start`)
   - Node.js versiyonu: `18.x`

3. **package.json**'a ekle:
   ```json
   {
     "scripts": {
       "start": "next start -p $PORT",
       "build": "next build"
     }
   }
   ```

### 3.3 Static Hosting (Daha Basit)

Sadece statik dosyalar için:

1. `npm run build:hostinger` ile build alın
2. `dist` klasöründeki tüm dosyaları `public_html`'e yükleyin
3. `.htaccess` dosyası oluşturun:

```apache
# dist/.htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 🔐 4. Güvenlik Ayarları

### 4.1 SSL Sertifikası

1. Hostinger Panel > SSL
2. "Install SSL" butonuna tıklayın
3. Cloudflare kullanıyorsanız, Cloudflare SSL/TLS sekmesinden ayarlayın

### 4.2 .htaccess Güvenlik

```apache
# Güvenlik başlıkları
<IfModule mod_headers.c>
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-XSS-Protection "1; mode=block"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# .env dosyasına erişimi engelle
<FilesMatch "^\.env">
  Order allow,deny
  Deny from all
</FilesMatch>

# Dizin listelemeyi kapat
Options -Indexes
```

## 🧪 5. Test ve Kontrol

### 5.1 Deployment Sonrası Kontrol Listesi

- [ ] Ana sayfa yükleniyor mu?
- [ ] Giriş/Kayıt işlemleri çalışıyor mu?
- [ ] Resim yükleme (Cloudinary) çalışıyor mu?
- [ ] İlan ekleme çalışıyor mu?
- [ ] Admin paneline erişilebiliyor mu?
- [ ] SSL aktif mi? (https://)
- [ ] Mobil görünüm düzgün mü?

### 5.2 Log Kontrolü

Hostinger Panel > "Advanced" > "Error Logs"

```bash
# SSH ile log kontrolü (VPS kullanıyorsanız)
tail -f /home/u123456789/domains/sizindomain.com/logs/error.log
```

## 🔄 6. Güncelleme (Yeni Versiyon Deploy)

```bash
# 1. Değişiklikleri commit et
git add .
git commit -m "Yeni versiyon"

# 2. Yeni build al
npm run build:hostinger

# 3. FTP ile sadece değişen dosyaları yükle
# - dist/ klasörü
# - prisma/schema.prisma (eğer değiştiyse)

# 4. Veritabanı migrate (gerekirse)
npx prisma migrate deploy
```

## 🆘 7. Sorun Giderme

### Sorun: "Cannot find module"

```bash
# Çözüm: node_modules'u yeniden yükle
rm -rf node_modules package-lock.json
npm install
npm run build:hostinger
```

### Sorun: "Database connection failed"

1. MySQL bilgilerini kontrol edin
2. Hostinger Panel > MySQL > "Remote MySQL" - IP adresinizi ekleyin
3. `.env` dosyasındaki DATABASE_URL formatı:
   ```
   mysql://kullanici:sifre@localhost:3306/veritabani
   ```

### Sorun: 500 Internal Server Error

1. `.env` dosyası eksik olabilir
2. FileZilla ile transfer modunu "Binary" yapın
3. `node_modules` eksik olabilir - `npm install` çalıştırın

### Sorun: Resimler yüklenmiyor

1. Cloudinary ayarlarını kontrol edin
2. `next.config.js`'te `images.unoptimized: true` olduğundan emin olun

## 📞 Destek

Sorun yaşarsanız:
- Hostinger 7/24 Canlı Destek
- Proje GitHub Issues
- nextjs.org/docs

---

**Son Güncelleme**: 2026-02-13
**Versiyon**: 1.0.0
