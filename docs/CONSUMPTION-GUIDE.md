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
npm install @your-org/prime-yggdrasil

# Install peer dependencies
npm install primereact@^10.0.0 primeicons@^7.0.0 react@^18.0.0
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

### 1. Import Theme in Your App

```tsx
// src/main.tsx or src/App.tsx
import 'prime-yggdrasil/yggdrasil-light.css';  // Light theme
// OR
import 'prime-yggdrasil/yggdrasil-dark.css';   // Dark theme

import 'primeicons/primeicons.css';

// Your app code
import { Button } from 'primereact/button';

function App() {
  return <Button label="Hello Yggdrasil" />;
}
```

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
import 'prime-yggdrasil/yggdrasil-light.css';
import 'primeicons/primeicons.css';

export default function App({ Component, pageProps }) {
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
4. CHECK Storybook before implementing any UI

## Quick Reference

**Colors:**
- Text: `var(--text-neutral-default)`, `var(--text-neutral-subdued)`
- Backgrounds: `var(--surface-neutral-primary)`, `var(--surface-neutral-secondary)`
- Brand: `var(--surface-brand-primary)`, `var(--text-state-interactive)`

**Spacing (4px grid):**
- `0.5rem` (8px), `1rem` (16px), `1.5rem` (24px), `2rem` (32px)

**Components:**
- Data tables: `import { DataTable } from 'primereact/datatable'`
- Forms: `import { InputText } from 'primereact/inputtext'`
- Buttons: `import { Button } from 'primereact/button'`
- Navigation: `import { Menubar } from 'primereact/menubar'`

**Buttons (only these variants):**
- Primary: `<Button label="Action" />`
- Outlined: `<Button label="Action" outlined />`
- Link: `<Button label="Action" text />`
- Danger: `<Button label="Delete" severity="danger" />`

## Documentation

Full guide: [node_modules/prime-yggdrasil/docs/AI-AGENT-GUIDE.md]
Storybook: Run `npm run storybook` in design system package
```

### Reference Documentation in Prompts

When working with AI agents, include this in your initial prompt:

```
Before implementing any UI, read the design system guide at:
./node_modules/prime-yggdrasil/docs/AI-AGENT-GUIDE.md

Follow these principles:
1. Check PrimeReact components first
2. Use semantic tokens only
3. Follow 4px spacing grid
4. Reference Storybook examples
```

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
    // Remove old theme
    const oldLink = document.getElementById('theme-link');
    if (oldLink) oldLink.remove();

    // Add new theme
    const link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    link.href = theme === 'light'
      ? '/node_modules/prime-yggdrasil/yggdrasil-light.css'
      : '/node_modules/prime-yggdrasil/yggdrasil-dark.css';
    document.head.appendChild(link);
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

- **AI Agent Guide**: `node_modules/prime-yggdrasil/docs/AI-AGENT-GUIDE.md`
- **Theme Architecture**: `node_modules/prime-yggdrasil/src/theme/README.md`
- **PrimeReact Docs**: https://primereact.org/
- **Semantic Tokens**: `node_modules/prime-yggdrasil/src/theme/semantic-light.css`

## 🤝 Contributing Back

If you create useful composite components:
1. Ensure they use only PrimeReact + semantic tokens
2. Document in Storybook
3. Submit PR to prime-yggdrasil repo
4. Share patterns with team
