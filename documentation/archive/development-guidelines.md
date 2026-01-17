# Development Guidelines for Prime React Application

## Core Principles

### 1. Component Architecture Adherence

**CRITICAL RULE**: Always use existing components and avoid custom styling or custom overrides.

- Use PrimeReact components as the foundation for all UI elements
- Use PrimeFlex utility classes for layout and spacing
- Only extend or customize when absolutely necessary and with explicit approval

**Process for Custom Components/Styling**:
1. Propose the change with clear justification
2. Create an implementation plan
3. **Get human review and approval before implementing**
4. If approved, add as a new component in the appropriate directory structure
5. Create or update relevant Storybook documentation
6. Follow the architectural patterns defined in this document

### 2. Directory Structure & Organization

```
src/
├── components/
│   ├── blocks/          # Reusable composite components (Card, PageHeader, etc.)
│   └── ...              # Feature-specific components
├── pages/               # Page-level components (one per route)
├── styles/              # Global styles (minimal - prefer theme variables)
├── themes/              # Compiled theme CSS files
└── stories/             # Storybook documentation files

theme-src/               # SASS theme source files
├── yggdrasil-light/     # Light theme
│   ├── theme.scss       # Main theme entry point
│   ├── _variables-full.scss   # All theme variables
│   ├── _color-overrides.scss  # Color mappings
│   ├── _fonts.scss      # Font imports
│   └── _extensions.scss # Theme extensions
└── yggdrasil-dark/      # Dark theme (future)
```

### 3. Component Categories

#### Blocks (src/components/blocks/)
Reusable composite components that combine PrimeReact primitives:
- `Card` - Wrapper for card layouts
- `PageHeader` - Standard page header layout
- `SectionTitle` - Section heading component
- `FormField` - Form field wrapper with label

**Rules**:
- Must use PrimeReact primitives + PrimeFlex utilities
- Should not contain business logic
- Should be generic and reusable across pages
- Must have Storybook documentation

#### Pages (src/pages/)
Top-level route components:
- One component per route
- Compose blocks and PrimeReact components
- Contain page-specific logic and state
- Use PrimeFlex grid system for layout

### 4. Styling Hierarchy (Strict Order)

1. **PrimeReact Theme Variables** (Highest Priority)
   - Defined in `theme-src/yggdrasil-light/_variables-full.scss`
   - Use SASS variables with `!default` flag for overrides
   - Compile to CSS, never use `!important`

2. **PrimeFlex Utility Classes**
   - Use for: layout (grid, flex), spacing, typography, colors
   - Available utilities: shadows (shadow-1 through shadow-8), borders, etc.
   - Never create custom CSS when PrimeFlex utility exists

3. **CSS Custom Properties** (CSS Variables)
   - Use theme-defined variables: `var(--surface-ground)`, `var(--text-color)`, etc.
   - Available surface variables:
     - `--surface-ground` - App/page background
     - `--surface-section` - Section background
     - `--surface-card` - Cards/panels
     - `--surface-overlay` - Popovers, dialogs, overlays
     - `--surface-border` - Dividers/borders
     - `--surface-hover` - Hover layer

4. **Inline Styles** (Lowest Priority - Use Sparingly)
   - Only when dynamic values required (e.g., calculated dimensions)
   - Prefer CSS variables over hardcoded values
   - Example: `style={{ backgroundColor: 'var(--surface-ground)' }}`

### 5. Shadow Usage - PrimeFlex Only

**DO NOT** create custom box-shadow values. Use PrimeFlex shadow utilities:

```tsx
// ✅ CORRECT - Use PrimeFlex shadow classes
<Card className="shadow-2" />
<Panel className="shadow-3" />

// ❌ INCORRECT - Custom shadow values
<Card style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />

// ❌ INCORRECT - Theme variable overrides with custom shadows
$cardShadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !default;
```

**PrimeFlex Shadow Scale**:
- `shadow-1` - Subtle elevation (cards on surface)
- `shadow-2` - Standard elevation (default for cards/panels)
- `shadow-3` - Medium elevation (dropdowns, popovers)
- `shadow-4` - High elevation (modals, dialogs)
- `shadow-5` to `shadow-8` - Increasing elevation for special cases

**Theme Integration**:
When shadows are needed in theme variables, use PrimeFlex shadow values:
```scss
// ✅ CORRECT - Use PrimeFlex shadow-2 values
$cardShadow: 0px 4px 10px rgba(0, 0, 0, 0.03), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.12) !default;
```

### 6. Override Prevention Protocol

When a user requests changes that violate these guidelines:

1. **Acknowledge the request**
2. **Explain the architectural concern**:
   - Reference this document
   - Explain why the approach violates best practices
   - Propose alternative solutions using existing components/utilities
3. **Request explicit override confirmation**:
   ```
   "This approach goes against our core architectural principles because [reason].

   Alternative approach: [suggestion using existing components/utilities]

   If you still want to proceed with custom styling, please confirm with 'override approved'."
   ```
4. **Only proceed after explicit user confirmation**
5. **Document the override** in code comments and implementation plan

### 7. Theme Customization Rules

**Allowed**:
- Modifying SASS variables in `theme-src/yggdrasil-light/_variables-full.scss`
- Creating color mappings in `_color-overrides.scss`
- Defining new semantic color variables that map to Yggdrasil tokens
- Adjusting spacing, typography, border radius via theme variables

**NOT Allowed** (Without Approval):
- Adding `!important` to theme styles
- Creating custom CSS files that override theme
- Inline styles with hardcoded colors/shadows
- Custom components that replicate PrimeReact functionality

### 8. CSS Variable Compatibility

The theme must define both legacy and modern CSS variable formats:

```scss
:root {
  // Legacy format (PrimeReact v10)
  --surface-ground: #F8F8F8;
  --surface-card: #ffffff;
  --text-color: #{$shade700};

  // Modern format (PrimeFlex compatibility)
  --p-content-border-radius: #{$borderRadius};
  --p-surface-0: #ffffff;
  --p-surface-900: #221F24;
}
```

This ensures compatibility with both PrimeReact components and PrimeFlex utilities.

### 9. Git Workflow

**Before committing**:
1. Verify all changes follow these guidelines
2. Compile theme if SASS files modified
3. Run Storybook to verify component documentation
4. Test in both dev server and Storybook

**Commit messages**:
- Follow conventional commit format
- Reference architectural decisions when deviating from guidelines
- Include "Approved override:" prefix if guidelines were overridden

### 10. Storybook Documentation

**Required for**:
- All new blocks
- All modified components
- New theme features (color palettes, shadows, etc.)

**Documentation format**:
```tsx
// Component stories (.stories.tsx)
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComponentName } from './ComponentName'

const meta = {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    // Limit controls to canonical options only
  },
} satisfies Meta<typeof ComponentName>

export default meta
type Story = StoryObj<typeof meta>

// Design System pages (.mdx)
import { Meta, ColorPalette, IconGallery } from '@storybook/addon-docs/blocks'
// Use doc blocks for design system documentation
```

## Enforcement

These guidelines are **mandatory** for all development work. AI agents (Claude, Gemini, etc.) must:

1. Read this document before making architectural decisions
2. Flag violations in user requests
3. Propose compliant alternatives
4. Request explicit override approval when necessary
5. Document all overrides with justification

**Human developers** must review and approve:
- New components that don't use existing primitives
- Custom CSS beyond theme variables
- Deviations from established patterns
- Theme modifications beyond color/spacing variables

## Quick Reference Checklist

Before implementing any feature:

- [ ] Can this be built with existing PrimeReact components?
- [ ] Can this be styled with PrimeFlex utilities?
- [ ] Does this require custom CSS? If yes, get approval.
- [ ] Am I using PrimeFlex shadows instead of custom values?
- [ ] Are all new components documented in Storybook?
- [ ] Does this follow the blocks/pages architecture?
- [ ] Am I using theme CSS variables instead of hardcoded values?
- [ ] Have I checked if CSS variables exist for PrimeFlex compatibility?
- [ ] If violating guidelines, have I requested override approval?

---

**Last Updated**: 2025-12-16
**Version**: 1.0
