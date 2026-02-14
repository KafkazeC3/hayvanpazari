import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/giris/');

    await page.getByLabel(/E-posta/i).fill('admin@hayvanpazari.com');
    await page.getByLabel(/Şifre/i).fill('admin123');
    await page.getByRole('button', { name: /Giriş Yap/i }).click();

    // Başarılı giriş kontrolü
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/Çıkış Yap/i)).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/giris/');

    await page.getByLabel(/E-posta/i).fill('wrong@email.com');
    await page.getByLabel(/Şifre/i).fill('wrongpassword');
    await page.getByRole('button', { name: /Giriş Yap/i }).click();

    // Hata mesajı kontrolü
    await expect(page.getByText(/hatalı/i)).toBeVisible();
  });

  test('should redirect to login when accessing protected page', async ({ page }) => {
    await page.goto('/profil/');
    await expect(page).toHaveURL(/giris/);
  });

  test('should register new user', async ({ page }) => {
    await page.goto('/kayit/');

    // Form doldur
    await page.getByLabel(/Ad Soyad/i).fill('Test User');
    await page.getByLabel(/E-posta/i).fill(`test${Date.now()}@example.com`);
    await page.getByLabel(/Telefon/i).fill('5551234567');
    await page.getByLabel(/Şehir/i).selectOption('İstanbul');
    await page.getByRole('button', { name: /Devam/i }).click();

    // İkinci adım
    await page.getByLabel(/Şifre/i).fill('TestPassword123');
    await page.getByLabel(/Kullanım Koşulları/i).check();
    await page.getByRole('button', { name: /Kayıt Ol/i }).click();

    // Başarılı kayıt kontrolü
    await expect(page).toHaveURL(/profil/);
  });
});
