import { test } from '@playwright/test';
import * as path from 'node:path';

const locales = ['en', 'ar'] as const;

test.describe('visual QA screenshot capture', () => {
  for (const locale of locales) {
    test(`${locale} full-page screenshot`, async ({ page }, testInfo) => {
      await page.goto(`/${locale}`);
      await page.locator('main').waitFor({ state: 'visible' });
      await page.screenshot({
        path: path.join('qa', 'screenshots', `${locale}-${testInfo.project.name}.png`),
        fullPage: true,
      });
    });
  }
});
