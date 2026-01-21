---
title: "Elevation System"
category: reference
tags: [elevation, shadows, depth, hierarchy, dark-mode]
audience: designer
version: 0.7.0
lastUpdated: 2026-01-16
relatedDocs:
  - AI-AGENT-GUIDE.md
  - AESTHETICS.md
---

# Yggdrasil Elevation System

## Dark Mode Shadow Strategy

### Research & Best Practices

**Key Insight:** Dark mode shadows work differently than light mode:

1. **Light Mode:** Black shadows (`rgba(0, 0, 0, ...)`) create depth by darkening areas
2. **Dark Mode:** Need BOTH:
   - Light/white shadows on top edges (`rgba(255, 255, 255, 0.05-0.15)`) to create "lift"
   - Subtle dark shadows on bottom edges for depth
   - OR increase existing dark shadow opacity since dark backgrounds show shadows less

### Material Design Approach
- Uses higher opacity dark shadows in dark mode (0.3-0.5 vs 0.1-0.2)
- Combines multiple shadow layers for better definition

### Tailwind/Modern Approach
- Often uses colored shadows or lighter rim shadows in dark mode
- Some systems use `filter: drop-shadow()` for better dark mode rendering

## Yggdrasil Elevation Levels

### Level 1: Subtle (Cards, Panels)
**Light Mode:**
```css
box-shadow:
  0 1px 2px 0 rgba(0, 0, 0, 0.05),
  0 1px 3px 0 rgba(0, 0, 0, 0.1);
```

**Dark Mode:**
```css
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.05),
  0 2px 4px 0 rgba(0, 0, 0, 0.5),
  0 1px 2px 0 rgba(0, 0, 0, 0.3);
```

### Level 2: Moderate (Dropdowns, Popovers)
**Light Mode:**
```css
box-shadow:
  0 4px 6px -1px rgba(0, 0, 0, 0.1),
  0 2px 4px -1px rgba(0, 0, 0, 0.06);
```

**Dark Mode:**
```css
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.1),
  0 8px 16px 0 rgba(0, 0, 0, 0.6),
  0 4px 8px 0 rgba(0, 0, 0, 0.4);
```

### Level 3: Elevated (Dialogs, Modals)
**Light Mode:**
```css
box-shadow:
  0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
```

**Dark Mode:**
```css
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.15),
  0 20px 25px -5px rgba(0, 0, 0, 0.7),
  0 10px 10px -5px rgba(0, 0, 0, 0.5);
```

### Level 4: High (Tooltips, Top Layers)
**Light Mode:**
```css
box-shadow:
  0 20px 25px -5px rgba(0, 0, 0, 0.1),
  0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

**Dark Mode:**
```css
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.2),
  0 25px 50px -12px rgba(0, 0, 0, 0.8);
```

## Component Mappings

| Component | Elevation Level | Current Shadow | Needs Update |
|-----------|----------------|----------------|--------------|
| Card | Level 1 (Subtle) | Material 3-layer (too subtle in dark) | ✓ Yes |
| Dialog | Level 3 (Elevated) | Single layer 0.3 opacity | ✓ Yes |
| Dropdown | Level 2 (Moderate) | Single layer 0.1 opacity | ✓ Yes |
| Tooltip | Level 4 (High) | Single layer 0.1 opacity | ✓ Yes |
| Popover | Level 2 (Moderate) | Single layer 0.3 opacity | ✓ Yes |
| Menu | Level 2 (Moderate) | Single layer 0.1 opacity | ✓ Yes |
| Panel | Level 1 (Subtle) | Material 3-layer | ✓ Yes |

## Implementation Strategy

1. Create elevation tokens in semantic theme files
2. Use CSS custom properties for theme-aware shadows
3. Replace hardcoded rgba() shadows with semantic tokens
