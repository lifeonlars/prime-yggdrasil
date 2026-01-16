import { test, expect } from '@playwright/test';

test.describe('NavigationTabs Visual Tests', () => {
  test('should render navigation tabs with all controls', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?args=&id=blocks-navigationtabs--full-example&viewMode=story');

    // Wait for the component to load
    await page.waitForSelector('.p-tabmenu');

    // Take a screenshot
    await page.screenshot({ path: 'navigation-full.png', fullPage: true });

    // Check notification badge
    const badge = page.locator('.p-badge');
    await expect(badge).toBeVisible();
    await badge.screenshot({ path: 'notification-badge.png' });

    // Check avatar
    const avatar = page.locator('.p-avatar');
    await expect(avatar).toBeVisible();
    await avatar.screenshot({ path: 'avatar.png' });

    // Check language flag
    const flag = page.locator('img[alt*="flag"]').first();
    await expect(flag).toBeVisible();
    await flag.screenshot({ path: 'flag.png' });

    // Check tab border
    const activeTab = page.locator('.p-tabmenu .p-highlight');
    await expect(activeTab).toBeVisible();
    await activeTab.screenshot({ path: 'active-tab.png' });
  });
});
