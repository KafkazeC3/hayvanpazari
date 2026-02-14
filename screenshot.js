const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function takeScreenshots() {
  console.log('Starting screenshots...');
  
  // Screenshot klasörü oluştur
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3001';
  const pages = [
    { path: '/', name: '01-homepage' },
    { path: '/giris/', name: '02-login' },
    { path: '/kayit/', name: '03-register' },
    { path: '/ilanlar/', name: '04-listings' },
    { path: '/admin/', name: '05-admin' },
  ];

  for (const p of pages) {
    try {
      console.log(`Taking screenshot of ${p.path}...`);
      await page.goto(`${baseUrl}${p.path}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Sayfanın yüklenmesi için bekle
      await page.waitForTimeout(2000);
      
      const screenshotPath = path.join(screenshotDir, `${p.name}.png`);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      
      console.log(`✓ Saved: ${p.name}.png`);
    } catch (error) {
      console.error(`✗ Failed ${p.path}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('\nScreenshots completed! Check the /screenshots folder.');
}

takeScreenshots().catch(console.error);
