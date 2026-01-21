---
title: "Consumption Guide"
category: guide
tags: [integration, setup, npm, installation, theme-switching, icons]
audience: developer
version: 0.7.0
lastUpdated: 2026-01-16
relatedDocs:
  - AI-AGENT-GUIDE.md
  - MASTER-TOKEN-REFERENCE.md
  - UTILITIES-POLICY.md
  - README.md
---

# Consuming Yggdrasil in Your Project

This guide explains how to use the Yggdrasil design system in another project to ensure AI agents maintain design consistency.

## 🎯 Goals

1. Enforce component-driven development
2. Prevent bespoke component creation
3. Maintain brand consistency across projects
4. Enable AI agents to work within design constraints

## 📦 Setup

### Option 1: NPM Package (Recommended for production)

```bash
# Install Yggdrasil theme
npm install @lifeonlars/prime-yggdrasil

# Install peer dependencies
npm install primereact@^10.9.7 primeicons@^7.0.0 react@^19.2.0
```

### Option 2: Git Submodule (Recommended for development)

```bash
# Add as submodule
git submodule add https://github.com/your-org/prime-yggdrasil.git packages/design-system

# Link locally
cd packages/design-system
npm install
npm run build

# In your project
npm link ../packages/design-system
```

### Option 3: Direct Import (For rapid prototyping)

```bash
# Copy theme files directly
cp -r path/to/prime-yggdrasil/src/theme ./src/design-system
```

## 🚀 Integration

### 1. Import Theme and Provider in Your App

```tsx
// src/main.tsx or src/App.tsx
import '@lifeonlars/prime-yggdrasil/theme.css';
import 'primeicons/primeicons.css';

// Set theme via data-theme attribute on html element
document.documentElement.setAttribute('data-theme', 'light'); // or 'dark'

// Your app code
import { Button } from 'primereact/button';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <Button label="Hello Yggdrasil" />
    </PrimeReactProvider>
  );
}
```

**PrimeReactProvider Configuration:**
- `ripple` (default: `false`) - Enable ripple effect on interactive components (buttons, checkboxes, etc.)
- `inputStyle` - Choose between 'outlined' or 'filled' input styles

```tsx
<PrimeReactProvider
  value={{
    ripple: true,
    inputStyle: 'outlined', // or 'filled'
    // other PrimeReact config...
  }}
>
  <App />
</PrimeReactProvider>
```

### Typography (Optional)

Prime Yggdrasil loads Roboto font family by default. If you want to use the Yggdrasil typography system in your custom components:

```tsx
// Import optional typography utilities
import '@lifeonlars/prime-yggdrasil/typography.css';

// Use in your custom components
function MyComponent() {
  return (
    <div style={{
      fontFamily: 'var(--Body-family)',
      fontSize: 'var(--Body-medium-font-size)',
      lineHeight: 'var(--Body-medium-line-height)',
      fontWeight: 'var(--Body-weight-regular)'
    }}>
      Custom content with Yggdrasil typography
    </div>
  );
}
```

**Note:** PrimeReact components have their own typography sizing and don't consume these variables. Use these tokens only for custom application code outside of PrimeReact components.

**Available font weights:**
- 400 (Regular)
- 500 (Medium)
- 700 (Bold)

**Available typography categories:**
- `--Body-*` - Body text styles (small, medium, large)
- `--Heading-*` - Heading styles (small, medium, large)
- `--Title-*` - Title styles (small, medium, large)
- `--Button-*` - Button text styles (small, medium, large)
- `--Label-*` - Label styles (x-small, small, medium, large)

### 2. Configure Your Build Tool

#### Vite (Recommended)
```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  }
});
```

#### Next.js
```js
// next.config.js
module.exports = {
  transpilePackages: ['prime-yggdrasil', 'primereact']
};
```

```tsx
// pages/_app.tsx
import '@lifeonlars/prime-yggdrasil/theme.css';
import 'primeicons/primeicons.css';

export default function App({ Component, pageProps }) {
  // Set theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return <Component {...pageProps} />;
}
```

### 3. TypeScript Configuration (Optional)

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["primereact"]
  }
}
```

## 🤖 Provide to AI Agents

### Create an Agent Instructions File

Create `.ai/instructions.md` in your project root:

```markdown
# Project Instructions for AI Agents

## Design System

This project uses the Yggdrasil design system built on PrimeReact.

**CRITICAL RULES:**
1. NEVER create custom components if PrimeReact provides equivalent
2. ALWAYS use semantic tokens for colors (never hardcoded hex values)
3. ALWAYS follow 4px grid for spacing (8px, 12px, 16px, 24px, etc.)
4. USE Yggdrasil utilities for layout/spacing ONLY (not design)
5. CHECK Storybook before implementing any UI

## Quick Reference

**For comprehensive documentation**, see:
- **Tokens**: [MASTER-TOKEN-REFERENCE.md](./MASTER-TOKEN-REFERENCE.md)
- **Utilities**: [UTILITIES-POLICY.md](./UTILITIES-POLICY.md)
- **AI Agent Guide**: [AI-AGENT-GUIDE.md](./AI-AGENT-GUIDE.md)

**Most common tokens:**
- Text: `var(--text-neutral-default)`, `var(--text-neutral-subdued)`
- Backgrounds: `var(--surface-neutral-primary)`, `var(--surface-neutral-secondary)`
- Brand: `var(--surface-brand-primary)`, `var(--text-onsurface-onbrand)`
- Spacing: `0.5rem`, `1rem`, `1.5rem`, `2rem` (4px grid)

**Allowed layout utilities** (see [UTILITIES-POLICY.md](./UTILITIES-POLICY.md)):
- Flexbox: `.flex`, `.flex-column`, `.justify-content-*`, `.align-items-*`
- Grid: `.grid`, `.col-*`
- Spacing: `.p-*`, `.m-*`, `.gap-*`
- NO utilities on PrimeReact components (except `.w-full` on inputs)

**Components:**
- Data tables: `import { DataTable } from 'primereact/datatable'`
- Forms: `import { InputText } from 'primereact/inputtext'`
- Buttons: `import { Button } from 'primereact/button'`
- Icons: `import { Icon } from '@lifeonlars/prime-yggdrasil'`
- Navigation: `import { Menubar } from 'primereact/menubar'`

**Buttons (only these variants):**
- Primary: `<Button label="Action" />`
- Outlined: `<Button label="Action" outlined />`
- Link: `<Button label="Action" text />`
- Danger: `<Button label="Delete" severity="danger" />`

**Icons (PrimeIcons or custom SVGs):**
- PrimeIcons: `<Icon name="pi pi-check" size="medium" />`
- Custom SVG: `<Icon name="my-icon" />` (from public/icons/my-icon.svg)

## Documentation

Full guide: [node_modules/@lifeonlars/prime-yggdrasil/docs/AI-AGENT-GUIDE.md]
Utilities policy: [node_modules/@lifeonlars/prime-yggdrasil/docs/UTILITIES-POLICY.md]
Storybook: Run `npm run storybook` in design system package
```

### Reference Documentation in Prompts

When working with AI agents, include this in your initial prompt:

```
Before implementing any UI, read the design system guides at:
./node_modules/@lifeonlars/prime-yggdrasil/docs/AI-AGENT-GUIDE.md
./node_modules/@lifeonlars/prime-yggdrasil/docs/UTILITIES-POLICY.md

Follow these principles:
1. Check PrimeReact components first
2. Use semantic tokens only (no hardcoded colors)
3. Follow 4px spacing grid
4. Use utilities for layout only (not design)
5. Reference Storybook examples
```

## 🎨 Icon System

Yggdrasil provides flexible icon support with both PrimeIcons and custom SVG icons.

### Option 1: Using PrimeIcons (Traditional)

```tsx
// Install primeicons
npm install primeicons

// Import CSS
import 'primeicons/primeicons.css'
import { Icon } from '@lifeonlars/prime-yggdrasil'

// Use PrimeIcons
<Icon name="pi pi-check" size="medium" />
<Icon name="pi pi-bell" size="large" />
<Icon name="pi pi-user" size="small" />
```

### Option 2: Using Custom SVG Icons

```tsx
// No primeicons needed
import { Icon } from '@lifeonlars/prime-yggdrasil'

// 1. Create public/icons/ directory
mkdir public/icons

// 2. Add SVG files
// - public/icons/bell.svg
// - public/icons/check.svg
// - public/icons/user.svg

// 3. Use Icon component
<Icon name="bell" size="medium" />
<Icon name="check" size="large" />
<Icon name="user" size="small" />
```

### Option 3: Mixed Icons (Both)

```tsx
import 'primeicons/primeicons.css'
import { Icon } from '@lifeonlars/prime-yggdrasil'

// PrimeIcons for common UI icons
<Icon name="pi pi-check" />
<Icon name="pi pi-times" />

// Custom SVGs for brand/app-specific icons
<Icon name="my-app-logo" />
<Icon name="custom-icon" />
```

### Icon Sizing

```tsx
// Predefined sizes
<Icon name="pi pi-bell" size="small" />   {/* 16px */}
<Icon name="pi pi-bell" size="medium" />  {/* 20px - default */}
<Icon name="pi pi-bell" size="large" />   {/* 24px */}

// Custom pixel size
<Icon name="pi pi-bell" size={32} />
<Icon name="pi pi-bell" size={48} />
```

### Colored Icons with Semantic Tokens

```tsx
<Icon
  name="pi pi-check"
  size="large"
  color="var(--text-state-success)"
/>

<Icon
  name="pi pi-times"
  size="large"
  color="var(--text-state-danger)"
/>

<Icon
  name="pi pi-info-circle"
  size="large"
  color="var(--text-state-info)"
/>
```

### Interactive Icons

```tsx
<Icon
  name="pi pi-bell"
  size="large"
  onClick={() => console.log('Clicked!')}
  aria-label="Notifications"
  style={{ cursor: 'pointer' }}
/>
```

**Note:** PrimeIcons is now an optional dependency. You can skip installing it if you only use custom SVG icons.

## 🎨 Theme Switching (Optional)

### Runtime Theme Switching

```tsx
// hooks/useTheme.ts
import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Update data-theme attribute on html element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, toggleTheme };
}
```

```tsx
// App.tsx
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <Button
        label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'}`}
        onClick={toggleTheme}
      />
    </div>
  );
}
```

## 📋 Validation & Enforcement

### ESLint Rules (Optional but Recommended)

Create custom ESLint rules to enforce design system usage:

```js
// .eslintrc.js
module.exports = {
  rules: {
    // Warn on hardcoded colors
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'Literal[value=/#[0-9a-fA-F]{3,6}/]',
        message: 'Use semantic tokens instead of hardcoded colors'
      }
    ],

    // Warn on creating custom button components
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['!primereact/button'],
            message: 'Use PrimeReact Button component'
          }
        ]
      }
    ]
  }
};
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh

# Check for hardcoded colors
if git diff --cached | grep -E '#[0-9a-fA-F]{3,6}'; then
  echo "❌ Hardcoded colors detected! Use semantic tokens."
  echo "See: docs/AI-AGENT-GUIDE.md"
  exit 1
fi

# Check for invalid spacing (not on 4px grid)
if git diff --cached | grep -E '(padding|margin).*: *(5|6|7|9|10|11|13|14|15)px'; then
  echo "❌ Invalid spacing detected! Use 4px grid."
  echo "Valid: 4px, 8px, 12px, 16px, 20px, 24px, etc."
  exit 1
fi
```

## 🧪 Testing Components

### Visual Regression Testing (Optional)

```bash
npm install -D @storybook/test-runner playwright
```

```js
// .storybook/test-runner.js
module.exports = {
  async postRender(page, context) {
    // Test both themes
    const themes = ['light', 'dark'];

    for (const theme of themes) {
      await page.evaluate((themeMode) => {
        const link = document.querySelector('link[href*="yggdrasil"]');
        link.href = `/yggdrasil-${themeMode}.css`;
      }, theme);

      await page.waitForTimeout(500);

      // Screenshot
      await page.screenshot({
        path: `screenshots/${context.id}-${theme}.png`
      });
    }
  }
};
```

## 📊 Monitoring Design System Usage

### Custom Analytics (Optional)

Track which PrimeReact components are being used:

```tsx
// analytics/designSystemUsage.ts
export function trackComponentUsage(componentName: string) {
  // Your analytics implementation
  console.log(`Component used: ${componentName}`);
}

// Usage in components
import { Button } from 'primereact/button';
import { trackComponentUsage } from './analytics/designSystemUsage';

function MyComponent() {
  useEffect(() => {
    trackComponentUsage('Button');
  }, []);

  return <Button label="Click" />;
}
```

## 🎯 Success Checklist

After integration, verify:

- [ ] Theme CSS is imported in app entry point
- [ ] PrimeReact and PrimeIcons are installed
- [ ] AI agent instructions reference design system docs
- [ ] No hardcoded colors in codebase (use semantic tokens)
- [ ] All spacing follows 4px grid
- [ ] PrimeReact components used instead of custom components
- [ ] Components work in both light and dark themes
- [ ] Storybook accessible for reference (if needed)

## 🆘 Troubleshooting

### Theme Not Loading
- Check that CSS import path is correct
- Verify build tool is configured to handle CSS imports
- Check browser console for 404 errors

### Components Look Unstyled
- Ensure PrimeReact CSS is imported after base CSS
- Check that component imports are correct
- Verify PrimeIcons CSS is imported

### Type Errors
- Install `@types/react` and `@types/node`
- Add `"types": ["primereact"]` to tsconfig.json

### Colors Not Updating in Dark Mode
- Verify you're using semantic tokens (not hardcoded values)
- Check that theme file is actually switching
- Inspect computed styles in browser DevTools

## 📚 Additional Resources

- **AI Agent Guide**: `node_modules/@lifeonlars/prime-yggdrasil/docs/AI-AGENT-GUIDE.md`
- **Master Token Reference**: `node_modules/@lifeonlars/prime-yggdrasil/docs/MASTER-TOKEN-REFERENCE.md`
- **Utilities Policy**: `node_modules/@lifeonlars/prime-yggdrasil/docs/UTILITIES-POLICY.md`
- **Theme Architecture**: `node_modules/@lifeonlars/prime-yggdrasil/src/theme/README.md`
- **PrimeReact Docs**: https://primereact.org/

## 🤝 Contributing Back

If you create useful composite components:
1. Ensure they use only PrimeReact + semantic tokens
2. Document in Storybook
3. Submit PR to prime-yggdrasil repo
4. Share patterns with team
