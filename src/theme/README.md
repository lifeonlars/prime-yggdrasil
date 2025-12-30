# Yggdrasil Theme Architecture

## Active Theme Files

The Yggdrasil theme uses a layered architecture with the following **active** files:

### Core Files (in load order)

1. **`foundations.css`** - Foundation color palette
   - Raw color values for Yggdrasil palette (Sky, Sea, Forest, Sand, Berries, Rock)
   - No semantic meaning, just color definitions
   - Never import directly in applications

2. **`radius.css`** - Border radius tokens
   - Semantic border-radius tokens following 4px grid system
   - Component-specific tokens: `--button-radius`, `--input-radius`, etc.
   - Generic scale: `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px), etc.

3. **`semantic-light.css`** / **`semantic-dark.css`** - Semantic color tokens
   - Theme-aware semantic tokens (surfaces, text, borders, etc.)
   - Elevation tokens for shadows with theme-specific implementations
   - Light mode uses standard shadows, dark mode uses white rim + stronger shadows

4. **`prime-palette.css`** - PrimeReact palette bridge
   - Maps foundation colors to PrimeReact expected palette variables
   - Imported by semantic files to provide color ramps
   - Not imported directly in theme files

5. **`components.css`** - Component styling
   - All PrimeReact component styles
   - Uses semantic tokens exclusively (no hardcoded colors or radii)
   - Includes utility classes at the end:
     - Shadow utilities (`.shadow-1` through `.shadow-8`)
     - Border radius utilities (`.border-round`, `.border-round-lg`, etc.)

### Theme Entry Points

**`index.css`** - Default export (light theme)
```css
@import './yggdrasil-light.css';
```

**`yggdrasil-light.css`** - Light theme
```css
@import "./foundations.css";
@import "./radius.css";
@import "./semantic-light.css";
@import "./components.css";
```

**`yggdrasil-dark.css`** - Dark theme
```css
@import "./foundations.css";
@import "./radius.css";
@import "./semantic-dark.css";
@import "./components.css";
```

## Deprecated Files

### `yggdrasil-adaptive.css` ⚠️ DEPRECATED

This file was an attempt at runtime theme switching using `data-theme` attributes. However, it has several issues:

1. **Duplicates prime-palette mappings** - Contains duplicate color mapping code
2. **Hardcoded component styles** - Has component-specific styling that should be in components.css
3. **Not imported anywhere** - Not used in the current architecture

**Migration path:** Use `yggdrasil-light.css` or `yggdrasil-dark.css` and swap them at runtime if needed.

## Design System Principles

### 4px Soft Grid
All spacing, padding, margins, and border-radius values follow a 4px grid:
- Valid: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`
- Invalid: `5px`, `6px`, `10px`, `15px`

### Semantic Tokens
- **Never use foundation colors directly** - Always use semantic tokens
- **Never use hardcoded values** - Use CSS custom properties
- **Theme-aware** - All tokens adapt to light/dark mode

### Border Radius Mapping

Based on Yggdrasil specification:

| Token | Value | Usage |
|-------|-------|-------|
| `--button-radius` | 8px | All button types and button groups |
| `--input-radius` | 8px | Text inputs, textareas, select boxes, dropdown triggers |
| `--radius-layout-dropdowns` | 8px | Dropdown panels (not triggers) |
| `--radius-layout-widgets` | 12px | Chart widgets |
| `--radius-layout-cards` | 12px | Cards, boxes, content frames |
| `--radius-layout-modals` | 12px | Modals, dialogs, popovers, tooltips |
| `--radius-charts-large` | 12px | Bar charts, column charts |
| `--radius-charts-medium` | 8px | Donut charts, tree maps |
| `--radius-charts-small` | 2px | Segments in stacked charts |
| `--radius-full` | 9999px | Fully rounded (pills, avatars) |

### Elevation (Shadows)

Four elevation levels with theme-specific implementations:

| Level | Token | Light Mode | Dark Mode | Usage |
|-------|-------|------------|-----------|-------|
| Subtle | `--elevation-subtle` / `.shadow-1` | Standard shadow | White rim + shadow | Cards, panels, list items |
| Moderate | `--elevation-moderate` / `.shadow-2` | Medium shadow | Stronger white rim | Dropdowns, menus |
| Elevated | `--elevation-elevated` / `.shadow-3` | Large shadow | Strong white rim | Dialogs, modals |
| High | `--elevation-high` / `.shadow-4` to `.shadow-8` | X-large shadow | Very strong white rim | Tooltips, toasts |

## Usage Examples

### In CSS
```css
.my-component {
  background: var(--surface-neutral-primary);
  color: var(--text-neutral-default);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-moderate);
}
```

### In JSX
```jsx
<div className="surface-card p-4 shadow-2 border-round">
  Content
</div>
```

## File Size Breakdown

Approximate sizes:
- foundations.css: ~6KB
- radius.css: ~1KB
- semantic-light.css: ~9KB
- semantic-dark.css: ~9KB
- prime-palette.css: ~8KB
- components.css: ~229KB (includes all PrimeReact components)

Total theme size: ~250KB (light or dark)
