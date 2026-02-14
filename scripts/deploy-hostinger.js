#!/usr/bin/env node

/**
 * Hostinger Deployment Script
 * 
 * Kullanım:
 * node scripts/deploy-hostinger.js
 * 
 * Gereksinimler:
 * npm install basic-ftp dotenv
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Konfigürasyon
const config = {
  host: process.env.FTP_HOST || 'ftp.hostinger.com',
  user: process.env.FTP_USER || '',
  password: process.env.FTP_PASSWORD || '',
  secure: true,
  localDir: './dist',
  remoteDir: '/public_html',
};

// Yardımcı fonksiyonlar
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    // Build kontrolü
    if (!fs.existsSync(config.localDir)) {
      log(`❌ Hata: ${config.localDir} klasörü bulunamadı!`, 'red');
      log('Önce "npm run build:hostinger" çalıştırın.', 'yellow');
      process.exit(1);
    }

    // FTP bağlantısı
    log('🚀 Hostinger\'a bağlanılıyor...', 'blue');
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: config.secure,
    });

    log('✅ Bağlantı başarılı!', 'green');

    // Uzak dizine git
    log(`📁 Dizin değiştiriliyor: ${config.remoteDir}`, 'blue');
    await client.ensureDir(config.remoteDir);

    // Dosyaları yükle
    log('📤 Dosyalar yükleniyor...', 'blue');
    await client.clearWorkingDir();
    await client.uploadFromDir(config.localDir);

    log('✅ Yükleme tamamlandı!', 'green');
    log(`🌐 Site: https://${config.host.replace('ftp.', '')}`, 'green');

  } catch (err) {
    log(`❌ Hata: ${err.message}`, 'red');
    process.exit(1);
  } finally {
    client.close();
  }
}

// Ana çalıştırma
(async () => {
  log('🎯 Hostinger Deployment Başlatılıyor...', 'blue');
  log('');
  
  if (!config.user || !config.password) {
    log('❌ FTP bilgileri eksik!', 'red');
    log('');
    log('.env dosyasına şu değişkenleri ekleyin:', 'yellow');
    log('  FTP_HOST=ftp.hostinger.com');
    log('  FTP_USER=kullaniciadi');
    log('  FTP_PASSWORD=sifreniz');
    log('');
    process.exit(1);
  }

  await deploy();
})();
