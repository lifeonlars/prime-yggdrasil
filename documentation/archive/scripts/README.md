# Theme Scripts Documentation

This directory documents all scripts used for theme development, analysis, and maintenance.

## 🔄 Active Scripts

### Contrast Testing
**`test-contrast.js`**
- Tests all semantic color tokens against WCAG 3.0 (APCA) requirements
- Generates contrast report showing pass/fail for each color combination
- Usage: `node scripts/test-contrast.js`
- Output: Can be redirected to `docs/contrast-report.md`

### Theme Validation
**`validate-themes.js`**
- Validates theme structure and token consistency
- Checks that all semantic tokens are defined in both light and dark themes
- Ensures proper CSS structure
- Usage: `node scripts/validate-themes.js`

### Border Radius Replacement
**`replace-border-radius.cjs`**
- Replaces hardcoded border-radius values with semantic tokens
- Follows 4px grid system (6px → 8px, 10px → 12px, etc.)
- Usage: `node scripts/replace-border-radius.cjs`
- Target: `src/theme/components.css`

### Shadow Replacement
**`replace-shadows.js`**
- Replaces hardcoded box-shadow values with elevation tokens
- Maps shadows to 4 elevation levels
- Usage: `node scripts/replace-shadows.js`
- Target: `src/theme/components.css`

### Foundation Variable Analysis
**`audit-foundation-usage.js`**
- Finds direct usage of foundation variables in components
- Foundation vars should only be used in semantic token definitions
- Generates audit report showing where replacements are needed
- Usage: `node scripts/audit-foundation-usage.js`

### Hardcoded Color Analysis
**`analyze-hardcoded-colors.js`**
- Scans for hardcoded hex/rgb color values
- Identifies which components need semantic token migration
- Groups by component for easier refactoring
- Usage: `node scripts/analyze-hardcoded-colors.js`

### Foundation Variable Replacement
**`replace-foundation-vars.js`**
- Replaces foundation variable usage with semantic tokens
- Uses mappings from `color-mappings.json`
- Usage: `node scripts/replace-foundation-vars.js`

### Component Color Fixing
**`fix-component-colors.js`**
- Targeted color replacement for specific components
- Uses context-aware semantic token selection
- Usage: `node scripts/fix-component-colors.js`

## 📦 Deprecated/Historical Scripts

These scripts were used during initial theme migration and are kept for reference:

### `build-yggdrasil-themes.cjs`
- Original theme generation script
- **Status:** Replaced by manual semantic token approach

### `comprehensive-semantic-fix.cjs`
- Early attempt at comprehensive semantic token migration
- **Status:** Superseded by component-specific scripts

### `extract-theme-final.cjs`
- Theme extraction from original Lara theme
- **Status:** Historical, initial setup only

### `extract-theme-structure.cjs` & `extract-theme-structure-v2.cjs`
- Analysis scripts for understanding theme structure
- **Status:** Historical analysis

### `fix-semantic-mappings.cjs`
- Early semantic mapping attempts
- **Status:** Superseded by color-mappings.json approach

### `refactor-theme-variables.cjs`
- Large-scale variable refactoring
- **Status:** Completed, kept for reference

### `replace-hardcoded-colors.cjs`
- Simple find-replace for colors
- **Status:** Superseded by analyze + targeted fix approach

## 🗺️ Data Files

### `color-mappings.json`
Maps foundation variables to semantic tokens with context:
```json
{
  "--foundation-sky-600": {
    "default": "--surface-brand-secondary",
    "text": "--text-state-interactive",
    "border": "--border-state-focus"
  }
}
```

## 🔧 Common Workflows

### Analyzing Color Usage
1. Run `analyze-hardcoded-colors.js` to find hex colors
2. Run `audit-foundation-usage.js` to find foundation vars
3. Review reports to identify components needing fixes

### Bulk Replacements
1. Create/update color-mappings.json with semantic mappings
2. Run appropriate replacement script
3. Test in Storybook (both light and dark modes)
4. Run contrast tests to validate

### Adding New Semantic Tokens
1. Add tokens to both semantic-light.css and semantic-dark.css
2. Update color-mappings.json if needed for replacements
3. Run validation script
4. Test contrast with test-contrast.js

## 📊 Report Files

Reports are generated in root directory but gitignored:
- `hardcoded-colors-analysis.md` - Hex color usage
- `foundation-usage-audit.md` - Foundation variable usage
- `contrast-report.md` - APCA contrast results (kept in docs/)

To regenerate:
```bash
node scripts/analyze-hardcoded-colors.js > hardcoded-colors-analysis.md
node scripts/audit-foundation-usage.js > foundation-usage-audit.md
node scripts/test-contrast.js > docs/contrast-report.md
```

## 🎯 Best Practices

### When Creating New Scripts
1. Use descriptive names: `action-target.js` or `analyze-thing.js`
2. Add header comment explaining purpose
3. Target specific files, don't modify blindly
4. Create backup or use git before running
5. Document in this README

### Script Naming Convention
- `analyze-*.js` - Read and report on code
- `audit-*.js` - Check for issues/compliance
- `replace-*.js` - Find and replace operations
- `fix-*.js` - Targeted corrections
- `validate-*.js` - Verify correctness
- `test-*.js` - Run tests

### Safety Checklist
- ✅ Does it backup or is git clean?
- ✅ Does it target specific files?
- ✅ Does it validate changes?
- ✅ Can changes be reviewed before commit?

## 🤖 For AI Agents

When creating or modifying scripts:
1. Follow naming conventions above
2. Add descriptive header comment
3. Use appropriate error handling
4. Output to console or file (not both)
5. Make scripts idempotent when possible
6. Update this documentation
7. Test on small subset first

When running scripts:
1. Check git status (should be clean)
2. Understand what the script does
3. Review output/changes
4. Test in Storybook
5. Run validation/contrast tests
6. Commit with descriptive message
