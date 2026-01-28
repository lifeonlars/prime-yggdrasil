import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Import Phase 6 rules
import interactionPatternsRules from '../rules/interaction-patterns/index.js';
import accessibilityRules from '../rules/accessibility/index.js';

/**
 * Validate command - Report-only mode
 *
 * Scans the project for design system violations and reports them.
 * Does NOT block builds - use for analysis and adoption phase.
 *
 * For autofix suggestions, use the audit command instead.
 */

// Import validation logic from ESLint rules
// Since we can't directly import ESLint rules into CLI without ESLint dependency,
// we'll implement simplified validation logic here that shares the same concepts

const PRIMEREACT_COMPONENTS = [
  'AutoComplete', 'Calendar', 'CascadeSelect', 'Checkbox', 'Chips', 'ColorPicker',
  'Dropdown', 'Editor', 'FloatLabel', 'IconField', 'InputGroup', 'InputMask',
  'InputNumber', 'InputOtp', 'InputSwitch', 'InputText', 'InputTextarea',
  'Knob', 'Listbox', 'MultiSelect', 'Password', 'RadioButton', 'Rating',
  'SelectButton', 'Slider', 'TreeSelect', 'TriStateCheckbox', 'ToggleButton',
  'Button', 'SpeedDial', 'SplitButton',
  'DataTable', 'DataView', 'OrderList', 'OrganizationChart', 'Paginator',
  'PickList', 'Timeline', 'Tree', 'TreeTable', 'VirtualScroller',
  'Accordion', 'AccordionTab', 'Card', 'DeferredContent', 'Divider',
  'Fieldset', 'Panel', 'ScrollPanel', 'Splitter', 'SplitterPanel',
  'Stepper', 'StepperPanel', 'TabView', 'TabPanel', 'Toolbar',
  'ConfirmDialog', 'ConfirmPopup', 'Dialog', 'DynamicDialog', 'OverlayPanel',
  'Sidebar', 'Tooltip', 'FileUpload',
  'Breadcrumb', 'ContextMenu', 'Dock', 'Menu', 'Menubar', 'MegaMenu',
  'PanelMenu', 'Steps', 'TabMenu', 'TieredMenu', 'Chart',
  'Message', 'Messages', 'Toast',
  'Carousel', 'Galleria', 'Image',
  'Avatar', 'AvatarGroup', 'Badge', 'BlockUI', 'Chip', 'Inplace',
  'MeterGroup', 'ProgressBar', 'ProgressSpinner', 'ScrollTop', 'Skeleton',
  'Tag', 'Terminal'
];

const UTILITY_PATTERNS = [
  /^bg-[a-z]+-\d+$/, /^text-[a-z]+-\d+$/, /^border-[a-z]+-\d+$/,
  /^rounded(-[a-z]+)?(-\d+)?$/, /^shadow(-\d+)?$/,
  /^p-\d+$/, /^m-\d+$/, /^gap-\d+$/
];

const TAILWIND_PATTERNS = [
  /\w+-\[.+\]/, // Arbitrary values
  /^(hover|focus|dark|sm|md|lg|xl):/, // Modifiers
  /^space-(x|y)-\d+$/, /^ring(-\d+)?$/, /^backdrop-/
];

const HEX_COLOR = /^#[0-9a-fA-F]{3,8}$/;
const RGB_COLOR = /rgba?\(/;
const HSL_COLOR = /hsla?\(/;

/**
 * Validation rules
 */
const RULES = {
  'no-utility-on-components': {
    name: 'No Utility Classes on PrimeReact Components',
    severity: 'error',
    check: (content, filePath) => {
      const violations = [];
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // Find JSX tags with className
        PRIMEREACT_COMPONENTS.forEach(component => {
          const regex = new RegExp(`<${component}[^>]*className=["'\`]([^"'\`]+)["'\`]`, 'g');
          let match;

          while ((match = regex.exec(line)) !== null) {
            const classes = match[1].split(/\s+/);
            const utilityClasses = classes.filter(c =>
              UTILITY_PATTERNS.some(p => p.test(c))
            );

            if (utilityClasses.length > 0) {
              violations.push({
                line: index + 1,
                column: match.index,
                message: `Utility classes "${utilityClasses.join(', ')}" on <${component}>`,
                suggestion: `Remove utility classes. The theme handles component styling.`
              });
            }
          }
        });
      });

      return violations;
    }
  },

  'no-tailwind': {
    name: 'No Tailwind CSS Classes',
    severity: 'error',
    check: (content, filePath) => {
      const violations = [];
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // Find className attributes
        const regex = /className=["'`]([^"'`]+)["'`]/g;
        let match;

        while ((match = regex.exec(line)) !== null) {
          const classes = match[1].split(/\s+/);
          const tailwindClasses = classes.filter(c =>
            TAILWIND_PATTERNS.some(p => p.test(c))
          );

          if (tailwindClasses.length > 0) {
            violations.push({
              line: index + 1,
              column: match.index,
              message: `Tailwind classes "${tailwindClasses.join(', ')}" detected`,
              suggestion: `Use semantic tokens for styling. Example: var(--spacing-4) for spacing.`
            });
          }
        }
      });

      return violations;
    }
  },

  'no-hardcoded-colors': {
    name: 'No Hardcoded Colors',
    severity: 'error',
    check: (content, filePath) => {
      const violations = [];
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // Check for hex colors
        const hexMatches = line.match(HEX_COLOR);
        if (hexMatches) {
          violations.push({
            line: index + 1,
            column: line.indexOf(hexMatches[0]),
            message: `Hardcoded hex color "${hexMatches[0]}"`,
            suggestion: `Use semantic token: var(--surface-neutral-primary) or var(--text-neutral-default)`
          });
        }

        // Check for rgb/rgba
        if (RGB_COLOR.test(line)) {
          violations.push({
            line: index + 1,
            column: line.search(RGB_COLOR),
            message: `Hardcoded RGB color detected`,
            suggestion: `Use semantic token: var(--surface-neutral-primary)`
          });
        }

        // Check for hsl/hsla
        if (HSL_COLOR.test(line)) {
          violations.push({
            line: index + 1,
            column: line.search(HSL_COLOR),
            message: `Hardcoded HSL color detected`,
            suggestion: `Use semantic token: var(--surface-neutral-primary)`
          });
        }
      });

      return violations;
    }
  },

  'semantic-tokens-only': {
    name: 'Semantic Tokens Only',
    severity: 'warning',
    check: (content, filePath) => {
      const violations = [];
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        // Check for foundation tokens
        const foundationTokens = line.match(/var\(--(blue|green|red|yellow|gray|purple|pink|indigo|teal|orange|cyan|bluegray)-\d+\)/g);
        if (foundationTokens) {
          foundationTokens.forEach(token => {
            violations.push({
              line: index + 1,
              column: line.indexOf(token),
              message: `Foundation token "${token}" in app code`,
              suggestion: `Use semantic token: var(--surface-brand-primary) or var(--text-neutral-default)`
            });
          });
        }
      });

      return violations;
    }
  },

  'valid-spacing': {
    name: 'Valid 4px Grid Spacing',
    severity: 'warning',
    check: (content, filePath) => {
      const violations = [];
      const lines = content.split('\n');

      const validPx = [0, 4, 8, 12, 16, 20, 24, 28, 32];
      const spacingProps = ['padding', 'margin', 'gap'];

      lines.forEach((line, index) => {
        spacingProps.forEach(prop => {
          // Check for px values
          const regex = new RegExp(`${prop}[^:]*:\\s*['"]?(\\d+)px`, 'g');
          let match;

          while ((match = regex.exec(line)) !== null) {
            const value = parseInt(match[1], 10);
            if (!validPx.includes(value) && value !== 1) {
              const nearest = validPx.reduce((prev, curr) =>
                Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
              );
              violations.push({
                line: index + 1,
                column: match.index,
                message: `Off-grid spacing: ${value}px`,
                suggestion: `Use nearest 4px grid value: ${nearest}px (${nearest / 16}rem)`
              });
            }
          }
        });

        // Check for hardcoded px values in style props that should use tokens
        const hardcodedSpacing = line.match(/(?:padding|margin|gap)\s*:\s*['"]?\d+px/g);
        if (hardcodedSpacing) {
          violations.push({
            line: index + 1,
            column: line.indexOf(hardcodedSpacing[0]),
            message: `Hardcoded spacing detected`,
            suggestion: `Use semantic tokens: var(--spacing-1) through var(--spacing-8)`
          });
        }
      });

      return violations;
    }
  },

  // Phase 6 Rules: Interaction Patterns
  ...Object.fromEntries(
    Object.entries(interactionPatternsRules).map(([key, rule]) => [
      key,
      {
        name: rule.name,
        severity: rule.severity,
        check: (content, filePath) => rule.validate(content, filePath)
      }
    ])
  ),

  // Phase 6 Rules: Accessibility
  ...Object.fromEntries(
    Object.entries(accessibilityRules).map(([key, rule]) => [
      key,
      {
        name: rule.name,
        severity: rule.severity,
        check: (content, filePath) => rule.validate(content, filePath)
      }
    ])
  )
};

/**
 * Find all relevant files in directory
 */
function findFiles(dir, extensions = ['.tsx', '.jsx', '.ts', '.js']) {
  const files = [];

  function walk(currentDir) {
    try {
      const entries = readdirSync(currentDir);

      entries.forEach(entry => {
        const fullPath = join(currentDir, entry);

        // Skip node_modules, .git, dist, build
        if (['node_modules', '.git', 'dist', 'build', '.next'].includes(entry)) {
          return;
        }

        try {
          const stat = statSync(fullPath);

          if (stat.isDirectory()) {
            walk(fullPath);
          } else if (extensions.includes(extname(fullPath))) {
            files.push(fullPath);
          }
        } catch (err) {
          // Skip files we can't access
        }
      });
    } catch (err) {
      // Skip directories we can't access
    }
  }

  walk(dir);
  return files;
}

/**
 * Run validation on a file
 */
function validateFile(filePath, rules) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const results = {};

    Object.entries(rules).forEach(([ruleId, rule]) => {
      const violations = rule.check(content, filePath);
      if (violations.length > 0) {
        results[ruleId] = {
          rule: rule.name,
          severity: rule.severity,
          violations
        };
      }
    });

    return results;
  } catch (err) {
    return { error: err.message };
  }
}

/**
 * Format validation results
 */
function formatResults(results, format = 'cli') {
  if (format === 'json') {
    return JSON.stringify(results, null, 2);
  }

  // CLI format
  let output = '\n';
  let totalViolations = 0;
  let errorCount = 0;
  let warningCount = 0;

  Object.entries(results).forEach(([filePath, fileResults]) => {
    if (fileResults.error) {
      output += `❌ Error reading ${filePath}: ${fileResults.error}\n`;
      return;
    }

    const violations = Object.values(fileResults);
    if (violations.length === 0) return;

    output += `\n📄 ${filePath}\n`;

    Object.entries(fileResults).forEach(([ruleId, result]) => {
      result.violations.forEach(violation => {
        totalViolations++;
        const icon = result.severity === 'error' ? '❌' : '⚠️';
        if (result.severity === 'error') errorCount++;
        else warningCount++;

        output += `  ${icon} ${result.rule}\n`;
        output += `     Line ${violation.line}, Col ${violation.column}\n`;
        output += `     ${violation.message}\n`;
        output += `     💡 ${violation.suggestion}\n\n`;
      });
    });
  });

  if (totalViolations === 0) {
    output += '✅ No violations found!\n\n';
  } else {
    output += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    output += `📊 Summary: ${totalViolations} violations found\n`;
    output += `   ${errorCount} errors, ${warningCount} warnings\n\n`;
  }

  return output;
}

/**
 * Main validate command
 */
export async function validateCommand(options = {}) {
  const cwd = options.cwd || process.cwd();
  const format = options.format || 'cli';
  const rulesFilter = options.rules ? options.rules.split(',') : Object.keys(RULES);

  console.log(`
🌳 Yggdrasil Design System Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 Scanning directory: ${cwd}
🔍 Active rules: ${rulesFilter.length}
`);

  // Filter rules
  const activeRules = {};
  rulesFilter.forEach(ruleId => {
    if (RULES[ruleId]) {
      activeRules[ruleId] = RULES[ruleId];
    }
  });

  // Find files
  const files = findFiles(cwd);
  console.log(`📝 Found ${files.length} files to check\n`);

  // Validate files
  const results = {};
  files.forEach(file => {
    const fileResults = validateFile(file, activeRules);
    if (Object.keys(fileResults).length > 0) {
      results[file] = fileResults;
    }
  });

  // Output results
  const output = formatResults(results, format);
  console.log(output);

  // Return results for programmatic use
  return results;
}
