/**
 * Component Contrast Tests with Playwright
 *
 * Tests real rendered components in both light and dark themes
 * to catch actual contrast issues that token-level tests miss.
 */

import { test, expect } from '@playwright/test';
import { APCAcontrast, sRGBtoY } from 'apca-w3';

const STORYBOOK_URL = 'http://localhost:6006';

// APCA thresholds
const APCA_THRESHOLDS = {
  body: 60,
  large: 45,
  ui: 75,
  heading: 60,
};

/**
 * Parse RGB color string to [r, g, b] array
 */
function parseRgb(rgbString: string): [number, number, number] | null {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
}

/**
 * Calculate APCA contrast between two RGB strings
 */
function calculateContrast(textRgb: string, bgRgb: string): number | null {
  const textColor = parseRgb(textRgb);
  const bgColor = parseRgb(bgRgb);

  if (!textColor || !bgColor) return null;

  const textY = sRGBtoY(textColor);
  const bgY = sRGBtoY(bgColor);
  const contrast = APCAcontrast(textY, bgY);

  return Math.abs(contrast);
}

/**
 * Test helper: Check element contrast
 */
async function checkElementContrast(
  page: any,
  selector: string,
  minContrast: number,
  description: string
) {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();

  const color = await element.evaluate((el: Element) =>
    window.getComputedStyle(el).color
  );
  const bgColor = await element.evaluate((el: Element) =>
    window.getComputedStyle(el).backgroundColor
  );

  const contrast = calculateContrast(color, bgColor);

  console.log(`${description}:`);
  console.log(`  Text: ${color}`);
  console.log(`  Background: ${bgColor}`);
  console.log(`  Contrast: Lc ${contrast?.toFixed(1) || 'N/A'}`);

  expect(contrast).not.toBeNull();
  expect(contrast!).toBeGreaterThanOrEqual(minContrast);
}

/**
 * Test helper: Check border contrast
 */
async function checkBorderContrast(
  page: any,
  selector: string,
  minContrast: number,
  description: string
) {
  const element = page.locator(selector).first();
  await expect(element).toBeVisible();

  const borderColor = await element.evaluate((el: Element) =>
    window.getComputedStyle(el).borderColor
  );
  const bgColor = await element.evaluate((el: Element) => {
    // Get background of parent container
    const parent = el.parentElement;
    return parent ? window.getComputedStyle(parent).backgroundColor : 'rgb(255, 255, 255)';
  });

  const contrast = calculateContrast(borderColor, bgColor);

  console.log(`${description}:`);
  console.log(`  Border: ${borderColor}`);
  console.log(`  Background: ${bgColor}`);
  console.log(`  Contrast: Lc ${contrast?.toFixed(1) || 'N/A'}`);

  expect(contrast).not.toBeNull();
  expect(contrast!).toBeGreaterThanOrEqual(minContrast);
}

// =============================================================================
// BUTTON TESTS
// =============================================================================

test.describe('Button Components - Light Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-button--outlined`);
    // Wait for story to render
    await page.waitForSelector('button', { timeout: 5000 });
  });

  test('Outlined button should have sufficient text contrast', async ({ page }) => {
    await checkElementContrast(
      page,
      'button.p-button-outlined',
      APCA_THRESHOLDS.ui,
      'Outlined button text (light)'
    );
  });

  test('Outlined button should have sufficient border contrast', async ({ page }) => {
    await checkBorderContrast(
      page,
      'button.p-button-outlined',
      APCA_THRESHOLDS.ui,
      'Outlined button border (light)'
    );
  });
});

test.describe('Button Components - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-button--outlined&globals=theme:dark`);
    await page.waitForSelector('button', { timeout: 5000 });
  });

  test('Outlined button should have sufficient text contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      'button.p-button-outlined',
      APCA_THRESHOLDS.ui,
      'Outlined button text (dark)'
    );
  });

  test('Outlined button should have sufficient border contrast in dark mode', async ({ page }) => {
    await checkBorderContrast(
      page,
      'button.p-button-outlined',
      APCA_THRESHOLDS.ui,
      'Outlined button border (dark)'
    );
  });
});

test.describe('Link Button - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-button--link&globals=theme:dark`);
    await page.waitForSelector('button', { timeout: 5000 });
  });

  test('Link button should have sufficient text contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      'button.p-button-link',
      APCA_THRESHOLDS.ui,
      'Link button text (dark)'
    );
  });
});

// =============================================================================
// CHECKBOX TESTS
// =============================================================================

test.describe('Checkbox - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-checkbox--basic&globals=theme:dark`);
    await page.waitForSelector('.p-checkbox', { timeout: 5000 });
  });

  test('Checkbox border should have sufficient contrast in dark mode', async ({ page }) => {
    await checkBorderContrast(
      page,
      '.p-checkbox-box',
      APCA_THRESHOLDS.ui,
      'Checkbox border (dark)'
    );
  });
});

// =============================================================================
// RADIO BUTTON TESTS
// =============================================================================

test.describe('RadioButton - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-radiobutton--basic&globals=theme:dark`);
    await page.waitForSelector('.p-radiobutton', { timeout: 5000 });
  });

  test('Radio button border should have sufficient contrast in dark mode', async ({ page }) => {
    await checkBorderContrast(
      page,
      '.p-radiobutton-box',
      APCA_THRESHOLDS.ui,
      'Radio button border (dark)'
    );
  });
});

// =============================================================================
// INPUT TEXT TESTS
// =============================================================================

test.describe('InputText - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-inputtext--basic&globals=theme:dark`);
    await page.waitForSelector('input.p-inputtext', { timeout: 5000 });
  });

  test('Input text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      'input.p-inputtext',
      APCA_THRESHOLDS.body,
      'Input text (dark)'
    );
  });

  test('Input border should have sufficient contrast in dark mode', async ({ page }) => {
    await checkBorderContrast(
      page,
      'input.p-inputtext',
      APCA_THRESHOLDS.ui,
      'Input border (dark)'
    );
  });
});

// =============================================================================
// DROPDOWN TESTS
// =============================================================================

test.describe('Dropdown - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-dropdown--basic&globals=theme:dark`);
    await page.waitForSelector('.p-dropdown', { timeout: 5000 });
  });

  test('Dropdown text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      '.p-dropdown-label',
      APCA_THRESHOLDS.body,
      'Dropdown text (dark)'
    );
  });

  test('Dropdown border should have sufficient contrast in dark mode', async ({ page }) => {
    await checkBorderContrast(
      page,
      '.p-dropdown',
      APCA_THRESHOLDS.ui,
      'Dropdown border (dark)'
    );
  });
});

// =============================================================================
// MULTISELECT TESTS
// =============================================================================

test.describe('MultiSelect - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-multiselect--basic&globals=theme:dark`);
    await page.waitForSelector('.p-multiselect', { timeout: 5000 });
  });

  test('MultiSelect border should have sufficient contrast in dark mode', async ({ page }) => {
    await checkBorderContrast(
      page,
      '.p-multiselect',
      APCA_THRESHOLDS.ui,
      'MultiSelect border (dark)'
    );
  });
});

// =============================================================================
// DIALOG TESTS
// =============================================================================

test.describe('Dialog - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-dialog--basic&globals=theme:dark`);
    await page.waitForSelector('.p-dialog', { timeout: 5000 });
  });

  test('Dialog header text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      '.p-dialog-title',
      APCA_THRESHOLDS.heading,
      'Dialog title (dark)'
    );
  });

  test('Dialog content text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      '.p-dialog-content',
      APCA_THRESHOLDS.body,
      'Dialog content (dark)'
    );
  });
});

// =============================================================================
// CHIP TESTS
// =============================================================================

test.describe('Chip - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-chip--basic&globals=theme:dark`);
    await page.waitForSelector('.p-chip', { timeout: 5000 });
  });

  test('Chip text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      '.p-chip-text',
      APCA_THRESHOLDS.body,
      'Chip text (dark)'
    );
  });
});

// =============================================================================
// SELECT BUTTON TESTS
// =============================================================================

test.describe('SelectButton - Dark Theme', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/?path=/story/components-selectbutton--basic&globals=theme:dark`);
    await page.waitForSelector('.p-selectbutton', { timeout: 5000 });
  });

  test('SelectButton unselected text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      '.p-button:not(.p-highlight)',
      APCA_THRESHOLDS.ui,
      'SelectButton unselected (dark)'
    );
  });

  test('SelectButton selected text should have sufficient contrast in dark mode', async ({ page }) => {
    await checkElementContrast(
      page,
      '.p-button.p-highlight',
      APCA_THRESHOLDS.ui,
      'SelectButton selected (dark)'
    );
  });
});
