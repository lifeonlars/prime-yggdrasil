/**
 * @fileoverview Enforce PrimeFlex allowlist (layout/spacing only, not design)
 * @author Lars Farstad
 */

/**
 * Rule: primeflex-allowlist
 *
 * PrimeFlex can ONLY be used for layout and spacing, NOT for design.
 *
 * Allowed (Layout & Spacing):
 * - Flex: flex, flex-column, justify-*, align-*
 * - Grid: grid, col-*, gap-*
 * - Spacing: p-*, m-* (4px grid only)
 * - Display: block, inline-block, hidden
 * - Positioning: relative, absolute, fixed, sticky
 *
 * Forbidden (Design):
 * - Colors: bg-*, text-[color]-*, border-[color]-*
 * - Borders: rounded-*, border-*
 * - Shadows: shadow-*
 * - Typography: font-*, text-[size]-*
 *
 * Examples:
 *
 * ❌ BAD:
 * <div className="flex bg-blue-500 p-4 shadow-2">
 * <div className="text-red-500 font-bold rounded-lg">
 *
 * ✅ GOOD:
 * <div className="flex p-4">
 * <div className="grid gap-3">
 */

// Allowed PrimeFlex classes (Layout & Spacing only)
const ALLOWED_PATTERNS = [
  // Flex Layout
  /^flex$/, /^inline-flex$/,
  /^flex-(row|column|wrap|nowrap|1)$/,
  /^flex-order-\d+$/,
  /^justify-(start|end|center|between|around|evenly)$/,
  /^align-(start|end|center|stretch|baseline)$/,
  /^align-items-(start|end|center|stretch|baseline)$/,
  /^align-content-(start|end|center|stretch|between|around)$/,
  /^align-self-(start|end|center|stretch|baseline|auto)$/,

  // Grid Layout
  /^grid$/, /^inline-grid$/,
  /^grid-cols-\d+$/, /^col-span-\d+$/, /^col-start-\d+$/, /^col-end-\d+$/,
  /^grid-rows-\d+$/, /^row-span-\d+$/, /^row-start-\d+$/, /^row-end-\d+$/,
  /^gap-\d+$/, /^gap-x-\d+$/, /^gap-y-\d+$/,

  // Spacing (4px grid: 0-8)
  /^p-[0-8]$/, /^pt-[0-8]$/, /^pr-[0-8]$/, /^pb-[0-8]$/, /^pl-[0-8]$/,
  /^px-[0-8]$/, /^py-[0-8]$/,
  /^m-[0-8]$/, /^mt-[0-8]$/, /^mr-[0-8]$/, /^mb-[0-8]$/, /^ml-[0-8]$/,
  /^mx-[0-8]$/, /^my-[0-8]$/,
  /^m-auto$/, /^mx-auto$/, /^my-auto$/,

  // Display
  /^block$/, /^inline-block$/, /^inline$/, /^hidden$/,

  // Positioning
  /^relative$/, /^absolute$/, /^fixed$/, /^sticky$/,
  /^top-\d+$/, /^right-\d+$/, /^bottom-\d+$/, /^left-\d+$/,
  /^z-\d+$/,

  // Sizing
  /^w-(full|screen|\d+)$/, /^h-(full|screen|\d+)$/,
  /^min-w-\d+$/, /^max-w-\d+$/,
  /^min-h-\d+$/, /^max-h-\d+$/,

  // Overflow
  /^overflow-(auto|hidden|visible|scroll)$/,
  /^overflow-[xy]-(auto|hidden|visible|scroll)$/
];

// Forbidden patterns (Design, not Layout)
const FORBIDDEN_PATTERNS = [
  // Colors
  { pattern: /^bg-[a-z]+-\d+$/, category: 'colors', replacement: 'Use CSS variables: background: var(--surface-neutral-primary)' },
  { pattern: /^text-[a-z]+-\d+$/, category: 'colors', replacement: 'Use CSS variables: color: var(--text-neutral-default)' },
  { pattern: /^border-[a-z]+-\d+$/, category: 'colors', replacement: 'Use CSS variables: borderColor: var(--border-neutral-default)' },

  // Borders
  { pattern: /^border(-[trblxy])?(-\d+)?$/, category: 'borders', replacement: 'Use CSS variables: border: 1px solid var(--border-neutral-default)' },
  { pattern: /^border-(solid|dashed|dotted|double|none)$/, category: 'borders', replacement: 'Use inline styles: borderStyle: "solid"' },
  { pattern: /^rounded(-[a-z]+)?(-\d+)?$/, category: 'borders', replacement: 'Use CSS variables: borderRadius: var(--radius-md)' },

  // Shadows
  { pattern: /^shadow(-\d+)?$/, category: 'shadows', replacement: 'Use CSS variables: boxShadow: var(--elevation-subtle)' },

  // Typography
  { pattern: /^text-(xs|sm|base|lg|xl|\dxl)$/, category: 'typography', replacement: 'Use CSS variables: fontSize: var(--font-size-body-md)' },
  { pattern: /^font-(light|normal|medium|semibold|bold)$/, category: 'typography', replacement: 'Use CSS variables: fontWeight: var(--font-weight-medium)' },
  { pattern: /^(italic|uppercase|lowercase|capitalize)$/, category: 'typography', replacement: 'Use inline styles: textTransform: "uppercase"' },
  { pattern: /^(underline|line-through|no-underline)$/, category: 'typography', replacement: 'Use inline styles: textDecoration: "underline"' },

  // Effects
  { pattern: /^opacity-\d+$/, category: 'effects', replacement: 'Use inline styles: opacity: 0.5' },
  { pattern: /^(blur|brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia)-\d+$/, category: 'effects', replacement: 'Use inline styles: filter: "blur(4px)"' }
];

/**
 * Check if a class is allowed
 */
function isAllowed(className) {
  return ALLOWED_PATTERNS.some(pattern => pattern.test(className));
}

/**
 * Check if a class is forbidden and return violation info
 */
function getForbiddenViolation(className) {
  for (const { pattern, category, replacement } of FORBIDDEN_PATTERNS) {
    if (pattern.test(className)) {
      return { category, replacement };
    }
  }
  return null;
}

/**
 * Check if a class looks like PrimeFlex/utility class
 */
function isPotentialUtilityClass(className) {
  // Heuristic: starts with common utility prefixes
  const utilityPrefixes = ['flex', 'grid', 'p-', 'm-', 'gap-', 'bg-', 'text-', 'border-', 'rounded-', 'shadow-', 'font-', 'w-', 'h-', 'overflow-'];
  return utilityPrefixes.some(prefix => className.startsWith(prefix));
}

/**
 * Extract className value from JSX attribute
 */
function extractClassNames(classNameAttr) {
  if (!classNameAttr || !classNameAttr.value) return [];

  // Handle string literals: className="flex p-4"
  if (classNameAttr.value.type === 'Literal') {
    const value = classNameAttr.value.value;
    if (typeof value === 'string') {
      return value.split(/\s+/).filter(Boolean);
    }
  }

  // Handle template literals: className={`flex ${someVar}`}
  if (classNameAttr.value.type === 'JSXExpressionContainer') {
    const expr = classNameAttr.value.expression;

    if (expr.type === 'TemplateLiteral') {
      return expr.quasis
        .map(quasi => quasi.value.cooked)
        .join(' ')
        .split(/\s+/)
        .filter(Boolean);
    }
  }

  return [];
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce PrimeFlex allowlist (layout/spacing only, not design)',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/docs/PRIMEFLEX-POLICY.md'
    },
    messages: {
      forbiddenClass: 'PrimeFlex class "{{className}}" is forbidden ({{category}}). {{replacement}}',
      suggestRemoveClass: 'Remove "{{className}}" from className',
      suggestRemoveAllForbidden: 'Remove all forbidden PrimeFlex classes'
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    return {
      JSXAttribute(node) {
        // Only check className attributes
        if (node.name.name !== 'className') return;

        // Extract class names
        const classNames = extractClassNames(node);

        // Check each class name
        classNames.forEach(className => {
          // Skip if not a utility class
          if (!isPotentialUtilityClass(className)) return;

          // Check if allowed
          if (isAllowed(className)) return;

          // Check if forbidden
          const violation = getForbiddenViolation(className);
          if (violation) {
            context.report({
              node,
              messageId: 'forbiddenClass',
              data: {
                className,
                category: violation.category,
                replacement: violation.replacement
              },
              suggest: [
                {
                  messageId: 'suggestRemoveClass',
                  data: { className },
                  fix(fixer) {
                    // Generate new className without this class
                    const newClassNames = classNames.filter(c => c !== className);

                    if (newClassNames.length === 0) {
                      // Remove entire className attribute
                      return fixer.remove(node);
                    }

                    // Replace className value
                    if (node.value.type === 'Literal') {
                      const newValue = newClassNames.join(' ');
                      return fixer.replaceText(node.value, `"${newValue}"`);
                    }

                    return null;
                  }
                },
                {
                  messageId: 'suggestRemoveAllForbidden',
                  fix(fixer) {
                    // Remove all forbidden classes
                    const allowedClasses = classNames.filter(c => {
                      if (!isPotentialUtilityClass(c)) return true;
                      if (isAllowed(c)) return true;
                      return false;
                    });

                    if (allowedClasses.length === 0) {
                      return fixer.remove(node);
                    }

                    if (node.value.type === 'Literal') {
                      const newValue = allowedClasses.join(' ');
                      return fixer.replaceText(node.value, `"${newValue}"`);
                    }

                    return null;
                  }
                }
              ]
            });
          }
        });
      }
    };
  }
};
