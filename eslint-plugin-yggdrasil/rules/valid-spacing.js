/**
 * @fileoverview Enforce 4px grid spacing tokens
 * @author Lars Farstad
 */

/**
 * Rule: valid-spacing
 *
 * All spacing MUST use the 4px grid system via semantic tokens.
 *
 * Allowed spacing scale (4px grid):
 * - 0: 0
 * - 1: 4px  (0.25rem)
 * - 2: 8px  (0.5rem)
 * - 3: 12px (0.75rem)
 * - 4: 16px (1rem)
 * - 5: 20px (1.25rem)
 * - 6: 24px (1.5rem)
 * - 7: 28px (1.75rem)
 * - 8: 32px (2rem)
 *
 * Exception: 1px hairlines allowed for borders
 *
 * Examples:
 *
 * ❌ BAD:
 * <div style={{ padding: '10px', margin: '15px' }}>
 * <div style={{ gap: '5px' }}>
 * <div className="p-9">
 *
 * ✅ GOOD:
 * <div style={{ padding: '1rem', margin: '1.5rem' }}>  // 16px, 24px
 * <div className="p-4 m-6">  // 16px, 24px
 * <div style={{ border: '1px solid var(--border-neutral-default)' }}>  // 1px allowed
 */

// Spacing properties
const SPACING_PROPERTIES = [
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'gap', 'rowGap', 'columnGap', 'row-gap', 'column-gap',
  'top', 'right', 'bottom', 'left',
  'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight',
  'max-width', 'max-height', 'min-width', 'min-height'
];

// Valid spacing values (4px grid + allowed exceptions)
const VALID_SPACING = {
  px: [0, 4, 8, 12, 16, 20, 24, 28, 32, 1], // 1px allowed for hairlines
  rem: [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  keywords: ['auto', 'inherit', 'initial', 'unset', 'revert', '0']
};

// PrimeFlex spacing classes (already validated by primeflex-allowlist)
const PRIMEFLEX_SPACING = /^[pm][trblxy]?-[0-8]$/;

/**
 * Parse a spacing value and check if it's valid
 */
function isValidSpacing(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return { valid: false };

  const stringValue = String(value).trim();

  // Allow keywords
  if (VALID_SPACING.keywords.includes(stringValue)) return { valid: true };

  // Allow CSS variables (semantic tokens)
  if (stringValue.startsWith('var(--')) return { valid: true };

  // Allow calc() expressions (can't validate statically)
  if (stringValue.startsWith('calc(')) return { valid: true };

  // Allow percentages (relative to parent)
  if (stringValue.endsWith('%')) return { valid: true };

  // Parse px values
  const pxMatch = stringValue.match(/^(\d+(?:\.\d+)?)px$/);
  if (pxMatch) {
    const pxValue = parseFloat(pxMatch[1]);
    if (VALID_SPACING.px.includes(pxValue)) {
      return { valid: true };
    }
    // Check if it's on the 4px grid
    if (pxValue === 1) {
      return { valid: true, warning: 'Only use 1px for borders, not spacing' };
    }
    if (pxValue % 4 === 0 && pxValue <= 32) {
      return { valid: true };
    }
    return {
      valid: false,
      offGrid: true,
      nearest: Math.round(pxValue / 4) * 4,
      pxValue
    };
  }

  // Parse rem values
  const remMatch = stringValue.match(/^(\d+(?:\.\d+)?)rem$/);
  if (remMatch) {
    const remValue = parseFloat(remMatch[1]);
    if (VALID_SPACING.rem.includes(remValue)) {
      return { valid: true };
    }
    // Check if it's close to a valid rem value
    const nearest = VALID_SPACING.rem.reduce((prev, curr) =>
      Math.abs(curr - remValue) < Math.abs(prev - remValue) ? curr : prev
    );
    return {
      valid: false,
      offGrid: true,
      nearest: nearest,
      remValue
    };
  }

  // Check for shorthand: "10px 20px"
  if (stringValue.includes(' ')) {
    const parts = stringValue.split(/\s+/);
    const invalidParts = parts.filter(part => !isValidSpacing(part).valid);
    if (invalidParts.length > 0) {
      return { valid: false, shorthand: true };
    }
    return { valid: true };
  }

  return { valid: false };
}

/**
 * Get suggested replacement for invalid spacing
 */
function getSuggestedSpacing(property, value, validation) {
  if (validation.offGrid) {
    if (validation.pxValue !== undefined) {
      return `${validation.nearest}px (${validation.nearest / 4}rem)`;
    }
    if (validation.remValue !== undefined) {
      return `${validation.nearest}rem (${validation.nearest * 16}px)`;
    }
  }
  return '4px grid value (0, 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px)';
}

/**
 * Check if property is a spacing property
 */
function isSpacingProperty(propertyName) {
  return SPACING_PROPERTIES.includes(propertyName);
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce 4px grid spacing tokens',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/docs/AI-AGENT-GUIDE.md'
    },
    messages: {
      invalidSpacing: 'Spacing value "{{value}}" is off the 4px grid for property "{{property}}". Use: {{suggestion}}',
      hairlineWarning: '1px should only be used for borders, not spacing',
      suggestNearest: 'Replace with nearest 4px grid value'
    },
    fixable: null, // No autofix - requires design decision
    schema: []
  },

  create(context) {
    return {
      // Check inline styles: <div style={{ padding: '10px' }}>
      JSXAttribute(node) {
        if (node.name.name !== 'style') return;

        if (node.value?.type !== 'JSXExpressionContainer') return;

        const expr = node.value.expression;
        if (expr.type !== 'ObjectExpression') return;

        // Check each property
        expr.properties.forEach(prop => {
          if (prop.type !== 'Property') return;

          // Get property name
          const propertyName = prop.key.name || prop.key.value;
          if (!isSpacingProperty(propertyName)) return;

          // Get property value
          let value = null;

          if (prop.value.type === 'Literal') {
            value = prop.value.value;
          } else if (prop.value.type === 'TemplateLiteral') {
            value = prop.value.quasis.map(q => q.value.cooked).join('');
          }

          if (value !== null) {
            const validation = isValidSpacing(value);

            if (!validation.valid) {
              context.report({
                node: prop.value,
                messageId: 'invalidSpacing',
                data: {
                  value: String(value),
                  property: propertyName,
                  suggestion: getSuggestedSpacing(propertyName, value, validation)
                }
              });
            } else if (validation.warning) {
              context.report({
                node: prop.value,
                messageId: 'hairlineWarning'
              });
            }
          }
        });
      },

      // Check CSS-in-JS: const styles = { padding: '10px' }
      Property(node) {
        if (node.value.type !== 'Literal' && node.value.type !== 'TemplateLiteral') return;

        // Get property name
        const propertyName = node.key.name || node.key.value;
        if (!isSpacingProperty(propertyName)) return;

        // Get property value
        let value = null;

        if (node.value.type === 'Literal') {
          value = node.value.value;
        } else if (node.value.type === 'TemplateLiteral') {
          value = node.value.quasis.map(q => q.value.cooked).join('');
        }

        if (value !== null) {
          const validation = isValidSpacing(value);

          if (!validation.valid) {
            context.report({
              node: node.value,
              messageId: 'invalidSpacing',
              data: {
                value: String(value),
                property: propertyName,
                suggestion: getSuggestedSpacing(propertyName, value, validation)
              }
            });
          } else if (validation.warning) {
            context.report({
              node: node.value,
              messageId: 'hairlineWarning'
            });
          }
        }
      },

      // Check className for PrimeFlex spacing (e.g., p-9, p-10)
      JSXAttribute(node) {
        if (node.name.name !== 'className') return;

        // Extract class names
        let classNames = [];

        if (node.value?.type === 'Literal') {
          classNames = String(node.value.value).split(/\s+/).filter(Boolean);
        } else if (node.value?.type === 'JSXExpressionContainer') {
          const expr = node.value.expression;
          if (expr.type === 'TemplateLiteral') {
            classNames = expr.quasis
              .map(q => q.value.cooked)
              .join(' ')
              .split(/\s+/)
              .filter(Boolean);
          }
        }

        // Check for invalid PrimeFlex spacing (p-9, p-10, etc.)
        classNames.forEach(className => {
          const match = className.match(/^([pm])([trblxy])?-(\d+)$/);
          if (match) {
            const [, , , number] = match;
            const num = parseInt(number, 10);

            if (num > 8) {
              context.report({
                node: node.value,
                messageId: 'invalidSpacing',
                data: {
                  value: className,
                  property: 'className',
                  suggestion: 'Use p-0 through p-8 (0-32px in 4px increments)'
                }
              });
            }
          }
        });
      }
    };
  }
};
