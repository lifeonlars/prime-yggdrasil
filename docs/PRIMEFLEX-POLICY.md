# PrimeFlex Usage Policy

**Purpose:** Define the allowed and forbidden uses of PrimeFlex utility classes in the Yggdrasil design system.

**TL;DR:** PrimeFlex for **layout and spacing only**. Never for design (colors, borders, shadows). Never on PrimeReact components (except `w-full` on inputs).

---

## Core Principle: Layout vs Design

The fundamental rule of PrimeFlex usage is the separation of **layout** and **design** concerns.

### Layout (✅ PrimeFlex)

**What it controls:**
- Element positioning (flex, grid, relative, absolute)
- Spacing between elements (padding, margin, gap)
- Element alignment (justify-content, align-items)
- Structural dimensions (width, height for layout purposes)
- Display properties (block, inline-block, hidden)

**Why PrimeFlex?**
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

### Design (❌ PrimeFlex → ✅ Semantic Tokens)

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
flex
flex-1, flex-auto, flex-initial, flex-none

/* Direction */
flex-row, flex-row-reverse
flex-column, flex-column-reverse

/* Wrapping */
flex-wrap, flex-nowrap, flex-wrap-reverse

/* Main axis alignment */
justify-content-start
justify-content-end
justify-content-center
justify-content-between
justify-content-around
justify-content-evenly

/* Cross axis alignment */
align-items-start
align-items-end
align-items-center
align-items-baseline
align-items-stretch

/* Multi-line alignment */
align-content-start
align-content-end
align-content-center
align-content-between
align-content-around
align-content-stretch

/* Item self-alignment */
align-self-auto
align-self-start
align-self-end
align-self-center
align-self-baseline
align-self-stretch
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
grid

/* Columns (12-column system) */
col, col-1, col-2, ..., col-12

/* Column offset */
col-offset-1, col-offset-2, ..., col-offset-12

/* Responsive columns */
sm:col-*, md:col-*, lg:col-*, xl:col-*

/* Gap (flex and grid) */
gap-0, gap-1, gap-2, gap-3, gap-4, gap-5, gap-6, gap-7, gap-8
column-gap-*, row-gap-*
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
p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-7, p-8
pt-*, pr-*, pb-*, pl-*  /* Directional */
px-*, py-*  /* Axis */

/* Margin */
m-0, m-1, m-2, m-3, m-4, m-5, m-6, m-7, m-8
mt-*, mr-*, mb-*, ml-*  /* Directional */
mx-*, my-*  /* Axis */
m-auto  /* Auto margin */

/* Gap (already covered in flex/grid) */
gap-0, gap-1, gap-2, gap-3, gap-4, gap-5, gap-6, gap-7, gap-8
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
block
inline-block
inline

/* Visibility */
hidden  /* display: none */
invisible  /* visibility: hidden */

/* Overflow */
overflow-auto, overflow-hidden, overflow-visible, overflow-scroll
overflow-x-auto, overflow-x-hidden, overflow-x-scroll
overflow-y-auto, overflow-y-hidden, overflow-y-scroll
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
static, relative, absolute, fixed, sticky

/* Position values */
top-0, top-50, top-100
right-0, right-50, right-100
bottom-0, bottom-50, bottom-100
left-0, left-50, left-100
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
w-auto, w-full
w-screen  /* 100vw */
w-1, w-2, w-3, w-4, w-5, w-6  /* Fixed sizes */

/* Height */
h-auto, h-full
h-screen  /* 100vh */
h-1, h-2, h-3, h-4, h-5, h-6  /* Fixed sizes */

/* Min/Max */
min-w-0, max-w-full
min-h-0, max-h-full
```

**Usage:**
```tsx
✅ <div className="w-full">  {/* Full width */}
✅ <div className="h-screen">  {/* Full viewport height */}
✅ <InputText className="w-full" />  {/* Full-width input (exception) */}
```

---

## The Forbidden List

### ❌ Colors

**Forbidden:** All color utilities

```css
/* Text colors */
text-blue-500, text-red-600, text-gray-900, text-white, etc.

/* Background colors */
bg-blue-500, bg-white, bg-gray-100, etc.

/* Border colors */
border-blue-500, border-gray-300, etc.
```

**Use Instead:** Semantic tokens
```tsx
✅ color: 'var(--text-neutral-default)'
✅ background: 'var(--surface-brand-primary)'
✅ borderColor: 'var(--border-neutral-default)'
```

**Rationale:**
- Colors must adapt to light/dark mode
- Colors must meet contrast requirements
- Colors define brand identity (centralized in theme)
- Hardcoded colors break theme consistency

---

### ❌ Borders

**Forbidden:** Border utilities

```css
/* Border width */
border, border-0, border-2, border-4, border-8

/* Border style */
border-solid, border-dashed, border-dotted, border-double

/* Border sides */
border-t, border-r, border-b, border-l
border-x, border-y

/* Border radius */
rounded, rounded-sm, rounded-md, rounded-lg, rounded-xl, rounded-full
rounded-t-*, rounded-r-*, rounded-b-*, rounded-l-*
```

**Use Instead:** Semantic tokens
```tsx
✅ border: `1px solid var(--border-neutral-default)`
✅ borderRadius: 'var(--radius-md)'
```

**Exception:** `1px` hairline borders are allowed for width
```tsx
✅ border: '1px solid var(--border-neutral-default)'  {/* 1px OK */}
❌ border: '3px solid var(--border-brand-primary)'  {/* 3px NOT OK */}
```

**Rationale:**
- Border styles are part of design language (theme)
- Border radius values must be consistent (design tokens)
- Theme defines visual hierarchy through borders

---

### ❌ Shadows

**Forbidden:** Shadow utilities

```css
shadow-none
shadow-sm
shadow, shadow-md
shadow-lg, shadow-xl
shadow-2xl
```

**Use Instead:** Elevation tokens
```tsx
✅ boxShadow: 'var(--elevation-subtle)'
✅ boxShadow: 'var(--elevation-moderate)'
✅ boxShadow: 'var(--elevation-elevated)'
✅ boxShadow: 'var(--elevation-high)'
```

**Rationale:**
- Shadows define depth hierarchy (design system)
- Dark mode requires different shadow strategies
- Elevation is semantic (subtle vs elevated)

---

### ❌ Typography

**Forbidden:** Typography utilities

```css
/* Font family */
font-sans, font-serif, font-mono

/* Font size */
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, etc.

/* Font weight */
font-thin, font-light, font-normal, font-medium, font-semibold, font-bold, font-black

/* Text alignment */
text-left, text-center, text-right, text-justify

/* Text decoration */
underline, no-underline, line-through

/* Text transform */
uppercase, lowercase, capitalize

/* Line height */
leading-none, leading-tight, leading-normal, leading-relaxed
```

**Use Instead:** CSS styles with theme values
```tsx
✅ fontSize: '1.125rem'  {/* 18px */}
✅ fontWeight: 600
✅ textAlign: 'center'
```

**Rationale:**
- Typography is core to brand identity
- Font sizes must follow typographic scale
- Font weights are limited by font family
- Theme owns typography hierarchy

---

### ❌ Tailwind-Specific Utilities

**Forbidden:** These are Tailwind, not PrimeFlex

```css
/* Spacing utilities */
space-x-*, space-y-*
divide-x-*, divide-y-*

/* Ring utilities */
ring-*, ring-offset-*, ring-inset

/* Effects */
blur-*, brightness-*, contrast-*, grayscale-*, hue-rotate-*

/* Transitions */
transition-*, duration-*, delay-*, ease-*

/* Transforms */
transform, translate-*, rotate-*, scale-*, skew-*

/* Filters */
filter, backdrop-filter
```

**Use Instead:**
- `space-x/y` → PrimeFlex `gap-*`
- `ring` → CSS `outline` with semantic token
- Effects/transitions → CSS properties
- Transforms → CSS properties

**Rationale:**
- Yggdrasil uses PrimeFlex, not Tailwind
- Different API, different philosophy
- Prevents confusion and mixing frameworks

---

## Critical Anti-Pattern: PrimeFlex on Components

### The Rule

**✅ PrimeFlex on containers (div, section, etc.)**
**❌ PrimeFlex on PrimeReact components**

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
❌ <Button className="bg-blue-500 p-3" label="Submit" />
❌ <DataTable className="border shadow-lg" value={data} />
❌ <Card className="rounded-xl bg-white">
❌ <InputText className="border-2 rounded-lg" />  {/* Beyond w-full */}
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

### Problem: Tailwind Reinvention

Without constraints, developers (and AI agents) will reinvent Tailwind using PrimeFlex:

```tsx
❌ {/* This is Tailwind-style development with PrimeFlex */}
   <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md border border-blue-600">
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

**PrimeFlex:** Layout and spacing (structure)
**Semantic Tokens:** Design and theming (appearance)
**PrimeReact:** Components (functionality)

```tsx
✅ {/* Correct: Separation of concerns */}
   <div
     className="flex flex-column gap-3 p-4"  {/* PrimeFlex: layout */}
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

## Migration Guide from Tailwind

If you're coming from Tailwind, here's the mapping:

### Layout → Keep (use PrimeFlex equivalents)

| Tailwind | PrimeFlex |
|----------|-----------|
| `flex` | `flex` |
| `flex-col` | `flex-column` |
| `justify-between` | `justify-content-between` |
| `items-center` | `align-items-center` |
| `gap-4` | `gap-3` (12px) |
| `p-4` | `p-3` (12px) |
| `grid grid-cols-3` | `grid` + `col-4` (12/3=4) |
| `space-x-2` | `flex gap-2` |
| `hidden md:block` | `hidden md:block` |

### Design → Replace with semantic tokens

| Tailwind | Yggdrasil |
|----------|-----------|
| `bg-blue-500` | `background: var(--surface-brand-primary)` |
| `text-gray-900` | `color: var(--text-neutral-default)` |
| `border-gray-300` | `border: 1px solid var(--border-neutral-default)` |
| `rounded-lg` | `borderRadius: var(--radius-lg)` |
| `shadow-md` | `boxShadow: var(--elevation-moderate)` |
| `text-white` | `color: var(--text-onsurface-onbrand)` |

### Components → Use PrimeReact

| Tailwind Pattern | Yggdrasil |
|------------------|-----------|
| Custom button with `bg-blue-500` | `<Button label="..." />` |
| Custom input with `border rounded` | `<InputText />` |
| Custom card with `border shadow` | `<Card>` |
| Custom table | `<DataTable>` |

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

1. **PrimeFlex Guard Agent** - Guides developers during implementation
2. **ESLint Plugin** - Code-time detection in IDE
   - Rule: `@lifeonlars/yggdrasil/primeflex-allowlist`
   - Rule: `@lifeonlars/yggdrasil/no-utility-on-components`
3. **Drift Validator CLI** - Pre-commit and CI/CD validation
4. **Code Review** - Manual review for complex cases

**Severity:**
- Using forbidden PrimeFlex (colors, etc.) → Warning
- PrimeFlex on PrimeReact components → **Error** (Critical)

---

## Summary

**DO:**
- ✅ Use PrimeFlex for layout (flex, grid, positioning)
- ✅ Use PrimeFlex for spacing (padding, margin, gap) on 4px grid
- ✅ Use PrimeFlex on containers (div, section, article)
- ✅ Use semantic tokens for design (colors, borders, shadows)
- ✅ Use PrimeReact components for UI elements

**DON'T:**
- ❌ Use PrimeFlex for colors, borders, shadows, typography
- ❌ Use PrimeFlex on PrimeReact components (except w-full on inputs)
- ❌ Use Tailwind classes
- ❌ Hardcode design values
- ❌ Create custom components when PrimeReact exists

**Remember:** Layout changes structure. Design changes appearance. Keep them separate.
