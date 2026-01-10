/**
 * @fileoverview Prevent PrimeFlex utility classes on PrimeReact components
 * @author Lars Farstad
 */

/**
 * Rule: no-utility-on-components
 *
 * This is the MOST CRITICAL rule in the Yggdrasil design system.
 *
 * PrimeFlex utility classes MUST NOT be used on PrimeReact components.
 * The theme system handles all component styling.
 *
 * Exception: `w-full` is allowed on form input components only.
 *
 * Examples:
 *
 * ❌ BAD:
 * <Button className="bg-blue-500 p-4" label="Save" />
 * <InputText className="border-round p-3" />
 * <DataTable className="shadow-2" value={data} />
 *
 * ✅ GOOD:
 * <Button label="Save" />
 * <InputText className="w-full" />
 * <DataTable value={data} />
 */

const PRIMEREACT_COMPONENTS = [
  // Form Components
  'AutoComplete', 'Calendar', 'CascadeSelect', 'Checkbox', 'Chips', 'ColorPicker',
  'Dropdown', 'Editor', 'FloatLabel', 'IconField', 'InputGroup', 'InputMask',
  'InputNumber', 'InputOtp', 'InputSwitch', 'InputText', 'InputTextarea',
  'Knob', 'Listbox', 'MultiSelect', 'Password', 'RadioButton', 'Rating',
  'SelectButton', 'Slider', 'TreeSelect', 'TriStateCheckbox', 'ToggleButton',

  // Button Components
  'Button', 'SpeedDial', 'SplitButton',

  // Data Components
  'DataTable', 'DataView', 'OrderList', 'OrganizationChart', 'Paginator',
  'PickList', 'Timeline', 'Tree', 'TreeTable', 'VirtualScroller',

  // Panel Components
  'Accordion', 'AccordionTab', 'Card', 'DeferredContent', 'Divider',
  'Fieldset', 'Panel', 'ScrollPanel', 'Splitter', 'SplitterPanel',
  'Stepper', 'StepperPanel', 'TabView', 'TabPanel', 'Toolbar',

  // Overlay Components
  'ConfirmDialog', 'ConfirmPopup', 'Dialog', 'DynamicDialog', 'OverlayPanel',
  'Sidebar', 'Tooltip',

  // File Components
  'FileUpload',

  // Menu Components
  'Breadcrumb', 'ContextMenu', 'Dock', 'Menu', 'Menubar', 'MegaMenu',
  'PanelMenu', 'Steps', 'TabMenu', 'TieredMenu',

  // Chart Components
  'Chart',

  // Messages Components
  'Message', 'Messages', 'Toast',

  // Media Components
  'Carousel', 'Galleria', 'Image',

  // Misc Components
  'Avatar', 'AvatarGroup', 'Badge', 'BlockUI', 'Chip', 'Inplace',
  'MeterGroup', 'ProgressBar', 'ProgressSpinner', 'ScrollTop', 'Skeleton',
  'Tag', 'Terminal'
];

// Form input components that allow w-full
const FORM_INPUT_COMPONENTS = [
  'AutoComplete', 'Calendar', 'CascadeSelect', 'Chips', 'ColorPicker',
  'Dropdown', 'Editor', 'InputMask', 'InputNumber', 'InputOtp', 'InputText',
  'InputTextarea', 'Listbox', 'MultiSelect', 'Password', 'TreeSelect'
];

// PrimeFlex utility class patterns (comprehensive list)
const UTILITY_PATTERNS = [
  // Layout
  /^flex$/, /^inline-flex$/, /^grid$/, /^inline-grid$/,
  /^block$/, /^inline-block$/, /^hidden$/,

  // Flex
  /^flex-(row|column|wrap|nowrap|1)$/, /^flex-order-\d+$/,
  /^justify-(start|end|center|between|around|evenly)$/,
  /^align-(start|end|center|stretch|baseline)$/,
  /^align-items-(start|end|center|stretch|baseline)$/,
  /^align-content-(start|end|center|stretch|between|around)$/,
  /^align-self-(start|end|center|stretch|baseline|auto)$/,

  // Grid
  /^grid-cols-\d+$/, /^col-span-\d+$/, /^col-start-\d+$/, /^col-end-\d+$/,
  /^grid-rows-\d+$/, /^row-span-\d+$/, /^row-start-\d+$/, /^row-end-\d+$/,
  /^gap-\d+$/, /^gap-x-\d+$/, /^gap-y-\d+$/,

  // Spacing (p-*, m-*, etc.)
  /^[pm]-\d+$/, /^[pm][trblxy]-\d+$/,

  // Positioning
  /^(relative|absolute|fixed|sticky)$/,
  /^(top|right|bottom|left)-\d+$/,
  /^z-\d+$/,

  // Sizing
  /^w-(full|screen|\d+)$/, /^h-(full|screen|\d+)$/,
  /^min-[wh]-\d+$/, /^max-[wh]-\d+$/,

  // Colors (FORBIDDEN)
  /^bg-[a-z]+-\d+$/, /^text-[a-z]+-\d+$/, /^border-[a-z]+-\d+$/,

  // Borders (FORBIDDEN)
  /^border(-[trblxy])?(-\d+)?$/, /^border-(solid|dashed|dotted|double|none)$/,
  /^rounded(-[a-z]+)?(-\d+)?$/,

  // Shadows (FORBIDDEN)
  /^shadow(-\d+)?$/,

  // Typography (FORBIDDEN)
  /^text-(xs|sm|base|lg|xl|\dxl)$/, /^font-(light|normal|medium|semibold|bold)$/,
  /^(italic|uppercase|lowercase|capitalize|underline|line-through|no-underline)$/,

  // Effects (FORBIDDEN)
  /^opacity-\d+$/, /^(blur|brightness|contrast|grayscale|hue-rotate|invert|saturate|sepia)-\d+$/,

  // Overflow
  /^overflow-(auto|hidden|visible|scroll)$/,
  /^overflow-[xy]-(auto|hidden|visible|scroll)$/
];

/**
 * Check if a string is a PrimeFlex utility class
 */
function isPrimeFlexUtility(className) {
  return UTILITY_PATTERNS.some(pattern => pattern.test(className));
}

/**
 * Check if component is a PrimeReact component
 */
function isPrimeReactComponent(node) {
  if (node.type !== 'JSXOpeningElement') return false;

  const name = node.name.name;
  return PRIMEREACT_COMPONENTS.includes(name);
}

/**
 * Check if component is a form input (allows w-full)
 */
function isFormInputComponent(node) {
  if (node.type !== 'JSXOpeningElement') return false;

  const name = node.name.name;
  return FORM_INPUT_COMPONENTS.includes(name);
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
      // Extract static parts from template literal
      return expr.quasis
        .map(quasi => quasi.value.cooked)
        .join(' ')
        .split(/\s+/)
        .filter(Boolean);
    }

    // Handle simple string expression: className={styles.container}
    // We can't statically analyze these, so skip
  }

  return [];
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Prevent PrimeFlex utility classes on PrimeReact components',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/docs/PRIMEFLEX-POLICY.md'
    },
    messages: {
      utilityOnComponent: 'PrimeFlex utility class "{{className}}" cannot be used on PrimeReact component <{{component}}>. The theme handles all component styling.',
      utilityOnComponentWithException: 'PrimeFlex utility class "{{className}}" cannot be used on PrimeReact component <{{component}}>. Exception: only "w-full" is allowed on form inputs.',
      suggestRemoveClass: 'Remove "{{className}}" from className attribute',
      suggestRemoveAllUtilities: 'Remove all PrimeFlex utilities from className attribute'
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          allowWFull: {
            type: 'boolean',
            default: true,
            description: 'Allow w-full on form input components'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const options = context.options[0] || {};
    const allowWFull = options.allowWFull !== false;

    return {
      JSXOpeningElement(node) {
        // Only check PrimeReact components
        if (!isPrimeReactComponent(node)) return;

        const componentName = node.name.name;
        const isFormInput = isFormInputComponent(node);

        // Find className attribute
        const classNameAttr = node.attributes.find(
          attr => attr.type === 'JSXAttribute' && attr.name.name === 'className'
        );

        if (!classNameAttr) return;

        // Extract class names
        const classNames = extractClassNames(classNameAttr);

        // Check each class name
        const violations = classNames.filter(className => {
          // Allow w-full on form inputs
          if (allowWFull && isFormInput && className === 'w-full') {
            return false;
          }

          // Check if it's a PrimeFlex utility
          return isPrimeFlexUtility(className);
        });

        // Report violations
        if (violations.length > 0) {
          violations.forEach(className => {
            context.report({
              node: classNameAttr,
              messageId: isFormInput ? 'utilityOnComponentWithException' : 'utilityOnComponent',
              data: {
                className,
                component: componentName
              },
              suggest: [
                {
                  messageId: 'suggestRemoveClass',
                  data: { className },
                  fix(fixer) {
                    // Generate new className without this utility
                    const newClassNames = classNames.filter(c => c !== className);

                    if (newClassNames.length === 0) {
                      // Remove entire className attribute
                      return fixer.remove(classNameAttr);
                    }

                    // Replace className value
                    if (classNameAttr.value.type === 'Literal') {
                      const newValue = newClassNames.join(' ');
                      return fixer.replaceText(classNameAttr.value, `"${newValue}"`);
                    }

                    return null; // Can't fix template literals
                  }
                },
                {
                  messageId: 'suggestRemoveAllUtilities',
                  fix(fixer) {
                    // Remove all utility classes
                    const nonUtilityClasses = classNames.filter(c => !isPrimeFlexUtility(c));

                    if (nonUtilityClasses.length === 0) {
                      return fixer.remove(classNameAttr);
                    }

                    if (classNameAttr.value.type === 'Literal') {
                      const newValue = nonUtilityClasses.join(' ');
                      return fixer.replaceText(classNameAttr.value, `"${newValue}"`);
                    }

                    return null;
                  }
                }
              ]
            });
          });
        }
      }
    };
  }
};
