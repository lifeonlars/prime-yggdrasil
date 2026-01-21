/**
 * Fix Component Colors
 *
 * Systematically replaces hardcoded hex colors with semantic tokens
 * in priority components.
 *
 * Run with: node scripts/fix-component-colors.js <component-name>
 * Example: node scripts/fix-component-colors.js dialog
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_CSS = path.join(__dirname, '..', 'src', 'theme', 'components.css');

/**
 * Color mappings based on CSS property context
 */
const COLOR_MAPPINGS = {
  // Neutral colors
  '#ffffff': {
    'background': '--surface-neutral-primary',
    'background-color': '--surface-neutral-primary',
    'color': '--text-onsurface-onbrand',
    'border': '--border-neutral-subdued',
    'border-color': '--border-neutral-subdued',
  },
  '#4b5563': {
    'color': '--text-neutral-default',
    'background': '--surface-neutral-tertiary',
    'background-color': '--surface-neutral-tertiary',
    'border-color': '--border-neutral-loud',
  },
  '#374151': {
    'color': '--text-neutral-loud',
    'background': '--surface-neutral-tertiary',
    'background-color': '--surface-neutral-tertiary',
  },
  '#6b7280': {
    'color': '--text-neutral-subdued',
    'border': '--border-neutral-default',
    'border-color': '--border-neutral-default',
  },
  '#9ca3af': {
    'color': '--text-neutral-muted',
    'border': '--border-neutral-subdued',
    'border-color': '--border-neutral-subdued',
  },
  '#d1d5db': {
    'border': '--border-neutral-default',
    'border-color': '--border-neutral-default',
    'background': '--surface-neutral-secondary',
    'background-color': '--surface-neutral-secondary',
  },
  '#e5e7eb': {
    'background': '--surface-neutral-secondary',
    'background-color': '--surface-neutral-secondary',
    'border': '--border-neutral-subdued',
    'border-color': '--border-neutral-subdued',
  },
  '#f3f4f6': {
    'background': '--surface-neutral-secondary',
    'background-color': '--surface-neutral-secondary',
  },
  '#f9fafb': {
    'background': '--surface-neutral-secondary',
    'background-color': '--surface-neutral-secondary',
  },
};

/**
 * Extract component selector pattern
 */
function getComponentPattern(componentName) {
  return new RegExp(`\\.p-${componentName}[\\w-]*\\s*\\{[^}]*\\}`, 'gs');
}

/**
 * Replace colors in component section
 */
function replaceColorsInComponent(content, componentName) {
  const lines = content.split('\n');
  let inComponent = false;
  let braceDepth = 0;
  let replacementCount = 0;
  const replacements = new Map();
  const skipped = [];

  const newLines = lines.map((line, index) => {
    const trimmed = line.trim();

    // Track if we're in the target component
    if (trimmed.includes(`.p-${componentName}`) && trimmed.includes('{')) {
      inComponent = true;
      braceDepth = (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
    } else if (inComponent) {
      braceDepth += (line.match(/{/g) || []).length;
      braceDepth -= (line.match(/}/g) || []).length;
      if (braceDepth <= 0) {
        inComponent = false;
      }
    }

    // Only replace if we're in the component
    if (!inComponent) {
      return line;
    }

    let newLine = line;

    // Find hex colors in this line
    const hexRegex = /#([0-9A-Fa-f]{3,8})\b/g;
    let match;
    const matches = [];

    while ((match = hexRegex.exec(line)) !== null) {
      matches.push({
        hex: `#${match[1]}`,
        index: match.index,
      });
    }

    // Replace each hex color
    matches.forEach(m => {
      const hexColor = m.hex.toLowerCase();

      // Extract CSS property
      const propMatch = line.match(/^\s*([\w-]+)\s*:/);
      const property = propMatch ? propMatch[1] : null;

      if (!property) {
        return;
      }

      // Check if we have a mapping
      const mappings = COLOR_MAPPINGS[hexColor];
      if (mappings && mappings[property]) {
        const semanticToken = mappings[property];
        newLine = newLine.replace(hexColor, `var(${semanticToken})`);
        replacementCount++;

        const key = `${hexColor} → var(${semanticToken}) [${property}]`;
        replacements.set(key, (replacements.get(key) || 0) + 1);
      } else {
        skipped.push({
          line: index + 1,
          hex: hexColor,
          property,
          context: trimmed,
        });
      }
    });

    return newLine;
  });

  return {
    content: newLines.join('\n'),
    replacementCount,
    replacements,
    skipped,
  };
}

/**
 * Main function
 */
function main() {
  const componentName = process.argv[2];

  if (!componentName) {
    console.error('Error: Component name required');
    console.log('Usage: node scripts/fix-component-colors.js <component-name>');
    console.log('Example: node scripts/fix-component-colors.js dialog');
    process.exit(1);
  }

  console.log(`\n=== Fixing ${componentName} component ===\n`);

  // Backup if not already done
  const backupPath = `${COMPONENTS_CSS}.backup`;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(COMPONENTS_CSS, backupPath);
    console.log(`Backup created: ${backupPath}\n`);
  }

  // Read file
  const content = fs.readFileSync(COMPONENTS_CSS, 'utf-8');

  // Replace colors
  const result = replaceColorsInComponent(content, componentName);

  if (result.replacementCount === 0) {
    console.log(`No replacements made. Component may not exist or already uses semantic tokens.\n`);
    return;
  }

  // Write updated content
  fs.writeFileSync(COMPONENTS_CSS, result.content);

  // Report
  console.log(`✅ Replaced ${result.replacementCount} colors\n`);

  if (result.replacements.size > 0) {
    console.log('Replacements made:');
    result.replacements.forEach((count, replacement) => {
      console.log(`  ${replacement}: ${count} uses`);
    });
    console.log('');
  }

  if (result.skipped.length > 0) {
    console.log(`⚠️  Skipped ${result.skipped.length} colors (no mapping or uncertain):\n`);
    result.skipped.slice(0, 5).forEach(s => {
      console.log(`  Line ${s.line}: ${s.hex} in ${s.property}`);
      console.log(`    ${s.context}`);
    });
    if (result.skipped.length > 5) {
      console.log(`  ... and ${result.skipped.length - 5} more`);
    }
    console.log('');
  }
}

// Run
main();
