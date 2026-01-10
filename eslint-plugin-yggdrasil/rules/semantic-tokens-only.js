/**
 * @fileoverview Prevent custom CSS that overrides theme tokens
 * @author Lars Farstad
 */

/**
 * Rule: semantic-tokens-only
 *
 * App code MUST use semantic tokens, NOT foundation tokens or hardcoded values.
 *
 * Forbidden:
 * - Foundation tokens: var(--blue-500), var(--gray-100)
 * - Raw values: #f0f0f0, 16px, rgba(0,0,0,0.5)
 * - Custom properties: var(--my-custom-color)
 *
 * Required:
 * - Semantic tokens: var(--surface-neutral-primary), var(--text-neutral-default)
 *
 * Examples:
 *
 * ❌ BAD:
 * <div style={{ background: 'var(--blue-500)' }}>
 * <div style={{ color: 'var(--gray-900)' }}>
 * <div style={{ borderColor: 'var(--my-border)' }}>
 *
 * ✅ GOOD:
 * <div style={{ background: 'var(--surface-brand-primary)' }}>
 * <div style={{ color: 'var(--text-neutral-default)' }}>
 * <div style={{ borderColor: 'var(--border-neutral-default)' }}>
 */

// Foundation token patterns (color palette)
const FOUNDATION_TOKEN_PATTERNS = [
  // PrimeReact palette colors
  /^--blue-\d+$/,
  /^--green-\d+$/,
  /^--yellow-\d+$/,
  /^--cyan-\d+$/,
  /^--pink-\d+$/,
  /^--indigo-\d+$/,
  /^--teal-\d+$/,
  /^--orange-\d+$/,
  /^--bluegray-\d+$/,
  /^--purple-\d+$/,
  /^--red-\d+$/,
  /^--gray-\d+$/,

  // Generic palette patterns
  /^--(primary|secondary|success|info|warning|danger)-\d+$/
];

// Semantic token prefixes (allowed)
const SEMANTIC_TOKEN_PREFIXES = [
  '--surface-',
  '--text-',
  '--border-',
  '--icon-',
  '--elevation-',
  '--radius-',
  '--font-size-',
  '--font-weight-',
  '--line-height-',
  '--letter-spacing-'
];

/**
 * Check if a CSS variable is a foundation token
 */
function isFoundationToken(varName) {
  if (!varName.startsWith('--')) return false;

  return FOUNDATION_TOKEN_PATTERNS.some(pattern => pattern.test(varName));
}

/**
 * Check if a CSS variable is a semantic token
 */
function isSemanticToken(varName) {
  if (!varName.startsWith('--')) return false;

  return SEMANTIC_TOKEN_PREFIXES.some(prefix => varName.startsWith(prefix));
}

/**
 * Extract CSS variable name from var() function
 */
function extractVarName(value) {
  if (typeof value !== 'string') return null;

  const match = value.match(/var\((--[a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
}

/**
 * Get suggested semantic token for a foundation token
 */
function getSuggestedSemanticToken(foundationToken, propertyName) {
  const property = propertyName.toLowerCase();

  // Color mappings
  if (foundationToken.includes('blue') || foundationToken.includes('primary')) {
    if (property.includes('background')) return 'var(--surface-brand-primary)';
    if (property === 'color') return 'var(--text-state-interactive)';
    if (property.includes('border')) return 'var(--border-state-focus)';
  }

  if (foundationToken.includes('green') || foundationToken.includes('success')) {
    if (property.includes('background')) return 'var(--surface-context-success)';
    if (property === 'color') return 'var(--text-context-success)';
    if (property.includes('border')) return 'var(--border-context-success)';
  }

  if (foundationToken.includes('red') || foundationToken.includes('danger')) {
    if (property.includes('background')) return 'var(--surface-context-danger)';
    if (property === 'color') return 'var(--text-context-danger)';
    if (property.includes('border')) return 'var(--border-context-danger)';
  }

  if (foundationToken.includes('yellow') || foundationToken.includes('warning')) {
    if (property.includes('background')) return 'var(--surface-context-warning)';
    if (property === 'color') return 'var(--text-context-warning)';
    if (property.includes('border')) return 'var(--border-context-warning)';
  }

  if (foundationToken.includes('gray') || foundationToken.includes('bluegray')) {
    if (property.includes('background')) return 'var(--surface-neutral-secondary)';
    if (property === 'color') return 'var(--text-neutral-subdued)';
    if (property.includes('border')) return 'var(--border-neutral-default)';
  }

  // Default suggestions by property
  if (property.includes('background')) return 'var(--surface-neutral-primary)';
  if (property === 'color') return 'var(--text-neutral-default)';
  if (property.includes('border')) return 'var(--border-neutral-default)';

  return 'appropriate semantic token';
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent custom CSS that overrides theme tokens',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/docs/AI-AGENT-GUIDE.md'
    },
    messages: {
      foundationToken: 'Foundation token "{{token}}" cannot be used in app code. Use semantic token: {{suggestion}}',
      unknownToken: 'Unknown CSS variable "{{token}}". Only semantic tokens are allowed (--surface-*, --text-*, --border-*, --icon-*, --elevation-*, etc.)',
      suggestSemanticToken: 'Replace with semantic token'
    },
    fixable: null, // No autofix - requires semantic understanding
    schema: []
  },

  create(context) {
    return {
      // Check inline styles: <div style={{ background: 'var(--blue-500)' }}>
      JSXAttribute(node) {
        if (node.name.name !== 'style') return;

        if (node.value?.type !== 'JSXExpressionContainer') return;

        const expr = node.value.expression;
        if (expr.type !== 'ObjectExpression') return;

        // Check each property
        expr.properties.forEach(prop => {
          if (prop.type !== 'Property') return;

          // Get property name and value
          const propertyName = prop.key.name || prop.key.value;
          let value = null;

          if (prop.value.type === 'Literal') {
            value = prop.value.value;
          } else if (prop.value.type === 'TemplateLiteral') {
            value = prop.value.quasis.map(q => q.value.cooked).join('');
          }

          if (typeof value === 'string' && value.includes('var(--')) {
            const varName = extractVarName(value);
            if (!varName) return;

            // Check if it's a foundation token
            if (isFoundationToken(varName)) {
              context.report({
                node: prop.value,
                messageId: 'foundationToken',
                data: {
                  token: varName,
                  suggestion: getSuggestedSemanticToken(varName, propertyName)
                }
              });
              return;
            }

            // Check if it's a semantic token
            if (!isSemanticToken(varName)) {
              // Could be a custom token or typo
              context.report({
                node: prop.value,
                messageId: 'unknownToken',
                data: {
                  token: varName
                }
              });
            }
          }
        });
      },

      // Check CSS-in-JS: const styles = { background: 'var(--blue-500)' }
      Property(node) {
        if (node.value.type !== 'Literal' && node.value.type !== 'TemplateLiteral') return;

        // Get property value
        let value = null;

        if (node.value.type === 'Literal') {
          value = node.value.value;
        } else if (node.value.type === 'TemplateLiteral') {
          value = node.value.quasis.map(q => q.value.cooked).join('');
        }

        if (typeof value === 'string' && value.includes('var(--')) {
          const varName = extractVarName(value);
          if (!varName) return;

          const propertyName = node.key.name || node.key.value;

          // Check if it's a foundation token
          if (isFoundationToken(varName)) {
            context.report({
              node: node.value,
              messageId: 'foundationToken',
              data: {
                token: varName,
                suggestion: getSuggestedSemanticToken(varName, propertyName)
              }
            });
            return;
          }

          // Check if it's a semantic token
          if (!isSemanticToken(varName)) {
            context.report({
              node: node.value,
              messageId: 'unknownToken',
              data: {
                token: varName
              }
            });
          }
        }
      }
    };
  }
};
