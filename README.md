# Prime Yggdrasil

A PrimeReact-based design system for React + Vite projects, built with a 3-tier architecture optimized for LLM-assisted development.

## Overview

`prime-yggdrasil` is a **Tier 1 Global Design System** package that provides:

- PrimeReact primitives with styled mode (PrimeOne-based theme)
- Shared Blocks and Layout Blocks
- Yggdrasil theme with custom design tokens
- Storybook documentation and visual regression testing
- Clear patterns for consuming apps (Tier 2 local blocks, Tier 3 views)

## Installation

```bash
npm install prime-yggdrasil
```

This package requires peer dependencies:

```bash
npm install react react-dom primereact primeicons primeflex
```

## Usage

### 1. Import the theme CSS

In your app's entry point (e.g., `main.tsx` or `App.tsx`):

```tsx
// Import Yggdrasil standalone theme (choose light or dark)
import 'prime-yggdrasil/theme.css';        // Light mode
// OR
// import 'prime-yggdrasil/theme-dark.css';  // Dark mode

// Then import icons and utilities
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
```

**Note:** The Yggdrasil theme is **standalone** - it includes all PrimeReact component styles with Yggdrasil colors. You do NOT need to import a separate PrimeReact theme.

### 2. Wrap your app with YggdrasilProvider

```tsx
import { YggdrasilProvider } from 'prime-yggdrasil';
import 'prime-yggdrasil/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
  return (
    <YggdrasilProvider>
      <YourApp />
    </YggdrasilProvider>
  );
}
```

### 3. Use Blocks in your views

```tsx
import { Card, PageHeader, FormField } from 'prime-yggdrasil';
import { InputText } from 'primereact/inputtext';

export function MyView() {
  return (
    <div className="p-3 md:p-4">
      <PageHeader
        title="Dashboard"
        description="Welcome to your dashboard"
      />

      <div className="grid gap-3">
        <div className="col-12 md:col-6">
          <Card>
            <FormField label="Email" htmlFor="email">
              <InputText id="email" type="email" />
            </FormField>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

## Architecture

This package implements **Tier 1** of a 3-tier architecture:

### Tier 1: Global Design System (this package)
- PrimeReact primitives (styled mode, PrimeOne-based theme)
- Shared Blocks and Layout Blocks
- Theme CSS and Provider setup
- Storybook (canonical reference, read-only for consumers)
- Chromatic visual regression

### Tier 2: Local Blocks (in consuming apps)
- App-specific blocks built from Tier 1 primitives
- Can use PrimeFlex for layout (same rules as Views)
- Promotion candidates when patterns are reused

### Tier 3: Views (in consuming apps)
- Screens that compose blocks
- Minimal layout scaffolding only
- **Strictly limited PrimeFlex usage** (see below)

## PrimeFlex Usage Policy

PrimeFlex is the layout utility system alongside PrimeReact. It's for **structural scaffolding**, not visual styling.

### ✅ Allowed in Views (whitelist)

**Grid scaffolding (preferred):**
- `grid`, `col-*` (e.g., `col-12`, `col-6`, `col-3`)
- Responsive variants (e.g., `md:col-6`, `lg:col-4`)

**Flex scaffolding (secondary):**
- `flex`, `flex-wrap`
- Responsive variants (e.g., `md:flex`)

**Spacing between layout regions:**
- `gap-*` and responsive variants (e.g., `gap-3`, `md:gap-4`)

**Alignment for structural layout:**
- `align-items-*` (e.g., `align-items-start`, `align-items-center`)
- `justify-content-*` (e.g., `justify-content-between`, `justify-content-center`)
- Responsive variants

**Outer page padding only (single wrapper):**
- `p-*` or `px-*`/`py-*`
- Responsive variants (e.g., `p-3 md:p-4`)

### ❌ Forbidden in Views (blacklist)

- **Colors / visual identity** (anything that changes colours, borders, shadows)
- **Typography** (font sizing/weights/line-height)
- **Radius, shadows, effects**
- **Ad-hoc spacing for visual tuning:**
  - No `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*`
  - No extra `p-*` beyond the single outer wrapper
- **One-off layout hacks** (absolute positioning, z-index, negative margins)

**If you need more than the whitelist: you need a Block, not more PrimeFlex.**

### Canonical view patterns

**Page scaffold (grid-first):**
```tsx
<div className="p-3 md:p-4">
  <div className="grid gap-3 md:gap-4">
    <div className="col-12 md:col-8">
      <Card>Main content</Card>
    </div>
    <div className="col-12 md:col-4">
      <Card>Sidebar</Card>
    </div>
  </div>
</div>
```

**Header row (structural flex):**
```tsx
<div className="flex align-items-center justify-content-between">
  <h1>Title</h1>
  <Button label="Action" />
</div>
```

## Exported API

### Components

- `YggdrasilProvider` - Wraps PrimeReactProvider with sensible defaults
- `Card` - Surface container with consistent elevation
- `PageHeader` - Page title and description block
- `FormField` - Label + input wrapper
- `SectionTitle` - Section heading

### Theme

Import the standalone Yggdrasil theme:
```tsx
import 'prime-yggdrasil/theme.css';        // Light mode
// OR
import 'prime-yggdrasil/theme-dark.css';   // Dark mode
```

The Yggdrasil themes are **standalone** and include:
- Complete PrimeReact component styles (based on Lara)
- Yggdrasil design tokens (Sky, Sea, Forest, Sand, Clay, Slate)
- Roboto font family
- All color mappings built-in

**No separate PrimeReact theme import needed!**

## Development

This repo contains:

### Scripts

```bash
# Build the library
npm run build

# Run Storybook (canonical reference)
npm run storybook

# Build Storybook for deployment
npm run build-storybook

# Publish to Chromatic
npm run chromatic
```

### Project Structure

```
src/
├── index.ts              # Public API exports
├── provider/
│   └── YggdrasilProvider.tsx
├── theme/
│   └── index.css         # Consolidated theme
├── blocks/               # Exported blocks
│   ├── Card.tsx
│   ├── PageHeader.tsx
│   ├── FormField.tsx
│   └── SectionTitle.tsx
├── layouts/              # Layout blocks (future)
├── primitives/           # Wrappers (minimal, avoid)
└── stories/              # Storybook documentation
    ├── Card.stories.tsx
    ├── Card.docs.mdx
    └── ...
```

## Storybook

Storybook serves as:
- Executable documentation of approved primitives and blocks
- Reference for both human developers and LLM agents
- Canonical examples and edge cases

**Storybook is read-only for consuming apps** - it lives in this repo only.

View the published Storybook at: [Your Chromatic URL]

## Rules for Consuming Apps

1. **No local primitives** - Use PrimeReact components directly
2. **Local blocks allowed** - Build app-specific blocks from Tier 1 primitives
3. **PrimeFlex whitelist only** - Follow the strict usage policy above
4. **Promote when reused** - If a local block is used in multiple views, promote it to this package
5. **Storybook is the contract** - If it's not in Storybook, don't assume it exists

## LLM Agent Guidelines

When building UI:
1. Use **PrimeReact primitives** for all basic UI elements
2. Prefer **existing Blocks** from this package over custom layouts
3. Follow **PrimeFlex whitelist** strictly in views
4. If a new pattern is required:
   - Create a local Block in your app (Tier 2)
   - Add it to Storybook if it becomes reusable
   - Promote to this package when used across multiple projects

## Architecture Reference

See [agentic_policy.md](./agentic_policy.md) for the full architecture specification and LLM development guidelines.

## License

[Your License]
