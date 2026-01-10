/**
 * @fileoverview Detect and ban Tailwind CSS class patterns
 * @author Lars Farstad
 */

/**
 * Rule: no-tailwind
 *
 * Tailwind CSS classes are NOT allowed in this project.
 * Use PrimeFlex for layout/spacing (allowlist only) or semantic tokens for design.
 *
 * Tailwind-specific patterns:
 * - Arbitrary values: w-[100px], bg-[#f0f0f0]
 * - Modifiers: hover:bg-blue-500, dark:text-white
 * - Unique Tailwind classes: space-x-*, ring-*, blur-*, etc.
 *
 * Examples:
 *
 * ❌ BAD (Tailwind):
 * <div className="w-[100px] hover:bg-blue-500">
 * <div className="space-x-4 ring-2 ring-blue-500">
 * <div className="backdrop-blur-sm divide-y">
 *
 * ✅ GOOD (PrimeFlex or semantic tokens):
 * <div className="flex gap-3">
 * <div style={{ background: 'var(--surface-neutral-primary)' }}>
 */

// Tailwind-specific class patterns that don't exist in PrimeFlex
const TAILWIND_ONLY_PATTERNS = [
  // Arbitrary values: w-[100px], bg-[#f0f0f0], p-[20px]
  { pattern: /\w+-\[.+\]/, description: 'arbitrary value syntax (e.g., w-[100px])' },

  // Modifiers: hover:, focus:, dark:, md:, etc.
  { pattern: /^(hover|focus|active|visited|disabled|checked|group-hover|peer-hover|focus-within|focus-visible|dark|light|sm|md|lg|xl|2xl|motion-safe|motion-reduce|first|last|odd|even|before|after):/, description: 'modifier syntax (e.g., hover:bg-blue-500)' },

  // Spacing utilities (Tailwind-specific)
  { pattern: /^space-(x|y)-\d+$/, description: 'space-x/space-y (use PrimeFlex gap-* instead)' },
  { pattern: /^divide-(x|y)(-\d+)?$/, description: 'divide-x/divide-y (use borders instead)' },

  // Ring utilities
  { pattern: /^ring(-\d+)?$/, description: 'ring utility (use outline with semantic tokens)' },
  { pattern: /^ring-(inset|offset|offset-\d+)$/, description: 'ring utility (use outline with semantic tokens)' },

  // Backdrop filters
  { pattern: /^backdrop-(blur|brightness|contrast|grayscale|hue-rotate|invert|opacity|saturate|sepia)/, description: 'backdrop-filter (use CSS filter with semantic tokens)' },

  // Blur utilities
  { pattern: /^blur(-\d+)?$/, description: 'blur utility (use CSS filter)' },

  // Aspect ratio
  { pattern: /^aspect-(auto|square|video|\d+\/\d+)$/, description: 'aspect-* (use CSS aspect-ratio)' },

  // Container queries
  { pattern: /^@container/, description: 'container queries (use CSS @container)' },

  // Transform
  { pattern: /^(translate|rotate|skew|scale)-(x|y)?-/, description: 'transform utilities (use CSS transform)' },

  // Transition
  { pattern: /^transition-(all|colors|opacity|shadow|transform|none)$/, description: 'transition-* (use CSS transition)' },
  { pattern: /^duration-\d+$/, description: 'duration-* (use CSS transition-duration)' },
  { pattern: /^ease-(linear|in|out|in-out)$/, description: 'ease-* (use CSS transition-timing-function)' },
  { pattern: /^delay-\d+$/, description: 'delay-* (use CSS transition-delay)' },

  // Animation
  { pattern: /^animate-(none|spin|ping|pulse|bounce)$/, description: 'animate-* (use CSS animation)' },

  // Cursor
  { pattern: /^cursor-(auto|default|pointer|wait|text|move|help|not-allowed|none|context-menu|progress|cell|crosshair|vertical-text|alias|copy|no-drop|grab|grabbing|all-scroll|col-resize|row-resize|n-resize|e-resize|s-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out)$/, description: 'cursor-* (use CSS cursor)' },

  // Scroll behavior
  { pattern: /^scroll-(smooth|auto)$/, description: 'scroll-* (use CSS scroll-behavior)' },
  { pattern: /^snap-(start|end|center|align-none|normal|always|mandatory|proximity)/, description: 'snap-* (use CSS scroll-snap)' },

  // Touch action
  { pattern: /^touch-(auto|none|pan-x|pan-y|pinch-zoom|manipulation)$/, description: 'touch-* (use CSS touch-action)' },

  // User select
  { pattern: /^select-(none|text|all|auto)$/, description: 'select-* (use CSS user-select)' },

  // Pointer events
  { pattern: /^pointer-events-(none|auto)$/, description: 'pointer-events-* (use CSS pointer-events)' },

  // Resize
  { pattern: /^resize(-none|-x|-y)?$/, description: 'resize-* (use CSS resize)' },

  // Scrollbar
  { pattern: /^scrollbar-(thin|none|track|thumb)/, description: 'scrollbar-* (use CSS scrollbar-*)' },

  // Screen readers
  { pattern: /^(sr-only|not-sr-only)$/, description: 'sr-only (use proper semantic HTML and ARIA)' },

  // Arbitrary properties
  { pattern: /^\[.+:.+\]$/, description: 'arbitrary property syntax (e.g., [mask-type:luminance])' }
];

/**
 * Check if a class is a Tailwind-only class
 */
function isTailwindClass(className) {
  for (const { pattern, description } of TAILWIND_ONLY_PATTERNS) {
    if (pattern.test(className)) {
      return { isTailwind: true, description };
    }
  }
  return { isTailwind: false };
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
      description: 'Detect and ban Tailwind CSS class patterns',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/docs/PRIMEFLEX-POLICY.md'
    },
    messages: {
      tailwindClass: 'Tailwind class "{{className}}" is not allowed ({{description}}). Use PrimeFlex for layout or semantic tokens for design.',
      suggestRemoveClass: 'Remove "{{className}}" from className',
      suggestRemoveAllTailwind: 'Remove all Tailwind classes'
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
        const violations = [];
        classNames.forEach(className => {
          const { isTailwind, description } = isTailwindClass(className);
          if (isTailwind) {
            violations.push({ className, description });
          }
        });

        // Report violations
        violations.forEach(({ className, description }) => {
          context.report({
            node,
            messageId: 'tailwindClass',
            data: {
              className,
              description
            },
            suggest: [
              {
                messageId: 'suggestRemoveClass',
                data: { className },
                fix(fixer) {
                  // Generate new className without this class
                  const newClassNames = classNames.filter(c => c !== className);

                  if (newClassNames.length === 0) {
                    return fixer.remove(node);
                  }

                  if (node.value.type === 'Literal') {
                    const newValue = newClassNames.join(' ');
                    return fixer.replaceText(node.value, `"${newValue}"`);
                  }

                  return null;
                }
              },
              {
                messageId: 'suggestRemoveAllTailwind',
                fix(fixer) {
                  // Remove all Tailwind classes
                  const nonTailwindClasses = classNames.filter(c => !isTailwindClass(c).isTailwind);

                  if (nonTailwindClasses.length === 0) {
                    return fixer.remove(node);
                  }

                  if (node.value.type === 'Literal') {
                    const newValue = nonTailwindClasses.join(' ');
                    return fixer.replaceText(node.value, `"${newValue}"`);
                  }

                  return null;
                }
              }
            ]
          });
        });
      }
    };
  }
};
