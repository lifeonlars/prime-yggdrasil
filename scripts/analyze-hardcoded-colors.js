/**
 * Analyze Hardcoded Colors by Component
 *
 * Extracts all hardcoded hex colors from components.css
 * and groups them by component for systematic replacement.
 *
 * Run with: node scripts/analyze-hardcoded-colors.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_CSS = path.join(__dirname, '..', 'src', 'theme', 'components.css');

/**
 * Extract component name from CSS selector
 */
function extractComponentName(selector) {
  // Match .p-component-name patterns
  const match = selector.match(/\.p-([a-z]+)/);
  if (match) {
    return match[1];
  }
  return 'unknown';
}

/**
 * Parse components.css and extract hardcoded colors
 */
function analyzeHardcodedColors(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const colorsByComponent = new Map();
  const allColors = new Map();
  let currentComponent = 'unknown';
  let currentSelector = '';

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Track current selector
    if (trimmedLine.includes('{') && !trimmedLine.startsWith('/*')) {
      const selectorMatch = line.match(/([.#][\w-]+[^{]*)\{/);
      if (selectorMatch) {
        currentSelector = selectorMatch[1].trim();
        currentComponent = extractComponentName(currentSelector);
      }
    }

    // Find hex colors
    const hexRegex = /#([0-9A-Fa-f]{3,8})\b/g;
    let match;

    while ((match = hexRegex.exec(line)) !== null) {
      const hexColor = `#${match[1]}`;
      const lineNum = index + 1;

      // Extract CSS property
      const propMatch = line.match(/^\s*([\w-]+)\s*:/);
      const property = propMatch ? propMatch[1] : 'unknown';

      const usage = {
        lineNum,
        line: trimmedLine,
        selector: currentSelector,
        property,
        hexColor,
      };

      // Group by component
      if (!colorsByComponent.has(currentComponent)) {
        colorsByComponent.set(currentComponent, []);
      }
      colorsByComponent.get(currentComponent).push(usage);

      // Track all colors
      if (!allColors.has(hexColor)) {
        allColors.set(hexColor, []);
      }
      allColors.get(hexColor).push(usage);
    }
  });

  return { colorsByComponent, allColors };
}

/**
 * Priority components (from user's list)
 */
const PRIORITY_COMPONENTS = [
  'dialog',
  'checkbox',
  'radiobutton',
  'inputtext',
  'dropdown',
  'multiselect',
  'chip',
  'selectbutton',
  'avatar',
  'button', // outlined/link variants
];

/**
 * Main analysis function
 */
function runAnalysis() {
  console.log('\n=== Hardcoded Color Analysis ===\n');
  console.log(`Analyzing: ${COMPONENTS_CSS}\n`);

  const { colorsByComponent, allColors } = analyzeHardcodedColors(COMPONENTS_CSS);

  // Total counts
  const totalUsages = Array.from(allColors.values()).reduce((sum, arr) => sum + arr.length, 0);
  console.log(`Total hardcoded hex colors: ${totalUsages}`);
  console.log(`Unique hex values: ${allColors.size}`);
  console.log(`Components affected: ${colorsByComponent.size}\n`);

  // Priority components first
  console.log('=== Priority Components ===\n');

  PRIORITY_COMPONENTS.forEach(componentName => {
    const usages = colorsByComponent.get(componentName);
    if (usages && usages.length > 0) {
      console.log(`${componentName.toUpperCase()}: ${usages.length} hardcoded colors`);

      // Group by color
      const colorMap = new Map();
      usages.forEach(u => {
        if (!colorMap.has(u.hexColor)) {
          colorMap.set(u.hexColor, []);
        }
        colorMap.get(u.hexColor).push(u);
      });

      colorMap.forEach((instances, color) => {
        console.log(`  ${color} (${instances.length} uses)`);
        // Show first 2 examples
        instances.slice(0, 2).forEach(inst => {
          console.log(`    Line ${inst.lineNum}: ${inst.property}: ${color}`);
        });
      });
      console.log('');
    }
  });

  // Most common colors
  console.log('\n=== Most Common Hardcoded Colors ===\n');

  const sortedColors = Array.from(allColors.entries())
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10);

  sortedColors.forEach(([color, usages]) => {
    const components = new Set(usages.map(u => extractComponentName(u.selector)));
    console.log(`${color}: ${usages.length} uses across ${components.size} components`);
  });

  // Generate detailed report
  generateDetailedReport(colorsByComponent, allColors);

  console.log('\n📊 Detailed report saved to: hardcoded-colors-analysis.md\n');
}

/**
 * Generate markdown report
 */
function generateDetailedReport(colorsByComponent, allColors) {
  let md = '# Hardcoded Color Analysis\n\n';
  md += `**Date:** ${new Date().toISOString()}\n\n`;

  const totalUsages = Array.from(allColors.values()).reduce((sum, arr) => sum + arr.length, 0);
  md += `**Total Hardcoded Colors:** ${totalUsages}\n`;
  md += `**Unique Hex Values:** ${allColors.size}\n`;
  md += `**Components Affected:** ${colorsByComponent.size}\n\n`;

  md += '## Priority Components\n\n';
  md += 'These are the components mentioned by the user that need theming fixes.\n\n';

  PRIORITY_COMPONENTS.forEach(componentName => {
    const usages = colorsByComponent.get(componentName);
    if (usages && usages.length > 0) {
      md += `### ${componentName.charAt(0).toUpperCase() + componentName.slice(1)}\n\n`;
      md += `**Total hardcoded colors:** ${usages.length}\n\n`;

      // Group by color
      const colorMap = new Map();
      usages.forEach(u => {
        if (!colorMap.has(u.hexColor)) {
          colorMap.set(u.hexColor, []);
        }
        colorMap.get(u.hexColor).push(u);
      });

      md += '| Color | Property | Line | Context |\n';
      md += '|-------|----------|------|----------|\n';

      colorMap.forEach((instances, color) => {
        instances.forEach(inst => {
          md += `| \`${color}\` | \`${inst.property}\` | ${inst.lineNum} | \`${inst.selector}\` |\n`;
        });
      });

      md += '\n';
    }
  });

  md += '## All Components\n\n';
  md += '| Component | Hardcoded Colors |\n';
  md += '|-----------|------------------|\n';

  const sortedComponents = Array.from(colorsByComponent.entries())
    .sort((a, b) => b[1].length - a[1].length);

  sortedComponents.forEach(([component, usages]) => {
    md += `| ${component} | ${usages.length} |\n`;
  });

  const reportPath = path.join(__dirname, '..', 'hardcoded-colors-analysis.md');
  fs.writeFileSync(reportPath, md);
}

// Run analysis
runAnalysis();
