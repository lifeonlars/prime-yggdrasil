# Yggdrasil Design System - AI Agent Guide

**Purpose**: This guide helps AI agents maintain design consistency and use component-driven development when building applications with the Yggdrasil design system.

## 🎯 Core Principles for Agents

### 1. **Always Reuse, Never Recreate**
- Use existing PrimeReact components
- Apply existing semantic tokens
- Reference existing patterns from Storybook
- Only create new components when PrimeReact doesn't provide equivalent functionality

### 2. **Design System First**
Before writing any UI code, **always**:
1. Check if PrimeReact has the component you need
2. Check Storybook for usage examples
3. Check semantic tokens for styling needs
4. Use the design system's spacing/sizing conventions

### 3. **Token-Based Styling Only**
- ❌ Never write: `color: #374151`
- ✅ Always write: `color: var(--text-neutral-default)`
- ❌ Never write: `border-radius: 6px`
- ✅ Always write: `border-radius: var(--radius-md)`

## 📚 Quick Reference for Common Tasks

### Choosing Colors

**For text:**
```css
--text-neutral-default       /* Main body text (dark in light mode) */
--text-neutral-subdued       /* Secondary/muted text */
--text-neutral-loud          /* Emphasized text (extra dark) */
--text-neutral-disabled      /* Disabled state text */
--text-state-interactive     /* Interactive elements (links, buttons) */
--text-onsurface-onbrand     /* Text on brand-colored backgrounds (white) */
```

**For surfaces/backgrounds:**
```css
--surface-neutral-primary    /* Main backgrounds (white in light mode) */
--surface-neutral-secondary  /* Secondary backgrounds (light gray) */
--surface-neutral-tertiary   /* Tertiary backgrounds (lighter gray) */
--surface-brand-primary      /* Brand primary (main blue) */
--surface-state-hover        /* Hover state background */
--surface-state-selected     /* Selected state background */
```

**For borders:**
```css
--border-neutral-default     /* Standard borders */
--border-neutral-subdued     /* Subtle borders (lighter) */
--border-state-interactive   /* Interactive element borders */
--border-state-focus         /* Focus rings */
```

**For context/feedback:**
```css
/* Use severity tokens for messages, alerts, etc. */
--severity-info-surface      /* Info background */
--severity-info-text         /* Info text */
--severity-info-border       /* Info border */

--severity-success-surface   /* Success background */
--severity-danger-surface    /* Danger/error background */
--severity-warn-surface      /* Warning background */
```

### Choosing Spacing

**Always use the 4px grid:**
```css
/* ✅ CORRECT */
padding: 0.5rem;     /* 8px */
padding: 1rem;       /* 16px */
padding: 1.5rem;     /* 24px */
margin: 2rem;        /* 32px */

/* ❌ INCORRECT */
padding: 10px;       /* Not on 4px grid */
margin: 15px;        /* Not on 4px grid */
```

**Common spacing values:**
- `0.25rem` (4px) - Minimal spacing
- `0.5rem` (8px) - Tight spacing
- `0.75rem` (12px) - Compact spacing
- `1rem` (16px) - Standard spacing
- `1.25rem` (20px) - Comfortable spacing
- `1.5rem` (24px) - Spacious
- `2rem` (32px) - Large gaps

### Choosing Border Radius

```css
--radius-sm        /* 4px - Subtle rounding */
--radius-md        /* 8px - Standard (buttons, inputs) */
--radius-lg        /* 12px - Cards, panels */
--radius-xl        /* 16px - Large containers */
--radius-full      /* 9999px - Pills, avatars */

/* Component-specific */
--button-radius    /* Buttons (8px) */
--input-radius     /* Form inputs (8px) */
```

### Choosing Elevation/Shadows

```css
--elevation-subtle     /* Minimal depth (tooltips) */
--elevation-moderate   /* Standard depth (dropdowns, cards) */
--elevation-elevated   /* Significant depth (modals) */
--elevation-high       /* Maximum depth (drawers) */
```

Or use utility classes:
```jsx
<div className="shadow-1">Subtle shadow</div>
<div className="shadow-2">Moderate shadow</div>
<div className="shadow-3">Elevated shadow</div>
<div className="shadow-4">High shadow</div>
```

## 🧩 Component Selection Guide

### Data Display

**Instead of creating tables:**
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

<DataTable value={data}>
  <Column field="name" header="Name" />
  <Column field="email" header="Email" />
</DataTable>
```

### Forms

**Instead of creating inputs:**
```tsx
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

<InputText placeholder="Enter text" />
<Dropdown options={items} />
<Calendar showTime />
```

### Buttons

**Yggdrasil supports these button variants:**
```tsx
import { Button } from 'primereact/button';

{/* Primary - main actions */}
<Button label="Save" />

{/* Outlined - secondary actions */}
<Button label="Cancel" outlined />

{/* Link/Text - tertiary actions */}
<Button label="Learn More" text />

{/* Danger - destructive actions */}
<Button label="Delete" severity="danger" />
```

**❌ Don't use:** `secondary`, `help`, `contrast`, `info`, `success`, `warning` buttons (removed from design system)

### Navigation

**Instead of creating menus:**
```tsx
import { Menubar } from 'primereact/menubar';
import { Breadcrumb } from 'primereact/breadcrumb';
import { Steps } from 'primereact/steps';
```

### Feedback

**Instead of creating alerts:**
```tsx
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

<Message severity="info" text="Information message" />
<Message severity="success" text="Success message" />
<Message severity="warn" text="Warning message" />
<Message severity="error" text="Error message" />
```

## 🚫 Common Mistakes to Avoid

### 1. Creating Bespoke Components
```tsx
// ❌ DON'T DO THIS
const CustomButton = ({ children }) => (
  <button style={{
    background: '#3B82F6',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px'
  }}>
    {children}
  </button>
);

// ✅ DO THIS INSTEAD
import { Button } from 'primereact/button';
<Button label={children} />
```

### 2. Using Hardcoded Colors
```tsx
// ❌ DON'T DO THIS
<div style={{ color: '#374151', background: '#F9FAFB' }}>

// ✅ DO THIS INSTEAD
<div style={{
  color: 'var(--text-neutral-default)',
  background: 'var(--surface-neutral-secondary)'
}}>
```

### 3. Breaking the 4px Grid
```tsx
// ❌ DON'T DO THIS
<div style={{ padding: '15px', margin: '10px' }}>

// ✅ DO THIS INSTEAD
<div style={{ padding: '1rem', margin: '0.75rem' }}>  {/* 16px, 12px */}
```

### 4. Ignoring Existing Patterns
```tsx
// ❌ DON'T DO THIS - Creating custom card
<div className="my-custom-card" style={{ border: '1px solid #ccc' }}>

// ✅ DO THIS INSTEAD - Use PrimeReact Card
import { Card } from 'primereact/card';
<Card>Content</Card>
```

## 🔍 Decision Tree for UI Development

```
Need to add UI element?
│
├─ Does PrimeReact have this component?
│  ├─ YES → Use PrimeReact component
│  │        Check Storybook for examples
│  │        Apply semantic tokens if custom styling needed
│  │
│  └─ NO → Is this a simple layout/container?
│           ├─ YES → Use semantic tokens with basic HTML/divs
│           │        Follow 4px grid, use token-based styling
│           │
│           └─ NO → Check if combination of PrimeReact components works
│                   ├─ YES → Compose PrimeReact components
│                   └─ NO → Create new component (rare!)
│                           Document in Storybook
│                           Use semantic tokens exclusively
```

## 📦 Packaging for Consumption

When integrating Yggdrasil into another project:

### 1. Installation
```bash
npm install prime-yggdrasil
npm install primereact primeicons
```

### 2. Import Theme
```tsx
// In your main app file
import 'prime-yggdrasil/yggdrasil-light.css';  // or yggdrasil-dark.css
import 'primeicons/primeicons.css';
```

### 3. Use Components
```tsx
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

function App() {
  return (
    <div style={{ color: 'var(--text-neutral-default)' }}>
      <Button label="Click me" />
    </div>
  );
}
```

## 🎨 Storybook Reference

Before creating any component, **always check Storybook first**:

```bash
npm run dev  # Starts Storybook on localhost:6006
```

**Key Storybook sections:**
- **Design System** - Colors, Elevation, Severity (reference for tokens)
- **Components** - All PrimeReact components with examples
- **Blocks** - Custom composite components (if any)

## 🤖 AI-Specific Workflow

### Step 1: Understand the Request
```
User asks: "Add a form with name, email, and submit button"
```

### Step 2: Check Design System
- Form inputs? → PrimeReact InputText
- Button? → PrimeReact Button
- Layout? → Standard HTML + semantic tokens

### Step 3: Reference Storybook
- Check InputText examples in Storybook
- Check Button examples in Storybook
- Note any specific patterns (labels, validation, etc.)

### Step 4: Implement with Tokens
```tsx
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',  // 16px on 4px grid
  padding: '1.5rem'  // 24px on 4px grid
}}>
  <label style={{ color: 'var(--text-neutral-default)' }}>
    Name
    <InputText style={{ width: '100%' }} />
  </label>

  <label style={{ color: 'var(--text-neutral-default)' }}>
    Email
    <InputText type="email" style={{ width: '100%' }} />
  </label>

  <Button label="Submit" />
</div>
```

### Step 5: Verify
- All colors use semantic tokens? ✓
- All spacing on 4px grid? ✓
- Using PrimeReact components? ✓
- Matches Storybook patterns? ✓

## 📋 Pre-Implementation Checklist

Before writing any UI code, verify:

- [ ] Checked PrimeReact documentation for existing component
- [ ] Reviewed Storybook for usage examples
- [ ] Identified semantic tokens needed
- [ ] Confirmed spacing follows 4px grid
- [ ] No hardcoded colors or sizes in implementation
- [ ] Component will work in both light and dark modes

## 🎓 Learning Resources

1. **PrimeReact Docs**: https://primereact.org/
2. **Local Storybook**: `npm run dev` → localhost:6006
3. **Semantic Token Reference**: `src/theme/semantic-light.css`
4. **Component Examples**: `src/stories/`

## 🚀 Success Metrics

Your implementation is successful when:
- ✅ Zero hardcoded colors (all use semantic tokens)
- ✅ Zero spacing values that break 4px grid
- ✅ Maximum reuse of PrimeReact components
- ✅ Works in both light and dark modes
- ✅ Matches Storybook examples and patterns
- ✅ No duplicate/bespoke components created

---

**Remember**: The goal is consistency through reuse, not creativity through reinvention. Every component you don't create is a maintenance burden you avoid.
