---
title: "Master Token Reference"
category: reference
tags: [tokens, semantic-tokens, colors, spacing, elevation, radius, design-tokens]
audience: ai-agent
version: 0.7.0
lastUpdated: 2026-01-16
relatedDocs:
  - AI-AGENT-GUIDE.md
  - AESTHETICS.md
  - .ai/agents/semantic-token-intent.md
---

# Master Token Reference

**Purpose**: Comprehensive reference for all 727 semantic tokens in the Yggdrasil design system. This is the single source of truth for token usage, intent-based selection, contrast pairing, and dark mode behavior.

**For Agents**: Use this reference when choosing colors, spacing, elevation, or radius tokens. Never use hardcoded values.

---

## Table of Contents

1. [Core Philosophy: Intent-Driven Selection](#core-philosophy-intent-driven-selection)
2. [Surface Tokens (Backgrounds)](#surface-tokens-backgrounds)
3. [Text Tokens (Typography Colors)](#text-tokens-typography-colors)
4. [Border Tokens](#border-tokens)
5. [Icon Tokens](#icon-tokens)
6. [Elevation Tokens (Shadows)](#elevation-tokens-shadows)
7. [Border Radius Tokens](#border-radius-tokens)
8. [Spacing Guidelines (4px Grid)](#spacing-guidelines-4px-grid)
9. [Contrast Pairing Rules](#contrast-pairing-rules)
10. [State Completeness Requirements](#state-completeness-requirements)
11. [Dark Mode Behavior](#dark-mode-behavior)
12. [Common UI Patterns with Tokens](#common-ui-patterns-with-tokens)

---

## Core Philosophy: Intent-Driven Selection

### Don't Think: "I need a blue color"
### Think: "What is the semantic purpose of this element?"

**Examples:**

| Intent | ❌ Wrong Thinking | ✅ Right Thinking |
|--------|----------------|-----------------|
| Primary button | "I need blue" | "This is a brand surface → `--surface-brand-primary`" |
| Body text | "I need dark gray" | "This is default text → `--text-neutral-default`" |
| Error message | "I need red text" | "This is danger context → `--text-context-danger`" |
| Input border | "I need light gray" | "This is a default border → `--border-neutral-default`" |
| Hover state | "I need lighter blue" | "This is interactive state → `--surface-state-hover`" |

**Key Principle**: Every token has semantic meaning. Choose tokens based on **purpose** not **appearance**.

---

## Surface Tokens (Backgrounds)

Surface tokens define background colors for UI elements. Choose based on the element's **semantic role**.

### Neutral Surfaces

For general UI backgrounds without semantic meaning.

```css
--surface-neutral-primary      /* Main page background */
--surface-neutral-secondary    /* Secondary panels, cards */
--surface-neutral-tertiary     /* Nested panels, subtle backgrounds */
--surface-neutral-overlay      /* Modal/dialog overlays */
```

**When to use:**
- **Primary**: Main application background, page container
- **Secondary**: Cards, panels, sidebars, content areas
- **Tertiary**: Nested cards, table row hover, accordion content
- **Overlay**: Backdrop behind modals/dialogs (usually with transparency)

**Light Mode**: White → Light Gray → Lighter Gray → rgba(0,0,0,0.4)
**Dark Mode**: Dark → Darker → Darkest → rgba(0,0,0,0.6)

---

### Brand Surfaces

For brand identity and primary actions.

```css
--surface-brand-primary        /* Primary brand color */
--surface-brand-secondary      /* Secondary brand color (hover) */
--surface-brand-accent         /* Accent brand color (highlights) */
--surface-brand-overlay        /* Brand-colored overlays */
```

**When to use:**
- **Primary**: Primary buttons, active navigation, brand headers
- **Secondary**: Hover state on brand elements, secondary CTAs
- **Accent**: Highlights, badges, special callouts
- **Overlay**: Feature highlights, promotional banners

**Contrast Requirement**: MUST use `--text-onsurface-onbrand` or `--text-onsurface-onaccent` for text on these surfaces.

**Light Mode**: Blue shades
**Dark Mode**: Brighter blue shades (higher luminance for dark backgrounds)

---

### Context Surfaces

For semantic meaning (success, warning, danger, info).

```css
--surface-context-success      /* Success states/messages */
--surface-context-warning      /* Warning states/messages */
--surface-context-danger       /* Danger states/messages */
--surface-context-info         /* Info states/messages */
--surface-context-signal       /* Signal/notification */
--surface-context-dangeractive /* Active danger state (hover on danger button) */
```

**When to use:**
- **Success**: Success messages, positive confirmations, completion states
- **Warning**: Warning messages, caution alerts, before destructive action
- **Danger**: Error messages, destructive actions, critical alerts
- **Info**: Informational messages, tips, help text
- **Signal**: Notifications, badges, count indicators
- **Dangeractive**: Hover state on danger buttons

**Contrast Requirement**: MUST use `--text-onsurface-oncontext` for text on these surfaces.

**Light Mode**: Tinted backgrounds (light green, yellow, red, blue)
**Dark Mode**: Darker tinted backgrounds with adjusted saturation

---

### Input Surfaces

For form elements.

```css
--surface-input-primary        /* Primary input background */
--surface-input-secondary      /* Disabled input background */
```

**When to use:**
- **Primary**: Active text inputs, dropdowns, text areas
- **Secondary**: Disabled inputs, read-only fields

**Light Mode**: White → Light Gray
**Dark Mode**: Dark Gray → Darker Gray

---

### State Surfaces

For interactive states.

```css
--surface-state-hover          /* Hover state background */
--surface-state-selected       /* Selected state background */
--surface-state-active         /* Active/pressed state background */
--surface-state-focus          /* Focus state background (rare) */
```

**When to use:**
- **Hover**: Table row hover, list item hover, button hover (non-brand)
- **Selected**: Selected table row, active tab, selected list item
- **Active**: Button press state, active dropdown item
- **Focus**: Focused element background (use sparingly, focus rings preferred)

**Light Mode**: Light gray shades
**Dark Mode**: Lighter gray shades (inverse brightness)

---

## Text Tokens (Typography Colors)

Text tokens define foreground colors for text. Choose based on **emphasis level** and **context**.

### Neutral Text

For general text without semantic meaning.

```css
--text-neutral-default         /* Primary body text */
--text-neutral-subdued         /* Secondary/helper text */
--text-neutral-loud            /* Emphasized text (headings) */
--text-neutral-disabled        /* Disabled text */
```

**When to use:**
- **Default**: Body text, descriptions, labels, primary content
- **Subdued**: Helper text, captions, secondary information, placeholders
- **Loud**: Headings, titles, emphasized content
- **Disabled**: Disabled button text, inactive menu items

**Hierarchy**: Loud > Default > Subdued > Disabled (visual weight)

**Light Mode**: Black → Dark Gray → Medium Gray → Light Gray
**Dark Mode**: White → Light Gray → Medium Gray → Dark Gray

---

### State Text

For interactive elements.

```css
--text-state-interactive       /* Links, clickable text */
--text-state-selected          /* Selected text/items */
--text-state-success           /* Success state text */
--text-state-danger            /* Danger state text */
```

**When to use:**
- **Interactive**: Hyperlinks, clickable labels, interactive icons
- **Selected**: Selected item text, active navigation text
- **Success**: Success message text (alternative to context token)
- **Danger**: Danger message text (alternative to context token)

**Light Mode**: Blue (interactive), Blue (selected), Green (success), Red (danger)
**Dark Mode**: Brighter shades for visibility

---

### On-Surface Text

For text on colored backgrounds (critical for contrast).

```css
--text-onsurface-onbrand       /* Text on brand surfaces */
--text-onsurface-onaccent      /* Text on accent surfaces */
--text-onsurface-oncontext     /* Text on context surfaces (success/warning/danger/info) */
--text-onsurface-oncontextactive  /* Text on active context surfaces */
--text-onsurface-onsentiment   /* Text on sentiment surfaces */
--text-onsurface-onhighlight   /* Text on highlight surfaces */
```

**When to use:**
- **Onbrand**: Text on `--surface-brand-primary` or `--surface-brand-secondary`
- **Onaccent**: Text on `--surface-brand-accent`
- **Oncontext**: Text on `--surface-context-*` backgrounds
- **Oncontextactive**: Text on `--surface-context-dangeractive`
- **Onsentiment**: Text on sentiment-colored backgrounds
- **Onhighlight**: Text on highlight backgrounds

**Critical Rule**: ALWAYS validate contrast ratio meets WCAG AA (4.5:1 for text).

**Light Mode**: Typically white or very light colors
**Dark Mode**: Typically black or very dark colors (inverted from light mode)

---

### Context Text

For semantic messages (when NOT on colored backgrounds).

```css
--text-context-success         /* Success message text */
--text-context-warning         /* Warning message text */
--text-context-danger          /* Danger/error message text */
--text-context-info            /* Info message text */
```

**When to use:**
- Success text on neutral background (e.g., inline validation success)
- Warning text on neutral background
- Error text on neutral background (e.g., form field error)
- Info text on neutral background

**Light Mode**: Green, Yellow/Orange, Red, Blue
**Dark Mode**: Brighter versions for visibility on dark backgrounds

---

## Border Tokens

Border tokens define border colors. Choose based on **emphasis** and **context**.

### Neutral Borders

For general borders without semantic meaning.

```css
--border-neutral-default       /* Standard borders */
--border-neutral-subdued       /* Subtle borders (dividers) */
--border-neutral-loud          /* Emphasized borders */
--border-neutral-glassoutline  /* Glass effect outlines */
```

**When to use:**
- **Default**: Input borders, card borders, standard dividers
- **Subdued**: Subtle dividers, table cell borders, minimal separators
- **Loud**: Emphasized containers, highlighted sections
- **Glassoutline**: Glassmorphism effects (subtle with transparency)

**Light Mode**: Gray shades (dark to light)
**Dark Mode**: Gray shades (light to dark)

---

### State Borders

For interactive states.

```css
--border-state-interactive     /* Hover/interactive borders */
--border-state-selected        /* Selected borders */
--border-state-focus           /* Focus ring borders */
--border-state-active          /* Active state borders */
```

**When to use:**
- **Interactive**: Input hover, button hover (outlined)
- **Selected**: Selected item border, active tab underline
- **Focus**: Focus rings (2px outline), keyboard navigation indicator
- **Active**: Pressed button border

**Focus Ring Standard**: `outline: 2px solid var(--border-state-focus); outline-offset: 2px;`

**Light Mode**: Blue shades
**Dark Mode**: Brighter blue shades

---

### Brand Borders

For brand-colored borders.

```css
--border-brand-brand           /* Brand-colored borders */
--border-brand-onbrand         /* Borders on brand surfaces */
```

**When to use:**
- **Brand**: Brand-colored borders on neutral backgrounds
- **Onbrand**: Borders on brand-colored backgrounds (e.g., card on brand surface)

---

### Context Borders

For semantic borders.

```css
--border-context-success       /* Success borders */
--border-context-warning       /* Warning borders */
--border-context-danger        /* Danger borders */
--border-context-info          /* Info borders */
--border-context-signal        /* Signal borders */
```

**When to use:**
- **Success**: Success message borders, valid input borders
- **Warning**: Warning message borders, caution input borders
- **Danger**: Error message borders, invalid input borders (`.p-invalid`)
- **Info**: Info message borders, help text borders
- **Signal**: Notification borders, badge borders

---

## Icon Tokens

Icon tokens define icon colors. **Always match text tokens** for consistency.

### Neutral Icons

```css
--icon-neutral-default         /* Primary icon color */
--icon-neutral-subdued         /* Secondary icon color */
--icon-neutral-loud            /* Emphasized icon color */
--icon-neutral-disabled        /* Disabled icon color */
```

**When to use:**
- **Default**: Body icons, toolbar icons, navigation icons
- **Subdued**: Helper icons, decorative icons
- **Loud**: Important icons, attention-grabbing icons
- **Disabled**: Disabled button icons, inactive toolbar icons

**Mapping**: Matches `--text-neutral-*` hierarchy exactly.

---

### State Icons

```css
--icon-state-interactive       /* Interactive icon color (clickable) */
--icon-state-selected          /* Selected icon color */
--icon-state-success           /* Success icon color */
--icon-state-danger            /* Danger icon color */
```

**When to use:**
- **Interactive**: Icon buttons, clickable icons, links with icons
- **Selected**: Selected item icon, active navigation icon
- **Success**: Success checkmark, completion icon
- **Danger**: Error icon, delete icon

---

### On-Surface Icons

```css
--icon-onsurface-onbrand       /* Icons on brand surfaces */
--icon-onsurface-onaccent      /* Icons on accent surfaces */
--icon-onsurface-oncontext     /* Icons on context surfaces */
```

**When to use:**
- **Onbrand**: Icons on brand-colored buttons, brand headers
- **Onaccent**: Icons on accent backgrounds
- **Oncontext**: Icons on success/warning/danger/info backgrounds

**Critical Rule**: Must match `--text-onsurface-*` for consistency.

---

### Context Icons

```css
--icon-context-success         /* Success icons */
--icon-context-warning         /* Warning icons */
--icon-context-danger          /* Danger icons */
--icon-context-info            /* Info icons */
```

**When to use:**
- Success icons on neutral backgrounds
- Warning icons on neutral backgrounds
- Error icons on neutral backgrounds
- Info icons on neutral backgrounds

---

## Elevation Tokens (Shadows)

Elevation tokens define shadow depth for layering.

```css
--elevation-subtle             /* Level 1: Subtle shadows (4px offset) */
--elevation-moderate           /* Level 2: Moderate shadows (8px offset) */
--elevation-elevated           /* Level 3: Elevated shadows (16px offset) */
--elevation-high               /* Level 4: High shadows (24px offset) */
```

**When to use:**

| Level | Use Case | Examples |
|-------|----------|----------|
| Subtle | Minimal depth, hover states | Hovercards, tooltips, table row hover |
| Moderate | Standard depth, popups | Dropdowns, menus, autocomplete |
| Elevated | Significant depth, overlays | Modals, dialogs, popovers |
| High | Maximum depth, drawers | Side drawers, navigation drawers, full-screen overlays |

**Usage**:
```tsx
<div style={{ boxShadow: 'var(--elevation-moderate)' }}>
```

**Alternative - Utility Classes**:
```tsx
<div className="shadow-1">Subtle</div>
<div className="shadow-2">Moderate</div>
<div className="shadow-3">Elevated</div>
<div className="shadow-4">High</div>
```

**Dark Mode**: Shadows are more subtle in dark mode (reduced opacity, softer blur).

---

## Border Radius Tokens

Border radius tokens define rounding for consistency.

```css
--radius-sm                    /* 4px - Subtle rounding */
--radius-md                    /* 8px - Standard rounding (default) */
--radius-lg                    /* 12px - Large rounding (cards) */
--radius-xl                    /* 16px - Extra-large rounding */
--radius-full                  /* 9999px - Pills, avatars, circular */
```

**Component-Specific Tokens**:
```css
--button-radius                /* Buttons (8px) */
--input-radius                 /* Form inputs (8px) */
```

**When to use:**

| Token | Use Case | Examples |
|-------|----------|----------|
| `sm` | Subtle rounding, minimal elements | Tags, badges, small chips |
| `md` | Standard UI elements | Buttons, inputs, dropdowns |
| `lg` | Containers, cards | Cards, panels, dialogs |
| `xl` | Large containers | Feature cards, hero sections |
| `full` | Circular elements | Avatars, pills, icon buttons |

**Usage**:
```tsx
<div style={{ borderRadius: 'var(--radius-md)' }}>
```

---

## Spacing Guidelines (4px Grid)

**Critical Rule**: All spacing MUST be on the 4px grid. Never use arbitrary pixel values.

### Spacing Scale

```css
0.25rem   /*  4px  - Minimal spacing */
0.5rem    /*  8px  - Tight spacing */
0.75rem   /* 12px  - Compact spacing */
1rem      /* 16px  - Standard spacing (base) */
1.25rem   /* 20px  - Comfortable spacing */
1.5rem    /* 24px  - Spacious spacing */
2rem      /* 32px  - Large gaps */
2.5rem    /* 40px  - Extra-large gaps */
3rem      /* 48px  - Section spacing */
4rem      /* 64px  - Major section spacing */
```

### Common Use Cases

| Value | Use Case | Examples |
|-------|----------|----------|
| `0.25rem` (4px) | Minimal gaps | Icon-to-text gap, tight list items |
| `0.5rem` (8px) | Tight spacing | Button padding (vertical), form field gaps |
| `0.75rem` (12px) | Compact spacing | Card padding (small), compact lists |
| `1rem` (16px) | Standard spacing | Default padding, paragraph gaps |
| `1.5rem` (24px) | Spacious spacing | Card padding, section padding |
| `2rem` (32px) | Large gaps | Section margins, container padding |
| `3rem` (48px) | Section spacing | Major content sections |

### Examples

✅ **Correct**:
```tsx
<div style={{
  padding: '1.5rem',          /* 24px - on grid */
  margin: '0.5rem 1rem',      /* 8px 16px - on grid */
  gap: '0.75rem'              /* 12px - on grid */
}}>
```

❌ **Incorrect**:
```tsx
<div style={{
  padding: '15px',            /* Off-grid */
  margin: '17px',             /* Off-grid */
  gap: '10px'                 /* Off-grid */
}}>
```

**PrimeReact Flex Utilities** (use these for quick layouts):
```tsx
<div className="flex gap-3">  {/* gap-3 = 1rem = 16px */}
<div className="flex gap-2">  {/* gap-2 = 0.5rem = 8px */}
<div className="p-3">         {/* p-3 = padding: 1rem */}
<div className="p-4">         {/* p-4 = padding: 1.5rem */}
```

---

## Contrast Pairing Rules

**Critical for accessibility**: Text/icon tokens MUST pair correctly with surface tokens.

### Pairing Table

| Surface Token | Required Text Token | Required Icon Token | Reason |
|---------------|--------------------|--------------------|---------|
| `--surface-brand-primary` | `--text-onsurface-onbrand` | `--icon-onsurface-onbrand` | WCAG contrast |
| `--surface-brand-secondary` | `--text-onsurface-onbrand` | `--icon-onsurface-onbrand` | WCAG contrast |
| `--surface-brand-accent` | `--text-onsurface-onaccent` | `--icon-onsurface-onaccent` | WCAG contrast |
| `--surface-context-success` | `--text-onsurface-oncontext` | `--icon-onsurface-oncontext` | WCAG contrast |
| `--surface-context-warning` | `--text-onsurface-oncontext` | `--icon-onsurface-oncontext` | WCAG contrast |
| `--surface-context-danger` | `--text-onsurface-oncontext` | `--icon-onsurface-oncontext` | WCAG contrast |
| `--surface-context-info` | `--text-onsurface-oncontext` | `--icon-onsurface-oncontext` | WCAG contrast |
| `--surface-context-dangeractive` | `--text-onsurface-oncontextactive` | `--icon-onsurface-oncontext` | WCAG contrast |
| `--surface-neutral-primary` | `--text-neutral-default` | `--icon-neutral-default` | Default pairing |
| `--surface-neutral-secondary` | `--text-neutral-default` | `--icon-neutral-default` | Default pairing |
| `--surface-input-primary` | `--text-neutral-default` | `--icon-neutral-default` | Default pairing |

### Validation Examples

✅ **Correct**:
```tsx
<Button
  label="Save"
  style={{
    background: 'var(--surface-brand-primary)',
    color: 'var(--text-onsurface-onbrand)'  /* Matches surface */
  }}
/>
```

❌ **Wrong** (will fail contrast):
```tsx
<Button
  label="Save"
  style={{
    background: 'var(--surface-brand-primary)',
    color: 'var(--text-neutral-default)'  /* MISMATCH */
  }}
/>
```

✅ **Correct**:
```tsx
<Message
  severity="error"
  style={{
    background: 'var(--surface-context-danger)',
    color: 'var(--text-onsurface-oncontext)',
    borderColor: 'var(--border-context-danger)'
  }}
  text="Error message"
/>
```

---

## State Completeness Requirements

**Critical Rule**: For EVERY interactive component, specify tokens for ALL relevant states.

### Interactive Component States

```tsx
// Default state
{
  color: 'var(--text-neutral-default)',
  background: 'var(--surface-neutral-primary)',
  border: '1px solid var(--border-neutral-default)'
}

// Hover state
&:hover {
  color: 'var(--text-state-interactive)',
  background: 'var(--surface-state-hover)',
  border-color: 'var(--border-state-interactive)'
}

// Focus state (keyboard navigation)
&:focus-visible {
  outline: '2px solid var(--border-state-focus)',
  outline-offset: '2px'
}

// Active state (being clicked)
&:active {
  background: 'var(--surface-state-active)'
}

// Disabled state
&:disabled {
  color: 'var(--text-neutral-disabled)',
  background: 'var(--surface-input-secondary)',
  cursor: 'not-allowed',
  opacity: 0.6
}
```

### Form Input States

```tsx
// Default
<InputText style={{
  background: 'var(--surface-input-primary)',
  border: '1px solid var(--border-neutral-default)',
  color: 'var(--text-neutral-default)'
}} />

// Hover
&:hover {
  border-color: 'var(--border-state-interactive)'
}

// Focus
&:focus {
  border-color: 'var(--border-state-focus)',
  outline: '2px solid var(--border-state-focus)',
  outline-offset: '2px'
}

// Error (invalid)
&.p-invalid {
  border-color: 'var(--border-context-danger)'
}

// Disabled
&:disabled {
  background: 'var(--surface-input-secondary)',
  color: 'var(--text-neutral-disabled)',
  cursor: 'not-allowed'
}
```

### Message/Alert States

```tsx
// Success
<Message
  severity="success"
  style={{
    background: 'var(--surface-context-success)',
    border: '1px solid var(--border-context-success)',
    color: 'var(--text-onsurface-oncontext)'
  }}
/>

// Warning
<Message
  severity="warn"
  style={{
    background: 'var(--surface-context-warning)',
    border: '1px solid var(--border-context-warning)',
    color: 'var(--text-onsurface-oncontext)'
  }}
/>

// Danger/Error
<Message
  severity="error"
  style={{
    background: 'var(--surface-context-danger)',
    border: '1px solid var(--border-context-danger)',
    color: 'var(--text-onsurface-oncontext)'
  }}
/>

// Info
<Message
  severity="info"
  style={{
    background: 'var(--surface-context-info)',
    border: '1px solid var(--border-context-info)',
    color: 'var(--text-onsurface-oncontext)'
  }}
/>
```

---

## Dark Mode Behavior

**Automatic Adaptation**: All semantic tokens automatically adapt to dark mode when `data-theme="dark"`.

### Key Dark Mode Principles

1. **Inverted Luminance**: Surfaces invert brightness (light → dark, dark → light)
2. **Reduced Contrast**: Shadows are more subtle, borders are lighter
3. **Increased Saturation**: Colors are slightly more saturated for visibility
4. **On-Surface Tokens Flip**: `--text-onsurface-onbrand` is white in light mode, black in dark mode

### Dark Mode Token Behavior

| Token Category | Light Mode | Dark Mode |
|---------------|------------|-----------|
| Surface Neutral | White → Gray | Dark → Darker |
| Text Neutral | Black → Gray | White → Light Gray |
| Borders | Dark Gray → Light Gray | Light Gray → Dark Gray |
| Shadows | Black with opacity | Black with reduced opacity |
| Brand Colors | Standard blue | Brighter blue (higher luminance) |
| Context Colors | Tinted backgrounds | Darker tinted backgrounds |

### Testing Dark Mode

```tsx
// Ensure all tokens work in both modes
<div data-theme="light">
  <YourComponent />
</div>

<div data-theme="dark">
  <YourComponent />
</div>
```

**No manual dark mode handling needed** - tokens handle everything automatically.

---

## Common UI Patterns with Tokens

### Pattern 1: Card

```tsx
<div style={{
  background: 'var(--surface-neutral-secondary)',
  border: '1px solid var(--border-neutral-subdued)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--elevation-subtle)',
  padding: '1.5rem'
}}>
  <h3 style={{ color: 'var(--text-neutral-loud)' }}>
    Card Title
  </h3>
  <p style={{ color: 'var(--text-neutral-subdued)' }}>
    Card description text
  </p>
</div>
```

**State Tokens:**
- Hover: `boxShadow: var(--elevation-moderate)`
- Selected: `border: 2px solid var(--border-state-selected)`

---

### Pattern 2: Primary Button

```tsx
<Button
  label="Save Changes"
  style={{
    background: 'var(--surface-brand-primary)',
    color: 'var(--text-onsurface-onbrand)',
    borderRadius: 'var(--button-radius)'
  }}
/>
```

**State Tokens:**
- Hover: `background: var(--surface-brand-secondary)`
- Focus: `outline: 2px solid var(--border-state-focus)`
- Disabled: `background: var(--surface-input-secondary)`, `color: var(--text-neutral-disabled)`

---

### Pattern 3: Form Field with Error

```tsx
<div className="flex flex-column gap-2">
  <label htmlFor="email" style={{ color: 'var(--text-neutral-default)' }}>
    Email
  </label>
  <InputText
    id="email"
    className={error ? 'p-invalid' : ''}
    style={{
      background: 'var(--surface-input-primary)',
      border: `1px solid ${error ? 'var(--border-context-danger)' : 'var(--border-neutral-default)'}`,
      borderRadius: 'var(--input-radius)'
    }}
  />
  {error && (
    <small style={{ color: 'var(--text-context-danger)' }}>
      {error}
    </small>
  )}
</div>
```

---

### Pattern 4: Success Message

```tsx
<Message
  severity="success"
  style={{
    background: 'var(--surface-context-success)',
    border: '1px solid var(--border-context-success)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-onsurface-oncontext)'
  }}
  text="Settings saved successfully"
/>
```

---

### Pattern 5: Interactive List Item

```tsx
<li
  style={{
    padding: '0.75rem 1rem',
    background: selected ? 'var(--surface-state-selected)' : 'transparent',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    if (!selected) e.currentTarget.style.background = 'var(--surface-state-hover)'
  }}
  onMouseLeave={(e) => {
    if (!selected) e.currentTarget.style.background = 'transparent'
  }}
>
  <span style={{ color: selected ? 'var(--text-state-selected)' : 'var(--text-neutral-default)' }}>
    List item text
  </span>
</li>
```

---

### Pattern 6: Modal/Dialog

```tsx
<Dialog
  visible={visible}
  onHide={onHide}
  style={{
    background: 'var(--surface-neutral-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--elevation-elevated)'
  }}
  header={
    <h2 style={{ color: 'var(--text-neutral-loud)' }}>
      Dialog Title
    </h2>
  }
>
  <p style={{ color: 'var(--text-neutral-default)' }}>
    Dialog content
  </p>
</Dialog>
```

**Overlay background**: `rgba(0, 0, 0, 0.4)` automatically provided by PrimeReact.

---

## Quick Reference Cheat Sheet

### Most Common Tokens (80% of use cases)

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

/* Spacing */
0.5rem, 1rem, 1.5rem, 2rem     /* 8px, 16px, 24px, 32px */

/* Radius */
--radius-md                    /* 8px - default */
--radius-lg                    /* 12px - cards */

/* Elevation */
--elevation-subtle             /* Hovercards */
--elevation-moderate           /* Dropdowns */
--elevation-elevated           /* Modals */
```

---

## Token Naming Convention

All tokens follow this structure:

```
--{category}-{type}-{variant}
```

**Examples:**
- `--surface-neutral-primary` → Category: surface, Type: neutral, Variant: primary
- `--text-onsurface-onbrand` → Category: text, Type: onsurface, Variant: onbrand
- `--border-state-focus` → Category: border, Type: state, Variant: focus

**Categories**: surface, text, border, icon, elevation, radius
**Types**: neutral, brand, context, state, input, onsurface
**Variants**: primary, secondary, default, subdued, loud, success, danger, warning, info, etc.

---

## Validation Checklist

Before implementing any UI, verify:

- [ ] All colors use semantic tokens (no hardcoded hex/rgb values)
- [ ] All spacing uses 4px grid (multiples of 0.25rem)
- [ ] All border-radius uses radius tokens
- [ ] All shadows use elevation tokens
- [ ] Text-on-surface pairing is correct (contrast validated)
- [ ] All 5+ states specified (default, hover, focus, active, disabled)
- [ ] Dark mode behavior tested (tokens adapt automatically)
- [ ] No foundation/primitive tokens used (only semantic tokens)

---

**Last Updated**: 2026-01-16
**Version**: 0.7.0
**Total Tokens**: 727 semantic tokens

For agent-specific guidance on token selection logic, see [`.ai/agents/semantic-token-intent.md`](../.ai/agents/semantic-token-intent.md).
