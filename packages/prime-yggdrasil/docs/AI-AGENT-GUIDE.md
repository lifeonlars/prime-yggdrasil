---
title: "AI Agent Guide"
category: guide
tags: [ai-agents, tokens, components, quick-reference, semantic-tokens, primereact]
audience: ai-agent
version: 0.7.0
lastUpdated: 2026-01-16
relatedDocs:
  - MASTER-TOKEN-REFERENCE.md
  - AESTHETICS.md
  - UTILITIES-POLICY.md
  - CONSUMPTION-GUIDE.md
  - .ai/agents/block-composer.md
  - .ai/agents/semantic-token-intent.md
---

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

### Semantic Tokens

**For comprehensive token documentation**, see [MASTER-TOKEN-REFERENCE.md](./MASTER-TOKEN-REFERENCE.md).

**Quick reference for most common tokens:**

```css
/* Text */
--text-neutral-default         /* Body text */
--text-neutral-subdued         /* Helper text */
--text-neutral-loud            /* Headings */
--text-onsurface-onbrand       /* Text on brand buttons */

/* Surfaces */
--surface-neutral-primary      /* Page background */
--surface-neutral-secondary    /* Cards, panels */
--surface-brand-primary        /* Primary buttons */
--surface-input-primary        /* Inputs */

/* Borders */
--border-neutral-default       /* Standard borders */
--border-state-focus           /* Focus rings */
--border-context-danger        /* Error borders */

/* Context (Messages) */
--surface-context-success      /* Success backgrounds */
--surface-context-danger       /* Error backgrounds */
--text-onsurface-oncontext     /* Text on context surfaces */

/* Spacing (4px grid) */
0.5rem, 1rem, 1.5rem, 2rem     /* 8px, 16px, 24px, 32px */

/* Radius */
--radius-md                    /* 8px - default */
--radius-lg                    /* 12px - cards */

/* Elevation */
--elevation-subtle             /* Hovercards */
--elevation-moderate           /* Dropdowns */
--elevation-elevated           /* Modals */
```

**For detailed token categories, pairing rules, state completeness, and dark mode behavior**, see [MASTER-TOKEN-REFERENCE.md](./MASTER-TOKEN-REFERENCE.md).

## ⚙️ PrimeReact Configuration

### App Setup with PrimeReactProvider

Wrap your app with `PrimeReactProvider` to configure global settings:

```tsx
import { PrimeReactProvider } from 'primereact/api';

function App() {
  const primeConfig = {
    ripple: true,              // Enable ripple effect on buttons/clicks
    inputStyle: 'outlined',    // 'outlined' or 'filled'
    locale: 'en',              // Default locale
  };

  return (
    <PrimeReactProvider value={primeConfig}>
      {/* Your app content */}
    </PrimeReactProvider>
  );
}
```

### Ripple Effect

The ripple effect is **disabled by default**. Enable it for Material Design-style click animations:

```tsx
<PrimeReactProvider value={{ ripple: true }}>
```

**Supported components:**
- Button
- Checkbox
- RadioButton
- Dropdown items
- Menu items
- ListBox items

**Note:** The ripple effect is a JavaScript feature, not CSS. It's configured at the app level, not in the theme.

### Input Style

Choose between outlined (default) or filled input styles:

```tsx
// Outlined inputs (default) - border around input
<PrimeReactProvider value={{ inputStyle: 'outlined' }}>

// Filled inputs - filled background, bottom border only
<PrimeReactProvider value={{ inputStyle: 'filled' }}>
```

### Other Configuration Options

```tsx
const primeConfig = {
  ripple: true,
  inputStyle: 'outlined',

  // Append overlays to specific element (default: document.body)
  appendTo: 'self',  // or document.getElementById('overlays')

  // Control z-index layering
  zIndex: {
    modal: 1100,     // Modals
    overlay: 1000,   // Overlays/dropdowns
    menu: 1000,      // Menus
    tooltip: 1100,   // Tooltips
  },

  // Locale for date formatting, number formatting, etc.
  locale: 'en',
};
```

**Documentation:** [PrimeReact Configuration](https://primereact.org/configuration/)

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

### Icons

**Yggdrasil supports both PrimeIcons and custom SVG icons:**

```tsx
import { Icon } from '@lifeonlars/prime-yggdrasil';

{/* PrimeIcons - requires primeicons package */}
<Icon name="pi pi-check" size="medium" />
<Icon name="pi pi-bell" size="large" />

{/* Custom SVG icons - from public/icons/ directory */}
<Icon name="my-icon" size="medium" />
<Icon name="custom-bell" size={32} />
```

**Sizing:**
- `size="small"` → 16px
- `size="medium"` → 20px (default)
- `size="large"` → 24px
- `size={32}` → Custom pixel value

**Colored icons with semantic tokens:**
```tsx
<Icon
  name="pi pi-check"
  size="large"
  color="var(--text-state-success)"
/>
```

**Using custom SVG icons:**
1. Create `public/icons/` directory in your project
2. Add SVG files: `public/icons/my-icon.svg`
3. Use: `<Icon name="my-icon" />`

**Note:** PrimeIcons is now optional. You can use only custom SVGs if preferred.

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

### 5. **CRITICAL: Applying Utility Classes to Components**
```tsx
// ❌ DON'T DO THIS - Utility classes on components
<Button className="w-full block mt-4 p-4" label="Submit" />
<InputText className="text-lg font-bold" />
<DataTable className="my-8" value={data} />

// ✅ DO THIS INSTEAD - Use component props + wrapper
<div className="w-full mt-4">  {/* Utility classes on wrapper */}
  <Button label="Submit" />
</div>

<div className="text-lg">  {/* Styling on wrapper */}
  <InputText />
</div>
```

**Why this matters:**
- ✅ **Components** are configured via **props** (size, variant, severity, etc.)
- ✅ **Utility classes** are for **layout/composition** (flex, grid, margins, width)
- ❌ Mixing utility classes with components breaks the design system
- ❌ Can cause unexpected visual bugs (icon misalignment, broken layouts)

**Correct approach:**
```tsx
// ✅ Layout utilities on wrappers/containers
<div className="flex gap-4 w-full">
  <Button label="Cancel" outlined />
  <Button label="Submit" />
</div>

// ✅ Component configuration via props
<Button label="Large Button" size="large" />
<InputText placeholder="Text" className="w-full" />  {/* Width is OK */}
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
npm install @lifeonlars/prime-yggdrasil
npm install primereact primeicons
```

### 2. Import Theme
```tsx
// In your main app file
import '@lifeonlars/prime-yggdrasil/theme.css';
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

## 📖 PrimeReact Component Reference

Before implementing any UI, **always check PrimeReact documentation first**:

### Core Component Categories

**Form Components**: https://primereact.org/inputtext/
- InputText, InputNumber, InputMask, InputTextarea
- Dropdown, MultiSelect, AutoComplete, TreeSelect
- Calendar, ColorPicker, Slider, Knob
- Checkbox, RadioButton, ToggleButton, SelectButton
- FileUpload, Password, Rating

**Data Display**: https://primereact.org/datatable/
- DataTable (sortable, filterable, paginated tables)
- TreeTable (hierarchical data)
- DataView (flexible data display)
- Timeline, OrderList, PickList

**Panels & Containers**: https://primereact.org/panel/
- Panel, Fieldset, Card, Accordion
- TabView, Splitter, ScrollPanel
- Toolbar, Divider

**Overlays**: https://primereact.org/dialog/
- Dialog, Sidebar, Drawer
- OverlayPanel, ConfirmDialog, ConfirmPopup
- Tooltip

**Navigation**: https://primereact.org/menubar/
- Menubar, Menu, TieredMenu, MegaMenu
- Breadcrumb, Steps, TabMenu
- PanelMenu, ContextMenu

**Messages**: https://primereact.org/message/
- Message, Messages, Toast
- InlineMessage

**Buttons**: https://primereact.org/button/
- Button, SplitButton, SpeedDial

**Media**: https://primereact.org/image/
- Image, Galleria, Carousel

### How to Use PrimeReact Docs

1. **Search by use case**: "I need a dropdown" → Search "dropdown"
2. **Check API tab**: See all available props and events
3. **View examples**: Copy working code snippets
4. **Adapt with tokens**: Replace any inline styles with semantic tokens

Example workflow:
```
Need: Date picker
1. Visit: https://primereact.org/calendar/
2. Copy: Basic example code
3. Adapt: Add semantic token styling if needed
4. Test: In both light and dark modes
5. Verify: Check Storybook for play function tests and a11y violations
```

## 🧪 Testing Your Implementation

When implementing components with Yggdrasil:

**1. Visual Testing (Automatic)**
- View your story in Storybook
- Check both light and dark modes (use theme toggle)
- Watch for automatic accessibility violations in the a11y panel

**2. Interactive Testing (Play Functions)**
- Stories with play functions test automatically when viewed
- Check the Interactions panel for test results
- See `Button.stories.tsx` for examples of play functions

**3. Accessibility (Built-in)**
- `@storybook/addon-a11y` checks for violations automatically
- Review the Accessibility panel for any issues
- Violations are color-coded by severity

**4. Visual Regression (Chromatic)**
- Run `npm run chromatic` to catch visual changes
- CI automatically runs Chromatic on push to main/master
- Review changes in Chromatic dashboard before approving

**Example Play Function:**
```tsx
import { expect, within } from 'storybook/test';

export const Primary: Story = {
  args: { label: 'Click Me' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveTextContent('Click Me');
  },
};
```

## 🏗️ Creating Local Blocks (Project-Specific)

Sometimes you need composite components specific to your project. These are called "blocks" (inspired by PrimeBlocks).

### When to Create a Local Block

✅ **Create a local block when:**
- Combining multiple PrimeReact components into a project-specific pattern
- Building a complex layout that's reused multiple times in YOUR project
- Creating domain-specific composites (e.g., "UserProfileCard", "OrderSummaryPanel")

❌ **Don't create a local block when:**
- A single PrimeReact component would suffice
- The pattern is only used once
- It duplicates existing PrimeReact functionality

### Local Block Guidelines

**Location**: Create blocks in your project, NOT in the design system
```
your-project/
├── src/
│   ├── blocks/          # Your project-specific blocks
│   │   ├── UserCard.tsx
│   │   ├── StatsDashboard.tsx
│   │   └── CheckoutForm.tsx
```

**Rules for blocks:**
1. **Use only PrimeReact components** - Don't create custom base components
2. **Use only semantic tokens** - No hardcoded colors or spacing
3. **Follow 4px grid** - All spacing must follow the grid
4. **Make them generic** - Can be reused across your project
5. **Document in your project** - Add to your local Storybook

**Example: Good Local Block**
```tsx
// src/blocks/UserCard.tsx
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';

interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
  onContact: () => void;
}

export function UserCard({ name, email, avatar, onContact }: UserCardProps) {
  return (
    <Card
      style={{
        padding: '1.5rem',  // 24px - 4px grid
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-neutral-primary)',
        color: 'var(--text-neutral-default)'
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar
          image={avatar}
          label={!avatar ? name[0] : undefined}
          size="large"
          shape="circle"
        />
        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            color: 'var(--text-neutral-loud)'
          }}>
            {name}
          </h3>
          <p style={{
            margin: '0.25rem 0 0',
            color: 'var(--text-neutral-subdued)'
          }}>
            {email}
          </p>
        </div>
        <Button
          label="Contact"
          icon="pi pi-envelope"
          onClick={onContact}
        />
      </div>
    </Card>
  );
}
```

**Example: Bad Local Block (Don't do this)**
```tsx
// ❌ DON'T DO THIS
export function UserCard({ name, email }: Props) {
  return (
    // Creating custom card instead of using PrimeReact
    <div style={{
      background: '#ffffff',        // ❌ Hardcoded color
      border: '1px solid #e5e7eb',  // ❌ Hardcoded color
      borderRadius: '6px',          // ❌ Not on 4px grid
      padding: '15px'               // ❌ Not on 4px grid
    }}>
      {/* Custom button instead of PrimeReact */}
      <button style={{ background: '#3B82F6' }}>  {/* ❌ Custom component */}
        Contact
      </button>
    </div>
  );
}
```

### When to Promote Blocks to Design System

If you find a block being used across **multiple projects**, consider promoting it to the design system:

1. **Document the use case** - Why is this needed across projects?
2. **Generalize the API** - Make it work for broader use cases
3. **Add to design system** - Submit PR with Storybook documentation
4. **Test thoroughly** - Ensure it works in all contexts
5. **Update AI guide** - Add to component reference

## 🎓 Learning Resources

1. **PrimeReact Docs**: https://primereact.org/ (comprehensive component reference)
2. **PrimeReact Showcase**: https://primereact.org/installation/ (live examples)
3. **PrimeReact GitHub**: https://github.com/primefaces/primereact (source code, issues)
4. **Local Storybook**: `npm run storybook` → localhost:6006 (themed examples)
5. **Semantic Token Reference**: `src/theme/theme.css` (all tokens)
6. **Component Examples**: `src/stories/` (usage patterns)
7. **Utilities Reference**: `src/stories/Utilities.stories.tsx` (utility class documentation)

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
