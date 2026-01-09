const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Opening Storybook Password component...');
  await page.goto('http://localhost:6006/?path=/story/components-password--with-toggle-mask');
  await page.waitForTimeout(2000);

  // Switch to the iframe
  const storyFrame = page.frameLocator('#storybook-preview-iframe');

  // Check if the icon is positioned correctly
  const iconParent = storyFrame.locator('.p-input-icon').first();

  if (await iconParent.count() > 0) {
    const styles = await iconParent.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        right: computed.right,
        top: computed.top,
      };
    });

    console.log('\n✓ Icon positioning styles:', styles);

    if (styles.position === 'absolute' && styles.right !== 'auto') {
      console.log('✓ Password icon is correctly positioned!');
    } else {
      console.log('✗ Password icon positioning still needs adjustment');
    }
  }

  await page.screenshot({ path: 'scripts/password-fixed.png' });
  console.log('Screenshot saved: scripts/password-fixed.png');

  await browser.close();
})();
