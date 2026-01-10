/**
 * @fileoverview Ensure consistent PrimeReact imports
 * @author Lars Farstad
 */

/**
 * Rule: primereact-imports-only
 *
 * PrimeReact components MUST be imported using the official import paths.
 *
 * Required pattern:
 * import { Button } from 'primereact/button';
 * import { DataTable } from 'primereact/datatable';
 *
 * Forbidden:
 * import Button from 'primereact/button';  // Default import
 * import * as PR from 'primereact';  // Namespace import
 * import { Button } from 'primereact';  // Barrel import
 * import { Button } from '@primereact/button';  // Wrong package
 *
 * Examples:
 *
 * ❌ BAD:
 * import Button from 'primereact/button';
 * import { Button, InputText } from 'primereact';
 *
 * ✅ GOOD:
 * import { Button } from 'primereact/button';
 * import { InputText } from 'primereact/inputtext';
 */

// PrimeReact component to path mapping
const COMPONENT_PATHS = {
  // Form Components
  AutoComplete: 'autoComplete',
  Calendar: 'calendar',
  CascadeSelect: 'cascadeselect',
  Checkbox: 'checkbox',
  Chips: 'chips',
  ColorPicker: 'colorpicker',
  Dropdown: 'dropdown',
  Editor: 'editor',
  FloatLabel: 'floatlabel',
  IconField: 'iconfield',
  InputGroup: 'inputgroup',
  InputMask: 'inputmask',
  InputNumber: 'inputnumber',
  InputOtp: 'inputotp',
  InputSwitch: 'inputswitch',
  InputText: 'inputtext',
  InputTextarea: 'inputtextarea',
  Knob: 'knob',
  Listbox: 'listbox',
  MultiSelect: 'multiselect',
  Password: 'password',
  RadioButton: 'radiobutton',
  Rating: 'rating',
  SelectButton: 'selectbutton',
  Slider: 'slider',
  TreeSelect: 'treeselect',
  TriStateCheckbox: 'tristatecheckbox',
  ToggleButton: 'togglebutton',

  // Button Components
  Button: 'button',
  SpeedDial: 'speeddial',
  SplitButton: 'splitbutton',

  // Data Components
  DataTable: 'datatable',
  DataView: 'dataview',
  OrderList: 'orderlist',
  OrganizationChart: 'organizationchart',
  Paginator: 'paginator',
  PickList: 'picklist',
  Timeline: 'timeline',
  Tree: 'tree',
  TreeTable: 'treetable',
  VirtualScroller: 'virtualscroller',

  // Panel Components
  Accordion: 'accordion',
  AccordionTab: 'accordion',
  Card: 'card',
  DeferredContent: 'deferredcontent',
  Divider: 'divider',
  Fieldset: 'fieldset',
  Panel: 'panel',
  ScrollPanel: 'scrollpanel',
  Splitter: 'splitter',
  SplitterPanel: 'splitter',
  Stepper: 'stepper',
  StepperPanel: 'stepper',
  TabView: 'tabview',
  TabPanel: 'tabview',
  Toolbar: 'toolbar',

  // Overlay Components
  ConfirmDialog: 'confirmdialog',
  ConfirmPopup: 'confirmpopup',
  Dialog: 'dialog',
  DynamicDialog: 'dynamicdialog',
  OverlayPanel: 'overlaypanel',
  Sidebar: 'sidebar',
  Tooltip: 'tooltip',

  // File Components
  FileUpload: 'fileupload',

  // Menu Components
  Breadcrumb: 'breadcrumb',
  ContextMenu: 'contextmenu',
  Dock: 'dock',
  Menu: 'menu',
  Menubar: 'menubar',
  MegaMenu: 'megamenu',
  PanelMenu: 'panelmenu',
  Steps: 'steps',
  TabMenu: 'tabmenu',
  TieredMenu: 'tieredmenu',

  // Chart Components
  Chart: 'chart',

  // Messages Components
  Message: 'message',
  Messages: 'messages',
  Toast: 'toast',

  // Media Components
  Carousel: 'carousel',
  Galleria: 'galleria',
  Image: 'image',

  // Misc Components
  Avatar: 'avatar',
  AvatarGroup: 'avatargroup',
  Badge: 'badge',
  BlockUI: 'blockui',
  Chip: 'chip',
  Inplace: 'inplace',
  MeterGroup: 'metergroup',
  ProgressBar: 'progressbar',
  ProgressSpinner: 'progressspinner',
  ScrollTop: 'scrolltop',
  Skeleton: 'skeleton',
  Tag: 'tag',
  Terminal: 'terminal'
};

/**
 * Get expected import path for a component
 */
function getExpectedPath(componentName) {
  const path = COMPONENT_PATHS[componentName];
  return path ? `primereact/${path}` : null;
}

/**
 * Check if import is from PrimeReact
 */
function isPrimeReactImport(source) {
  return source.startsWith('primereact');
}

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure consistent PrimeReact imports',
      category: 'Yggdrasil Design System',
      recommended: true,
      url: 'https://primereact.org/'
    },
    messages: {
      defaultImport: 'PrimeReact components must use named imports: import { {{component}} } from \'{{expectedPath}}\'',
      barrelImport: 'Import {{component}} from its specific path \'{{expectedPath}}\', not from the barrel import \'primereact\'',
      wrongPath: 'Import {{component}} from \'{{expectedPath}}\', not \'{{actualPath}}\'',
      unknownComponent: 'Unknown PrimeReact component \'{{component}}\'. Verify the component name.',
      namespaceImport: 'Namespace imports are not allowed for PrimeReact. Use named imports instead.',
      suggestCorrectImport: 'Use correct import path'
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Only check PrimeReact imports
        if (!isPrimeReactImport(source)) return;

        // Check for namespace imports: import * as PR from 'primereact/button'
        const namespaceImport = node.specifiers.find(
          spec => spec.type === 'ImportNamespaceSpecifier'
        );
        if (namespaceImport) {
          context.report({
            node: namespaceImport,
            messageId: 'namespaceImport'
          });
          return;
        }

        // Check each import specifier
        node.specifiers.forEach(spec => {
          // Check for default imports: import Button from 'primereact/button'
          if (spec.type === 'ImportDefaultSpecifier') {
            const componentName = spec.local.name;
            const expectedPath = getExpectedPath(componentName);

            if (expectedPath) {
              context.report({
                node: spec,
                messageId: 'defaultImport',
                data: {
                  component: componentName,
                  expectedPath
                },
                fix(fixer) {
                  // Convert to named import
                  return fixer.replaceText(spec, `{ ${componentName} }`);
                }
              });
            }
            return;
          }

          // Check named imports
          if (spec.type === 'ImportSpecifier') {
            const componentName = spec.imported.name;
            const expectedPath = getExpectedPath(componentName);

            if (!expectedPath) {
              // Unknown component or it's a utility/type import
              // Don't report if importing from a specific path (likely a utility)
              if (source === 'primereact') {
                context.report({
                  node: spec,
                  messageId: 'unknownComponent',
                  data: {
                    component: componentName
                  }
                });
              }
              return;
            }

            // Check for barrel imports: import { Button } from 'primereact'
            if (source === 'primereact') {
              context.report({
                node: spec,
                messageId: 'barrelImport',
                data: {
                  component: componentName,
                  expectedPath
                },
                fix(fixer) {
                  // Can't easily fix barrel imports (would need to split the import)
                  return null;
                }
              });
              return;
            }

            // Check if import path is correct
            if (source !== expectedPath) {
              context.report({
                node,
                messageId: 'wrongPath',
                data: {
                  component: componentName,
                  expectedPath,
                  actualPath: source
                },
                fix(fixer) {
                  // Fix the import path
                  return fixer.replaceText(node.source, `'${expectedPath}'`);
                }
              });
            }
          }
        });
      }
    };
  }
};
