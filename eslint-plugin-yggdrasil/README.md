# @lifeonlars/eslint-plugin-yggdrasil

ESLint plugin for enforcing [Prime Yggdrasil](https://github.com/lifeonlars/prime-yggdrasil) design system rules.

## Installation

```bash
npm install --save-dev @lifeonlars/eslint-plugin-yggdrasil
```

## Usage

### Recommended Configuration (Warnings)

For gradual adoption, use the recommended config which uses warnings:

**ESLint 9+ (flat config):**

```js
// eslint.config.js
import yggdrasil from '@lifeonlars/eslint-plugin-yggdrasil';

export default [
  {
    plugins: {
      '@lifeonlars/yggdrasil': yggdrasil
    },
    rules: yggdrasil.configs.recommended.rules
  }
];
```

**ESLint 8.x (legacy config):**

```js
// .eslintrc.js
module.exports = {
  plugins: ['@lifeonlars/yggdrasil'],
  extends: ['plugin:@lifeonlars/yggdrasil/recommended']
};
```

### Strict Configuration (Errors)

After completing adoption, use the strict config to enforce compliance:

```js
// eslint.config.js
import yggdrasil from '@lifeonlars/eslint-plugin-yggdrasil';

export default [
  {
    plugins: {
      '@lifeonlars/yggdrasil': yggdrasil
    },
    rules: yggdrasil.configs.strict.rules
  }
];
```

## Rules

### 1. `no-utility-on-components` (CRITICAL)

**What:** Prevents PrimeFlex utility classes on PrimeReact components.

**Why:** PrimeReact components are styled by the theme. Utility classes override these styles and break dark mode, theming, and accessibility.

**Exception:** `w-full` is allowed on form input components.

❌ **Bad:**
```jsx
<Button className="bg-blue-500 p-4" label="Save" />
<InputText className="border-round p-3" />
```

✅ **Good:**
```jsx
<Button label="Save" />
<InputText className="w-full" />
```

---

### 2. `primeflex-allowlist`

**What:** Only allows PrimeFlex classes for layout/spacing, not design.

**Allowed:** `flex`, `grid`, `p-*`, `m-*`, `gap-*`, `justify-*`, `align-*`

**Forbidden:** `bg-*`, `text-[color]-*`, `border-*`, `rounded-*`, `shadow-*`

❌ **Bad:**
```jsx
<div className="flex bg-blue-500 shadow-2">
```

✅ **Good:**
```jsx
<div className="flex p-4" style={{ background: 'var(--surface-brand-primary)' }}>
```

---

### 3. `no-hardcoded-colors`

**What:** Prevents hardcoded color values (hex, rgb, hsl, named colors).

**Required:** Use semantic tokens: `var(--surface-neutral-primary)`, `var(--text-neutral-default)`

❌ **Bad:**
```jsx
<div style={{ background: '#f0f0f0', color: '#333' }}>
<div style={{ background: 'rgb(240, 240, 240)' }}>
```

✅ **Good:**
```jsx
<div style={{
  background: 'var(--surface-neutral-primary)',
  color: 'var(--text-neutral-default)'
}}>
```

---

### 4. `no-tailwind`

**What:** Detects and bans Tailwind CSS class patterns.

**Forbidden:** `hover:bg-blue-500`, `w-[100px]`, `space-x-4`, `ring-2`, `backdrop-blur`

❌ **Bad:**
```jsx
<div className="hover:bg-blue-500 space-x-4">
<div className="w-[100px] ring-2">
```

✅ **Good:**
```jsx
<div className="flex gap-3">
<div style={{ width: '6rem' }}>
```

---

### 5. `valid-spacing`

**What:** Enforces 4px grid spacing tokens.

**Valid scale:** `0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px` (0-8 in PrimeFlex)

**Exception:** 1px allowed for borders only

❌ **Bad:**
```jsx
<div style={{ padding: '10px', margin: '15px' }}>
<div className="p-9">
```

✅ **Good:**
```jsx
<div style={{ padding: '1rem', margin: '1.5rem' }}>
<div className="p-4 m-6">
```

---

### 6. `semantic-tokens-only`

**What:** Prevents foundation tokens (color palette) in app code.

**Forbidden:** `var(--blue-500)`, `var(--gray-100)`

**Required:** `var(--surface-brand-primary)`, `var(--text-neutral-default)`

❌ **Bad:**
```jsx
<div style={{ background: 'var(--blue-500)' }}>
<div style={{ color: 'var(--gray-900)' }}>
```

✅ **Good:**
```jsx
<div style={{ background: 'var(--surface-brand-primary)' }}>
<div style={{ color: 'var(--text-neutral-default)' }}>
```

---

### 7. `primereact-imports-only`

**What:** Ensures consistent PrimeReact imports.

**Required pattern:** Named imports from specific paths

❌ **Bad:**
```jsx
import Button from 'primereact/button';  // Default import
import { Button } from 'primereact';  // Barrel import
```

✅ **Good:**
```jsx
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
```

---

## Migration Path

### Phase 1: Adoption (Recommended Config)

1. Install the plugin
2. Use `recommended` config (warnings)
3. Run `eslint --fix` to auto-fix what's possible
4. Manually fix remaining warnings
5. Learn the design system rules

### Phase 2: Enforcement (Strict Config)

1. Switch to `strict` config (errors)
2. Ensure CI/CD runs ESLint
3. Block PRs with violations
4. Maintain design system compliance

## Integration with AI Agents

This ESLint plugin works alongside the [Yggdrasil AI agents](https://github.com/lifeonlars/prime-yggdrasil#readme):

- **Agents** - Preventive guidance during development (read `.ai/yggdrasil/` files)
- **ESLint** - Detective validation after code is written (this plugin)

Together they provide both prevention and detection for design system enforcement.

## CLI Validation

For deeper analysis and autofix suggestions, use the Yggdrasil CLI:

```bash
# Validate code against all rules
npm run yggdrasil:validate

# Detailed audit with autofix suggestions
npm run yggdrasil:audit
```

Install agents and CLI:

```bash
npx @lifeonlars/prime-yggdrasil init
```

## Resources

- **Documentation:** https://github.com/lifeonlars/prime-yggdrasil
- **PrimeReact:** https://primereact.org/
- **PrimeFlex:** https://primeflex.org/
- **Issues:** https://github.com/lifeonlars/prime-yggdrasil/issues

## License

MIT © Lars Farstad
