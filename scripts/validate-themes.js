/**
 * Theme Structure Validation Script
 *
 * Ensures semantic-light.css and semantic-dark.css stay synchronized:
 * - Same number of tokens
 * - Same token names in same order
 * - No hardcoded colors in semantic files
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
const LIGHT_THEME = path.join(THEME_DIR, 'semantic-light.css');
const DARK_THEME = path.join(THEME_DIR, 'semantic-dark.css');

/**
 * Parse CSS file and extract token names (not values)
 */
function parseTokenNames(cssContent) {
  const tokens = [];
  const varRegex = /--([\w-]+)\s*:/g;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const tokenName = `--${match[1]}`;
    tokens.push(tokenName);
  }

  return tokens;
}

/**
 * Parse CSS file and extract token name-value pairs
 */
function parseTokens(cssContent) {
  const tokens = new Map();
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const tokenName = `--${match[1]}`;
    const value = match[2].trim().replace(/\/\*.*?\*\//g, '').trim();
    tokens.set(tokenName, value);
  }

  return tokens;
}

/**
 * Check if a value is a hardcoded color (hex, rgb, hsl)
 */
function isHardcodedColor(value) {
  // Check for hex colors
  if (/#[0-9A-Fa-f]{3,8}/.test(value)) {
    return true;
  }

  // Check for rgb/rgba/hsl/hsla functions
  if (/rgba?\s*\(|hsla?\s*\(/.test(value)) {
    return true;
  }

  return false;
}

/**
 * Check if token follows semantic naming convention
 */
function isSemanticToken(tokenName) {
  const validPrefixes = [
    '--surface-',
    '--text-',
    '--border-',
    '--icon-',
    '--severity-',
    '--context-',
    '--font-',
    '--primary-',
    '--p-',
    '--transition-',
    '--border-radius',
    '--content-padding',
    '--inline-spacing',
    '--disabled-opacity',
    '--focus-ring',
    '--mask-bg',
    '--highlight-',
    '--charts-',
  ];

  return validPrefixes.some(prefix => tokenName.startsWith(prefix));
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

  // Read theme files
  const lightContent = fs.readFileSync(LIGHT_THEME, 'utf-8');
  const darkContent = fs.readFileSync(DARK_THEME, 'utf-8');

  // Parse all tokens
  const lightTokens = parseTokens(lightContent);
  const darkTokens = parseTokens(darkContent);

  // Extract semantic tokens only (exclude palette)
  const lightSemantic = extractSemanticTokens(lightTokens);
  const darkSemantic = extractSemanticTokens(darkTokens);

  console.log(`Light theme: ${lightSemantic.size} semantic tokens`);
  console.log(`Dark theme: ${darkSemantic.size} semantic tokens`);

  // Validation 1: Check token count
  if (lightSemantic.size !== darkSemantic.size) {
    console.error(`\n❌ Token count mismatch:`);
    console.error(`   Light: ${lightSemantic.size} tokens`);
    console.error(`   Dark: ${darkSemantic.size} tokens`);
    hasErrors = true;
  }

  // Validation 2: Check token names match
  const lightNames = Array.from(lightSemantic.keys());
  const darkNames = Array.from(darkSemantic.keys());

  const lightOnly = lightNames.filter(name => !darkSemantic.has(name));
  const darkOnly = darkNames.filter(name => !lightSemantic.has(name));

  if (lightOnly.length > 0) {
    console.error(`\n❌ Tokens only in light theme:`);
    lightOnly.forEach(name => console.error(`   - ${name}`));
    hasErrors = true;
  }

  if (darkOnly.length > 0) {
    console.error(`\n❌ Tokens only in dark theme:`);
    darkOnly.forEach(name => console.error(`   - ${name}`));
    hasErrors = true;
  }

  // Validation 3: Check for hardcoded colors in semantic tokens
  const lightHardcoded = [];
  const darkHardcoded = [];

  for (const [name, value] of lightSemantic.entries()) {
    if (isHardcodedColor(value)) {
      lightHardcoded.push({ name, value });
    }
  }

  for (const [name, value] of darkSemantic.entries()) {
    if (isHardcodedColor(value)) {
      darkHardcoded.push({ name, value });
    }
  }

  if (lightHardcoded.length > 0) {
    console.warn(`\n⚠️  Hardcoded colors in light theme semantic tokens:`);
    lightHardcoded.forEach(({ name, value }) => {
      console.warn(`   ${name}: ${value}`);
    });
    warnings.push(`${lightHardcoded.length} hardcoded colors in light theme`);
  }

  if (darkHardcoded.length > 0) {
    console.warn(`\n⚠️  Hardcoded colors in dark theme semantic tokens:`);
    darkHardcoded.forEach(({ name, value }) => {
      console.warn(`   ${name}: ${value}`);
    });
    warnings.push(`${darkHardcoded.length} hardcoded colors in dark theme`);
  }

  // Validation 4: Check semantic naming convention
  const lightInvalid = [];
  const darkInvalid = [];

  for (const name of lightNames) {
    if (!isSemanticToken(name) && !isPaletteToken(name)) {
      lightInvalid.push(name);
    }
  }

  for (const name of darkNames) {
    if (!isSemanticToken(name) && !isPaletteToken(name)) {
      darkInvalid.push(name);
    }
  }

  if (lightInvalid.length > 0) {
    console.warn(`\n⚠️  Non-semantic token names in light theme:`);
    lightInvalid.forEach(name => console.warn(`   ${name}`));
    warnings.push(`${lightInvalid.length} non-semantic tokens in light theme`);
  }

  if (darkInvalid.length > 0) {
    console.warn(`\n⚠️  Non-semantic token names in dark theme:`);
    darkInvalid.forEach(name => console.warn(`   ${name}`));
    warnings.push(`${darkInvalid.length} non-semantic tokens in dark theme`);
  }

  // Summary
  console.log(`\n=== Validation Summary ===`);

  if (!hasErrors && warnings.length === 0) {
    console.log(`✅ All validations passed!`);
    console.log(`   - Token counts match (${lightSemantic.size} each)`);
    console.log(`   - Token names match`);
    console.log(`   - No hardcoded colors in semantic tokens`);
    console.log(`   - All tokens follow naming convention\n`);
    process.exit(0);
  }

  if (hasErrors) {
    console.log(`\n❌ Validation failed with ${hasErrors ? 'errors' : '0 errors'}`);
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} warning(s):`);
    warnings.forEach(w => console.log(`   - ${w}`));
  }

  console.log('');

  // Exit with 0 for now (warnings only), change to 1 to block builds
  process.exit(hasErrors ? 1 : 0);
}

// Run validation
validateThemes();
