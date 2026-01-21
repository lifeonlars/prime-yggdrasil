/**
 * Foundation Variable Usage Audit
 *
 * Finds all direct uses of --foundation-* variables in component CSS files.
 * These should be replaced with semantic tokens for proper dark mode support.
 *
 * Run with: node scripts/audit-foundation-usage.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_CSS = path.join(__dirname, '..', 'src', 'theme', 'components.css');

/**
 * Extract all foundation variable usages with line numbers
 */
function auditFoundationUsage(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const usages = [];
  const varRegex = /var\(--foundation-([\w-]+)\)/g;

  lines.forEach((line, index) => {
    let match;
    varRegex.lastIndex = 0; // Reset regex
    while ((match = varRegex.exec(line)) !== null) {
      usages.push({
        lineNum: index + 1,
        line: line.trim(),
        variable: `--foundation-${match[1]}`,
        fullMatch: match[0],
      });
    }
  });

  return usages;
}

/**
 * Group usages by foundation variable
 */
function groupByVariable(usages) {
  const grouped = new Map();

  usages.forEach(usage => {
    if (!grouped.has(usage.variable)) {
      grouped.set(usage.variable, []);
    }
    grouped.get(usage.variable).push(usage);
  });

  return grouped;
}

/**
 * Suggest semantic token replacement
 */
function suggestReplacement(foundationVar, context) {
  // Common patterns
  const suggestions = {
    // Sky colors (brand primary)
    '--foundation-sky-700': '--surface-brand-primary or --text-state-interactive',
    '--foundation-sky-600': '--surface-brand-secondary or --text-state-interactive',
    '--foundation-sky-100': '--surface-brand-overlay or --border-state-focus',

    // Rock colors (neutral)
    '--foundation-rock-050': '--surface-neutral-secondary',
    '--foundation-rock-100': '--surface-neutral-tertiary',
    '--foundation-rock-200': '--border-neutral-default',
    '--foundation-rock-300': '--border-neutral-loud or --text-neutral-subdued',
    '--foundation-rock-400': '--text-neutral-muted',
    '--foundation-rock-600': '--text-neutral-default',

    // Special
    '--foundation-white': '--surface-neutral-primary (light) or --text-onsurface-*',
    '--foundation-black': '--surface-neutral-primary (dark) or --text-neutral-loud',
  };

  return suggestions[foundationVar] || 'Review context and choose appropriate semantic token';
}

/**
 * Main audit function
 */
function runAudit() {
  console.log('\n=== Foundation Variable Usage Audit ===\n');
  console.log(`Analyzing: ${COMPONENTS_CSS}\n`);

  const usages = auditFoundationUsage(COMPONENTS_CSS);
  const grouped = groupByVariable(usages);

  console.log(`Total foundation variable usages: ${usages.length}`);
  console.log(`Unique foundation variables: ${grouped.size}\n`);

  console.log('=== Usage Breakdown ===\n');

  // Sort by usage count
  const sortedVars = Array.from(grouped.entries())
    .sort((a, b) => b[1].length - a[1].length);

  sortedVars.forEach(([variable, instances]) => {
    console.log(`${variable} (${instances.length} uses)`);
    console.log(`  Suggested replacement: ${suggestReplacement(variable)}`);
    console.log(`  Sample lines:`);

    // Show first 3 instances
    instances.slice(0, 3).forEach(inst => {
      console.log(`    Line ${inst.lineNum}: ${inst.line.substring(0, 80)}${inst.line.length > 80 ? '...' : ''}`);
    });

    if (instances.length > 3) {
      console.log(`    ... and ${instances.length - 3} more`);
    }
    console.log('');
  });

  // Generate replacement report
  console.log('\n=== Priority Replacements ===\n');

  const highPriority = [
    '--foundation-sky-700',
    '--foundation-sky-600',
    '--foundation-sky-100',
    '--foundation-rock-200',
    '--foundation-rock-300',
  ];

  highPriority.forEach(varName => {
    const count = grouped.get(varName)?.length || 0;
    if (count > 0) {
      console.log(`${varName}: ${count} uses → ${suggestReplacement(varName)}`);
    }
  });

  // Generate markdown report
  generateMarkdownReport(usages, grouped);

  console.log('\n📊 Detailed report saved to: foundation-usage-audit.md\n');
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(usages, grouped) {
  let md = '# Foundation Variable Usage Audit\n\n';
  md += `**Date:** ${new Date().toISOString()}\n\n`;
  md += `**Total Usages:** ${usages.length}\n`;
  md += `**Unique Variables:** ${grouped.size}\n\n`;

  md += '## Summary\n\n';
  md += 'Components.css still contains direct references to foundation variables. ';
  md += 'These should be replaced with semantic tokens to support proper dark mode theming.\n\n';

  md += '## Usage by Variable\n\n';
  md += '| Variable | Count | Suggested Replacement |\n';
  md += '|----------|-------|----------------------|\n';

  const sortedVars = Array.from(grouped.entries())
    .sort((a, b) => b[1].length - a[1].length);

  sortedVars.forEach(([variable, instances]) => {
    md += `| \`${variable}\` | ${instances.length} | ${suggestReplacement(variable)} |\n`;
  });

  md += '\n## All Usages\n\n';

  sortedVars.forEach(([variable, instances]) => {
    md += `### ${variable} (${instances.length} uses)\n\n`;
    md += `**Suggested:** ${suggestReplacement(variable)}\n\n`;
    md += '**Locations:**\n\n';

    instances.forEach(inst => {
      md += `- Line ${inst.lineNum}: \`${inst.line}\`\n`;
    });

    md += '\n';
  });

  const reportPath = path.join(__dirname, '..', 'foundation-usage-audit.md');
  fs.writeFileSync(reportPath, md);
}

// Run audit
runAudit();
