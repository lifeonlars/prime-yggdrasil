const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Inspect PrimeReact official example
  console.log('\n=== Inspecting PrimeReact Official Example ===');
  await page.goto('https://primereact.org/password/#togglemask');
  await page.waitForTimeout(2000);

  // Find the password component
  const officialPassword = await page.locator('.p-password').first();
  const officialHTML = await officialPassword.evaluate(el => el.outerHTML);
  console.log('Official HTML structure:', officialHTML);

  // Get computed styles for the icon
  const officialIcon = await page.locator('.p-password .p-icon').first();
  if (await officialIcon.count() > 0) {
    const iconStyles = await officialIcon.evaluate(el => {
      const computed = window.getComputedStyle(el.parentElement);
      return {
        position: computed.position,
        display: computed.display,
        right: computed.right,
        top: computed.top,
        transform: computed.transform,
      };
    });
    console.log('Official icon parent styles:', iconStyles);
  }

  await page.screenshot({ path: 'scripts/official-password.png', fullPage: false });
  console.log('Screenshot saved: scripts/official-password.png');

  // Inspect our Storybook
  console.log('\n=== Inspecting Our Storybook ===');
  await page.goto('http://localhost:6006/?path=/story/components-password--with-toggle-mask');
  await page.waitForTimeout(3000);

  // Switch to the iframe
  const storyFrame = page.frameLocator('#storybook-preview-iframe');
  const ourPassword = storyFrame.locator('.p-password').first();

  // Get the HTML structure
  const ourHTML = await ourPassword.evaluate(el => el.outerHTML);
  console.log('Our HTML structure:', ourHTML);

  // Get computed styles
  const ourIcon = storyFrame.locator('.p-password .p-icon').first();
  if (await ourIcon.count() > 0) {
    const iconStyles = await ourIcon.evaluate(el => {
      const computed = window.getComputedStyle(el.parentElement);
      return {
        position: computed.position,
        display: computed.display,
        right: computed.right,
        top: computed.top,
        transform: computed.transform,
      };
    });
    console.log('Our icon parent styles:', iconStyles);
  }

  await page.screenshot({ path: 'scripts/our-password.png', fullPage: false });
  console.log('Screenshot saved: scripts/our-password.png');

  await browser.close();
})();
