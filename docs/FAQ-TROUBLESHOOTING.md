---
title: "FAQ & Troubleshooting"
category: reference
tags: [faq, troubleshooting, common-issues, debugging, help, problems]
audience: developer
version: 0.7.0
lastUpdated: 2026-01-17
relatedDocs:
  - CONSUMPTION-GUIDE.md
  - AI-AGENT-GUIDE.md
  - ANTI-PATTERNS.md
---

# FAQ & Troubleshooting

**Purpose**: Quick solutions to common issues encountered when using Prime Yggdrasil design system.

**For Agents**: Before reporting an issue or asking for help, check this FAQ first.

---

## Table of Contents

1. [Theme & Styling Issues](#theme-styling-issues)
2. [Component Styling Problems](#component-styling-problems)
3. [Token Usage Issues](#token-usage-issues)
4. [Build & Import Errors](#build-import-errors)
5. [Accessibility Issues](#accessibility-issues)
6. [Agent Validation Errors](#agent-validation-errors)
7. [Dark Mode Issues](#dark-mode-issues)
8. [Performance Issues](#performance-issues)

---

## Theme & Styling Issues

### Q: Theme CSS not loading / Components look unstyled

**Symptoms**:
- Components render but have no styling
- Colors are missing
- Layout looks broken
- PrimeReact components appear unstyled

**Diagnosis Steps**:
1. Check import order in your entry file (main.tsx or App.tsx)
2. Verify `data-theme` attribute exists on `<html>` element
3. Check browser DevTools Network tab for 404 errors
4. Inspect computed styles in Elements panel

**Solutions**:

✅ **Correct import order**:
```tsx
// main.tsx or App.tsx
import '@lifeonlars/prime-yggdrasil/theme.css';  // FIRST
import 'primeicons/primeicons.css';  // SECOND (if using PrimeIcons)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

✅ **Set data-theme attribute**:
```tsx
// In App.tsx or main.tsx
document.documentElement.setAttribute('data-theme', 'light');
```

✅ **Check build configuration**:
```ts
// vite.config.ts
export default defineConfig({
  css: {
    postcss: './postcss.config.js'  // Ensure PostCSS is configured
  }
});
```

**Related**: [CONSUMPTION-GUIDE.md - Integration](./CONSUMPTION-GUIDE.md#integration)

---

### Q: Custom CSS overriding theme styles

**Symptoms**:
- Components look different than expected
- Styles from custom CSS conflict with theme

**Diagnosis**:
1. Check CSS import order
2. Use browser DevTools to see which styles are applied
3. Check CSS specificity

**Solution**:
```tsx
// ✅ CORRECT order
import '@lifeonlars/prime-yggdrasil/theme.css';  // Theme FIRST
import './custom.css';  // Your CSS AFTER

// ❌ WRONG order
import './custom.css';  // Don't import before theme
import '@lifeonlars/prime-yggdrasil/theme.css';
```

**Tip**: Avoid using `!important` - use semantic tokens instead

---

### Q: Fonts not loading / Wrong font family

**Symptoms**:
- Text appears in default browser font
- Roboto font not loading

**Diagnosis**:
1. Check if font import is included
2. Verify network request for font files
3. Check font-family in computed styles

**Solution**:

The theme CSS already includes Roboto font from Google Fonts. If fonts aren't loading:

1. **Check network connectivity** (Google Fonts CDN)
2. **Verify CSP headers** allow Google Fonts
3. **Use fallback fonts** if needed:

```css
/* If you need offline fonts */
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

---

## Component Styling Problems

### Q: PrimeReact components not matching design system

**Symptoms**:
- Components look like default PrimeReact, not Yggdrasil
- Colors don't match expected design

**Diagnosis**:
1. Verify theme CSS is imported
2. Check `data-theme` attribute
3. Inspect computed CSS variables

**Solution**:

Ensure you're importing Yggdrasil theme, NOT PrimeReact base theme:

```tsx
// ✅ CORRECT
import '@lifeonlars/prime-yggdrasil/theme.css';

// ❌ WRONG - Don't import PrimeReact theme
import 'primereact/resources/themes/lara-light-blue/theme.css';
```

---

### Q: Button colors don't match mockups

**Symptoms**:
- Primary button is wrong color
- Severity variants not working

**Diagnosis**:
1. Check if using semantic tokens
2. Verify button severity prop
3. Inspect background color in DevTools

**Solution**:

✅ **Use severity prop** for variants:
```tsx
<Button label="Primary" />  {/* Default = brand primary */}
<Button label="Secondary" outlined />
<Button label="Danger" severity="danger" />
```

✅ **Or use semantic tokens**:
```tsx
<Button
  label="Custom"
  style={{
    background: 'var(--surface-brand-primary)',
    color: 'var(--text-onsurface-onbrand)'
  }}
/>
```

❌ **Don't use hardcoded colors**:
```tsx
<Button style={{ background: '#3B82F6' }} />  {/* WRONG */}
```

**Related**: [ANTI-PATTERNS.md #13](./ANTI-PATTERNS.md#anti-pattern-13-hardcoded-hex-colors)

---

### Q: DataTable rows not alternating colors

**Symptoms**:
- All table rows same color
- No visual distinction between rows

**Diagnosis**:
- Yggdrasil uses subtle row hover, not alternating rows
- This is intentional design decision

**Solution**:

This is **expected behavior**. Yggdrasil uses hover states instead of striping:

```tsx
<DataTable value={data}>
  {/* Rows will have hover effect automatically */}
</DataTable>
```

If you need striping, add custom CSS:
```css
.p-datatable .p-datatable-tbody > tr:nth-child(even) {
  background: var(--surface-neutral-tertiary);
}
```

---

### Q: Input borders too subtle / hard to see

**Symptoms**:
- Input fields blend into background
- Hard to distinguish focused vs unfocused

**Diagnosis**:
- Check contrast in your theme
- Verify focus states are working

**Solution**:

Focus states should be highly visible:

```tsx
<InputText
  value={value}
  onChange={(e) => setValue(e.target.value)}
  // Focus adds blue border automatically
/>
```

Verify focus token is correct:
```css
/* In browser DevTools, check: */
--border-state-focus: /* Should be blue/brand color */
```

If still too subtle, file an issue with theme contrast.

---

## Token Usage Issues

### Q: CSS variable not working / token not defined

**Symptoms**:
- `var(--token-name)` shows as literal text or fallback
- Console warning about undefined variable

**Diagnosis**:
1. Check token name spelling
2. Verify theme CSS is loaded
3. Check if token exists in current theme

**Solution**:

✅ **Common token mistakes**:
```tsx
// ❌ WRONG
color: 'var(--text-default)'  // Missing category
color: 'var(--neutral-text-default)'  // Wrong order

// ✅ CORRECT
color: 'var(--text-neutral-default)'  // Category first, type second
```

✅ **Verify token exists**:
```tsx
// In browser DevTools Console:
getComputedStyle(document.documentElement).getPropertyValue('--text-neutral-default')
```

**Reference**: [MASTER-TOKEN-REFERENCE.md](./MASTER-TOKEN-REFERENCE.md)

---

### Q: Text not readable on colored background

**Symptoms**:
- Low contrast text
- Text hard to read in dark mode
- Failing WCAG contrast checks

**Diagnosis**:
- Using wrong text-on-surface token
- Mismatched token pairing

**Solution**:

Use `--text-onsurface-*` tokens on colored backgrounds:

```tsx
// ✅ CORRECT pairing
<div style={{
  background: 'var(--surface-brand-primary)',
  color: 'var(--text-onsurface-onbrand)'  // Matches surface
}}>

// ❌ WRONG pairing
<div style={{
  background: 'var(--surface-brand-primary)',
  color: 'var(--text-neutral-default)'  // Contrast failure
}}>
```

**Reference**: [MASTER-TOKEN-REFERENCE.md - Contrast Pairing](./MASTER-TOKEN-REFERENCE.md#contrast-pairing-rules)

---

### Q: Spacing not on 4px grid

**Symptoms**:
- Visual inconsistency in spacing
- Drift validator warnings
- Odd pixel values (15px, 17px, etc.)

**Diagnosis**:
- Using arbitrary pixel values
- Not following 4px grid system

**Solution**:

Use rem values on 4px grid:

```tsx
// ✅ CORRECT
<div style={{
  padding: '1rem',      // 16px
  margin: '0.5rem',     // 8px
  gap: '1.5rem'         // 24px
}}>

// ❌ WRONG
<div style={{
  padding: '15px',      // Off-grid
  margin: '17px',       // Off-grid
  gap: '10px'           // Off-grid
}}>
```

**Valid values**: `0.25rem` (4px), `0.5rem` (8px), `0.75rem` (12px), `1rem` (16px), `1.25rem` (20px), `1.5rem` (24px), `2rem` (32px), etc.

**Reference**: [MASTER-TOKEN-REFERENCE.md - Spacing](./MASTER-TOKEN-REFERENCE.md#spacing-guidelines-4px-grid)

---

## Build & Import Errors

### Q: Module not found: '@lifeonlars/prime-yggdrasil'

**Symptoms**:
- Build error: Cannot find module
- Import statement fails

**Diagnosis**:
1. Check if package is installed
2. Verify package.json dependencies
3. Check node_modules folder

**Solution**:

```bash
# Install package
npm install @lifeonlars/prime-yggdrasil primereact primeicons

# If already installed, try:
rm -rf node_modules package-lock.json
npm install
```

**Verify installation**:
```bash
npm list @lifeonlars/prime-yggdrasil
```

---

### Q: TypeScript errors with PrimeReact imports

**Symptoms**:
- TS errors about missing types
- Cannot find module 'primereact/*'

**Diagnosis**:
- Missing TypeScript definitions
- Wrong tsconfig setup

**Solution**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["primereact"],
    "moduleResolution": "bundler"  // or "node"
  }
}
```

```bash
# Install type definitions
npm install --save-dev @types/react @types/node
```

---

### Q: CSS not loading in Vite build

**Symptoms**:
- Dev server works, production build broken
- CSS missing in dist folder

**Diagnosis**:
- Vite build configuration issue
- CSS import not processed

**Solution**:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    cssCodeSplit: false  // Bundle all CSS together
  }
});
```

---

### Q: "Failed to resolve import" error for theme.css

**Symptoms**:
- Vite error: Failed to resolve import "@lifeonlars/prime-yggdrasil/theme.css"

**Diagnosis**:
- Package export path issue
- Incorrect import path

**Solution**:

```tsx
// ✅ CORRECT import
import '@lifeonlars/prime-yggdrasil/theme.css';

// ❌ WRONG imports
import '@lifeonlars/prime-yggdrasil/dist/theme.css';
import '@lifeonlars/prime-yggdrasil/yggdrasil-light.css';
```

**If still failing**, check package.json exports:
```json
{
  "exports": {
    "./theme.css": "./dist/yggdrasil-light.css"
  }
}
```

---

## Accessibility Issues

### Q: Screen reader not announcing button label

**Symptoms**:
- Icon-only button has no accessible label
- Screen reader says "button" with no context

**Diagnosis**:
- Missing `aria-label` on icon button

**Solution**:

```tsx
// ✅ CORRECT
<Button
  icon="pi pi-pencil"
  rounded
  text
  aria-label="Edit item"  // Required for icon-only
  onClick={handleEdit}
/>

// ❌ WRONG
<Button
  icon="pi pi-pencil"
  rounded
  text
  onClick={handleEdit}  // No label
/>
```

**Related**: [ANTI-PATTERNS.md #38](./ANTI-PATTERNS.md#anti-pattern-38-missing-aria-labels-on-icon-buttons)

---

### Q: Form input not linked to label

**Symptoms**:
- Clicking label doesn't focus input
- Screen reader doesn't announce label

**Diagnosis**:
- Missing `htmlFor` / `id` association

**Solution**:

```tsx
// ✅ CORRECT
<label htmlFor="email">Email</label>
<InputText id="email" value={email} onChange={handleChange} />

// ❌ WRONG
<label>Email</label>  {/* No htmlFor */}
<InputText value={email} onChange={handleChange} />  {/* No id */}
```

**Related**: [ANTI-PATTERNS.md #39](./ANTI-PATTERNS.md#anti-pattern-39-missing-label-association)

---

### Q: Focus not visible when tabbing

**Symptoms**:
- Can't see which element has focus
- Keyboard navigation invisible

**Diagnosis**:
- Focus styles removed
- `outline: none` without replacement

**Solution**:

**Never remove focus outline**:
```css
/* ❌ WRONG - Don't do this */
button:focus {
  outline: none;
}
```

PrimeReact components have focus styles built-in. If you need custom focus:

```tsx
<button
  style={{
    outline: 'none'
  }}
  onFocus={(e) => {
    e.currentTarget.style.boxShadow = '0 0 0 2px var(--border-state-focus)';
  }}
  onBlur={(e) => {
    e.currentTarget.style.boxShadow = 'none';
  }}
>
```

**Related**: [ANTI-PATTERNS.md #42](./ANTI-PATTERNS.md#anti-pattern-42-missing-focus-indicators)

---

## Agent Validation Errors

### Q: Drift Validator flagging hardcoded colors

**Symptoms**:
- CLI error: "Hardcoded color detected"
- ESLint warning about hex values

**Diagnosis**:
- Using hardcoded colors instead of semantic tokens

**Solution**:

```tsx
// ❌ FLAGGED
<div style={{ color: '#374151' }}>

// ✅ FIX
<div style={{ color: 'var(--text-neutral-default)' }}>
```

**Run validation**:
```bash
npx @lifeonlars/prime-yggdrasil validate --rules hardcoded-colors
```

**Related**: [ANTI-PATTERNS.md - Token Misuse](./ANTI-PATTERNS.md#token-misuse)

---

### Q: Utilities Guard warning about class usage

**Symptoms**:
- Warning: "Design utilities on PrimeReact component"
- ESLint error about utility classes

**Diagnosis**:
- Using utility classes on PrimeReact components

**Solution**:

```tsx
// ❌ WRONG
<Button className="bg-blue-500 p-4" label="Click" />

// ✅ CORRECT
<Button label="Click" />  {/* Use PrimeReact props */}

// Exception: .w-full is allowed on inputs
<InputText className="w-full" />  {/* OK */}
```

**Reference**: [UTILITIES-POLICY.md](./UTILITIES-POLICY.md)

---

### Q: Interaction Patterns agent flagging missing states

**Symptoms**:
- Warning: "Missing loading state"
- Warning: "Missing empty state"

**Diagnosis**:
- Incomplete state handling

**Solution**:

Handle all 5 required states:

```tsx
// ✅ CORRECT - All states handled
{isLoading && <ProgressSpinner />}
{error && <Message severity="error" text={error} />}
{!isLoading && !error && items.length === 0 && (
  <div className="flex flex-column align-items-center gap-3 p-6">
    <i className="pi pi-inbox" style={{ fontSize: '4rem', color: 'var(--icon-neutral-subdued)' }} />
    <p>No items found</p>
  </div>
)}
{!isLoading && !error && items.length > 0 && (
  <DataTable value={items} />
)}
```

**Reference**: [Interaction Patterns Agent](../.ai/agents/interaction-patterns.md)

---

## Dark Mode Issues

### Q: Colors not updating when switching to dark mode

**Symptoms**:
- Dark mode toggle doesn't change colors
- Some elements stay light mode colors

**Diagnosis**:
1. Check if using semantic tokens (not hardcoded)
2. Verify `data-theme` attribute is changing
3. Check if theme CSS includes dark mode

**Solution**:

✅ **Ensure semantic tokens used**:
```tsx
// ✅ CORRECT - Adapts to theme
<div style={{ background: 'var(--surface-neutral-primary)' }}>

// ❌ WRONG - Fixed color
<div style={{ background: 'white' }}>
```

✅ **Toggle data-theme attribute**:
```tsx
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  setTheme(newTheme);
};
```

✅ **Verify in DevTools**:
```html
<html data-theme="dark">  <!-- Should change -->
```

---

### Q: Shadows too dark/light in dark mode

**Symptoms**:
- Shadows look wrong in dark mode
- Elevation not visible

**Diagnosis**:
- Using hardcoded shadow values
- Not using elevation tokens

**Solution**:

```tsx
// ✅ CORRECT - Auto-adapts
<div style={{ boxShadow: 'var(--elevation-moderate)' }}>

// ❌ WRONG - Fixed shadow
<div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
```

**Reference**: [MASTER-TOKEN-REFERENCE.md - Elevation](./MASTER-TOKEN-REFERENCE.md#elevation-tokens-shadows)

---

### Q: Custom component breaks in dark mode

**Symptoms**:
- Component looks fine in light mode
- Broken/invisible in dark mode

**Root Cause**: Using hardcoded colors instead of semantic tokens

**Solution**:

Audit component for hardcoded values:

```tsx
// ❌ BAD - Hardcoded
const MyComponent = () => (
  <div style={{
    background: '#FFFFFF',  // Always white
    color: '#000000',       // Always black
    border: '1px solid #E5E7EB'  // Always gray
  }}>
);

// ✅ GOOD - Semantic tokens
const MyComponent = () => (
  <div style={{
    background: 'var(--surface-neutral-primary)',  // Adapts
    color: 'var(--text-neutral-default)',          // Adapts
    border: '1px solid var(--border-neutral-default)'  // Adapts
  }}>
);
```

**Tool**: Run drift validator to find hardcoded colors
```bash
npx @lifeonlars/prime-yggdrasil validate --rules hardcoded-colors
```

---

## Performance Issues

### Q: Large DataTable slow to render

**Symptoms**:
- Table takes long time to render
- Browser freezes with large datasets
- Poor scroll performance

**Diagnosis**:
- Too many rows rendered at once
- No pagination or virtualization

**Solution**:

✅ **Use pagination**:
```tsx
<DataTable
  value={largeData}
  paginator
  rows={50}
  lazy  // Load on demand
/>
```

✅ **Use VirtualScroller for 1000+ rows**:
```tsx
import { VirtualScroller } from 'primereact/virtualscroller';

<VirtualScroller
  items={veryLargeArray}
  itemSize={50}
  itemTemplate={(item) => <div>{item.name}</div>}
/>
```

---

### Q: Icons loading slow / flashing

**Symptoms**:
- Icons appear delayed
- Flash of missing icons

**Diagnosis**:
- PrimeIcons font loading slowly
- No font preloading

**Solution**:

```html
<!-- In index.html, preload PrimeIcons -->
<link rel="preload" href="/node_modules/primeicons/fonts/primeicons.woff2" as="font" type="font/woff2" crossorigin>
```

Or use custom SVG icons instead (no font loading):
```tsx
import { Icon } from '@lifeonlars/prime-yggdrasil';

<Icon name="my-icon" />  {/* Loads from public/icons/ */}
```

---

### Q: App bundle size too large

**Symptoms**:
- Large bundle.js file
- Slow initial page load

**Diagnosis**:
- Importing entire PrimeReact library
- No tree-shaking

**Solution**:

✅ **Import individual components**:
```tsx
// ✅ CORRECT
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

// ❌ WRONG
import * as PrimeReact from 'primereact';
```

✅ **Code splitting for routes**:
```tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<ProgressSpinner />}>
  <Dashboard />
</Suspense>
```

---

## Getting Help

If your issue isn't covered here:

1. **Search existing issues**: [GitHub Issues](https://github.com/anthropics/prime-yggdrasil/issues)
2. **Check PrimeReact docs**: [https://primereact.org/](https://primereact.org/)
3. **Review agent guides**: [`.ai/agents/`](../.ai/agents/)
4. **File new issue**: Include:
   - Minimal reproduction
   - Expected vs actual behavior
   - Environment details (Node, npm, browser)
   - Error messages/screenshots

---

## Quick Diagnostic Checklist

When something isn't working, check:

- [ ] Theme CSS imported first
- [ ] `data-theme` attribute set on `<html>`
- [ ] Using semantic tokens (not hardcoded colors)
- [ ] Spacing on 4px grid (rem values)
- [ ] All required states handled (loading, empty, error, etc.)
- [ ] Importing PrimeReact components correctly
- [ ] Text-on-surface pairing correct
- [ ] Focus states visible
- [ ] No `outline: none` without replacement
- [ ] Browser console shows no errors

---

**Last Updated**: 2026-01-17
**Version**: 0.7.0

For implementation guidance, see [DECISION-MATRIX.md](./DECISION-MATRIX.md).
For mistakes to avoid, see [ANTI-PATTERNS.md](./ANTI-PATTERNS.md).
