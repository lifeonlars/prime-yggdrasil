/**
 * Accessibility Rules
 *
 * Phase 6 - WCAG 2.1 AA compliance enforcement
 *
 * All rules enforce patterns from .ai/agents/accessibility.md
 */

import missingAltText from './missing-alt-text.js';
import missingFormLabels from './missing-form-labels.js';

export default {
  'accessibility/missing-alt-text': missingAltText,
  'accessibility/missing-form-labels': missingFormLabels,
};
