# Semantic Token Migration Plan

**Generated:** 2026-01-04
**Status:** In Progress
**Total Hardcoded Colors:** 755
**Components Affected:** 67

## Migration Strategy

### Phase 1: High-Impact Components (Priority)
Components with most hardcoded colors that are commonly used:

1. **Button** (72 colors) - ⚠️ CRITICAL - Most used component
2. **DataTable** (32 colors) - ⚠️ HIGH - Complex data display
3. **Menu Components** (166 colors total across 6 menu types)
   - Menubar (49)
   - Megamenu (47)
   - Menu (20)
   - Slidemenu (20)
   - Tieredmenu (19)
   - Contextmenu (17)

### Phase 2: Form & Input Components
4. **Dropdown/Select Components** (31 colors)
   - TreeSelect (19)
   - CascadeSelect (12)
5. **Lists & Selection** (46 colors)
   - Listbox (16)
   - OrderList (16)
   - PickList (14)
6. **Date/Time** (22 colors)
   - DatePicker (22)
7. **Autocomplete** (8 colors)

### Phase 3: Navigation & Layout
8. **Accordion** (15 colors)
9. **TabView** (13 colors)
10. **Panel Components** (22 colors)
    - Panel (12)
    - Fieldset (10)
11. **Stepper** (12 colors)
12. **TabMenu** (10 colors)
13. **Breadcrumb** (7 colors)

### Phase 4: Data Display
14. **TreeTable** (28 colors)
15. **Tree** (13 colors)
16. **DataView** (8 colors)
17. **DataScroller** (9 colors)
18. **Galleria** (9 colors)
19. **Carousel** (5 colors)
20. **Timeline** (2 colors)

### Phase 5: Misc Components
21. **SplitButton** (23 colors)
22. **PanelMenu** (30 colors)
23. **OrganizationChart** (11 colors)
24. **ToggleButton** (13 colors)
25. **OverlayPanel** (8 colors)
26. **Remaining** (< 10 colors each)

## Required Semantic Tokens

Based on analysis, we need to ensure these semantic tokens exist:

### Button Variants
- `--button-primary-background`
- `--button-primary-text`
- `--button-primary-border`
- `--button-primary-hover-background`
- `--button-primary-active-background`
- `--button-secondary-*` (full set)
- `--button-help-*` (full set - purple variant)
- `--button-contrast-*` (full set - dark variant)
- `--button-outlined-*` (full set)
- `--button-text-*` (full set)

### Menu/Navigation
- `--menu-background`
- `--menu-item-background`
- `--menu-item-hover-background`
- `--menu-item-active-background`
- `--menu-text-default`
- `--menu-text-hover`
- `--menu-separator-border`

### Data Display
- `--table-header-background`
- `--table-header-text`
- `--table-row-background`
- `--table-row-alt-background` (striping)
- `--table-row-hover-background`
- `--table-row-selected-background`
- `--table-cell-border`

### Form Controls (extend existing)
- Need to verify all input states are covered
- Add any missing variant tokens

## Migration Workflow

### For Each Component:

1. **Analyze** - Review hardcoded colors in context
2. **Map** - Create semantic token mappings
3. **Add Tokens** - Add any missing tokens to both semantic-light.css and semantic-dark.css
4. **Replace** - Use targeted replacement script
5. **Test** - Verify in Storybook (light + dark)
6. **Contrast** - Run APCA tests for new tokens
7. **Document** - Update if new token categories added

### Example: Button Migration

```css
/* BEFORE */
.p-button {
  background: #3b82f6;
  color: #ffffff;
}

/* AFTER */
.p-button {
  background: var(--button-primary-background);
  color: var(--button-primary-text);
}
```

## Current Status

### ✅ Completed Components
- Dialog
- Checkbox
- RadioButton
- Card (partial - uses semantic tokens)

### 🚧 In Progress
- None currently

### 📋 Next Up
1. Button (highest priority)
2. Menu components (second highest)
3. DataTable

## Token Addition Checklist

When adding new semantic tokens:

1. ☐ Add to `semantic-light.css`
2. ☐ Add to `semantic-dark.css`
3. ☐ Test contrast (APCA)
4. ☐ Document in theme README if new category
5. ☐ Update this migration plan

## Estimated Completion

- **Phase 1:** 3-4 sessions (~270 colors)
- **Phase 2:** 2-3 sessions (~107 colors)
- **Phase 3:** 2 sessions (~79 colors)
- **Phase 4:** 2 sessions (~89 colors)
- **Phase 5:** 2-3 sessions (~210 colors)

**Total:** 11-15 focused sessions

## Success Metrics

- ✅ All 755 hardcoded colors replaced
- ✅ 100% APCA contrast pass rate maintained
- ✅ Full dark mode support for all components
- ✅ Consistent theming across component library

## Notes for AI Agents

- Always work on one component at a time
- Test thoroughly in both themes before moving on
- Maintain contrast requirements
- Follow existing naming patterns for tokens
- Update this document after each component completion
