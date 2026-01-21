# Yggdrasil Theme Documentation

This directory contains comprehensive documentation for the Yggdrasil theme system built on PrimeReact.

## 📚 Documentation Index

### Theme Architecture
- **[Theme Architecture](../src/theme/README.md)** - Complete overview of the theme file structure, design tokens, and usage patterns

### Design System Implementation
- **[Elevation System](./ELEVATION-SYSTEM.md)** - Research and best practices for elevation/shadows in light and dark modes
- **[Elevation Implementation](./ELEVATION-IMPLEMENTATION.md)** - Implementation guide for the 4-level elevation system
- **[Contrast Report](./contrast-report.md)** - APCA contrast test results for all semantic color tokens

### Scripts Documentation
- **[Scripts Guide](./scripts/README.md)** - Documentation for all theme build and analysis scripts

## 🎨 Design Principles

### 4px Soft Grid
All spacing, padding, margins, and border-radius values follow a 4px grid:
- ✅ Valid: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`
- ❌ Invalid: `5px`, `6px`, `10px`, `15px`

### Semantic Token Architecture
```
Foundation Colors (foundations.css)
         ↓
Border Radius Tokens (radius.css)
         ↓
Semantic Tokens (semantic-light.css / semantic-dark.css)
         ↓
Component Styles (components.css)
```

### Design Token Hierarchy

1. **Foundation Colors** - Raw color values, never used directly
   - Sky, Sea, Forest, Sand, Berries, Rock palettes

2. **Border Radius** - Following 4px grid
   - `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (12px)
   - Component-specific: `--button-radius`, `--input-radius`

3. **Semantic Tokens** - Theme-aware, context-based
   - Surfaces: `--surface-neutral-primary`, `--surface-brand-primary`
   - Text: `--text-neutral-default`, `--text-onsurface-onbrand`
   - Borders: `--border-neutral-default`, `--border-state-focus`
   - Elevation: `--elevation-subtle`, `--elevation-moderate`

4. **Utility Classes** - Direct application in JSX
   - Shadows: `.shadow-1`, `.shadow-2`, `.shadow-3`
   - Border radius: `.border-round`, `.border-round-lg`

## 🛠️ Development Workflow

### For Component Development
1. Use semantic tokens exclusively (never foundation colors)
2. Follow 4px grid for all spacing/radius
3. Test in both light and dark modes
4. Run contrast tests for new color combinations

### For Theme Modifications
1. Update semantic tokens in `semantic-light.css` / `semantic-dark.css`
2. Regenerate analysis reports if needed
3. Test Storybook in both themes
4. Update documentation if architecture changes

## 📊 Testing & Validation

### Contrast Testing
```bash
node scripts/test-contrast.js
```
Tests all semantic color tokens against WCAG 3.0 (APCA) requirements.

### Theme Validation
```bash
node scripts/validate-themes.js
```
Validates theme structure and token consistency.

## 🔄 Regenerating Reports

Analysis reports are gitignored and can be regenerated:

```bash
# Analyze hardcoded colors
node scripts/analyze-hardcoded-colors.js

# Audit foundation variable usage
node scripts/audit-foundation-usage.js

# Generate contrast report
node scripts/test-contrast.js > docs/contrast-report.md
```

## 📁 Project Structure

```
prime-yggdrasil/
├── src/
│   ├── theme/
│   │   ├── README.md              # Theme architecture guide
│   │   ├── foundations.css        # Foundation color palette
│   │   ├── radius.css             # Border radius tokens
│   │   ├── semantic-light.css     # Light mode semantic tokens
│   │   ├── semantic-dark.css      # Dark mode semantic tokens
│   │   ├── prime-palette.css      # PrimeReact color mappings
│   │   └── components.css         # Component styles + utilities
│   ├── blocks/                    # Custom component blocks
│   └── stories/                   # Storybook documentation
├── docs/
│   ├── README.md                  # This file
│   ├── ELEVATION-SYSTEM.md        # Elevation research
│   ├── ELEVATION-IMPLEMENTATION.md
│   ├── contrast-report.md
│   └── scripts/                   # Scripts documentation
└── scripts/
    ├── test-contrast.js           # APCA contrast testing
    ├── validate-themes.js         # Theme validation
    ├── replace-*.js               # Bulk replacement scripts
    └── analyze-*.js               # Analysis scripts
```

## 🎯 Quick Reference

### Common Tasks

**Add a new semantic token:**
1. Add to `semantic-light.css` and `semantic-dark.css`
2. Update theme README if it's a new category
3. Test in Storybook

**Replace hardcoded colors:**
1. Use appropriate replacement script
2. Test components in both themes
3. Run contrast validation

**Update border radius:**
1. Modify `radius.css` tokens
2. Components automatically inherit changes
3. Test responsive layouts

## 🤖 For AI Agents

When working on this project:
- Always use semantic tokens, never foundation colors directly
- Follow the 4px grid for spacing/radius
- Test both light and dark modes
- Check contrast with APCA (WCAG 3.0)
- Update relevant documentation
- Regenerate reports after major changes

## 📝 Version History

See git commit history for detailed changes:
- Border radius system implementation
- Elevation/shadow system with dark mode support
- APCA contrast testing integration
- Semantic token refactoring
