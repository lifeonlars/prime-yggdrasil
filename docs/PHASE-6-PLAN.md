# Phase 6 Implementation Plan: Interaction Patterns & Accessibility Agents

**Goal:** Integrate Interaction Patterns and Accessibility agents into active enforcement (CLI validation + ESLint plugin)

**Status:** 🚀 In Progress
**Timeline:** 3-4 weeks
**Current Version:** 0.3.0 → Target: 0.4.0

---

## Overview

Phase 6 activates the final 2 agents from specification to enforcement:

1. **Interaction Patterns Agent** - Behavioral consistency (empty/loading/error, form validation, confirmations, focus management)
2. **Accessibility Agent** - WCAG 2.1 AA compliance (contrast, ARIA, keyboard navigation, semantic HTML)

Both agents currently have complete specifications (`.ai/agents/*.md`) but are marked as "future" and not yet integrated into CLI/ESLint validation.

---

## Implementation Strategy

### Dual Integration Approach

**CLI Validation Rules** (Deeper Analysis)
- State completeness checks (loading/empty/error/disabled states)
- Copy tone analysis (generic vs. specific button labels)
- Contrast ratio validation (APCA calculations)
- ARIA attribute validation
- Keyboard navigation patterns

**ESLint Rules** (Code-Time Detection)
- Missing state handlers (no loading/error states)
- Generic copy patterns (`label="Submit"`, `label="OK"`)
- Missing ARIA labels on icon-only buttons
- Color-only indicators (no icon/text fallback)
- Invalid focus management

---

## Phase 6 Breakdown

### Week 1: CLI Validation Rules (Interaction Patterns)

**Goal:** Add 5 interaction pattern validation rules to CLI

**Rules to Implement:**

1. **`interaction-patterns/state-completeness`**
   - Detects missing states in async operations
   - Checks for: loading, error, empty states
   - Example violation: `<DataTable value={data} />` without loading/error handling

2. **`interaction-patterns/generic-copy`**
   - Detects generic button labels ("Submit", "OK", "Cancel")
   - Suggests specific alternatives ("Save Changes", "Delete Item")
   - Example violation: `<Button label="Submit" />`

3. **`interaction-patterns/confirmation-overuse`**
   - Flags confirmations on non-destructive actions
   - Example violation: `confirm('Save changes?')`

4. **`interaction-patterns/feedback-mechanism`**
   - Validates Toast vs Message vs Banner usage
   - Checks for appropriate duration and severity
   - Example violation: Using Toast for persistent errors

5. **`interaction-patterns/focus-management`**
   - Validates Dialog/Modal focus patterns
   - Checks for autoFocus on first field
   - Example violation: Dialog without focus management

**Implementation Files:**
- `cli/rules/interaction-patterns/state-completeness.js`
- `cli/rules/interaction-patterns/generic-copy.js`
- `cli/rules/interaction-patterns/confirmation-overuse.js`
- `cli/rules/interaction-patterns/feedback-mechanism.js`
- `cli/rules/interaction-patterns/focus-management.js`

---

### Week 2: CLI Validation Rules (Accessibility)

**Goal:** Add 6 accessibility validation rules to CLI

**Rules to Implement:**

1. **`accessibility/missing-alt-text`**
   - Detects images without alt attributes
   - Checks icon-only buttons for aria-label
   - Example violation: `<img src="chart.png" />`

2. **`accessibility/contrast-ratio`**
   - Validates text/surface contrast ratios (APCA)
   - Minimum: 4.5:1 (normal text), 3:1 (large text)
   - Example violation: Light gray text on white background

3. **`accessibility/color-only-indicator`**
   - Detects status indicators using only color
   - Suggests adding icons/text
   - Example violation: `<span style={{color: 'red'}}>Error</span>`

4. **`accessibility/missing-form-labels`**
   - Detects form inputs without labels
   - Validates htmlFor/id associations
   - Example violation: `<InputText />` without label

5. **`accessibility/keyboard-navigation`**
   - Validates interactive elements are keyboard accessible
   - Checks for onClick without onKeyDown on divs
   - Example violation: `<div onClick={handleClick}>Click</div>`

6. **`accessibility/aria-validation`**
   - Validates ARIA attributes and roles
   - Checks for aria-describedby/aria-invalid on errors
   - Example violation: Error message not linked to input

**Implementation Files:**
- `cli/rules/accessibility/missing-alt-text.js`
- `cli/rules/accessibility/contrast-ratio.js`
- `cli/rules/accessibility/color-only-indicator.js`
- `cli/rules/accessibility/missing-form-labels.js`
- `cli/rules/accessibility/keyboard-navigation.js`
- `cli/rules/accessibility/aria-validation.js`

---

### Week 3: ESLint Plugin Rules

**Goal:** Create ESLint rules for code-time detection

**ESLint Rules (11 New Rules):**

**Interaction Patterns (5 rules):**
- `@lifeonlars/yggdrasil/interaction-patterns/require-states` - Enforce state completeness
- `@lifeonlars/yggdrasil/interaction-patterns/no-generic-copy` - Ban generic button labels
- `@lifeonlars/yggdrasil/interaction-patterns/no-unnecessary-confirm` - Prevent confirmation overuse
- `@lifeonlars/yggdrasil/interaction-patterns/feedback-pattern` - Validate Toast/Message/Banner usage
- `@lifeonlars/yggdrasil/interaction-patterns/focus-trap` - Validate Dialog focus management

**Accessibility (6 rules):**
- `@lifeonlars/yggdrasil/accessibility/require-alt` - Enforce alt text on images
- `@lifeonlars/yggdrasil/accessibility/icon-button-label` - Require aria-label on icon-only buttons
- `@lifeonlars/yggdrasil/accessibility/color-cue` - Prevent color-only indicators
- `@lifeonlars/yggdrasil/accessibility/form-label` - Require labels on form inputs
- `@lifeonlars/yggdrasil/accessibility/keyboard-handler` - Require keyboard handlers on interactive divs
- `@lifeonlars/yggdrasil/accessibility/aria-describedby` - Link error messages to inputs

**Implementation Files:**
- `eslint-plugin-yggdrasil/rules/interaction-patterns/*.js` (5 files)
- `eslint-plugin-yggdrasil/rules/accessibility/*.js` (6 files)
- Update `eslint-plugin-yggdrasil/configs/recommended.js` (add rules as warnings)
- Update `eslint-plugin-yggdrasil/configs/strict.js` (add rules as errors)

---

### Week 4: Integration & Documentation

**Tasks:**

1. **Update Agent Status**
   - Change status from "🚧 Phase 6 (Future)" to "✅ Active"
   - Update `.ai/agents/interaction-patterns.md`
   - Update `.ai/agents/accessibility.md`

2. **Update README.md**
   - Move Interaction Patterns and Accessibility to "Active Agents" section
   - Update enforcement stats (18 ESLint rules, 16 CLI validation rules)
   - Add Phase 6 completion notice

3. **Update AESTHETICS.md**
   - Change agent status from "(future)" to active
   - Update enforcement stats

4. **Create Testing Guide**
   - `docs/TESTING-GUIDE.md` - How to test interaction patterns and accessibility
   - Include manual testing checklists
   - Add automated testing examples

5. **Update CLI Help**
   - Add new rule descriptions to `--help` output
   - Update examples with new rules

6. **Create Migration Guide**
   - `docs/PHASE-6-MIGRATION.md` - How to adopt new rules
   - Include autofix strategies
   - Add common violations and fixes

---

## Technical Implementation Details

### CLI Validation Architecture

**Rule Structure:**
```javascript
// cli/rules/interaction-patterns/state-completeness.js
export default {
  name: 'interaction-patterns/state-completeness',
  description: 'Enforce state completeness (loading/error/empty/disabled)',
  category: 'interaction-patterns',
  severity: 'warning',

  validate(fileContent, filePath) {
    const violations = [];

    // AST parsing to detect async operations without state handling
    // Check for: useEffect, fetch, axios, async functions
    // Ensure: loading state, error state, empty state

    return violations;
  },

  autofix(fileContent, violation) {
    // Generate boilerplate state handling code
    return {
      fixed: true,
      content: updatedContent,
      message: 'Added loading/error/empty state handling'
    };
  }
};
```

**Validation Engine Updates:**
```javascript
// cli/commands/validate.js
import interactionPatternsRules from '../rules/interaction-patterns/index.js';
import accessibilityRules from '../rules/accessibility/index.js';

const allRules = {
  ...existingRules,
  ...interactionPatternsRules,
  ...accessibilityRules
};
```

### ESLint Rule Architecture

**Rule Structure:**
```javascript
// eslint-plugin-yggdrasil/rules/interaction-patterns/no-generic-copy.js
export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce specific button labels over generic ones',
      category: 'Interaction Patterns',
      recommended: true
    },
    messages: {
      genericLabel: 'Button label "{{label}}" is too generic. Use specific action like "Save Changes" or "Delete Item".'
    },
    schema: []
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name === 'Button') {
          const labelAttr = node.attributes.find(attr => attr.name?.name === 'label');
          if (labelAttr) {
            const labelValue = labelAttr.value.value;
            const genericLabels = ['Submit', 'OK', 'Cancel', 'Continue'];

            if (genericLabels.includes(labelValue)) {
              context.report({
                node: labelAttr,
                messageId: 'genericLabel',
                data: { label: labelValue }
              });
            }
          }
        }
      }
    };
  }
};
```

### Contrast Validation (APCA Integration)

**Implementation:**
```javascript
// cli/rules/accessibility/contrast-ratio.js
import { APCAcontrast, sRGBtoY } from 'apca-w3';

export default {
  name: 'accessibility/contrast-ratio',

  validate(fileContent, filePath) {
    // Parse CSS custom properties usage
    // Extract color pairings (text on surface)
    // Calculate APCA contrast
    // Flag violations < Lc 60 (body text) or < Lc 75 (subtitles)

    const violations = [];
    const colorPairings = extractColorPairings(fileContent);

    colorPairings.forEach(pairing => {
      const contrast = APCAcontrast(
        sRGBtoY(pairing.text),
        sRGBtoY(pairing.surface)
      );

      if (Math.abs(contrast) < 60) {
        violations.push({
          line: pairing.line,
          message: `Insufficient contrast (Lc ${contrast.toFixed(1)}). Minimum Lc 60 required for body text.`,
          suggestion: `Use higher contrast token pairing`
        });
      }
    });

    return violations;
  }
};
```

---

## Testing Strategy

### Unit Tests
- Each CLI rule has comprehensive test suite
- Each ESLint rule has test cases covering violations and valid patterns
- Test both light and dark mode scenarios

### Integration Tests
- CLI validate/audit commands with Phase 6 rules enabled
- ESLint plugin with recommended/strict configs
- Autofix capability testing

### Manual Testing
- Apply rules to sample consumer project
- Verify violation detection accuracy
- Test autofix suggestions
- Validate false positive rate

---

## Success Metrics

**Adoption:**
- Number of Phase 6 rule violations detected in sample projects
- Autofix success rate
- Developer feedback on rule usefulness

**Code Quality:**
- Reduction in missing state handlers
- Reduction in generic copy usage
- Reduction in accessibility violations
- Improved WCAG 2.1 AA compliance scores

**Developer Experience:**
- Faster accessibility compliance
- Clearer interaction pattern guidance
- Better error messages and suggestions

---

## Risk Mitigation

**Risk 1: High False Positive Rate**
- Mitigation: Conservative rule thresholds in recommended config
- Start with warnings, not errors
- Provide clear opt-out mechanism per rule

**Risk 2: Performance Impact**
- Mitigation: Optimize AST parsing and analysis
- Cache validation results
- Provide `--rules` flag to run subset of rules

**Risk 3: Breaking Changes**
- Mitigation: Mark as minor version (0.4.0, not 1.0.0)
- All rules default to warnings in recommended config
- Clear migration guide with autofix strategies

---

## Deliverables

### Code Artifacts
- 11 CLI validation rule implementations
- 11 ESLint rule implementations
- Updated CLI commands (validate/audit)
- Updated ESLint plugin (recommended/strict configs)

### Documentation
- Updated agent status (interaction-patterns.md, accessibility.md)
- Updated README.md (Active Agents section)
- Updated AESTHETICS.md (agent responsibilities)
- New: `docs/TESTING-GUIDE.md`
- New: `docs/PHASE-6-MIGRATION.md`

### Publishing
- Version 0.4.0 release
- npm publish for main package
- npm publish for ESLint plugin (separate package)

---

## Timeline Summary

| Week | Focus | Deliverables |
|------|-------|--------------|
| Week 1 | Interaction Patterns CLI Rules | 5 CLI validation rules |
| Week 2 | Accessibility CLI Rules | 6 CLI validation rules |
| Week 3 | ESLint Plugin Rules | 11 ESLint rules + config updates |
| Week 4 | Integration & Docs | Agent status updates, README, testing guide, migration guide, v0.4.0 release |

**Total Timeline: 4 weeks**

---

## Next Steps to Begin Implementation

### Immediate Next Step: Week 1 - Interaction Patterns CLI Rules

Start with **`cli/rules/interaction-patterns/state-completeness.js`** - the highest impact rule.

This rule needs:
1. AST parser to detect async operations (useEffect, fetch, axios)
2. State variable detection (useState, useReducer)
3. Violation detection: async operation without loading/error/empty states
4. Autofix strategy: generate boilerplate state handling
5. Test suite with valid/invalid examples

**File Structure to Create:**
```
cli/
├── rules/
│   ├── interaction-patterns/
│   │   ├── index.js                    # Export all interaction pattern rules
│   │   ├── state-completeness.js       # ⭐ Start here
│   │   ├── generic-copy.js
│   │   ├── confirmation-overuse.js
│   │   ├── feedback-mechanism.js
│   │   └── focus-management.js
│   └── accessibility/
│       ├── index.js                    # Export all accessibility rules
│       ├── missing-alt-text.js
│       ├── contrast-ratio.js
│       ├── color-only-indicator.js
│       ├── missing-form-labels.js
│       ├── keyboard-navigation.js
│       └── aria-validation.js
```

Once state-completeness is implemented, the pattern applies to all other rules.

---

**Status:** 📋 Plan Complete - Ready for Implementation
**Last Updated:** 2026-01-11
