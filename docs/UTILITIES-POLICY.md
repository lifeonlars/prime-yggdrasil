# Yggdrasil Utilities Usage Policy

**Purpose:** Define the allowed and forbidden uses of utility classes in the Yggdrasil design system.

**TL;DR:** Utilities for **layout and spacing only**. Never for design (colors, borders, shadows). Never on PrimeReact components (except `w-full` on inputs).

---

## Core Principle: Layout vs Design

The fundamental rule of utility usage is the separation of **layout** and **design** concerns.

### Layout (✅ Utilities)

**What it controls:**
- Element positioning (flex, grid, relative, absolute)
- Spacing between elements (padding, margin, gap)
- Element alignment (justify-content, align-items)
- Structural dimensions (width, height for layout purposes)
- Display properties (block, inline-block, hidden)

**Why utilities?**
- Layout changes with screen size (responsive)
- Layout changes with component composition
- Layout is structural, not thematic
- Layout doesn't need theme awareness

**Example:**
```tsx
<div className="flex justify-content-between gap-3 p-4">
  <span>User Name</span>
  <Button label="Edit" />
</div>
```

---

### Design (❌ Utilities → ✅ Semantic Tokens)

**What it controls:**
- Colors (text, background, border)
- Borders (width, style, radius)
- Shadows (elevation)
- Typography (font family, size, weight)
- Visual effects (opacity, transitions)

**Why semantic tokens?**
- Design changes with theme (light/dark mode)
- Design changes with brand updates
- Design requires contrast validation
- Design must be accessible

**Example:**
```tsx
<div style={{
  color: 'var(--text-neutral-default)',
  background: 'var(--surface-neutral-secondary)',
  border: `1px solid var(--border-neutral-default)`,
  borderRadius: 'var(--radius-md)',
  boxShadow: 'var(--elevation-subtle)'
}}>
```

---

## The Allowlist

### Flex Layout ✅

**Purpose:** Flexbox positioning and alignment

```css
/* Container */
.flex
.flex-1, .flex-auto, .flex-initial, .flex-none

/* Direction */
.flex-row, .flex-row-reverse
.flex-column, .flex-column-reverse

/* Wrapping */
.flex-wrap, .flex-nowrap, .flex-wrap-reverse

/* Main axis alignment */
.justify-content-start
.justify-content-end
.justify-content-center
.justify-content-between
.justify-content-around
.justify-content-evenly

/* Cross axis alignment */
.align-items-start
.align-items-end
.align-items-center
.align-items-baseline
.align-items-stretch

/* Multi-line alignment */
.align-content-start
.align-content-end
.align-content-center
.align-content-between
.align-content-around
.align-content-stretch

/* Item self-alignment */
.align-self-auto
.align-self-start
.align-self-end
.align-self-center
.align-self-baseline
.align-self-stretch
```

**Usage:**
```tsx
✅ <div className="flex justify-content-between align-items-center">
✅ <div className="flex-column gap-2">
✅ <div className="flex-1">  {/* Flexible width */}
```

---

### Grid Layout ✅

**Purpose:** CSS Grid positioning

```css
/* Grid container */
.grid

/* Columns (12-column system) */
.col, .col-1, .col-2, ..., .col-12

/* Column offset */
.col-offset-1, .col-offset-2, ..., .col-offset-12

/* Responsive columns */
.md\:col-*, .lg\:col-*, .xl\:col-*

/* Gap (flex and grid) */
.gap-0, .gap-1, .gap-2, .gap-3, .gap-4, .gap-5, .gap-6, .gap-7, .gap-8
.column-gap-*, .row-gap-*
```

**Usage:**
```tsx
✅ <div className="grid">
     <div className="col-12 md:col-6 lg:col-4">
       Card 1
     </div>
     <div className="col-12 md:col-6 lg:col-4">
       Card 2
     </div>
   </div>

✅ <div className="grid gap-3">  {/* 12px gap */}
```

---

### Spacing ✅

**Purpose:** Padding, margin, and gap (4px grid increments)

**Spacing Scale:**
- `0` = 0px
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `3` = 0.75rem (12px)
- `4` = 1rem (16px)
- `5` = 1.25rem (20px)
- `6` = 1.5rem (24px)
- `7` = 2rem (32px)
- `8` = 3rem (48px)

**Classes:**
```css
/* Padding */
.p-0, .p-1, .p-2, .p-3, .p-4, .p-5, .p-6, .p-7, .p-8
.pt-*, .pr-*, .pb-*, .pl-*  /* Directional */
.px-*, .py-*  /* Axis */

/* Margin */
.m-0, .m-1, .m-2, .m-3, .m-4, .m-5, .m-6, .m-7, .m-8
.mt-*, .mr-*, .mb-*, .ml-*  /* Directional */
.mx-*, .my-*  /* Axis */
.m-auto  /* Auto margin */

/* Gap (already covered in flex/grid) */
.gap-0, .gap-1, .gap-2, .gap-3, .gap-4, .gap-5, .gap-6, .gap-7, .gap-8
```

**Usage:**
```tsx
✅ <div className="p-4">  {/* 16px padding */}
✅ <div className="px-3 py-2">  {/* 12px horizontal, 8px vertical */}
✅ <div className="mt-2 mb-4">  {/* 8px top, 16px bottom margin */}
✅ <div className="gap-3">  {/* 12px gap between children */}
```

---

### Display ✅

**Purpose:** Element display type and visibility

```css
/* Display type */
.block
.inline-block
.inline

/* Visibility */
.hidden  /* display: none */
.invisible  /* visibility: hidden */

/* Overflow */
.overflow-auto, .overflow-hidden, .overflow-visible, .overflow-scroll
.overflow-x-auto, .overflow-x-hidden, .overflow-x-scroll
.overflow-y-auto, .overflow-y-hidden, .overflow-y-scroll
```

**Usage:**
```tsx
✅ <div className="hidden md:block">  {/* Responsive visibility */}
✅ <div className="overflow-auto">  {/* Scrollable */}
```

---

### Positioning ✅

**Purpose:** Element positioning

```css
/* Position type */
.static, .relative, .absolute, .fixed, .sticky

/* Position values */
.top-0, .top-50, .top-100
.right-0, .right-50, .right-100
.bottom-0, .bottom-50, .bottom-100
.left-0, .left-50, .left-100
```

**Usage:**
```tsx
✅ <div className="relative">
     <div className="absolute top-0 right-0">
       Badge
     </div>
   </div>
```

---

### Sizing ✅

**Purpose:** Width and height (structural only)

```css
/* Width */
.w-auto, .w-full
.w-screen  /* 100vw */

/* Height */
.h-auto, .h-full
.h-screen  /* 100vh */

/* Min/Max */
.min-w-0, .max-w-full
.min-h-0, .max-h-full
```

**Usage:**
```tsx
✅ <div className="w-full">  {/* Full width */}
✅ <div className="h-screen">  {/* Full viewport height */}
✅ <InputText className="w-full" />  {/* Full-width input (exception) */}
```

---

### Typography ✅ (Limited)

**Purpose:** Minimal typography utilities using semantic tokens

```css
/* Font weight */
.font-bold         /* 700 */
.font-semibold     /* 600 */
.font-medium       /* 500 */
.font-normal       /* 400 */

/* Font size (semantic tokens) */
.text-xs      /* 0.75rem (12px) */
.text-sm      /* 0.875rem (14px) */
.text-base    /* 1rem (16px) */
.text-lg      /* 1.125rem (18px) */

/* Text alignment */
.text-left
.text-center
.text-right

/* Text color (semantic tokens only) */
.text-primary        /* var(--text-neutral-default) */
.text-secondary      /* var(--text-neutral-subdued) */
.text-interactive    /* var(--text-state-interactive) */
```

**Usage:**
```tsx
✅ <span className="font-bold">Bold text</span>
✅ <h2 className="text-lg">Large heading</h2>
✅ <p className="text-secondary">Muted text</p>
```

---

### Borders ✅ (Using Semantic Tokens)

**Purpose:** Border utilities that reference design tokens

```css
/* Border width - using tokens */
.border-1     /* 1px solid var(--border-neutral-default) */
.border-none  /* border: none */

/* Border radius - using tokens */
.border-round          /* var(--radius-md) */
.border-round-sm       /* var(--radius-sm) */
.border-round-lg       /* var(--radius-lg) */
.border-round-full     /* var(--radius-full) */
```

**Usage:**
```tsx
✅ <div className="border-1 border-round">  {/* Uses tokens */}
✅ <div className="border-round-lg">  {/* Large radius */}
```

---

### Shadows ✅ (Using Elevation Tokens)

**Purpose:** Shadow utilities that reference elevation tokens

```css
/* Shadows using elevation tokens */
.shadow-subtle      /* var(--elevation-subtle) */
.shadow-moderate    /* var(--elevation-moderate) */
.shadow-elevated    /* var(--elevation-elevated) */
.shadow-high        /* var(--elevation-high) */
```

**Usage:**
```tsx
✅ <div className="shadow-moderate">  {/* Uses token */}
✅ <Card className="shadow-subtle">  {/* Subtle elevation */}
```

---

## The Forbidden List

### ❌ Arbitrary Colors

**Forbidden:** Hardcoded color values

```css
/* Never use hardcoded colors */
.bg-blue-500, .bg-white, .bg-gray-100
.text-red-600, .text-gray-900
.border-blue-500, .border-gray-300
```

**Use Instead:** Semantic tokens
```tsx
✅ background: 'var(--surface-brand-primary)'
✅ color: 'var(--text-neutral-default)'
✅ borderColor: 'var(--border-neutral-default)'
```

**Rationale:**
- Colors must adapt to light/dark mode
- Colors must meet contrast requirements
- Colors define brand identity (centralized in theme)
- Hardcoded colors break theme consistency

---

### ❌ Arbitrary Borders/Shadows

**Forbidden:** Border/shadow utilities with hardcoded values

```css
/* These don't exist in utilities.css */
.border-2, .border-4, .border-8  /* No arbitrary widths */
.rounded-xl, .rounded-2xl  /* No arbitrary radii */
.shadow-sm, .shadow-lg, .shadow-2xl  /* No arbitrary shadows */
```

**Use Instead:** Semantic tokens
```tsx
✅ border: '1px solid var(--border-neutral-default)'
✅ borderRadius: 'var(--radius-md)'
✅ boxShadow: 'var(--elevation-moderate)'
```

---

### ❌ Tailwind-Specific Utilities

**Forbidden:** These are Tailwind, not Yggdrasil

```css
/* Spacing utilities */
space-x-*, space-y-*
divide-x-*, divide-y-*

/* Ring utilities */
ring-*, ring-offset-*, ring-inset

/* Effects */
blur-*, brightness-*, contrast-*, grayscale-*

/* Transitions */
transition-*, duration-*, delay-*, ease-*

/* Transforms */
transform, translate-*, rotate-*, scale-*, skew-*
```

**Use Instead:**
- `space-x/y` → Yggdrasil `gap-*`
- `ring` → CSS `outline` with semantic token
- Effects/transitions → CSS properties
- Transforms → CSS properties

---

## Critical Anti-Pattern: Utilities on Components

### The Rule

**✅ Utilities on containers (div, section, etc.)**
**❌ Utilities on PrimeReact components**

### Why This Matters

PrimeReact components are **designed and themed**. They include:
- Semantic structure (proper HTML elements)
- Accessibility features (ARIA attributes)
- Interactive states (hover, focus, active, disabled)
- Theme integration (colors, borders, shadows)

Adding utility classes **overrides the theme** and breaks:
- Theme consistency
- Light/dark mode switching
- Accessibility considerations
- Responsive design

### The One Exception

**`w-full` is allowed on form inputs** for responsive sizing:

```tsx
✅ <InputText className="w-full" placeholder="Email" />
✅ <Dropdown className="w-full" options={options} />
✅ <Calendar className="w-full" />
```

**Everything else is forbidden:**

```tsx
❌ <Button className="p-3 bg-blue-500" label="Submit" />
❌ <DataTable className="border shadow-lg" value={data} />
❌ <Card className="rounded-xl bg-white">
❌ <InputText className="border-2 text-lg" />  {/* Beyond w-full */}
```

### Correct Pattern

**Wrap components in containers for layout:**

```tsx
✅ <div className="flex gap-2 p-4">
     <Button label="Save" />
     <Button label="Cancel" outlined />
   </div>

❌ <div>
     <Button className="mr-2 mb-2" label="Save" />
     <Button label="Cancel" outlined />
   </div>
```

**Use component props for styling:**

```tsx
✅ <Button severity="danger" label="Delete" />  {/* Use props */}
❌ <Button className="bg-red-500" label="Delete" />  {/* Don't override */}
```

---

## Rationale: Why This Policy Exists

### Problem: Utility Class Chaos

Without constraints, developers (and AI agents) will create inconsistent UIs:

```tsx
❌ {/* This leads to UI drift */}
   <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
     <Button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full">
       Delete
     </Button>
   </div>
```

**Problems:**
- No theme consistency (hardcoded colors)
- No dark mode support (static colors)
- No accessibility validation (arbitrary contrast)
- Duplication (same styling copy-pasted)
- Unmaintainable (can't update design globally)

### Solution: Separation of Concerns

**Utilities:** Layout and spacing (structure)
**Semantic Tokens:** Design and theming (appearance)
**PrimeReact:** Components (functionality)

```tsx
✅ {/* Correct: Separation of concerns */}
   <div
     className="flex flex-column gap-3 p-4"  {/* Utilities: layout */}
     style={{
       background: 'var(--surface-neutral-secondary)',  {/* Tokens: design */}
       borderRadius: 'var(--radius-md)',
       boxShadow: 'var(--elevation-subtle)'
     }}
   >
     <Button severity="danger" label="Delete" />  {/* PrimeReact: component */}
   </div>
```

**Benefits:**
- Theme consistency (centralized design)
- Dark mode support (semantic tokens adapt)
- Accessibility guaranteed (validated token pairings)
- Maintainability (update theme, not code)
- Reusability (extract to Blocks)

---

## Common Violations & Fixes

### Violation 1: Colored Card

❌ **Wrong:**
```tsx
<div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
  <h2 className="text-gray-900 font-bold text-xl mb-4">
    Card Title
  </h2>
  <p className="text-gray-600">
    Card content
  </p>
</div>
```

✅ **Correct:**
```tsx
<Card className="p-4">  {/* or just <Card> */}
  <h2 style={{
    color: 'var(--text-neutral-loud)',
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem'
  }}>
    Card Title
  </h2>
  <p style={{ color: 'var(--text-neutral-subdued)' }}>
    Card content
  </p>
</Card>
```

**Or even simpler - just use Card:**
```tsx
<Card title="Card Title">
  <p>Card content</p>
</Card>
```

---

### Violation 2: Styled Button

❌ **Wrong:**
```tsx
<button className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600">
  Delete
</button>
```

✅ **Correct:**
```tsx
<Button severity="danger" label="Delete" icon="pi pi-trash" />
```

---

### Violation 3: Form Layout

❌ **Wrong:**
```tsx
<div className="space-y-4">
  <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
  <input className="border border-gray-300 rounded-lg px-3 py-2 w-full" />
  <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
    Submit
  </button>
</div>
```

✅ **Correct:**
```tsx
<div className="flex flex-column gap-3">
  <InputText className="w-full" />
  <InputText className="w-full" />
  <Button label="Submit" />
</div>
```

---

## Enforcement

This policy is enforced through:

1. **Semantic Token Intent Agent** - Guides developers during implementation
2. **ESLint Plugin** - Code-time detection in IDE
   - Rule: `@lifeonlars/yggdrasil/utility-allowlist`
   - Rule: `@lifeonlars/yggdrasil/no-utility-on-components`
3. **Drift Validator CLI** - Pre-commit and CI/CD validation
4. **Code Review** - Manual review for complex cases

**Severity:**
- Using forbidden utilities (hardcoded colors) → Warning
- Utilities on PrimeReact components → **Error** (Critical)

---

## Summary

**DO:**
- ✅ Use utilities for layout (flex, grid, positioning)
- ✅ Use utilities for spacing (padding, margin, gap) on 4px grid
- ✅ Use utilities on containers (div, section, article)
- ✅ Use semantic tokens for design (colors, borders, shadows)
- ✅ Use PrimeReact components for UI elements

**DON'T:**
- ❌ Use utilities for colors, arbitrary borders, arbitrary shadows
- ❌ Use utilities on PrimeReact components (except w-full on inputs)
- ❌ Use Tailwind classes
- ❌ Hardcode design values
- ❌ Create custom components when PrimeReact exists

**Remember:** Layout changes structure. Design changes appearance. Keep them separate.
