/**
 * Replace Foundation Variables with Semantic Tokens
 *
 * Intelligently replaces foundation variables in components.css
 * with appropriate semantic tokens based on CSS property context.
 *
 * Run with: node scripts/replace-foundation-vars.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_CSS = path.join(__dirname, '..', 'src', 'theme', 'components.css');
const BACKUP_PATH = path.join(__dirname, '..', 'src', 'theme', 'components.css.backup');

/**
 * Determine semantic token replacement based on CSS property
 */
function getSemanticReplacement(foundationVar, cssProperty, fullLine) {
  const prop = cssProperty.toLowerCase();

  // --foundation-sky-100 (light blue, low opacity)
  if (foundationVar === '--foundation-sky-100') {
    if (prop.includes('box-shadow') || prop.includes('shadow')) {
      // Focus rings and shadows
      return '--surface-brand-overlay';
    }
    if (prop.includes('background')) {
      // Light background for chips, tokens, etc.
      return '--surface-brand-overlay';
    }
    if (prop.includes('border')) {
      return '--border-state-focus';
    }
    return '--surface-brand-overlay';
  }

  // --foundation-sky-600 (medium blue)
  if (foundationVar === '--foundation-sky-600') {
    if (prop.includes('color') && !prop.includes('background') && !prop.includes('border')) {
      // Text color
      return '--text-state-interactive';
    }
    if (prop.includes('background')) {
      return '--surface-brand-secondary';
    }
    if (prop.includes('border')) {
      return '--border-state-interactive';
    }
    return '--text-state-interactive';
  }

  // --foundation-sky-700 (dark blue, primary brand)
  if (foundationVar === '--foundation-sky-700') {
    if (prop.includes('color') && !prop.includes('background') && !prop.includes('border')) {
      // Text color
      return '--text-state-interactive';
    }
    if (prop.includes('background')) {
      return '--surface-brand-primary';
    }
    if (prop.includes('border')) {
      return '--border-state-interactive';
    }
    return '--surface-brand-primary';
  }

  // Fallback
  return foundationVar;
}

/**
 * Parse CSS and replace foundation variables
 */
function replaceFoundationVariables(content) {
  const lines = content.split('\n');
  let replacementCount = 0;
  const replacements = new Map();

  const newLines = lines.map((line, index) => {
    let newLine = line;
    const varRegex = /var\(--foundation-([\w-]+)\)/g;
    let match;

    // Find all foundation variables in this line
    const matches = [];
    while ((match = varRegex.exec(line)) !== null) {
      matches.push({
        fullMatch: match[0],
        variable: `--foundation-${match[1]}`,
        index: match.index,
      });
    }

    // Replace each match
    matches.forEach(m => {
      // Extract CSS property from line
      const propertyMatch = line.match(/^\s*([\w-]+)\s*:/);
      const cssProperty = propertyMatch ? propertyMatch[1] : '';

      const semanticToken = getSemanticReplacement(m.variable, cssProperty, line);

      if (semanticToken !== m.variable) {
        newLine = newLine.replace(m.fullMatch, `var(${semanticToken})`);
        replacementCount++;

        // Track replacement stats
        const key = `${m.variable} → ${semanticToken}`;
        replacements.set(key, (replacements.get(key) || 0) + 1);
      }
    });

    return newLine;
  });

  return {
    content: newLines.join('\n'),
    count: replacementCount,
    replacements,
  };
}

/**
 * Main function
 */
function main() {
  console.log('\n=== Foundation Variable Replacement ===\n');

  // Backup original file
  console.log('Creating backup...');
  fs.copyFileSync(COMPONENTS_CSS, BACKUP_PATH);
  console.log(`Backup saved to: ${BACKUP_PATH}\n`);

  // Read file
  const content = fs.readFileSync(COMPONENTS_CSS, 'utf-8');

  // Count original foundation variables
  const originalCount = (content.match(/var\(--foundation-/g) || []).length;
  console.log(`Original foundation variable usages: ${originalCount}\n`);

  // Perform replacements
  console.log('Replacing foundation variables with semantic tokens...\n');
  const result = replaceFoundationVariables(content);

  // Write updated content
  fs.writeFileSync(COMPONENTS_CSS, result.content);

  // Verify
  const newContent = fs.readFileSync(COMPONENTS_CSS, 'utf-8');
  const remainingCount = (newContent.match(/var\(--foundation-/g) || []).length;

  // Report
  console.log('=== Replacement Summary ===\n');
  console.log(`Total replacements: ${result.count}`);
  console.log(`Remaining foundation variables: ${remainingCount}\n`);

  console.log('Replacements by type:\n');
  const sortedReplacements = Array.from(result.replacements.entries())
    .sort((a, b) => b[1] - a[1]);

  sortedReplacements.forEach(([replacement, count]) => {
    console.log(`  ${replacement}: ${count} uses`);
  });

  if (remainingCount === 0) {
    console.log('\n✅ All foundation variables successfully replaced!\n');
  } else {
    console.log(`\n⚠️  ${remainingCount} foundation variables still remain. Manual review needed.\n`);
  }

  console.log(`Original file backed up to: ${BACKUP_PATH}`);
  console.log('If you need to revert: mv components.css.backup components.css\n');
}

// Run
main();
