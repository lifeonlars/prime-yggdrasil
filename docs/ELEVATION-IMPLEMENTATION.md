# Elevation System Implementation

**Date:** 2025-12-30
**Status:** Complete ✓

## Overview

Implemented a theme-aware elevation (shadow) system that adapts properly to both light and dark modes, solving the issue where Cards and Dialogs were invisible in dark mode.

## Problem

- Cards and Dialogs blending into dark backgrounds
- All shadows used black `rgba(0, 0, 0, ...)` which is invisible on dark surfaces
- Hardcoded shadow values throughout components.css

## Solution

### 1. Created Elevation Tokens

Added 4 elevation levels to semantic theme files:

**Light Mode** (`semantic-light.css`):
- `--elevation-subtle`: Soft 2-layer shadow for cards, panels
- `--elevation-moderate`: Medium shadow for dropdowns, menus
- `--elevation-elevated`: Strong shadow for dialogs, modals
- `--elevation-high`: Very strong for tooltips, top layers

**Dark Mode** (`semantic-dark.css`):
- Uses **white rim shadows** (`rgba(255, 255, 255, 0.05-0.2)`) to create "lift"
- Combined with **stronger black shadows** (0.5-0.8 opacity vs 0.1-0.2)
- Creates visible depth on dark backgrounds

### 2. Dark Mode Shadow Strategy

Dark mode uses a multi-layer approach:

```css
/* Example: elevation-subtle in dark mode */
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.05),  /* Light rim for definition */
  0 2px 4px 0 rgba(0, 0, 0, 0.5),        /* Strong dark shadow */
  0 1px 2px 0 rgba(0, 0, 0, 0.3);        /* Softer shadow layer */
```

**Why this works:**
1. White rim creates subtle outline/separation
2. Higher opacity black shadows show up on dark backgrounds
3. Multiple layers create realistic depth

### 3. Replaced 31 Hardcoded Shadows

Systematically replaced common shadow patterns:

| Old Shadow Pattern | New Token | Count |
|--------------------|-----------|-------|
| `0 2px 12px 0 rgba(0, 0, 0, 0.1)` | `--elevation-moderate` | 25 uses |
| `0 1px 3px rgba(0, 0, 0, 0.3)` | `--elevation-elevated` | 3 uses |
| Material 3-layer | `--elevation-moderate` | 3 uses |

## Component Mappings

| Component | Elevation Level | Reasoning |
|-----------|----------------|-----------|
| Card | `--elevation-subtle` | Low visual weight, subtle depth |
| Dialog | `--elevation-elevated` | Needs to float above content |
| Dropdown | `--elevation-moderate` | Temporary overlay |
| Menu | `--elevation-moderate` | Temporary overlay |
| Popover | `--elevation-elevated` | Important context |
| Tooltip | `--elevation-high` | Top layer |

## Files Modified

1. `src/theme/semantic-light.css` - Added 4 elevation tokens
2. `src/theme/semantic-dark.css` - Added 4 dark-optimized elevation tokens
3. `src/theme/components.css` - Replaced 31 hardcoded shadows
4. `.stylelintrc.json` - Allow rgba() in semantic files for elevation tokens

## Testing

**Before:** Cards and Dialogs invisible/barely visible in dark mode
**After:** Clear visual hierarchy with proper depth perception

### Test in Storybook

1. Start Storybook: `npm run storybook`
2. Toggle dark mode
3. Check Card story - should have visible shadow/rim
4. Check Dialog story - should float clearly above background

## Best Practices

### For New Components

Use elevation tokens instead of hardcoded shadows:

```css
/* ❌ Bad - hardcoded */
.my-component {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* ✅ Good - semantic token */
.my-component {
  box-shadow: var(--elevation-moderate);
}
```

### Choosing Elevation Level

- **Subtle**: Static content (cards, panels, list items)
- **Moderate**: Temporary overlays (dropdowns, menus, date pickers)
- **Elevated**: Important overlays (dialogs, modals, popovers)
- **High**: Highest layer (tooltips, notifications at top of z-index)

## Related Documentation

- [ELEVATION-SYSTEM.md](docs/ELEVATION-SYSTEM.md) - Detailed research and strategy
- [COMPONENT-THEMING-SUMMARY.md](COMPONENT-THEMING-SUMMARY.md) - Overall theming progress

## Stylelint Configuration

Added override to allow rgba() in semantic files (elevation tokens need it):

```json
{
  "files": ["**/semantic-*.css"],
  "rules": {
    "function-disallowed-list": null,
    "alpha-value-notation": null,
    "color-function-alias-notation": null,
    "color-function-notation": null
  }
}
```

This is appropriate because:
1. Elevation tokens only live in semantic files (not components.css)
2. rgba() with alpha is standard for shadows
3. Tokens provide theme abstraction

## Future Enhancements

Consider adding:
- `--elevation-none` for flush/flat components
- `--elevation-inset` for pressed/sunken states
- Animated shadows for interactive elements (`:hover` states)
