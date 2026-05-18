import { expect, test } from '@playwright/test';

const locales = ['en', 'ar'] as const;

const canonicalStats = ['3,000+', '2,500+', '150+', '270,000+', '250+', '100+', '1.2B+', '12+'];
const blockedRenderedText = [
  '+966 50 000 0000',
  'Chat on WhatsApp',
  'Open WhatsApp',
  'Riyadh, Saudi Arabia\nFacility',
  '300+ cats',
  '15+ dogs',
  'Beauty is the hook',
  'leopard',
];

test.describe('homepage content QA', () => {
  for (const locale of locales) {
    test(`${locale} homepage loads with canonical facts and no dead contact/social copy`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });

      await page.goto(`/${locale}`);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.getByText('Animal House').first()).toBeVisible();

      for (const stat of canonicalStats) {
        await expect(page.getByText(stat).first()).toBeVisible();
      }

      await expect(page.getByText('animalhouseksa@gmail.com').first()).toBeVisible();
      await expect(page.locator('a[href^="https://wa.me"]')).toHaveCount(0);
      await expect(page.locator('footer a[href="#"]')).toHaveCount(0);

      const bodyText = await page.locator('body').innerText();
      for (const blocked of blockedRenderedText) {
        expect(bodyText.toLowerCase()).not.toContain(blocked.toLowerCase());
      }

      expect(consoleErrors).toEqual([]);
    });
  }
});
