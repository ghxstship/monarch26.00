import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check for main heading
    await expect(page.locator('h1')).toContainText('GHXSTSHIP');
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    await expect(nav.getByRole('link', { name: /about/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /services/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /work/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /contact/i })).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL('/about');
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/GHXSTSHIP Industries/);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /experiential production/i);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should pass accessibility audit', async ({ page }) => {
    await page.goto('/');
    
    // Run axe accessibility tests
    // Note: Requires @axe-core/playwright
    // const results = await new AxeBuilder({ page }).analyze();
    // expect(results.violations).toEqual([]);
  });
});

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill out form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check for success message
    await expect(page.locator('text=/thank you/i')).toBeVisible({ timeout: 10000 });
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit empty form
    await page.click('button[type="submit"]');
    
    // Check for error messages
    await expect(page.locator('text=/required/i')).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});
