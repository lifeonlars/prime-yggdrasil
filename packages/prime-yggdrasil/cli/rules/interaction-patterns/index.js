/**
 * Interaction Patterns Rules
 *
 * Phase 6 - Behavioral consistency enforcement
 *
 * All rules enforce patterns from .ai/agents/interaction-patterns.md
 */

import stateCompleteness from './state-completeness.js';
import genericCopy from './generic-copy.js';
import focusManagement from './focus-management.js';

export default {
  'interaction-patterns/state-completeness': stateCompleteness,
  'interaction-patterns/generic-copy': genericCopy,
  'interaction-patterns/focus-management': focusManagement,
};
