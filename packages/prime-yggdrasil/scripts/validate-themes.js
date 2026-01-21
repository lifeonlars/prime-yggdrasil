/**
 * Theme Structure Validation Script
 *
 * Ensures theme.css has both light and dark theme blocks:
 * - Both [data-theme="light"] and [data-theme="dark"] blocks exist
 * - Same number of tokens in each theme
 * - Same token names in both themes
 * - No hardcoded colors (must use foundation variables)
 * - All tokens follow naming convention
 *
 * Run with: node scripts/validate-themes.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const THEME_DIR = path.join(__dirname, '..', 'src', 'theme');
const THEME_FILE = path.join(THEME_DIR, 'theme.css');

/**
 * Parse CSS file and extract tokens from a specific selector block
 */
function parseTokensFromBlock(cssContent, selector) {
  const tokens = new Map();

  // Find the block for this selector
  const selectorPattern = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blockRegex = new RegExp(`${selectorPattern}\\s*\\{([^}]+(?:\\{[^}]*\\}[^}]*)*)\\}`, 's');
  const match = cssContent.match(blockRegex);

  if (!match) {
    throw new Error(`Could not find selector block: ${selector}`);
  }

  const blockContent = match[1];

  // Extract tokens from block
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let tokenMatch;

  while ((tokenMatch = varRegex.exec(blockContent)) !== null) {
    const tokenName = `--${tokenMatch[1]}`;
    const value = tokenMatch[2].trim().replace(/\/\*.*?\*\//g, '').trim();
    tokens.set(tokenName, value);
  }

  return tokens;
}

/**
 * Parse CSS file and extract token names only
 */
function parseTokenNames(cssContent, selector) {
  const tokens = parseTokensFromBlock(cssContent, selector);
  return Array.from(tokens.keys());
}

/**
 * Check if token value uses hardcoded color
 */
function hasHardcodedColor(value) {
  // Ignore var() references - these are fine
  if (value.includes('var(--foundation-') || value.includes('var(--p-')) {
    return false;
  }

  // Check for hardcoded hex colors
  if (/#[0-9A-Fa-f]{3,8}/.test(value)) {
    return true;
  }

  // Check for rgb/rgba
  if (/rgba?\(/.test(value)) {
    // Allow rgba for shadows/overlays with alpha
    if (value.includes('shadow') || value.includes('overlay')) {
      return false;
    }
    return true;
  }

  // Check for hsl/hsla
  if (/hsla?\(/.test(value)) {
    return true;
  }

  return false;
}

/**
 * Extract only semantic tokens (exclude PrimeReact palette)
 */
function extractSemanticTokens(tokens) {
  const semantic = new Map();

  for (const [name, value] of tokens.entries()) {
    // Skip PrimeReact palette tokens (blue-*, cyan-*, etc.)
    if (isPaletteToken(name)) {
      continue;
    }

    semantic.set(name, value);
  }

  return semantic;
}

/**
 * Check if token is a PrimeReact palette token
 */
function isPaletteToken(tokenName) {
  const paletteColors = [
    'blue', 'cyan', 'green', 'yellow', 'orange', 'red',
    'pink', 'purple', 'indigo', 'teal', 'gray'
  ];

  for (const color of paletteColors) {
    if (tokenName.startsWith(`--${color}-`) || tokenName.startsWith(`--p-${color}-`)) {
      return true;
    }
  }

  return false;
}

/**
 * Main validation function
 */
function validateThemes() {
  console.log('\n=== Theme Structure Validation ===\n');

  let hasErrors = false;
  const warnings = [];

  // Read theme file
  if (!fs.existsSync(THEME_FILE)) {
    console.error(`❌ ERROR: theme.css not found at ${THEME_FILE}`);
    process.exit(1);
  }

  const themeContent = fs.readFileSync(THEME_FILE, 'utf-8');

  // Check that both theme blocks exist
  console.log('✓ Checking theme blocks exist...');

  const hasLightBlock = /\[data-theme="light"\]\s*\{/.test(themeContent);
  const hasDarkBlock = /\[data-theme="dark"\]\s*\{/.test(themeContent);

  if (!hasLightBlock) {
    console.error('❌ ERROR: Missing [data-theme="light"] block');
    hasErrors = true;
  }

  if (!hasDarkBlock) {
    console.error('❌ ERROR: Missing [data-theme="dark"] block');
    hasErrors = true;
  }

  if (hasErrors) {
    process.exit(1);
  }

  // Parse both theme blocks
  console.log('✓ Parsing theme tokens...');

  let lightTokens, darkTokens;
  try {
    lightTokens = parseTokensFromBlock(themeContent, '[data-theme="light"]');
    darkTokens = parseTokensFromBlock(themeContent, '[data-theme="dark"]');
  } catch (error) {
    console.error(`❌ ERROR: Failed to parse theme blocks: ${error.message}`);
    process.exit(1);
  }

  const lightSemanticTokens = extractSemanticTokens(lightTokens);
  const darkSemanticTokens = extractSemanticTokens(darkTokens);

  console.log(`  Light theme: ${lightSemanticTokens.size} semantic tokens`);
  console.log(`  Dark theme: ${darkSemanticTokens.size} semantic tokens`);

  // 1. Check token count matches
  console.log('\n✓ Checking token counts match...');
  if (lightSemanticTokens.size !== darkSemanticTokens.size) {
    console.error(`❌ ERROR: Token count mismatch`);
    console.error(`  Light: ${lightSemanticTokens.size} tokens`);
    console.error(`  Dark: ${darkSemanticTokens.size} tokens`);
    hasErrors = true;
  } else {
    console.log(`  ✓ Both themes have ${lightSemanticTokens.size} tokens`);
  }

  // 2. Check all tokens exist in both themes
  console.log('\n✓ Checking token names match...');
  const lightNames = new Set(lightSemanticTokens.keys());
  const darkNames = new Set(darkSemanticTokens.keys());

  const onlyInLight = [...lightNames].filter(name => !darkNames.has(name));
  const onlyInDark = [...darkNames].filter(name => !lightNames.has(name));

  if (onlyInLight.length > 0) {
    console.error(`❌ ERROR: Tokens only in light theme:`);
    onlyInLight.forEach(name => console.error(`  - ${name}`));
    hasErrors = true;
  }

  if (onlyInDark.length > 0) {
    console.error(`❌ ERROR: Tokens only in dark theme:`);
    onlyInDark.forEach(name => console.error(`  - ${name}`));
    hasErrors = true;
  }

  if (onlyInLight.length === 0 && onlyInDark.length === 0) {
    console.log(`  ✓ All token names match between themes`);
  }

  // 3. Check for hardcoded colors
  console.log('\n✓ Checking for hardcoded colors...');
  const lightHardcoded = [];
  const darkHardcoded = [];

  for (const [name, value] of lightSemanticTokens.entries()) {
    if (hasHardcodedColor(value)) {
      lightHardcoded.push({ name, value });
    }
  }

  for (const [name, value] of darkSemanticTokens.entries()) {
    if (hasHardcodedColor(value)) {
      darkHardcoded.push({ name, value });
    }
  }

  if (lightHardcoded.length > 0) {
    console.warn(`⚠ WARNING: Hardcoded colors in light theme:`);
    lightHardcoded.forEach(({ name, value }) => {
      console.warn(`  ${name}: ${value}`);
      warnings.push(`Hardcoded color in light theme: ${name}`);
    });
  }

  if (darkHardcoded.length > 0) {
    console.warn(`⚠ WARNING: Hardcoded colors in dark theme:`);
    darkHardcoded.forEach(({ name, value }) => {
      console.warn(`  ${name}: ${value}`);
      warnings.push(`Hardcoded color in dark theme: ${name}`);
    });
  }

  if (lightHardcoded.length === 0 && darkHardcoded.length === 0) {
    console.log(`  ✓ No hardcoded colors found`);
  }

  // 4. Check naming convention
  console.log('\n✓ Checking token naming conventions...');
  const validPrefixes = [
    'surface-', 'text-', 'border-', 'icon-', 'elevation-',
    'font-', 'radius-', 'spacing-', 'primary-', 'surface-'
  ];

  const invalidNames = [];

  for (const name of lightNames) {
    const tokenName = name.replace('--', '');
    const hasValidPrefix = validPrefixes.some(prefix => tokenName.startsWith(prefix));

    if (!hasValidPrefix && !isPaletteToken(name)) {
      invalidNames.push(name);
    }
  }

  if (invalidNames.length > 0) {
    console.warn(`⚠ WARNING: Tokens with non-standard naming:`);
    invalidNames.forEach(name => {
      console.warn(`  ${name}`);
      warnings.push(`Non-standard naming: ${name}`);
    });
  } else {
    console.log(`  ✓ All tokens follow naming convention`);
  }

  // Summary
  console.log('\n=== Validation Summary ===\n');

  if (hasErrors) {
    console.error('❌ FAILED: Theme validation found errors');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.warn(`⚠ PASSED with warnings: ${warnings.length} warning(s)`);
    console.log('\n✓ Core structure is valid');
    process.exit(0);
  } else {
    console.log('✅ SUCCESS: All validation checks passed!');
    console.log(`\n  Total semantic tokens: ${lightSemanticTokens.size}`);
    console.log(`  Both themes synchronized`);
    console.log(`  No hardcoded colors`);
    console.log(`  All naming conventions followed`);
    process.exit(0);
  }
}

// Run validation
validateThemes();
