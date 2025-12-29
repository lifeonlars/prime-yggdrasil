/**
 * APCA Contrast Testing Script
 *
 * Standalone script to test WCAG 3.0 APCA contrast compliance
 * Run with: node scripts/test-contrast.js
 */

import { APCAcontrast, sRGBtoY } from 'apca-w3';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// APCA Thresholds
const APCA_THRESHOLDS = {
  body: 60,      // 16px text - Lc 60 minimum
  large: 45,     // 24px+ text - Lc 45 minimum
  ui: 75,        // UI components - Lc 75 minimum
  heading: 60,   // Headings - Lc 60 minimum
};

// Contrast pairs to test
const CONTRAST_PAIRS = [
  // Primary text on primary surfaces
  {
    name: 'Default text on primary surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
  },
  {
    name: 'Loud text on primary surface',
    textVar: '--text-neutral-loud',
    surfaceVar: '--surface-neutral-primary',
    category: 'heading',
  },
  {
    name: 'Subdued text on primary surface',
    textVar: '--text-neutral-subdued',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
  },
  // Text on secondary surfaces
  {
    name: 'Default text on secondary surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-neutral-secondary',
    category: 'body',
  },
  // Text on tertiary surfaces
  {
    name: 'Default text on tertiary surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-neutral-tertiary',
    category: 'body',
  },
  // Brand/Primary interactions
  {
    name: 'Text on brand primary',
    textVar: '--text-onsurface-onbrand',
    surfaceVar: '--surface-brand-primary',
    category: 'ui',
  },
  // Context/Severity - Info
  {
    name: 'Text on info surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-info',
    category: 'ui',
  },
  // Context/Severity - Success
  {
    name: 'Text on success surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-success',
    category: 'ui',
  },
  // Context/Severity - Warning
  {
    name: 'Text on warning surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-warning',
    category: 'ui',
  },
  // Context/Severity - Danger/Error
  {
    name: 'Text on danger surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-danger',
    category: 'ui',
  },
  // PrimeReact specific mappings
  {
    name: 'Primary color text',
    textVar: '--primary-color-text',
    surfaceVar: '--primary-color',
    category: 'ui',
  },
  {
    name: 'Text color on surface-a',
    textVar: '--text-color',
    surfaceVar: '--surface-a',
    category: 'body',
  },
];

/**
 * Parse color string to RGB array
 */
function parseColor(cssColor) {
  const color = cssColor.trim();

  // Handle hex colors
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    if (hex.length === 8) {
      hex = hex.slice(0, 6);
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }

  // Handle rgb() and rgba()
  const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return [
      parseInt(rgbMatch[1]),
      parseInt(rgbMatch[2]),
      parseInt(rgbMatch[3]),
    ];
  }

  // Handle named colors
  const namedColors = {
    white: [255, 255, 255],
    black: [0, 0, 0],
  };
  const lowerColor = color.toLowerCase();
  if (lowerColor in namedColors) {
    return namedColors[lowerColor];
  }

  console.warn(`Cannot parse color: ${cssColor}`);
  return null;
}

/**
 * Calculate APCA contrast
 */
function calculateContrast(textColor, bgColor) {
  const textRGB = parseColor(textColor);
  const bgRGB = parseColor(bgColor);

  if (!textRGB || !bgRGB) {
    return null;
  }

  const textY = sRGBtoY(textRGB);
  const bgY = sRGBtoY(bgRGB);
  const contrast = APCAcontrast(textY, bgY);

  return Math.abs(contrast);
}

/**
 * Parse CSS variables from file content
 */
function parseCSSVariables(cssContent) {
  const variables = new Map();
  const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const varName = `--${match[1]}`;
    let value = match[2].trim();
    value = value.replace(/\/\*.*?\*\//g, '').trim();
    variables.set(varName, value);
  }

  return variables;
}

/**
 * Resolve CSS variable references
 */
function resolveVariable(varName, variables, visited = new Set()) {
  if (visited.has(varName)) {
    return '';
  }

  const value = variables.get(varName);
  if (!value) {
    return '';
  }

  const varMatch = value.match(/var\((--[a-z0-9-]+)\)/i);
  if (varMatch) {
    visited.add(varName);
    return resolveVariable(varMatch[1], variables, visited);
  }

  return value;
}

/**
 * Load theme files
 */
function loadTheme(themeName) {
  const themeDir = path.join(__dirname, '..', 'src', 'theme');
  const foundationsPath = path.join(themeDir, 'foundations.css');
  const semanticPath = path.join(themeDir, `semantic-${themeName}.css`);

  const foundationsContent = fs.readFileSync(foundationsPath, 'utf-8');
  const semanticContent = fs.readFileSync(semanticPath, 'utf-8');

  const foundationVars = parseCSSVariables(foundationsContent);
  const semanticVars = parseCSSVariables(semanticContent);

  const allVars = new Map(foundationVars);
  semanticVars.forEach((value, key) => {
    allVars.set(key, value);
  });

  return allVars;
}

/**
 * Test a single contrast pair
 */
function testContrastPair(pair, variables, themeName) {
  const textColor = resolveVariable(pair.textVar, variables);
  const surfaceColor = resolveVariable(pair.surfaceVar, variables);

  if (!textColor || !surfaceColor) {
    return {
      ...pair,
      themeName,
      textColor: textColor || 'NOT FOUND',
      surfaceColor: surfaceColor || 'NOT FOUND',
      contrastValue: 0,
      minRequired: APCA_THRESHOLDS[pair.category],
      passes: false,
      error: 'Variable not found',
    };
  }

  const contrastValue = calculateContrast(textColor, surfaceColor);
  const minRequired = APCA_THRESHOLDS[pair.category];

  return {
    ...pair,
    themeName,
    textColor,
    surfaceColor,
    contrastValue: contrastValue || 0,
    minRequired,
    passes: contrastValue && contrastValue >= minRequired,
  };
}

/**
 * Main test function
 */
function runContrastTests() {
  console.log('\n=== APCA Contrast Test ===\n');

  const lightTheme = loadTheme('light');
  const darkTheme = loadTheme('dark');

  const results = [];

  console.log('Testing Light Theme...');
  CONTRAST_PAIRS.forEach(pair => {
    const result = testContrastPair(pair, lightTheme, 'light');
    results.push(result);
  });

  console.log('Testing Dark Theme...');
  CONTRAST_PAIRS.forEach(pair => {
    const result = testContrastPair(pair, darkTheme, 'dark');
    results.push(result);
  });

  // Report results
  const passing = results.filter(r => r.passes);
  const failing = results.filter(r => !r.passes);

  console.log(`\n=== Results ===`);
  console.log(`Total: ${results.length}`);
  console.log(`Passing: ${passing.length} ✓`);
  console.log(`Failing: ${failing.length} ✗`);
  console.log(`Success Rate: ${((passing.length / results.length) * 100).toFixed(1)}%`);

  if (failing.length > 0) {
    console.log(`\n=== Failing Contrasts ===\n`);
    failing.forEach(result => {
      console.log(`[${result.themeName.toUpperCase()}] ${result.name} (${result.category})`);
      console.log(`  Text: ${result.textColor} (${result.textVar})`);
      console.log(`  Surface: ${result.surfaceColor} (${result.surfaceVar})`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      } else {
        console.log(`  Contrast: Lc ${result.contrastValue.toFixed(1)} (need Lc ${result.minRequired})`);
        console.log(`  Deficit: Lc ${(result.minRequired - result.contrastValue).toFixed(1)}`);
      }
      console.log('');
    });
  }

  // Generate markdown report
  const reportPath = path.join(__dirname, '..', 'contrast-report.md');
  const report = generateMarkdownReport(results);
  fs.writeFileSync(reportPath, report);
  console.log(`\n📊 Report saved to: ${reportPath}\n`);

  // Exit with appropriate code
  if (failing.length > 0) {
    console.log(`⚠️  ${failing.length} contrast issues detected but not blocking build.`);
    console.log(`   To enforce contrast requirements, modify this script to exit with code 1.\n`);
    process.exit(0); // Exit with 0 for now (warnings only)
  } else {
    console.log(`✅ All contrast tests passed!\n`);
    process.exit(0);
  }
}

/**
 * Generate markdown report
 */
function generateMarkdownReport(results) {
  const failing = results.filter(r => !r.passes);
  const passing = results.filter(r => r.passes);

  let md = '# APCA Contrast Test Report\n\n';
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Total Tests:** ${results.length}\n`;
  md += `**Passing:** ${passing.length} ✓\n`;
  md += `**Failing:** ${failing.length} ✗\n`;
  md += `**Success Rate:** ${((passing.length / results.length) * 100).toFixed(1)}%\n\n`;

  if (failing.length > 0) {
    md += '## Failing Contrasts\n\n';
    md += '| Theme | Pair | Category | Text Color | Surface Color | Contrast | Required | Deficit |\n';
    md += '|-------|------|----------|------------|---------------|----------|----------|----------|\n';

    failing.forEach(result => {
      md += `| ${result.themeName} `;
      md += `| ${result.name} `;
      md += `| ${result.category} `;
      md += `| ${result.textColor} `;
      md += `| ${result.surfaceColor} `;
      md += `| Lc ${result.contrastValue.toFixed(1)} `;
      md += `| Lc ${result.minRequired} `;
      md += `| Lc ${(result.minRequired - result.contrastValue).toFixed(1)} |\n`;
    });

    md += '\n';
  }

  return md;
}

// Run tests
runContrastTests();
