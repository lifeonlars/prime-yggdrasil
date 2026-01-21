/**
 * Interaction Patterns Rule: Focus Management
 *
 * Validates proper focus management in Dialogs, Modals, and form flows.
 * Ensures keyboard navigation works correctly and focus is trapped/returned appropriately.
 *
 * Phase 6 - Interaction Patterns Agent
 */

export default {
  name: 'interaction-patterns/focus-management',
  description: 'Validate Dialog/Modal focus patterns and keyboard navigation',
  category: 'interaction-patterns',
  severity: 'warning',
  documentation: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/.ai/agents/interaction-patterns.md#5-focus-management',

  validate(fileContent, filePath) {
    const violations = [];

    // Skip non-React/TSX files
    if (!filePath.match(/\.(jsx|tsx|js|ts)$/)) {
      return violations;
    }

    // Pattern 1: Check Dialog components for focus management
    const dialogRegex = /<Dialog[^>]*>/g;
    let match;

    while ((match = dialogRegex.exec(fileContent)) !== null) {
      const dialogStart = match.index;
      const dialogEnd = fileContent.indexOf('</Dialog>', dialogStart);

      if (dialogEnd === -1) continue;

      const dialogContent = fileContent.substring(dialogStart, dialogEnd);
      const line = this.getLineNumber(fileContent, dialogStart);

      // Check 1: Dialog should have modal prop (focus trap)
      if (!dialogContent.includes('modal')) {
        violations.push({
          line,
          column: 1,
          message: 'Dialog missing modal prop. Add modal={true} to trap focus within dialog.',
          severity: 'warning',
          rule: this.name,
          suggestion: '<Dialog visible={visible} onHide={onHide} modal>',
        });
      }

      // Check 2: First interactive element should have autoFocus
      const hasAutoFocus = /autoFocus/.test(dialogContent);
      const hasInteractiveElement = /(<InputText|<Button|<Dropdown|<Calendar|<Checkbox)/.test(dialogContent);

      if (hasInteractiveElement && !hasAutoFocus) {
        violations.push({
          line,
          column: 1,
          message: 'Dialog first interactive element should have autoFocus for keyboard navigation.',
          severity: 'info',
          rule: this.name,
          suggestion: '<InputText autoFocus /> // First field in dialog',
        });
      }

      // Check 3: Dialog should have onHide handler (ESC key support)
      if (!dialogContent.includes('onHide')) {
        violations.push({
          line,
          column: 1,
          message: 'Dialog missing onHide handler. Required for ESC key support.',
          severity: 'error',
          rule: this.name,
          suggestion: '<Dialog visible={visible} onHide={() => setVisible(false)}>',
        });
      }
    }

    // Pattern 2: Check for interactive divs without keyboard handlers
    const interactiveDivRegex = /<div[^>]*onClick[^>]*>/g;

    while ((match = interactiveDivRegex.exec(fileContent)) !== null) {
      const divTag = match[0];
      const line = this.getLineNumber(fileContent, match.index);

      // Check if div has keyboard handlers
      const hasKeyboard = divTag.includes('onKeyDown') || divTag.includes('onKeyPress');
      const hasRole = divTag.includes('role="button"') || divTag.includes('role=\\"button\\"');
      const hasTabIndex = divTag.includes('tabIndex');

      if (!hasKeyboard || !hasRole || !hasTabIndex) {
        violations.push({
          line,
          column: 1,
          message: 'Interactive div must have role="button", tabIndex, and keyboard handlers (onKeyDown).',
          severity: 'error',
          rule: this.name,
          suggestion: this.getKeyboardHandlerSuggestion(),
        });
      }
    }

    // Pattern 3: Check form fields for logical tab order
    const formRegex = /<form[^>]*>/g;

    while ((match = formRegex.exec(fileContent)) !== null) {
      const formStart = match.index;
      const formEnd = fileContent.indexOf('</form>', formStart);

      if (formEnd === -1) continue;

      const formContent = fileContent.substring(formStart, formEnd);
      const line = this.getLineNumber(fileContent, formStart);

      // Check for explicit tabIndex that might break natural order
      const explicitTabIndex = /tabIndex=\{?(\d+)\}?/.exec(formContent);

      if (explicitTabIndex && parseInt(explicitTabIndex[1]) > 0) {
        violations.push({
          line: line + this.getLineNumber(formContent, explicitTabIndex.index),
          column: 1,
          message: 'Avoid positive tabIndex values. Use natural DOM order or tabIndex={0} for custom elements.',
          severity: 'warning',
          rule: this.name,
          suggestion: 'Remove tabIndex or use tabIndex={0} for same-level focus order.',
        });
      }
    }

    // Pattern 4: Check for custom focus styles
    const hasFocusStyles = /:focus/.test(fileContent) || /focus-visible/.test(fileContent);
    const hasInteractiveComponents = /<(Button|InputText|Dropdown|Calendar)/.test(fileContent);

    if (hasInteractiveComponents && fileContent.includes('outline: none') && !hasFocusStyles) {
      const line = this.getLineNumber(fileContent, fileContent.indexOf('outline: none'));

      violations.push({
        line,
        column: 1,
        message: 'Removing outline without custom focus styles breaks keyboard navigation visibility.',
        severity: 'error',
        rule: this.name,
        suggestion: 'Replace with: boxShadow: "0 0 0 2px var(--border-state-focus)"',
      });
    }

    return violations;
  },

  getKeyboardHandlerSuggestion() {
    return `
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleClick()}
>
  Click me
</div>`;
  },

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  },

  autofix(fileContent, violation) {
    if (violation.message.includes('Dialog missing modal prop')) {
      const dialogRegex = /<Dialog([^>]*)>/;
      const match = dialogRegex.exec(fileContent);

      if (match) {
        const dialogTag = match[0];
        const fixedTag = dialogTag.replace('<Dialog', '<Dialog modal');

        return {
          fixed: true,
          content: fileContent.replace(dialogTag, fixedTag),
          message: 'Added modal prop to Dialog',
        };
      }
    }

    return {
      fixed: false,
      message: 'Manual fix required. See suggestion in violation message.',
    };
  },
};
