/**
 * Replace all common hardcoded colors across component files with semantic tokens
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'theme', 'components');

// Comprehensive color mapping to semantic tokens
const colorMap = {
  // Surfaces
  '#ffffff': 'var(--surface-neutral-primary)',
  '#f9fafb': 'var(--surface-neutral-secondary)',
  '#f3f4f6': 'var(--surface-state-hover)',
  '#f8f8fa': 'var(--surface-neutral-secondary)', // Alternative light surface

  // Borders
  '#e5e7eb': 'var(--border-neutral-default)',
  '#d1d5db': 'var(--border-neutral-subdued)',

  // Text
  '#4b5563': 'var(--text-neutral-subdued)',
  '#374151': 'var(--text-neutral-default)',
  '#1f2937': 'var(--text-neutral-loud)',
  '#6b7280': 'var(--icon-neutral-subdued)',
  '#9ca3af': 'var(--icon-neutral-disabled)',

  // Secondary/slate colors (if used)
  '#64748b': 'var(--text-neutral-subdued)',
  '#475569': 'var(--text-neutral-default)',

  // Brand color variations (already using semantic tokens, but check for stragglers)
  'rgba(59, 130, 246, 0.04)': 'color-mix(in srgb, var(--surface-brand-primary) 4%, transparent)',
  'rgba(59, 130, 246, 0.16)': 'color-mix(in srgb, var(--surface-brand-primary) 16%, transparent)',
  'rgba(59, 130, 246, 0.24)': 'color-mix(in srgb, var(--surface-brand-primary) 24%, transparent)',
};

function escapeRegex(str) {
  return str.replace(/[().,]/g, '\\$&').replace(/\s+/g, '\\s*');
}

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let replacements = 0;

  Object.entries(colorMap).forEach(([oldColor, newToken]) => {
    const regex = new RegExp(escapeRegex(oldColor), 'gi');
    const matches = content.match(regex);

    if (matches) {
      content = content.replace(regex, newToken);
      replacements += matches.length;
    }
  });

  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return replacements;
}

function replaceAllComponentColors() {
  console.log('Replacing hardcoded colors in component files...\n');

  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));
  let totalReplacements = 0;

  files.forEach(filename => {
    const filePath = path.join(componentsDir, filename);
    const count = replaceColorsInFile(filePath);

    if (count > 0) {
      console.log(`✓ ${filename.padEnd(20)} - ${count} replacements`);
      totalReplacements += count;
    } else {
      console.log(`  ${filename.padEnd(20)} - no changes needed`);
    }
  });

  console.log(`\n====================================`);
  console.log(`Total: ${totalReplacements} color replacements across ${files.length} files`);
  console.log(`✓ All common hardcoded colors replaced with semantic tokens`);
}

replaceAllComponentColors();
