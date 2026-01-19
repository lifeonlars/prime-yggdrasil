---
title: "Anti-Patterns Library"
category: reference
tags: [anti-patterns, violations, bad-practices, mistakes, common-errors]
audience: ai-agent
version: 0.7.0
lastUpdated: 2026-01-17
relatedDocs:
  - AI-AGENT-GUIDE.md
  - MASTER-TOKEN-REFERENCE.md
  - UTILITIES-POLICY.md
  - DECISION-MATRIX.md
  - .ai/agents/drift-validator.md
---

# Anti-Patterns Library

**Purpose**: Comprehensive catalog of design system violations to avoid. Learn from common mistakes and understand why they break the system.

**For Agents**: Before implementing any UI, scan this library to ensure you're not repeating documented mistakes.

---

## Table of Contents

1. [Component Creation Anti-Patterns (12 patterns)](#component-creation-anti-patterns)
2. [Token Misuse (15 patterns)](#token-misuse)
3. [Utility Class Violations (10 patterns)](#utility-class-violations)
4. [Accessibility Failures (8 patterns)](#accessibility-failures)
5. [State Management Mistakes (6 patterns)](#state-management-mistakes)
6. [PrimeReact Integration Issues (9 patterns)](#primereact-integration-issues)

**Total Anti-Patterns**: 60

---

## Component Creation Anti-Patterns

### Anti-Pattern #1: Custom Button Component

**❌ Problem**:
```tsx
const CustomButton = ({ label, onClick }) => (
  <button
    style={{
      background: '#3B82F6',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    {label}
  </button>
);
```

**Why It Breaks**:
1. Hardcoded colors (`#3B82F6`) don't adapt to dark mode
2. Hardcoded spacing (`10px 20px`) not on 4px grid
3. Missing states: hover, focus, active, disabled
4. No ARIA attributes for accessibility
5. No ripple effect (Yggdrasil standard when enabled)
6. Duplicates PrimeReact Button functionality
7. No loading state support

**Root Cause**: Developer didn't check PrimeReact catalog before creating component

**✅ Correct Approach**:
```tsx
import { Button } from 'primereact/button';

<Button label={label} onClick={onClick} />
```

**Detected By**: Drift Validator Agent (rule: `no-custom-components`)
**ESLint Rule**: `primereact-imports-only`

---

### Anti-Pattern #2: Inline Styled Div Instead of Card Block

**❌ Problem**:
```tsx
<div style={{
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}}>
  {content}
</div>
```

**Why It Breaks**:
1. Hardcoded shadow doesn't use elevation system
2. White background doesn't work in dark mode
3. Re-inventing existing Card block
4. Inconsistent spacing (20px not standard)
5. Hardcoded border-radius instead of token

**Root Cause**: Unaware of Card block existence

**✅ Correct Approach**:
```tsx
import { Card } from '@lifeonlars/prime-yggdrasil';

<Card>{content}</Card>
```

**Or with PrimeReact**:
```tsx
import { Card } from 'primereact/card';

<Card>{content}</Card>
```

**Detected By**: Drift Validator (hardcoded colors/shadows)
**ESLint Rule**: `use-design-system-components`

---

### Anti-Pattern #3: Custom Dropdown Component

**❌ Problem**:
```tsx
const CustomDropdown = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="custom-dropdown">
      <div onClick={() => setOpen(!open)}>
        {value || 'Select...'}
      </div>
      {open && (
        <div className="options">
          {options.map(opt => (
            <div key={opt.value} onClick={() => onChange(opt.value)}>
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

**Why It Breaks**:
1. Missing keyboard navigation (Tab, Arrow keys, Enter)
2. No ARIA attributes (`role="combobox"`, `aria-expanded`)
3. No focus management
4. No search/filter functionality
5. Missing accessibility features (screen reader support)
6. No positioning logic (dropdown cut off by container)
7. Missing disabled state
8. No loading state
9. PrimeReact Dropdown already exists with all these features

**Root Cause**: Reinventing complex component without understanding accessibility requirements

**✅ Correct Approach**:
```tsx
import { Dropdown } from 'primereact/dropdown';

<Dropdown
  value={value}
  options={options}
  onChange={(e) => onChange(e.value)}
  placeholder="Select..."
/>
```

**Detected By**: Code review (no automated detection)
**ESLint Rule**: Proposed `no-custom-select-components`

---

### Anti-Pattern #4: Custom Modal/Dialog

**❌ Problem**:
```tsx
const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
```

**Why It Breaks**:
1. No focus trap (can Tab outside modal)
2. ESC key doesn't close modal
3. No focus restoration when closed
4. Missing `aria-modal="true"` and `role="dialog"`
5. No scroll lock on body
6. No animations/transitions
7. Hardcoded overlay styles
8. PrimeReact Dialog handles all this

**Root Cause**: Underestimating complexity of accessible modals

**✅ Correct Approach**:
```tsx
import { Dialog } from 'primereact/dialog';

<Dialog
  visible={isOpen}
  onHide={onClose}
  modal
>
  {children}
</Dialog>
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `no-custom-modal-components`

---

### Anti-Pattern #5: Custom Table Component

**❌ Problem**:
```tsx
const CustomTable = ({ data, columns }) => (
  <table>
    <thead>
      <tr>
        {columns.map(col => <th key={col.field}>{col.header}</th>)}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {columns.map(col => <td key={col.field}>{row[col.field]}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
);
```

**Why It Breaks**:
1. No sorting functionality
2. No filtering
3. No pagination
4. No row selection
5. No responsive behavior
6. No loading state
7. No empty state
8. Missing ARIA table roles
9. PrimeReact DataTable has all these features

**Root Cause**: Underestimating table feature requirements

**✅ Correct Approach**:
```tsx
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

<DataTable value={data} loading={loading}>
  {columns.map(col => (
    <Column
      key={col.field}
      field={col.field}
      header={col.header}
      sortable
    />
  ))}
</DataTable>
```

**Detected By**: Code review
**ESLint Rule**: `use-datatable-for-tables`

---

### Anti-Pattern #6: Custom Input Component with Icon

**❌ Problem**:
```tsx
const IconInput = ({ icon, value, onChange }) => (
  <div style={{ position: 'relative' }}>
    <input
      value={value}
      onChange={onChange}
      style={{ paddingLeft: '35px' }}
    />
    <i className={icon} style={{ position: 'absolute', left: '10px', top: '10px' }} />
  </div>
);
```

**Why It Breaks**:
1. PrimeReact has `p-input-icon-left` wrapper for this
2. Hardcoded positioning values
3. Missing focus states
4. No validation styling
5. Inaccessible icon (decorative vs meaningful)

**Root Cause**: Unaware of PrimeReact icon input pattern

**✅ Correct Approach**:
```tsx
import { InputText } from 'primereact/inputtext';

<span className="p-input-icon-left">
  <i className={icon} />
  <InputText value={value} onChange={onChange} />
</span>
```

**Detected By**: Drift Validator
**ESLint Rule**: `use-primereact-input-patterns`

---

### Anti-Pattern #7: Custom Toast/Notification Component

**❌ Problem**:
```tsx
const CustomToast = ({ message, type }) => (
  <div
    style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? 'green' : 'red',
      color: 'white',
      padding: '15px',
      borderRadius: '4px'
    }}
  >
    {message}
  </div>
);
```

**Why It Breaks**:
1. Hardcoded colors (green/red) instead of semantic tokens
2. No stacking logic for multiple toasts
3. No auto-dismiss functionality
4. Missing close button
5. No animations
6. Not accessible (no ARIA live region)
7. PrimeReact Toast component exists

**Root Cause**: Creating "simple" component without considering edge cases

**✅ Correct Approach**:
```tsx
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const toast = useRef(null);

toast.current.show({
  severity: 'success',
  summary: 'Success',
  detail: message,
  life: 3000
});

<Toast ref={toast} />
```

**Detected By**: Drift Validator (hardcoded colors)
**ESLint Rule**: `use-primereact-toast`

---

### Anti-Pattern #8: Custom Accordion Component

**❌ Problem**:
```tsx
const CustomAccordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(!open)}>
        {title}
        <span>{open ? '▼' : '▶'}</span>
      </div>
      {open && <div>{children}</div>}
    </div>
  );
};
```

**Why It Breaks**:
1. No keyboard support (Enter, Space to toggle)
2. Missing ARIA attributes (`aria-expanded`, `aria-controls`)
3. No animation/transition
4. Hardcoded arrow characters instead of icons
5. No multi-accordion orchestration logic
6. PrimeReact Accordion exists

**Root Cause**: Implementing interactive component without accessibility knowledge

**✅ Correct Approach**:
```tsx
import { Accordion, AccordionTab } from 'primereact/accordion';

<Accordion>
  <AccordionTab header={title}>
    {children}
  </AccordionTab>
</Accordion>
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `use-primereact-accordion`

---

### Anti-Pattern #9: Custom Pagination Component

**❌ Problem**:
```tsx
const Pagination = ({ page, total, onChange }) => (
  <div>
    <button onClick={() => onChange(page - 1)} disabled={page === 1}>
      Previous
    </button>
    <span>Page {page} of {total}</span>
    <button onClick={() => onChange(page + 1)} disabled={page === total}>
      Next
    </button>
  </div>
);
```

**Why It Breaks**:
1. No page number buttons (only prev/next)
2. No rows-per-page selector
3. Missing jump-to-page functionality
4. Not responsive
5. PrimeReact Paginator has all features

**Root Cause**: Creating minimal implementation without considering UX

**✅ Correct Approach**:
```tsx
import { Paginator } from 'primereact/paginator';

<Paginator
  first={first}
  rows={rows}
  totalRecords={totalRecords}
  onPageChange={(e) => {
    setFirst(e.first);
    setRows(e.rows);
  }}
  rowsPerPageOptions={[10, 20, 50]}
/>
```

**Detected By**: Code review
**ESLint Rule**: `use-primereact-paginator`

---

### Anti-Pattern #10: Custom Checkbox Component

**❌ Problem**:
```tsx
const CustomCheckbox = ({ checked, onChange, label }) => (
  <div onClick={() => onChange(!checked)}>
    <span>{checked ? '☑' : '☐'}</span>
    <span>{label}</span>
  </div>
);
```

**Why It Breaks**:
1. Not keyboard accessible (no Tab focus, Space to toggle)
2. No actual `<input type="checkbox">` for form submission
3. Missing ARIA attributes
4. Hardcoded checkbox characters
5. No indeterminate state support
6. PrimeReact Checkbox exists

**Root Cause**: Implementing form control without understanding HTML semantics

**✅ Correct Approach**:
```tsx
import { Checkbox } from 'primereact/checkbox';

<div className="flex align-items-center gap-2">
  <Checkbox
    inputId="check"
    checked={checked}
    onChange={(e) => onChange(e.checked)}
  />
  <label htmlFor="check">{label}</label>
</div>
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `use-primereact-checkbox`

---

### Anti-Pattern #11: Custom Loading Spinner

**❌ Problem**:
```tsx
const Spinner = () => (
  <div
    style={{
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite'
    }}
  />
);
```

**Why It Breaks**:
1. Hardcoded colors (not dark mode compatible)
2. Hardcoded size (not configurable)
3. Inline animation definition
4. Missing ARIA `role="status"` and `aria-live`
5. No accessible label for screen readers
6. PrimeReact ProgressSpinner exists

**Root Cause**: Creating simple UI element without considering accessibility and theming

**✅ Correct Approach**:
```tsx
import { ProgressSpinner } from 'primereact/progressspinner';

<ProgressSpinner aria-label="Loading" />
```

**Detected By**: Drift Validator (hardcoded colors)
**ESLint Rule**: `use-primereact-spinner`

---

### Anti-Pattern #12: Custom Breadcrumb Component

**❌ Problem**:
```tsx
const Breadcrumb = ({ items }) => (
  <div>
    {items.map((item, i) => (
      <span key={i}>
        <a href={item.url}>{item.label}</a>
        {i < items.length - 1 && <span> / </span>}
      </span>
    ))}
  </div>
);
```

**Why It Breaks**:
1. Missing `<nav>` wrapper with `aria-label="Breadcrumb"`
2. No structured data markup (BreadcrumbList schema)
3. Hardcoded separator (should use semantic separator)
4. No current page indicator (`aria-current="page"`)
5. PrimeReact BreadCrumb exists

**Root Cause**: Creating navigation component without accessibility patterns

**✅ Correct Approach**:
```tsx
import { BreadCrumb } from 'primereact/breadcrumb';

const items = [
  { label: 'Home', url: '/' },
  { label: 'Projects' },
  { label: 'My Project' }
];

<BreadCrumb model={items} />
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `use-primereact-breadcrumb`

---

## Token Misuse

### Anti-Pattern #13: Hardcoded Hex Colors

**❌ Problem**:
```tsx
<div style={{ background: '#3B82F6', color: '#FFFFFF' }}>
```

**Why It Breaks**:
1. Colors don't adapt to dark mode
2. Breaks design system consistency
3. No semantic meaning
4. Can't be updated centrally
5. May fail WCAG contrast requirements

**Root Cause**: Not using semantic token system

**✅ Correct Approach**:
```tsx
<div style={{
  background: 'var(--surface-brand-primary)',
  color: 'var(--text-onsurface-onbrand)'
}}>
```

**Detected By**: Drift Validator (hardcoded-colors rule)
**ESLint Rule**: `no-hardcoded-colors`

---

### Anti-Pattern #14: Using Foundation Tokens in App Code

**❌ Problem**:
```tsx
<div style={{ color: 'var(--blue-600)' }}>
```

**Why It Breaks**:
1. Foundation tokens are primitives, not semantic
2. No intent encoded in token name
3. Bypasses semantic token system
4. Creates maintenance burden

**Root Cause**: Misunderstanding token hierarchy (foundation vs semantic)

**✅ Correct Approach**:
```tsx
<div style={{ color: 'var(--text-state-interactive)' }}>
```

**Detected By**: Drift Validator (foundation-tokens rule)
**ESLint Rule**: `no-foundation-tokens-in-app`

---

### Anti-Pattern #15: Mismatched Text-on-Surface Tokens

**❌ Problem**:
```tsx
<div style={{
  background: 'var(--surface-brand-primary)',
  color: 'var(--text-neutral-default)'  /* WRONG */
}}>
```

**Why It Breaks**:
1. Fails WCAG contrast ratio (dark text on dark background in dark mode)
2. Text may be invisible in some themes
3. Violates pairing rules

**Root Cause**: Not following contrast pairing table

**✅ Correct Approach**:
```tsx
<div style={{
  background: 'var(--surface-brand-primary)',
  color: 'var(--text-onsurface-onbrand)'  /* CORRECT */
}}>
```

**Reference**: [MASTER-TOKEN-REFERENCE.md - Contrast Pairing Rules](./MASTER-TOKEN-REFERENCE.md#contrast-pairing-rules)

**Detected By**: Semantic Token Intent Agent
**ESLint Rule**: `enforce-token-pairing`

---

### Anti-Pattern #16: Hardcoded Border Radius

**❌ Problem**:
```tsx
<div style={{ borderRadius: '8px' }}>
```

**Why It Breaks**:
1. Not centrally managed
2. Inconsistent rounding across app
3. Can't update design system-wide

**Root Cause**: Not using radius tokens

**✅ Correct Approach**:
```tsx
<div style={{ borderRadius: 'var(--radius-md)' }}>
```

**Detected By**: Drift Validator
**ESLint Rule**: `use-radius-tokens`

---

### Anti-Pattern #17: Hardcoded Shadow Values

**❌ Problem**:
```tsx
<div style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
```

**Why It Breaks**:
1. Shadow doesn't adapt to dark mode
2. Inconsistent elevation system
3. Can't update design system-wide

**Root Cause**: Not using elevation tokens

**✅ Correct Approach**:
```tsx
<div style={{ boxShadow: 'var(--elevation-subtle)' }}>
```

**Detected By**: Drift Validator (hardcoded-shadows rule)
**ESLint Rule**: `use-elevation-tokens`

---

### Anti-Pattern #18: Off-Grid Spacing

**❌ Problem**:
```tsx
<div style={{ padding: '15px', margin: '17px' }}>
```

**Why It Breaks**:
1. Not on 4px grid (8px, 12px, 16px, 24px, etc.)
2. Creates visual inconsistency
3. Harder to maintain

**Root Cause**: Not following spacing system

**✅ Correct Approach**:
```tsx
<div style={{ padding: '1rem', margin: '1.25rem' }}>
{/* 1rem = 16px, 1.25rem = 20px - both on 4px grid */}
```

**Detected By**: Drift Validator (spacing-grid rule)
**ESLint Rule**: `enforce-4px-grid`

---

### Anti-Pattern #19: RGB/RGBA Colors Instead of Tokens

**❌ Problem**:
```tsx
<div style={{ background: 'rgb(59, 130, 246)' }}>
<div style={{ background: 'rgba(0, 0, 0, 0.1)' }}>
```

**Why It Breaks**: Same as hardcoded hex colors

**Root Cause**: Not using semantic tokens

**✅ Correct Approach**:
```tsx
<div style={{ background: 'var(--surface-brand-primary)' }}>
<div style={{ background: 'var(--surface-neutral-overlay)' }}>
```

**Detected By**: Drift Validator (hardcoded-colors rule)
**ESLint Rule**: `no-rgb-colors`

---

### Anti-Pattern #20: Named Colors Instead of Tokens

**❌ Problem**:
```tsx
<div style={{ color: 'blue', background: 'white', border: '1px solid gray' }}>
```

**Why It Breaks**: Same as hardcoded colors

**Root Cause**: Using CSS named colors instead of tokens

**✅ Correct Approach**:
```tsx
<div style={{
  color: 'var(--text-state-interactive)',
  background: 'var(--surface-neutral-primary)',
  border: '1px solid var(--border-neutral-default)'
}}>
```

**Detected By**: Drift Validator
**ESLint Rule**: `no-named-colors`

---

### Anti-Pattern #21: Opacity Instead of Semantic Tokens

**❌ Problem**:
```tsx
<div style={{
  background: 'var(--surface-brand-primary)',
  opacity: 0.5  /* WRONG WAY to create subdued variant */
}}>
```

**Why It Breaks**:
1. Opacity affects children (unintended)
2. Semantic tokens already have subdued variants
3. Creates accessibility issues (reduces contrast)

**Root Cause**: Trying to create color variants manually

**✅ Correct Approach**:
```tsx
<div style={{ background: 'var(--surface-brand-secondary)' }}>
```

**Detected By**: Code review
**ESLint Rule**: Proposed `prefer-semantic-variants`

---

### Anti-Pattern #22: Percentage-Based Spacing

**❌ Problem**:
```tsx
<div style={{ padding: '5%', margin: '10%' }}>
```

**Why It Breaks**:
1. Not responsive/predictable
2. Not on 4px grid
3. Creates inconsistent spacing

**Root Cause**: Misunderstanding spacing system

**✅ Correct Approach**:
```tsx
<div style={{ padding: '1.5rem', margin: '2rem' }}>
```

**Detected By**: Drift Validator
**ESLint Rule**: `no-percentage-spacing`

---

### Anti-Pattern #23: Wrong Token for Context

**❌ Problem**:
```tsx
<Message
  severity="error"
  style={{
    background: 'var(--surface-neutral-secondary)',  /* WRONG */
    color: 'var(--text-neutral-default)'  /* WRONG */
  }}
/>
```

**Why It Breaks**:
1. Error message should use danger context tokens
2. Loses semantic meaning
3. Doesn't communicate severity visually

**Root Cause**: Not understanding token intent

**✅ Correct Approach**:
```tsx
<Message
  severity="error"
  style={{
    background: 'var(--surface-context-danger)',
    color: 'var(--text-onsurface-oncontext)',
    border: '1px solid var(--border-context-danger)'
  }}
/>
```

**Detected By**: Semantic Token Intent Agent
**ESLint Rule**: `enforce-context-tokens`

---

### Anti-Pattern #24: Mixing Pixel and Rem Units

**❌ Problem**:
```tsx
<div style={{
  padding: '16px',
  margin: '1rem',
  gap: '8px'
}}>
```

**Why It Breaks**:
1. Inconsistent unit usage
2. Some values won't scale with root font size
3. Makes maintenance harder

**Root Cause**: Not standardizing on rem units

**✅ Correct Approach**:
```tsx
<div style={{
  padding: '1rem',     /* 16px */
  margin: '1rem',
  gap: '0.5rem'        /* 8px */
}}>
```

**Detected By**: Code review
**ESLint Rule**: `prefer-rem-units`

---

### Anti-Pattern #25: State Tokens on Non-Interactive Elements

**❌ Problem**:
```tsx
<p style={{ color: 'var(--text-state-interactive)' }}>
  This is just plain text, not a link
</p>
```

**Why It Breaks**:
1. Interactive color implies clickability
2. Confuses users (looks like link but isn't)
3. Wrong semantic token for purpose

**Root Cause**: Choosing token by appearance instead of intent

**✅ Correct Approach**:
```tsx
<p style={{ color: 'var(--text-neutral-default)' }}>
  This is just plain text
</p>

<a href="/link" style={{ color: 'var(--text-state-interactive)' }}>
  This is an actual link
</a>
```

**Detected By**: Semantic Token Intent Agent
**ESLint Rule**: `interactive-tokens-on-interactive-only`

---

### Anti-Pattern #26: Brand Tokens on Non-Brand Elements

**❌ Problem**:
```tsx
<div style={{
  background: 'var(--surface-brand-primary)',
  padding: '1rem'
}}>
  Generic card content
</div>
```

**Why It Breaks**:
1. Brand tokens should be reserved for brand elements (primary actions, headers)
2. Overuse dilutes brand impact
3. Creates visual noise

**Root Cause**: Using brand tokens as "pretty color" instead of semantic purpose

**✅ Correct Approach**:
```tsx
{/* Brand token for primary action */}
<Button
  label="Sign Up"
  style={{
    background: 'var(--surface-brand-primary)',
    color: 'var(--text-onsurface-onbrand)'
  }}
/>

{/* Neutral token for card */}
<div style={{
  background: 'var(--surface-neutral-secondary)',
  padding: '1rem'
}}>
  Generic card content
</div>
```

**Detected By**: Semantic Token Intent Agent
**ESLint Rule**: `restrict-brand-token-usage`

---

### Anti-Pattern #27: Using CSS Variables Incorrectly

**❌ Problem**:
```tsx
<div style={{ color: '--text-neutral-default' }}>  {/* Missing var() */}
```

**Why It Breaks**:
1. Syntax error - token won't apply
2. Silently fails in most browsers

**Root Cause**: Forgetting `var()` wrapper

**✅ Correct Approach**:
```tsx
<div style={{ color: 'var(--text-neutral-default)' }}>
```

**Detected By**: Browser console errors
**ESLint Rule**: `valid-css-variable-syntax`

---

## Utility Class Violations

### Anti-Pattern #28: Using Utilities on PrimeReact Components

**❌ Problem**:
```tsx
<Button label="Click" className="bg-blue-500 text-white p-4" />
```

**Why It Breaks**:
1. PrimeReact components have their own styling
2. Utilities may conflict with component styles
3. Creates maintenance burden
4. Violates utilities policy

**Root Cause**: Treating PrimeReact like Tailwind components

**✅ Correct Approach**:
```tsx
<Button label="Click" />  {/* Use PrimeReact props/variants */}

{/* Only .w-full is allowed on inputs */}
<InputText className="w-full" />
```

**Reference**: [UTILITIES-POLICY.md](./UTILITIES-POLICY.md)

**Detected By**: Utilities Guard Agent
**ESLint Rule**: `no-utilities-on-primereact`

---

### Anti-Pattern #29: Design Utilities Instead of Tokens

**❌ Problem**:
```tsx
<div className="bg-blue-500 text-white border-gray-300">
```

**Why It Breaks**:
1. Should use semantic tokens, not utility classes for design
2. Utilities are for layout/spacing only
3. Doesn't work in dark mode

**Root Cause**: Misunderstanding utilities policy (layout only)

**✅ Correct Approach**:
```tsx
<div style={{
  background: 'var(--surface-brand-primary)',
  color: 'var(--text-onsurface-onbrand)',
  border: '1px solid var(--border-neutral-default)'
}}>
```

**Detected By**: Utilities Guard Agent
**ESLint Rule**: `no-design-utilities`

---

### Anti-Pattern #30: Arbitrary Utility Values

**❌ Problem**:
```tsx
<div className="p-[23px] m-[17px]">  {/* Tailwind arbitrary values */}
```

**Why It Breaks**:
1. Off 4px grid
2. Not using standard spacing scale
3. Arbitrary values bypass design system

**Root Cause**: Using Tailwind arbitrary syntax instead of tokens

**✅ Correct Approach**:
```tsx
<div className="p-4 m-3">  {/* Assuming these map to 4px grid */}
{/* Or use inline styles with rem */}
<div style={{ padding: '1.5rem', margin: '1rem' }}>
```

**Detected By**: Utilities Guard Agent
**ESLint Rule**: `no-arbitrary-utility-values`

---

### Anti-Pattern #31: Responsive Utilities Without Mobile-First Design

**❌ Problem**:
```tsx
<div className="hidden md:block">
  Desktop-only content with no mobile alternative
</div>
```

**Why It Breaks**:
1. Hides content on mobile without alternative
2. Violates mobile-first principle
3. Creates accessibility issues

**Root Cause**: Not designing for mobile first

**✅ Correct Approach**:
```tsx
<div className="block">
  Content that adapts to all screen sizes
</div>

{/* Or provide mobile alternative */}
<div className="hidden md:block">Desktop version</div>
<div className="block md:hidden">Mobile version</div>
```

**Detected By**: Code review
**ESLint Rule**: Proposed `mobile-first-responsive`

---

### Anti-Pattern #32: Inline Styles for Layout Instead of Utilities

**❌ Problem**:
```tsx
<div style={{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem'
}}>
```

**Why It Breaks**:
1. Utilities exist for this pattern
2. More verbose than utilities
3. Harder to maintain

**Root Cause**: Not using layout utilities

**✅ Correct Approach**:
```tsx
<div className="flex justify-content-between align-items-center gap-3">
```

**Detected By**: Code review
**ESLint Rule**: `prefer-layout-utilities`

---

### Anti-Pattern #33: Custom CSS Classes for Spacing

**❌ Problem**:
```css
.my-custom-spacing {
  padding: 20px;
  margin: 15px;
}
```

```tsx
<div className="my-custom-spacing">
```

**Why It Breaks**:
1. Not on 4px grid
2. Creating custom CSS instead of using utilities
3. Harder to maintain

**Root Cause**: Not using spacing utilities

**✅ Correct Approach**:
```tsx
<div className="p-4 m-3">
```

**Detected By**: Code review
**ESLint Rule**: `no-custom-spacing-classes`

---

### Anti-Pattern #34: Utility Overkill (Too Many Classes)

**❌ Problem**:
```tsx
<div className="flex flex-column justify-content-center align-items-center gap-3 p-4 m-2 border-round-md shadow-2 bg-white text-gray-900">
```

**Why It Breaks**:
1. Should be extracted to component or use inline styles
2. Too many classes reduces readability
3. Background/text should use tokens, not utilities

**Root Cause**: Overusing utility classes

**✅ Correct Approach**:
```tsx
{/* Extract to component */}
<CenteredCard>

{/* Or use mix of utilities + tokens */}
<div
  className="flex flex-column align-items-center gap-3 p-4"
  style={{
    background: 'var(--surface-neutral-primary)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--elevation-moderate)'
  }}
>
```

**Detected By**: Code review
**ESLint Rule**: `max-utility-classes` (threshold: 8)

---

### Anti-Pattern #35: Z-Index Utilities

**❌ Problem**:
```tsx
<div className="z-50">
```

**Why It Breaks**:
1. Z-index should be managed by PrimeReact components
2. Creates stacking context issues
3. Arbitrary z-index values

**Root Cause**: Trying to fix overlay stacking manually

**✅ Correct Approach**:
```tsx
{/* PrimeReact manages z-index automatically */}
<Dialog visible={visible}>

{/* Or use PrimeReact config if needed */}
<PrimeReactProvider value={{ zIndex: { modal: 1100, overlay: 1000 } }}>
```

**Detected By**: Code review
**ESLint Rule**: `no-z-index-utilities`

---

### Anti-Pattern #36: Width/Height Utilities on Components

**❌ Problem**:
```tsx
<Button label="Click" className="w-6 h-4" />
```

**Why It Breaks**:
1. Forces specific size, breaks responsive design
2. May clip button content
3. `.w-full` is the only allowed width utility on inputs

**Root Cause**: Forcing component dimensions

**✅ Correct Approach**:
```tsx
{/* Let button size based on content */}
<Button label="Click" />

{/* Or use size prop if available */}
<Button label="Click" size="large" />

{/* Only .w-full allowed on inputs */}
<InputText className="w-full" />
```

**Detected By**: Utilities Guard Agent
**ESLint Rule**: `no-size-utilities-on-components`

---

### Anti-Pattern #37: Negative Margin Hacks

**❌ Problem**:
```tsx
<div className="-m-4">  {/* Negative margin */}
```

**Why It Breaks**:
1. Usually indicates layout problem
2. Creates fragile positioning
3. Breaks in responsive layouts

**Root Cause**: Trying to fix layout with negative margins instead of proper structure

**✅ Correct Approach**:
```tsx
{/* Restructure layout properly */}
<div className="grid">
  <div className="col-6">Item 1</div>
  <div className="col-6">Item 2</div>
</div>
```

**Detected By**: Code review
**ESLint Rule**: `no-negative-margin`

---

## Accessibility Failures

### Anti-Pattern #38: Missing ARIA Labels on Icon Buttons

**❌ Problem**:
```tsx
<Button icon="pi pi-pencil" rounded text onClick={handleEdit} />
```

**Why It Breaks**:
1. Screen reader announces "button" with no label
2. User doesn't know button purpose
3. Fails WCAG 2.4.4 (Link Purpose)

**Root Cause**: Forgetting accessibility for icon-only buttons

**✅ Correct Approach**:
```tsx
<Button
  icon="pi pi-pencil"
  rounded
  text
  onClick={handleEdit}
  aria-label="Edit item"
/>
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `button-has-aria-label` (when no label prop)

---

### Anti-Pattern #39: Missing Label Association

**❌ Problem**:
```tsx
<label>Email</label>
<InputText value={email} />
```

**Why It Breaks**:
1. Label not programmatically associated with input
2. Clicking label doesn't focus input
3. Screen reader doesn't announce label

**Root Cause**: Missing `htmlFor` / `id` association

**✅ Correct Approach**:
```tsx
<label htmlFor="email">Email</label>
<InputText id="email" value={email} />
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `label-has-for`

---

### Anti-Pattern #40: Missing Error Description

**❌ Problem**:
```tsx
<InputText
  value={email}
  className={error ? 'p-invalid' : ''}
/>
{error && <small>{error}</small>}
```

**Why It Breaks**:
1. Error message not programmatically linked to input
2. Screen reader doesn't announce error

**Root Cause**: Missing `aria-describedby`

**✅ Correct Approach**:
```tsx
<InputText
  id="email"
  value={email}
  className={error ? 'p-invalid' : ''}
  aria-describedby={error ? 'email-error' : null}
/>
{error && <small id="email-error">{error}</small>}
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `input-has-error-description`

---

### Anti-Pattern #41: Non-Semantic Click Handlers

**❌ Problem**:
```tsx
<div onClick={handleAction}>Click me</div>
```

**Why It Breaks**:
1. Not keyboard accessible (can't Tab to it)
2. Screen reader doesn't identify as interactive
3. No Enter/Space activation

**Root Cause**: Using div instead of button/link

**✅ Correct Approach**:
```tsx
<button onClick={handleAction}>Click me</button>

{/* Or use Button component */}
<Button label="Click me" text onClick={handleAction} />
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `no-noninteractive-element-interactions`

---

### Anti-Pattern #42: Missing Focus Indicators

**❌ Problem**:
```css
button:focus {
  outline: none;  /* NEVER DO THIS */
}
```

**Why It Breaks**:
1. Keyboard users can't see where focus is
2. Violates WCAG 2.4.7 (Focus Visible)
3. Makes keyboard navigation impossible

**Root Cause**: Removing default focus styles without replacement

**✅ Correct Approach**:
```tsx
{/* Use :focus-visible instead */}
<button
  style={{
    outline: 'none'
  }}
  onFocus={(e) => {
    e.currentTarget.style.outline = '2px solid var(--border-state-focus)';
  }}
>

{/* Or let PrimeReact handle it */}
<Button label="Click" />  {/* Has focus styles built-in */}
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `no-outline-none`

---

### Anti-Pattern #43: Low Contrast Text

**❌ Problem**:
```tsx
<div style={{
  background: 'var(--surface-neutral-secondary)',
  color: 'var(--text-neutral-subdued)'
}}>
  Important text
</div>
```

**Why It Breaks**:
1. May fail WCAG AA contrast ratio (4.5:1)
2. Hard to read for users with visual impairments

**Root Cause**: Using subdued text on non-primary background

**✅ Correct Approach**:
```tsx
<div style={{
  background: 'var(--surface-neutral-secondary)',
  color: 'var(--text-neutral-default)'  {/* Higher contrast */}
}}>
  Important text
</div>

{/* Subdued is OK for helper text */}
<small style={{ color: 'var(--text-neutral-subdued)' }}>
  Helper text
</small>
```

**Detected By**: Accessibility Agent (contrast check)
**ESLint Rule**: `enforce-contrast-ratio`

---

### Anti-Pattern #44: Images Without Alt Text

**❌ Problem**:
```tsx
<img src="/avatar.jpg" />
```

**Why It Breaks**:
1. Screen readers can't describe image
2. Violates WCAG 1.1.1 (Non-text Content)

**Root Cause**: Forgetting alt attribute

**✅ Correct Approach**:
```tsx
<img src="/avatar.jpg" alt="User profile photo" />

{/* Decorative images use empty alt */}
<img src="/decoration.png" alt="" />
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `img-has-alt`

---

### Anti-Pattern #45: Missing Required Field Indicators

**❌ Problem**:
```tsx
<label htmlFor="email">Email</label>
<InputText id="email" required />
```

**Why It Breaks**:
1. Visual indicator missing (no asterisk or "required" text)
2. Screen reader doesn't announce as required
3. User doesn't know field is mandatory

**Root Cause**: Not indicating required fields

**✅ Correct Approach**:
```tsx
<label htmlFor="email">
  Email <span style={{ color: 'var(--text-context-danger)' }}>*</span>
</label>
<InputText
  id="email"
  required
  aria-required="true"
/>
```

**Detected By**: Accessibility Agent
**ESLint Rule**: `required-field-indicator`

---

## State Management Mistakes

### Anti-Pattern #46: Missing Loading State

**❌ Problem**:
```tsx
<Button label="Submit" onClick={handleSubmit} />
```

**Why It Breaks**:
1. No feedback during async operation
2. User can click multiple times (duplicate submissions)
3. No loading indicator

**Root Cause**: Not handling async state

**✅ Correct Approach**:
```tsx
<Button
  label={isSubmitting ? 'Submitting...' : 'Submit'}
  loading={isSubmitting}
  disabled={isSubmitting}
  onClick={handleSubmit}
/>
```

**Detected By**: Interaction Patterns Agent
**ESLint Rule**: `button-has-loading-state` (for async onClick)

---

### Anti-Pattern #47: Missing Error State

**❌ Problem**:
```tsx
const handleSubmit = async () => {
  await api.submit(data);  // No error handling
  setSuccess(true);
};
```

**Why It Breaks**:
1. No user feedback on failure
2. Silent errors confuse users
3. No recovery path

**Root Cause**: Not handling async errors

**✅ Correct Approach**:
```tsx
const handleSubmit = async () => {
  try {
    await api.submit(data);
    setSuccess(true);
    toast.current.show({ severity: 'success', summary: 'Saved' });
  } catch (error) {
    setError(error.message);
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save. Please try again.'
    });
  }
};
```

**Detected By**: Interaction Patterns Agent
**ESLint Rule**: `async-must-have-error-handling`

---

### Anti-Pattern #48: Missing Empty State

**❌ Problem**:
```tsx
<DataTable value={items} />
```

**Why It Breaks**:
1. Shows blank table when no data
2. No guidance for user on what to do

**Root Cause**: Not handling empty state

**✅ Correct Approach**:
```tsx
<DataTable
  value={items}
  emptyMessage={
    <div className="flex flex-column align-items-center gap-3 p-6">
      <i className="pi pi-inbox" style={{ fontSize: '4rem', color: 'var(--icon-neutral-subdued)' }} />
      <p style={{ color: 'var(--text-neutral-subdued)' }}>No items found</p>
      <Button label="Create First Item" onClick={handleCreate} />
    </div>
  }
/>
```

**Detected By**: Interaction Patterns Agent
**ESLint Rule**: `datatable-has-empty-message`

---

### Anti-Pattern #49: Missing Disabled State

**❌ Problem**:
```tsx
<Button label="Save" onClick={handleSave} />
```

**Why It Breaks**:
1. Button clickable even when form invalid
2. Allows invalid submissions

**Root Cause**: Not disabling button based on form validity

**✅ Correct Approach**:
```tsx
<Button
  label="Save"
  onClick={handleSave}
  disabled={!isValid || isSubmitting}
/>
```

**Detected By**: Interaction Patterns Agent
**ESLint Rule**: `form-submit-has-disabled`

---

### Anti-Pattern #50: Incomplete State Handling

**❌ Problem**:
```tsx
{/* Only handles loading and data states, missing error/empty */}
{isLoading ? <ProgressSpinner /> : <DataTable value={items} />}
```

**Why It Breaks**:
1. No error state handling
2. No empty state handling
3. Incomplete user feedback

**Root Cause**: Not implementing all 5 required states

**✅ Correct Approach**:
```tsx
{isLoading && <ProgressSpinner />}
{error && <Message severity="error" text={error} />}
{!isLoading && !error && items.length === 0 && <EmptyState />}
{!isLoading && !error && items.length > 0 && <DataTable value={items} />}
```

**Reference**: [Interaction Patterns Agent - State Completeness](../.ai/agents/interaction-patterns.md#state-completeness-requirements)

**Detected By**: Interaction Patterns Agent
**ESLint Rule**: `component-has-all-states`

---

### Anti-Pattern #51: State Mutation

**❌ Problem**:
```tsx
const handleAdd = (item) => {
  items.push(item);  // Direct mutation
  setItems(items);
};
```

**Why It Breaks**:
1. React doesn't detect change (same reference)
2. Component doesn't re-render
3. Violates React immutability principle

**Root Cause**: Mutating state directly

**✅ Correct Approach**:
```tsx
const handleAdd = (item) => {
  setItems([...items, item]);  // Create new array
};
```

**Detected By**: React DevTools warnings
**ESLint Rule**: `no-direct-mutation-state`

---

## PrimeReact Integration Issues

### Anti-Pattern #52: Not Using PrimeReactProvider

**❌ Problem**:
```tsx
function App() {
  return (
    <>
      <Button label="Click" />
    </>
  );
}
```

**Why It Breaks**:
1. No global PrimeReact configuration
2. Ripple effect disabled by default
3. Missing locale/z-index config

**Root Cause**: Not wrapping app in provider

**✅ Correct Approach**:
```tsx
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <Button label="Click" />
    </PrimeReactProvider>
  );
}
```

**Detected By**: Code review
**ESLint Rule**: `require-primereact-provider`

---

### Anti-Pattern #53: Mixing Component Libraries

**❌ Problem**:
```tsx
import { Button } from 'primereact/button';
import { TextField } from '@mui/material';  // Material-UI

<div>
  <Button label="Save" />
  <TextField label="Name" />  {/* Different library */}
</div>
```

**Why It Breaks**:
1. Inconsistent design language
2. Increases bundle size
3. Conflicting styles
4. Violates single-library principle

**Root Cause**: Using multiple UI libraries

**✅ Correct Approach**:
```tsx
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';  // Same library

<div>
  <Button label="Save" />
  <InputText placeholder="Name" />
</div>
```

**Detected By**: Code review
**ESLint Rule**: `no-mixed-component-libraries`

---

### Anti-Pattern #54: Not Importing Component CSS

**❌ Problem**:
```tsx
// Missing import
import { Calendar } from 'primereact/calendar';

<Calendar value={date} />  {/* Unstyled */}
```

**Why It Breaks**:
1. Component renders but has no styles
2. Theme CSS import in app root should handle this

**Root Cause**: Not importing theme CSS in app entry

**✅ Correct Approach**:
```tsx
// In main.tsx or App.tsx
import '@lifeonlars/prime-yggdrasil/theme.css';  // Once at app root
import 'primeicons/primeicons.css';  // Once at app root

// Component file
import { Calendar } from 'primereact/calendar';
<Calendar value={date} />  {/* Now styled */}
```

**Detected By**: Visual inspection
**ESLint Rule**: `require-theme-import`

---

### Anti-Pattern #55: Overriding Component Styles with !important

**❌ Problem**:
```css
.p-button {
  background: red !important;  /* NEVER */
}
```

**Why It Breaks**:
1. Creates specificity wars
2. Breaks theme switching
3. Hard to maintain

**Root Cause**: Fighting component styles instead of using theme tokens

**✅ Correct Approach**:
```tsx
{/* Use semantic tokens via inline styles */}
<Button
  label="Custom"
  style={{
    background: 'var(--surface-context-danger)',
    color: 'var(--text-onsurface-oncontext)'
  }}
/>

{/* Or create variant via severity prop */}
<Button label="Delete" severity="danger" />
```

**Detected By**: Code review
**ESLint Rule**: `no-important-in-css`

---

### Anti-Pattern #56: Not Using Built-in Component Features

**❌ Problem**:
```tsx
{/* Reimplementing search that DataTable already has */}
const [filteredItems, setFilteredItems] = useState(items);

<InputText
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setFilteredItems(items.filter(item =>
      item.name.includes(e.target.value)
    ));
  }}
/>
<DataTable value={filteredItems} />
```

**Why It Breaks**:
1. DataTable has built-in filtering
2. Duplicating functionality
3. More code to maintain

**Root Cause**: Not reading component documentation

**✅ Correct Approach**:
```tsx
<DataTable value={items} filterDisplay="row">
  <Column field="name" header="Name" filter filterPlaceholder="Search" />
</DataTable>
```

**Detected By**: Code review
**ESLint Rule**: `use-component-features`

---

### Anti-Pattern #57: Wrong Event Handler Signature

**❌ Problem**:
```tsx
<Dropdown
  value={selected}
  options={items}
  onChange={setSelected}  {/* WRONG - expects event object */}
/>
```

**Why It Breaks**:
1. `onChange` receives event object, not value directly
2. Sets `{ value, originalEvent }` instead of just value
3. Component breaks

**Root Cause**: Not understanding event handler signature

**✅ Correct Approach**:
```tsx
<Dropdown
  value={selected}
  options={items}
  onChange={(e) => setSelected(e.value)}  {/* Extract value from event */}
/>
```

**Detected By**: Runtime errors
**ESLint Rule**: `primereact-event-signature`

---

### Anti-Pattern #58: Not Using Ref for Imperative APIs

**❌ Problem**:
```tsx
{/* Trying to call Toast.show() without ref */}
<Toast />
<Button
  label="Show"
  onClick={() => Toast.show({ severity: 'success', summary: 'Hi' })}  {/* WRONG */}
/>
```

**Why It Breaks**:
1. Toast requires ref for imperative API
2. `Toast.show()` is not a static method

**Root Cause**: Not understanding ref pattern

**✅ Correct Approach**:
```tsx
import { useRef } from 'react';

const toast = useRef(null);

<Toast ref={toast} />
<Button
  label="Show"
  onClick={() => toast.current.show({
    severity: 'success',
    summary: 'Hi'
  })}
/>
```

**Detected By**: Runtime errors
**ESLint Rule**: `primereact-ref-usage`

---

### Anti-Pattern #59: Not Handling Async Data in DataTable

**❌ Problem**:
```tsx
const [items, setItems] = useState([]);

useEffect(() => {
  api.getItems().then(setItems);
}, []);

<DataTable value={items} />  {/* No loading state */}
```

**Why It Breaks**:
1. Table flashes empty before data loads
2. No loading indicator
3. No error handling

**Root Cause**: Not using loading prop

**✅ Correct Approach**:
```tsx
const [items, setItems] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  api.getItems()
    .then(setItems)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);

{error && <Message severity="error" text={error.message} />}
<DataTable value={items} loading={loading} />
```

**Detected By**: Interaction Patterns Agent
**ESLint Rule**: `datatable-has-loading-state`

---

### Anti-Pattern #60: Not Cleaning Up Event Listeners

**❌ Problem**:
```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
  // Missing cleanup
}, []);
```

**Why It Breaks**:
1. Memory leak (listener never removed)
2. Component unmounts but listener remains
3. May cause errors when accessing unmounted component state

**Root Cause**: Not returning cleanup function

**✅ Correct Approach**:
```tsx
useEffect(() => {
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);  // Cleanup
  };
}, []);
```

**Detected By**: React DevTools
**ESLint Rule**: `require-useeffect-cleanup`

---

## Summary Statistics

**Total Anti-Patterns Documented**: 60

**By Category**:
- Component Creation: 12 patterns
- Token Misuse: 15 patterns
- Utility Class Violations: 10 patterns
- Accessibility Failures: 8 patterns
- State Management Mistakes: 6 patterns
- PrimeReact Integration Issues: 9 patterns

**Detection Methods**:
- Automated (ESLint): 48 rules proposed
- Automated (Agents): 35 agent detections
- Manual (Code Review): 12 require human review

---

## Using This Library

### Before Writing Code

1. **Search this document** for similar patterns
2. **Review the "Why It Breaks" section** to understand root cause
3. **Copy the "Correct Approach"** as starting point

### When Reviewing Code

1. **Scan for hardcoded values** (colors, spacing, shadows)
2. **Check component creation** - does PrimeReact have this?
3. **Verify accessibility** - labels, ARIA, keyboard nav
4. **Validate state handling** - all 5 states present?
5. **Check token pairing** - text-on-surface matches?

### When Stuck

If you're about to create something that feels like it should already exist, it probably does. Check:
1. [DECISION-MATRIX.md](./DECISION-MATRIX.md) for common scenarios
2. [Component Index](./components/INDEX.md) for PrimeReact components and Yggdrasil blocks
3. [PrimeReact documentation](https://primereact.org/)
4. [Yggdrasil Storybook](http://localhost:6006/)

---

**Last Updated**: 2026-01-17
**Version**: 0.7.0
**Total Anti-Patterns**: 60

For correct implementation patterns, see [DECISION-MATRIX.md](./DECISION-MATRIX.md).
