/**
 * Script to fix semantic token usage in theme files
 *
 * This script:
 * 1. Adds missing semantic tokens to :root sections
 * 2. Fixes foundation variable references in component classes
 * 3. Fixes surface/text/border semantic mismatches (e.g., color: var(--surface-*))
 */

const fs = require('fs');
const path = require('path');

// Additional semantic tokens to add to dark theme
const DARK_THEME_ADDITIONS = `
  /* Additional semantic tokens for component styling */
  --text-brand-accent: var(--foundation-berries-400);
  --text-brand-primary: var(--foundation-sky-300);

  --surface-state-disabled: var(--foundation-rock-800);
`;

// Additional semantic tokens to add to light theme
const LIGHT_THEME_ADDITIONS = `
  /* Additional semantic tokens for component styling */
  --text-brand-accent: var(--foundation-berries-600);
  --text-brand-primary: var(--foundation-sky-600);

  --surface-state-disabled: var(--foundation-rock-100);
`;

// Mappings for DARK theme component classes
const DARK_COMPONENT_FIXES = {
  // Foundation colors that should be semantic
  'var(--foundation-rock-900)': 'var(--surface-neutral-secondary)',
  'var(--foundation-rock-950)': 'var(--surface-neutral-tertiary)',
  'var(--foundation-black)': 'var(--surface-input-primary)',

  // White for text/icons
  'color: var(--foundation-white)': 'color: var(--text-neutral-loud)',
  'stroke: var(--foundation-white)': 'stroke: var(--icon-neutral-loud)',
  'fill: var(--foundation-white)': 'fill: var(--icon-neutral-loud)',

  // Rock-050 for text/icons
  'color: var(--foundation-rock-050)': 'color: var(--text-neutral-default)',
  'stroke: var(--foundation-rock-050)': 'stroke: var(--icon-neutral-default)',
  'fill: var(--foundation-rock-050)': 'fill: var(--icon-neutral-default)',

  // Rock-400 for subdued text/icons
  'color: var(--foundation-rock-400)': 'color: var(--text-neutral-subdued)',
  'stroke: var(--foundation-rock-400)': 'stroke: var(--icon-neutral-subdued)',
  'fill: var(--foundation-rock-400)': 'fill: var(--icon-neutral-subdued)',

  // Sky colors for interactive text/icons
  'color: var(--foundation-sky-300)': 'color: var(--text-state-interactive)',
  'stroke: var(--foundation-sky-300)': 'stroke: var(--icon-state-interactive)',
  'fill: var(--foundation-sky-300)': 'fill: var(--icon-state-interactive)',

  // Fix surface-brand-accent used as text color
  'color: var(--surface-brand-accent)': 'color: var(--text-brand-accent)',

  // Fix text used as background
  'background: var(--text-neutral-subdued)': 'background: var(--surface-neutral-tertiary)',

  // Fix border colors for danger context
  'border-color: var(--surface-context-dangeractive)': 'border-color: var(--border-context-danger)',
};

// Mappings for LIGHT theme component classes
const LIGHT_COMPONENT_FIXES = {
  // Foundation colors that should be semantic
  'var(--foundation-white)': 'var(--surface-neutral-primary)',
  'var(--foundation-rock-050)': 'var(--surface-neutral-secondary)',

  // Sky-700 for text
  'color: var(--foundation-sky-700)': 'color: var(--text-neutral-default)',
  'stroke: var(--foundation-sky-700)': 'stroke: var(--icon-neutral-default)',
  'fill: var(--foundation-sky-700)': 'fill: var(--icon-neutral-default)',

  // Rock colors for text/icons
  'color: var(--foundation-rock-700)': 'color: var(--text-neutral-subdued)',
  'stroke: var(--foundation-rock-700)': 'stroke: var(--icon-neutral-subdued)',
  'fill: var(--foundation-rock-700)': 'fill: var(--icon-neutral-subdued)',

  'color: var(--foundation-rock-600)': 'color: var(--text-neutral-subdued)',
  'stroke: var(--foundation-rock-600)': 'stroke: var(--icon-neutral-subdued)',
  'fill: var(--foundation-rock-600)': 'fill: var(--icon-neutral-subdued)',

  // Fix border colors
  'border-color: var(--surface-context-dangeractive)': 'border-color: var(--border-context-danger)',
};

function addSemanticTokens(content, additions, themeName) {
  // Find the last line before the closing } of the first :root block
  const lines = content.split('\n');
  let inFirstRoot = false;
  let rootDepth = 0;
  let insertIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith(':root') && !inFirstRoot) {
      inFirstRoot = true;
      rootDepth = 0;
    }

    if (inFirstRoot) {
      if (line.includes('{')) rootDepth++;
      if (line.includes('}')) {
        rootDepth--;
        if (rootDepth === 0) {
          insertIndex = i;
          break;
        }
      }
    }
  }

  if (insertIndex > 0) {
    lines.splice(insertIndex, 0, additions);
    console.log(`   ✓ Added semantic tokens to ${themeName}`);
  }

  return lines.join('\n');
}

function fixComponentSection(content, fixes, themeName) {
  // Split content to only fix component section (not :root)
  const lines = content.split('\n');
  let inRootSection = false;
  let rootSectionDepth = 0;
  let rootSectionEnd = 0;

  // Find where ALL :root sections end
  let lastRootEnd = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith(':root')) {
      inRootSection = true;
      rootSectionDepth = 0;
    }

    if (inRootSection) {
      if (line.includes('{')) rootSectionDepth++;
      if (line.includes('}')) rootSectionDepth--;

      if (rootSectionDepth === 0 && line.includes('}')) {
        inRootSection = false;
        lastRootEnd = i;
      }
    }
  }

  const headerContent = lines.slice(0, lastRootEnd + 1).join('\n');
  let componentContent = lines.slice(lastRootEnd + 1).join('\n');

  let replacementCount = 0;
  const replacements = {};

  // Apply all fixes
  for (const [oldPattern, newPattern] of Object.entries(fixes)) {
    const regex = new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = componentContent.match(regex);

    if (matches) {
      componentContent = componentContent.replace(regex, newPattern);
      replacementCount += matches.length;
      replacements[oldPattern] = matches.length;
    }
  }

  console.log(`   ✓ Fixed ${replacementCount} semantic issues in ${themeName}`);
  if (Object.keys(replacements).length > 0) {
    console.log(`   📊 Top fixes:`);
    const sorted = Object.entries(replacements).sort((a, b) => b[1] - a[1]).slice(0, 5);
    for (const [pattern, count] of sorted) {
      console.log(`      ${pattern.substring(0, 50)}... → ${count}x`);
    }
  }

  return headerContent + '\n' + componentContent;
}

function processThemeFile(inputPath, outputPath, additions, fixes, themeName) {
  console.log(`\n🔧 Processing ${themeName}...`);

  let content = fs.readFileSync(inputPath, 'utf-8');

  // Step 1: Add missing semantic tokens
  content = addSemanticTokens(content, additions, themeName);

  // Step 2: Fix component section
  content = fixComponentSection(content, fixes, themeName);

  fs.writeFileSync(outputPath, content, 'utf-8');

  console.log(`   ✅ ${themeName} updated successfully`);
}

// Main execution
const themesDir = path.join(__dirname, '..', 'src', 'theme');
const lightThemePath = path.join(themesDir, 'yggdrasil-light.css');
const darkThemePath = path.join(themesDir, 'yggdrasil-dark.css');

console.log('🚀 Fixing semantic token usage...\n');

try {
  processThemeFile(
    lightThemePath,
    lightThemePath,
    LIGHT_THEME_ADDITIONS,
    LIGHT_COMPONENT_FIXES,
    'Light Theme'
  );

  processThemeFile(
    darkThemePath,
    darkThemePath,
    DARK_THEME_ADDITIONS,
    DARK_COMPONENT_FIXES,
    'Dark Theme'
  );

  console.log('\n✨ All semantic token issues fixed!');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
