/**
 * Interaction Patterns Rule: State Completeness
 *
 * Enforces that async operations and data-driven components handle all required states:
 * - Loading state
 * - Error state
 * - Empty state
 * - Disabled state (when applicable)
 *
 * Phase 6 - Interaction Patterns Agent
 */

export default {
  name: 'interaction-patterns/state-completeness',
  description: 'Enforce state completeness (loading/error/empty/disabled) for async operations',
  category: 'interaction-patterns',
  severity: 'warning',
  documentation: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/.ai/agents/interaction-patterns.md#1-state-management-patterns',

  validate(fileContent, filePath) {
    const violations = [];

    // Skip non-React/TSX files
    if (!filePath.match(/\.(jsx|tsx|js|ts)$/)) {
      return violations;
    }

    // Pattern 1: Detect async operations (useEffect, fetch, axios, async functions)
    const asyncPatterns = [
      /useEffect\s*\(/g,
      /async\s+function/g,
      /async\s+\(/g,
      /\.then\s*\(/g,
      /await\s+fetch/g,
      /await\s+axios/g,
    ];

    const hasAsyncOperation = asyncPatterns.some(pattern => pattern.test(fileContent));

    if (!hasAsyncOperation) {
      // No async operations, skip validation
      return violations;
    }

    // Pattern 2: Check for state variables that suggest data loading
    const statePatterns = {
      loading: /const\s+\[\s*\w*loading\w*\s*,/gi,
      error: /const\s+\[\s*\w*error\w*\s*,/gi,
      data: /const\s+\[\s*\w*(data|items|users|records)\w*\s*,/gi,
    };

    const hasLoadingState = statePatterns.loading.test(fileContent);
    const hasErrorState = statePatterns.error.test(fileContent);
    const hasDataState = statePatterns.data.test(fileContent);

    // Pattern 3: Detect DataTable, List, or other data-driven components
    const dataComponents = [
      'DataTable',
      'DataView',
      'Tree',
      'TreeTable',
      'OrderList',
      'PickList',
    ];

    const hasDataComponent = dataComponents.some(component =>
      fileContent.includes(`<${component}`)
    );

    // Violation detection
    if (hasAsyncOperation || hasDataComponent) {
      const missingStates = [];

      if (!hasLoadingState) {
        missingStates.push('loading');
      }

      if (!hasErrorState) {
        missingStates.push('error');
      }

      // Check for empty state handling (conditional rendering when data is empty)
      const hasEmptyCheck = /\.length\s*===\s*0/.test(fileContent) ||
                           /\.length\s*<\s*1/.test(fileContent) ||
                           /!.*\.length/.test(fileContent);

      if (hasDataState && !hasEmptyCheck) {
        missingStates.push('empty');
      }

      if (missingStates.length > 0) {
        violations.push({
          line: 1, // Could be improved with AST parsing for exact line
          column: 1,
          message: `Missing state handling: ${missingStates.join(', ')}`,
          severity: 'warning',
          rule: this.name,
          suggestion: this.getSuggestion(missingStates),
        });
      }
    }

    // Pattern 4: Check for proper conditional rendering of states
    if (hasLoadingState) {
      const hasLoadingRender = fileContent.includes('loading') &&
                               (fileContent.includes('ProgressSpinner') ||
                                fileContent.includes('Skeleton') ||
                                fileContent.includes('loading={'));

      if (!hasLoadingRender) {
        violations.push({
          line: 1,
          column: 1,
          message: 'Loading state defined but not rendered. Add <ProgressSpinner /> or loading indicator.',
          severity: 'warning',
          rule: this.name,
          suggestion: 'if (loading) return <ProgressSpinner />;',
        });
      }
    }

    if (hasErrorState) {
      const hasErrorRender = fileContent.includes('error') &&
                            (fileContent.includes('Message') ||
                             fileContent.includes('InlineMessage') ||
                             fileContent.includes('Toast'));

      if (!hasErrorRender) {
        violations.push({
          line: 1,
          column: 1,
          message: 'Error state defined but not rendered. Add <Message severity="error" /> or error display.',
          severity: 'warning',
          rule: this.name,
          suggestion: 'if (error) return <Message severity="error" text="Unable to load data. Try again." />;',
        });
      }
    }

    return violations;
  },

  getSuggestion(missingStates) {
    const suggestions = {
      loading: 'Add: const [loading, setLoading] = useState(false);',
      error: 'Add: const [error, setError] = useState(null);',
      empty: 'Add empty state check: if (data.length === 0) return <EmptyState />;',
    };

    return missingStates.map(state => suggestions[state]).join('\n');
  },

  autofix(fileContent, violation) {
    // Basic autofix: Add state variable declarations at the beginning of the component

    if (violation.message.includes('Missing state handling')) {
      const missingStates = violation.message.match(/: (.+)$/)[1].split(', ');

      let additions = [];

      if (missingStates.includes('loading')) {
        additions.push("const [loading, setLoading] = useState(false);");
      }

      if (missingStates.includes('error')) {
        additions.push("const [error, setError] = useState(null);");
      }

      // Find the first function component or class component
      const componentMatch = fileContent.match(/(function|const)\s+\w+.*\{/);

      if (componentMatch) {
        const insertPosition = componentMatch.index + componentMatch[0].length;
        const indentation = '  ';

        const fixedContent =
          fileContent.slice(0, insertPosition) +
          '\n' + additions.map(line => indentation + line).join('\n') +
          fileContent.slice(insertPosition);

        return {
          fixed: true,
          content: fixedContent,
          message: `Added missing state declarations: ${missingStates.join(', ')}`,
        };
      }
    }

    return {
      fixed: false,
      message: 'Manual fix required. See suggestion in violation message.',
    };
  },
};
