# Prime Yggdrasil npm Package Issues

## Critical Issues Found

### 1. **Broken CSS Build** (CRITICAL - Blocks Usage)

**Package Version:** `@lifeonlars/prime-yggdrasil@0.1.1`

**Problem:**
The `yggdrasil-light.css` and `yggdrasil-dark.css` files contain `@import` statements that reference CSS files that don't exist in the published package.

**yggdrasil-light.css contains:**

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:...');
@import "./foundations.css";  ✅ EXISTS
@import "./radius.css";       ❌ MISSING
@import "./semantic-light.css"; ❌ MISSING
@import "./components.css";   ❌ MISSING
```

**Files in dist folder:**

- ✅ `foundations.css` (6KB, contains foundation color tokens)
- ✅ `yggdrasil-light.css` (401 bytes, just imports)
- ✅ `yggdrasil-dark.css` (399 bytes, just imports)
- ❌ `radius.css` (MISSING)
- ❌ `semantic-light.css` (MISSING)
- ❌ `semantic-dark.css` (MISSING)
- ❌ `components.css` (MISSING)

**Impact:**

- Cannot use the theme as documented
- Importing `@lifeonlars/prime-yggdrasil/yggdrasil-light.css` fails silently or throws errors
- Semantic tokens referenced in documentation are not available

**Root Cause:**
The Vite build configuration is not properly bundling CSS files. The `@import` statements are being left as-is instead of:

1. Being resolved and bundled into a single file, OR
2. Having the referenced files copied to the dist folder

## Recommended Fixes

### Option 1: Bundle All Imports (Recommended)

Update `vite.config.lib.ts` to use PostCSS with the `postcss-import` plugin to inline all `@import` statements:

```ts
// vite.config.lib.ts
import { defineConfig } from 'vite';
import postcssImport from 'postcss-import';

export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssImport()],
    },
  },
  build: {
    lib: {
      // ... existing config
    },
    cssCodeSplit: false, // Bundle all CSS into one file
  },
});
```

### Option 2: Copy All Referenced Files

Update the build script to copy all referenced CSS files to dist:

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.lib.json && vite build --config vite.config.lib.ts && npm run copy-css",
    "copy-css": "cp src/theme/radius.css src/theme/semantic-light.css src/theme/semantic-dark.css src/theme/components.css dist/"
  }
}
```

### Option 3: Update Package Exports

If the files are supposed to be separate, update the build to include them and update package.json exports:

```json
{
  "exports": {
    "./radius.css": "./dist/radius.css",
    "./semantic-light.css": "./dist/semantic-light.css",
    "./semantic-dark.css": "./dist/semantic-dark.css",
    "./components.css": "./dist/components.css"
  }
}
```

## Current Workaround in This Project

Since the Yggdrasil theme is broken, this project uses:

- PrimeReact's base `lara-light-blue` theme
- Yggdrasil's `foundations.css` (for foundation color tokens)

See [src/main.tsx](src/main.tsx:3-8) for the workaround implementation.

## Testing Checklist for Fixed Package

When the package is fixed, verify:

- [ ] `yggdrasil-light.css` loads without errors
- [ ] `yggdrasil-dark.css` loads without errors
- [ ] All semantic tokens are available (--text-neutral-default, --surface-brand-primary, etc.)
- [ ] PrimeReact components are properly styled
- [ ] Dark mode switching works
- [ ] No 404 errors in browser console for CSS files

## Additional Notes

- The package.json version shows `0.1.1`, which suggests this is an early release
- Documentation references Storybook but no Storybook URL is provided
- The foundations.css works correctly and contains all expected foundation tokens
- The JS exports (version, theme metadata) work correctly
