import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display homepage correctly', async ({ page }) => {
    // Başlık kontrolü
    await expect(page).toHaveTitle(/HayvanPazarı/);

    // Ana içerik kontrolü
    await expect(page.getByRole('heading', { name: /Hayvan Alım Satımının/i })).toBeVisible();

    // Kategoriler kontrolü
    await expect(page.getByText('Büyükbaş')).toBeVisible();
    await expect(page.getByText('Küçükbaş')).toBeVisible();
  });

  test('should navigate to listings page', async ({ page }) => {
    await page.getByRole('link', { name: /İlanlar/i }).click();
    await expect(page).toHaveURL(/ilanlar/);
    await expect(page.getByRole('heading', { name: /İlanlar/i })).toBeVisible();
  });

  test('should have working search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Ne arıyorsunuz/i);
    await expect(searchInput).toBeVisible();
    
    await searchInput.fill('dana');
    await searchInput.press('Enter');
    
    await expect(page).toHaveURL(/ilanlar/);
  });

  test('should be responsive', async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('navigation')).toBeVisible();

    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByRole('navigation')).toBeVisible();
  });
});
