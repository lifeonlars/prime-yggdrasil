# Storybook Testing Guide

This guide explains how to test components in Prime Yggdrasil using Storybook's Vitest addon.

## Overview

Prime Yggdrasil uses `@storybook/addon-vitest` for component testing. This allows you to:
- Write tests alongside your stories
- Test components in a real browser environment
- Use Vitest's familiar testing API
- Run tests in watch mode for development

## Setup

The testing infrastructure is already configured:

### Files
- `.storybook/vitest.config.ts` - Vitest configuration for Storybook
- `.storybook/vitest.setup.ts` - Test setup and Storybook project annotations
- `package.json` - Test scripts

### Scripts
```bash
# Run all Storybook tests once
npm run test:storybook

# Run tests in watch mode (auto-rerun on changes)
npm run test:storybook:watch
```

## Writing Tests

### Basic Test Structure

Tests are written using Vitest's `expect` API inside your story files:

```tsx
import { test, expect } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'primereact/button';

const meta = {
  title: 'Button/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Click me',
  },
};

// Test the Primary story
test('Primary button renders correctly', async ({ mount }) => {
  const component = await mount(<Primary.component {...Primary.args} />);
  const button = await component.getByRole('button');

  await expect(button).toBeInTheDocument();
  await expect(button).toHaveTextContent('Click me');
});
```

### Testing Interactive Components

For components with state (like Checkbox, RadioButton, etc.):

```tsx
import { test, expect } from '@storybook/test';
import { userEvent } from '@storybook/test';

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox checked={checked} onChange={(e) => setChecked(e.checked)} />
    );
  },
};

test('Checkbox toggles on click', async ({ mount, page }) => {
  await mount(<Default.component />);

  const checkbox = page.getByRole('checkbox');

  // Initially unchecked
  await expect(checkbox).not.toBeChecked();

  // Click to check
  await userEvent.click(checkbox);
  await expect(checkbox).toBeChecked();

  // Click again to uncheck
  await userEvent.click(checkbox);
  await expect(checkbox).not.toBeChecked();
});
```

### Testing Theme Switching

Test components in both light and dark modes:

```tsx
test('Button renders in dark mode', async ({ mount, page }) => {
  // Set dark mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  });

  await mount(<Primary.component {...Primary.args} />);

  const button = page.getByRole('button');
  const bgColor = await button.evaluate((el) =>
    getComputedStyle(el).backgroundColor
  );

  // Dark mode should have darker background
  await expect(bgColor).toBeTruthy();
});
```

### Testing Accessibility

Use built-in a11y assertions:

```tsx
import { test, expect } from '@storybook/test';

test('Button is accessible', async ({ mount, page }) => {
  await mount(<Primary.component {...Primary.args} />);

  const button = page.getByRole('button');

  // Check ARIA attributes
  await expect(button).toBeEnabled();
  await expect(button).toBeVisible();
  await expect(button).toHaveAccessibleName('Click me');
});
```

## Best Practices

### 1. Test One Concern Per Test
```tsx
// Good
test('renders with label', async ({ mount }) => { /* ... */ });
test('responds to click', async ({ mount }) => { /* ... */ });

// Avoid
test('renders and clicks', async ({ mount }) => { /* ... */ });
```

### 2. Use Semantic Queries
```tsx
// Good - semantic and accessible
const button = page.getByRole('button', { name: 'Submit' });
const heading = page.getByRole('heading', { level: 1 });

// Avoid - fragile
const button = page.locator('.p-button');
```

### 3. Test User Behavior, Not Implementation
```tsx
// Good - tests what user sees/does
test('shows error message on invalid input', async ({ mount, page }) => {
  await mount(<Form />);
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Required field')).toBeVisible();
});

// Avoid - tests implementation details
test('sets error state to true', async ({ mount }) => {
  const { rerender } = await mount(<Form />);
  // Don't test internal state
});
```

### 4. Keep Tests Fast
- Use `mount` instead of full page loads
- Mock external API calls
- Avoid unnecessary `waitFor` delays

### 5. Test Across Themes
```tsx
test.each(['light', 'dark'])('renders in %s mode', async (theme, { mount, page }) => {
  await page.evaluate((t) => {
    document.documentElement.setAttribute('data-theme', t);
  }, theme);

  await mount(<Component />);
  // Test rendering...
});
```

## Common Patterns

### Testing Forms

```tsx
test('form submission', async ({ mount, page }) => {
  await mount(<FormStory />);

  // Fill in fields
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');

  // Submit
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify result
  await expect(page.getByText('Welcome!')).toBeVisible();
});
```

### Testing Dropdowns

```tsx
test('dropdown selection', async ({ mount, page }) => {
  await mount(<DropdownStory />);

  const dropdown = page.getByRole('combobox');
  await dropdown.click();

  // Select option
  await page.getByRole('option', { name: 'New York' }).click();

  // Verify selection
  await expect(dropdown).toHaveValue('NY');
});
```

### Testing Modals/Dialogs

```tsx
test('dialog opens and closes', async ({ mount, page }) => {
  await mount(<DialogStory />);

  // Open dialog
  await page.getByRole('button', { name: 'Open' }).click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Close dialog
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).not.toBeVisible();
});
```

## Debugging Tests

### Run in headed mode
```bash
# See the browser while tests run
npm run test:storybook:watch
# Then in the Vitest UI, enable "headed" mode
```

### Use page.pause()
```tsx
test('debug test', async ({ mount, page }) => {
  await mount(<Component />);

  await page.pause(); // Opens Playwright Inspector

  // Test continues...
});
```

### Screenshot on failure
```tsx
test('visual test', async ({ mount, page }) => {
  await mount(<Component />);

  try {
    await expect(page.getByRole('button')).toBeVisible();
  } catch (error) {
    await page.screenshot({ path: 'test-failure.png' });
    throw error;
  }
});
```

## Continuous Integration

For CI/CD pipelines:

```yaml
# .github/workflows/test.yml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run Storybook tests
  run: npm run test:storybook
```

## Troubleshooting

### "Failed to start test runner process"

This usually means:
1. Playwright browsers aren't installed: `npx playwright install chromium`
2. Port conflict: Close other Storybook instances
3. Timeout: Increase timeout in vitest.config.ts

### Tests timing out

Increase test timeout:
```ts
// .storybook/vitest.config.ts
export default defineConfig({
  test: {
    testTimeout: 30000, // 30 seconds
  },
});
```

### Theme styles not applying

Ensure YggdrasilProvider is wrapping your component:
```tsx
// In your story
export const Default: Story = {
  decorators: [
    (Story) => (
      <YggdrasilProvider ripple={true}>
        <Story />
      </YggdrasilProvider>
    ),
  ],
};
```

## Resources

- [Storybook Test Addon Docs](https://storybook.js.org/docs/writing-tests/test-addon)
- [Vitest API](https://vitest.dev/api/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

## Next Steps

1. Add tests to existing stories
2. Set up CI pipeline to run tests
3. Add visual regression testing with Chromatic
4. Configure test coverage reporting
