/**
 * @fileoverview Prevent hardcoded color values (hex, rgb, hsl, named colors)
 * @author Lars Farstad
 */

/**
 * Rule: no-hardcoded-colors
 *
 * All colors MUST use semantic tokens from the Yggdrasil design system.
 *
 * Forbidden:
 * - Hex colors: #333, #f0f0f0
 * - RGB/RGBA: rgb(255, 0, 0), rgba(0, 0, 0, 0.5)
 * - HSL/HSLA: hsl(120, 100%, 50%)
 * - Named colors: red, blue, black (except transparent, inherit, currentColor)
 *
 * Required:
 * - CSS variables: var(--surface-neutral-primary), var(--text-neutral-default)
 *
 * Examples:
 *
 * ❌ BAD:
 * <div style={{ background: '#f0f0f0', color: '#333' }}>
 * <div style={{ background: 'rgb(240, 240, 240)' }}>
 * <div style={{ color: 'blue' }}>
 *
 * ✅ GOOD:
 * <div style={{ background: 'var(--surface-neutral-primary)', color: 'var(--text-neutral-default)' }}>
 * <div style={{ color: 'transparent' }}>
 */

// Allowed named colors (system keywords, not actual colors)
const ALLOWED_NAMED_COLORS = [
  'transparent',
  'inherit',
  'currentColor',
  'initial',
  'unset',
  'revert'
];

// CSS properties that accept color values
const COLOR_PROPERTIES = [
  'color',
  'background',
  'backgroundColor',
  'background-color',
  'borderColor',
  'border-color',
  'borderTopColor',
  'border-top-color',
  'borderRightColor',
  'border-right-color',
  'borderBottomColor',
  'border-bottom-color',
  'borderLeftColor',
  'border-left-color',
  'outlineColor',
  'outline-color',
  'fill',
  'stroke',
  'textDecorationColor',
  'text-decoration-color',
  'caretColor',
  'caret-color'
];

// Regex patterns for color values
const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;
const RGB_COLOR = /^rgba?\(/;
const HSL_COLOR = /^hsla?\(/;

// Common named colors (comprehensive list)
const NAMED_COLORS = [
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
  'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
  'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
  'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki',
  'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon',
  'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet',
  'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
  'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
  'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow',
  'honeydew', 'hotpink',
  'indianred', 'indigo', 'ivory',
  'khaki',
  'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
  'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon',
  'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow',
  'lime', 'limegreen', 'linen',
  'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
  'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
  'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
  'navajowhite', 'navy',
  'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
  'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff',
  'peru', 'pink', 'plum', 'powderblue', 'purple',
  'red', 'rosybrown', 'royalblue',
  'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
  'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue',
  'tan', 'teal', 'thistle', 'tomato', 'turquoise',
  'violet',
  'wheat', 'white', 'whitesmoke',
  'yellow', 'yellowgreen'
];

/**
 * Check if a value is a hardcoded color
 */
function isHardcodedColor(value) {
  if (typeof value !== 'string') return false;

  const normalized = value.trim().toLowerCase();

  // Check hex colors
  if (HEX_COLOR.test(normalized)) return true;

  // Check RGB/RGBA
  if (RGB_COLOR.test(normalized)) return true;

  // Check HSL/HSLA
  if (HSL_COLOR.test(normalized)) return true;

  // Check named colors (excluding allowed keywords)
  if (NAMED_COLORS.includes(normalized) && !ALLOWED_NAMED_COLORS.includes(normalized)) {
    return true;
  }

  return false;
}

/**
 * Get suggested semantic token for a color property
 */
function getSuggestedToken(propertyName) {
  const property = propertyName.toLowerCase();

  if (property === 'color') {
    return 'var(--text-neutral-default)';
  }

  if (property.includes('background')) {
    return 'var(--surface-neutral-primary)';
  }

  if (property.includes('border')) {
    return 'var(--border-neutral-default)';
  }

  if (property === 'fill' || property === 'stroke') {
    return 'var(--icon-neutral-default)';
  }

  return 'var(--text-neutral-default)';
}

/**
 * Check if property is a color property
 */
function isColorProperty(propertyName) {
  return COLOR_PROPERTIES.includes(propertyName);
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent hardcoded color values (hex, rgb, hsl, named colors)',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/docs/AI-AGENT-GUIDE.md'
    },
    messages: {
      hardcodedColor: 'Hardcoded color "{{value}}" is forbidden. Use semantic tokens: {{suggestion}}',
      hardcodedColorInCSS: 'Hardcoded color "{{value}}" in CSS file is forbidden. Use semantic tokens: {{suggestion}}',
      suggestUseToken: 'Replace with semantic token'
    },
    fixable: null, // No autofix - requires semantic understanding
    schema: []
  },

  create(context) {
    return {
      // Check inline styles: <div style={{ color: '#333' }}>
      JSXAttribute(node) {
        if (node.name.name !== 'style') return;

        // Only check object expressions: style={{ ... }}
        if (node.value?.type !== 'JSXExpressionContainer') return;

        const expr = node.value.expression;
        if (expr.type !== 'ObjectExpression') return;

        // Check each property
        expr.properties.forEach(prop => {
          if (prop.type !== 'Property') return;

          // Get property name
          const propertyName = prop.key.name || prop.key.value;
          if (!isColorProperty(propertyName)) return;

          // Get property value
          let value = null;

          if (prop.value.type === 'Literal') {
            value = prop.value.value;
          } else if (prop.value.type === 'TemplateLiteral') {
            // Extract static parts from template literal
            value = prop.value.quasis.map(q => q.value.cooked).join('');
          }

          if (value && isHardcodedColor(value)) {
            context.report({
              node: prop.value,
              messageId: 'hardcodedColor',
              data: {
                value,
                suggestion: getSuggestedToken(propertyName)
              }
            });
          }
        });
      },

      // Check CSS-in-JS: const styles = { color: '#333' }
      Property(node) {
        // Skip if not in an object that looks like styles
        if (node.value.type !== 'Literal' && node.value.type !== 'TemplateLiteral') return;

        // Get property name
        const propertyName = node.key.name || node.key.value;
        if (!isColorProperty(propertyName)) return;

        // Get property value
        let value = null;

        if (node.value.type === 'Literal') {
          value = node.value.value;
        } else if (node.value.type === 'TemplateLiteral') {
          value = node.value.quasis.map(q => q.value.cooked).join('');
        }

        if (value && isHardcodedColor(value)) {
          context.report({
            node: node.value,
            messageId: 'hardcodedColor',
            data: {
              value,
              suggestion: getSuggestedToken(propertyName)
            }
          });
        }
      },

      // Check template literals: backgroundColor: `#${color}`
      TemplateLiteral(node) {
        // Check if template contains hex color pattern
        const fullText = node.quasis.map(q => q.value.cooked).join('');
        if (isHardcodedColor(fullText)) {
          context.report({
            node,
            messageId: 'hardcodedColor',
            data: {
              value: fullText,
              suggestion: 'var(--text-neutral-default) or appropriate semantic token'
            }
          });
        }
      }
    };
  }
};
