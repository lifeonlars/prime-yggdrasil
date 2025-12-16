# Yggdrasil Theme for PrimeReact

This document describes the custom Yggdrasil theme implementation for PrimeReact, including what was accomplished and what limitations exist with the standard theming approach.

## Overview

The Yggdrasil theme maps the Yggdrasil design system tokens to PrimeReact's CSS variables, creating both light and dark mode variants while maintaining full compatibility with PrimeReact's component library.

## Theme Files

- **[src/themes/yggdrasil-light.css](src/themes/yggdrasil-light.css)** - Light mode theme
- **[src/themes/yggdrasil-dark.css](src/themes/yggdrasil-dark.css)** - Dark mode theme

## What Was Accomplished

### ✅ Colors

Successfully mapped all Yggdrasil color tokens to PrimeReact CSS variables:

#### Primary/Brand Colors (Sky)
- Mapped Yggdrasil Sky palette to PrimeReact's `--primary-color` and `--blue-*` variables
- Light mode: `--foundation-sky-700` (#001F4A) as primary
- Dark mode: `--foundation-sky-600` (#183B60) as primary

#### Success Colors (Forest)
- Mapped Yggdrasil Forest palette to PrimeReact's `--green-*` variables
- Provides proper success states for both light and dark modes

#### Warning Colors (Sand)
- Mapped Yggdrasil Sand palette to PrimeReact's `--yellow-*` variables
- Provides proper warning states for both light and dark modes

#### Danger/Error Colors (Berries)
- Mapped Yggdrasil Berries palette to PrimeReact's `--red-*` variables
- Provides proper danger/error states for both light and dark modes

#### Info/Secondary Colors (Sea)
- Mapped Yggdrasil Sea palette to PrimeReact's `--cyan-*` variables
- Provides secondary/info color variations

#### Neutral Colors (Rock)
- Mapped Yggdrasil Rock palette to PrimeReact's `--gray-*` and `--surface-*` variables
- Provides full neutral color scale for text, borders, and surfaces
- Properly inverted for dark mode

### ✅ Typography - Roboto Font

Successfully replaced Inter font with Roboto while preserving font weights:

- **Font Family**: Changed from "Inter var" to "Roboto"
- **Font Weights**: Preserved all weights (100, 300, 400, 500, 700, 900) including italic variants
- **Loading**: Using Google Fonts CDN via `@import`
- **Hierarchy**: Font weight hierarchy remains intact across all components

### ✅ Border Radius - 4px Grid Alignment

Successfully adjusted border radius to adhere to 4px grid:

- **Previous**: `--border-radius: 6px` (Lara theme default)
- **Updated**: `--border-radius: 8px` (4px grid: 8 = 2×4)
- **Impact**: All components (buttons, inputs, cards, dialogs, etc.) now use 8px border radius

### ✅ Surface and Text Colors

- **Light Mode**:
  - Primary surface: White (`--foundation-white`)
  - Secondary surfaces: Rock 50/100 (`--foundation-rock-050`, `--foundation-rock-100`)
  - Default text: Sky 700 (`--foundation-sky-700`)
  - Secondary text: Rock 600 (`--foundation-rock-600`)

- **Dark Mode**:
  - Primary surface: `#000D20` (custom dark blue)
  - Secondary surfaces: Sky 900/950 (`--foundation-sky-900`, `--foundation-sky-950`)
  - Default text: Rock 050 (`--foundation-rock-050`)
  - Secondary text: Rock 400 (`--foundation-rock-400`)

### ✅ Focus and Highlight States

- Focus ring colors adjusted to use Yggdrasil Sky colors
- Hover states use proper Yggdrasil overlay colors (`--foundation-darker-050` for light, `--foundation-lighter-100` for dark)
- Selection/highlight backgrounds use Sky palette

### ✅ Color Scheme Detection

- Proper `color-scheme: light` and `color-scheme: dark` declarations
- Enables browser-level dark mode support

## Implementation Approach

The theme was implemented using **CSS variable overrides**, which is PrimeReact's standard theming approach:

1. **Base Theme Import**: Both themes import the base Lara Light Blue theme for component structure and styling
2. **Foundation Variables**: Define all Yggdrasil foundation color tokens as CSS variables
3. **Semantic Mapping**: Override PrimeReact's semantic CSS variables (`--primary-color`, `--surface-*`, `--text-color`, etc.) with Yggdrasil foundation tokens
4. **Font Replacement**: Override `font-family` and import Roboto from Google Fonts
5. **Border Radius**: Override `--border-radius` to use 8px

## Switching Between Light and Dark Modes

To switch between light and dark themes, change the import in:

### Light Mode (Current Default)
```typescript
// src/main.tsx
import './themes/yggdrasil-light.css'

// .storybook/preview.ts
import '../src/themes/yggdrasil-light.css'
```

### Dark Mode
```typescript
// src/main.tsx
import './themes/yggdrasil-dark.css'

// .storybook/preview.ts
import '../src/themes/yggdrasil-dark.css'
```

### Dynamic Theme Switching (Future Enhancement)

For runtime theme switching, you would need to:
1. Load both CSS files
2. Use a CSS class or data attribute on the root element
3. Scope theme variables within those selectors

Example approach:
```css
/* Not currently implemented, but would look like: */
[data-theme="light"] {
  /* light mode variables */
}

[data-theme="dark"] {
  /* dark mode variables */
}
```

## Limitations and What Wasn't Possible

### ⚠️ Component-Specific Fine-Tuning

**Limitation**: PrimeReact's CSS variable theming provides global-level customization but limited component-specific control.

**Impact**: Some Yggdrasil design patterns that specify different treatments for specific component types (e.g., different border styles for cards vs. buttons) cannot be implemented without:
- Using PrimeReact's PassThrough (PT) API for per-component styling
- Creating wrapper components with custom CSS
- Using SASS theme compilation (more complex approach)

**Workaround**: Use Block components (e.g., `Card`, `PageHeader`) which can apply additional component-specific styling on top of the theme.

### ⚠️ Opacity/Alpha Channel Values

**Limitation**: Some Yggdrasil foundation colors use explicit alpha channel values (e.g., `--foundation-darker-050: #000F260C`), but PrimeReact expects solid colors in most variables.

**Implementation**:
- Used the explicit hex+alpha values where supported
- For variables requiring solid colors, used the Yggdrasil semantic tokens that reference appropriate foundation colors

**Impact**: Some subtle transparency effects from the original Yggdrasil design may not be perfectly replicated.

### ⚠️ Inter Variable Font Features

**Limitation**: The Lara theme uses "Inter var" with specific `font-feature-settings` ("cv02", "cv03", "cv04", "cv11") for stylistic alternates.

**Implementation**: Roboto doesn't have equivalent OpenType features, so these are overridden but not replaced.

**Impact**: Typography rendering is slightly different, but this is expected and acceptable since we're using a different font family.

### ⚠️ Pink, Purple, Indigo, Teal Color Scales

**Limitation**: PrimeReact provides CSS variables for pink, purple, indigo, orange, and teal color scales, but Yggdrasil doesn't have direct equivalents.

**Implementation**: These variables remain unchanged from the Lara theme. They're rarely used in standard components but might appear in custom implementations.

**Impact**: If custom components reference these color scales, they won't match the Yggdrasil palette.

### ⚠️ Chart Colors

**Limitation**: Yggdrasil defines extensive chart color palettes (`--charts-*`), but PrimeReact doesn't have corresponding CSS variables for chart theming.

**Implementation**: Chart colors are not currently mapped to PrimeReact theme variables.

**Impact**: If using PrimeReact chart components (from PrimeReact Charts), you would need to manually configure colors or create wrapper components.

### ⚠️ Spacing and Layout Variables

**Limitation**: Yggdrasil uses a comprehensive spacing scale with specific semantic tokens, but PrimeReact's theme only exposes `--content-padding` and `--inline-spacing`.

**Implementation**: These remain at Lara theme defaults.

**Impact**: Component internal spacing follows PrimeReact's defaults, not Yggdrasil's 4px grid spacing system. Layout spacing is controlled via PrimeFlex utility classes following the architecture policy.

### ✅ What Works Perfectly

Despite limitations, the following aspects work excellently with standard theming:

1. **All color semantics** (primary, success, warning, danger, info, neutral)
2. **Complete light/dark mode support** with proper color inversion
3. **Typography** (font family replacement)
4. **Border radius** (4px grid alignment)
5. **Focus states**
6. **Hover/active states**
7. **Surface hierarchy** (cards, overlays, borders)
8. **Text color hierarchy** (default, subdued, loud, disabled)

## Testing

Both themes have been tested with:

- ✅ Vite build (`npm run build`)
- ✅ Storybook build (`npm run build-storybook`)
- ✅ All component stories in Storybook
- ✅ Design System Playground page

## Comparison to Designer API / SASS Approach

### CSS Variables Approach (Current Implementation)

**Pros**:
- Simple, maintainable
- No build tooling required
- Easy to understand and modify
- Fast iteration
- Works with existing PrimeReact distribution

**Cons**:
- Limited to global variables
- Can't customize component-specific styling deeply
- Some advanced features not accessible

### SASS Compilation Approach (Not Implemented)

**Pros**:
- Complete control over every component style
- Can customize component-specific details
- More alignment with original PrimeReact theming system

**Cons**:
- Requires SASS build tooling
- More complex setup and maintenance
- Need to maintain sync with PrimeReact updates
- Significantly more effort for "close enough" goal

**Decision**: The CSS variables approach was chosen because:
1. The goal is "close enough" not pixel-perfect
2. Maintains coherence with PrimeReact
3. Avoids breaking components
4. Significantly faster to implement and iterate
5. Easier for LLM-assisted development

## Future Enhancements

If deeper customization is needed, consider:

1. **PassThrough API**: Use PrimeReact's PT API for component-specific styling
2. **Block Components**: Create more Block components that encapsulate Yggdrasil-specific patterns
3. **Dynamic Theme Switching**: Implement runtime light/dark mode switching
4. **Chart Integration**: Map Yggdrasil chart colors to chart components
5. **Custom Components**: For patterns that can't be achieved with PrimeReact primitives

## Conclusion

The Yggdrasil theme successfully brings the Yggdrasil design system's color palette, typography (Roboto), and 4px grid border radius to PrimeReact using standard CSS variable theming. While some advanced customizations would require the SASS approach or PassThrough API, the current implementation achieves the "close enough" goal while maintaining full coherence with PrimeReact's component library.
