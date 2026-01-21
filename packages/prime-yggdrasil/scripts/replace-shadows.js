/**
 * Replace Hardcoded Shadows with Elevation Tokens
 *
 * Systematically replaces common shadow patterns with semantic elevation tokens
 *
 * Run with: node scripts/replace-shadows.js
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_CSS = path.join(__dirname, '..', 'src', 'theme', 'components.css');

// Shadow pattern mappings
const SHADOW_REPLACEMENTS = [
  // Moderate elevation (dropdowns, menus, popovers)
  {
    pattern: /box-shadow:\s*0 2px 12px 0 rgba\(0,\s*0,\s*0,\s*0\.1\);/g,
    replacement: 'box-shadow: var(--elevation-moderate);',
    name: '0 2px 12px 0 rgba(0, 0, 0, 0.1) → elevation-moderate'
  },

  // Elevated (overlays, popovers)
  {
    pattern: /box-shadow:\s*0 1px 3px rgba\(0,\s*0,\s*0,\s*0\.3\);/g,
    replacement: 'box-shadow: var(--elevation-elevated);',
    name: '0 1px 3px rgba(0, 0, 0, 0.3) → elevation-elevated'
  },

  // Material 3-layer subtle (cards, panels)
  {
    pattern: /box-shadow:\s*0 2px 1px -1px rgba\(0,\s*0,\s*0,\s*0\.2\),\s*0 1px 1px 0 rgba\(0,\s*0,\s*0,\s*0\.14\),\s*0 1px 3px 0 rgba\(0,\s*0,\s*0,\s*0\.12\);/g,
    replacement: 'box-shadow: var(--elevation-subtle);',
    name: 'Material 3-layer → elevation-subtle'
  },

  // Material 3-layer moderate
  {
    pattern: /box-shadow:\s*0 3px 1px -2px rgba\(0,\s*0,\s*0,\s*0\.2\),\s*0 2px 2px 0 rgba\(0,\s*0,\s*0,\s*0\.14\),\s*0 1px 5px 0 rgba\(0,\s*0,\s*0,\s*0\.12\);/g,
    replacement: 'box-shadow: var(--elevation-moderate);',
    name: 'Material 3-layer moderate → elevation-moderate'
  },
];

/**
 * Main replacement function
 */
function replaceShadows() {
  console.log('\n=== Shadow Replacement ===\n');

  // Backup if needed
  const backupPath = `${COMPONENTS_CSS}.backup-shadows`;
  if (!fs.existsSync(`${COMPONENTS_CSS}.backup`)) {
    fs.copyFileSync(COMPONENTS_CSS, `${COMPONENTS_CSS}.backup`);
    console.log(`Original backup exists at: ${COMPONENTS_CSS}.backup\n`);
  }
  fs.copyFileSync(COMPONENTS_CSS, backupPath);
  console.log(`Shadow backup created: ${backupPath}\n`);

  // Read file
  let content = fs.readFileSync(COMPONENTS_CSS, 'utf-8');

  const stats = new Map();
  let totalReplacements = 0;

  // Apply each replacement
  SHADOW_REPLACEMENTS.forEach(({ pattern, replacement, name }) => {
    const matches = content.match(pattern);
    const count = matches ? matches.length : 0;

    if (count > 0) {
      content = content.replace(pattern, replacement);
      stats.set(name, count);
      totalReplacements += count;
    }
  });

  // Write updated content
  fs.writeFileSync(COMPONENTS_CSS, content);

  // Report
  console.log(`✅ Replaced ${totalReplacements} shadow patterns\n`);

  if (stats.size > 0) {
    console.log('Replacements made:');
    stats.forEach((count, name) => {
      console.log(`  ${name}: ${count} uses`);
    });
  }

  // Count remaining rgba shadows
  const remainingShadows = (content.match(/box-shadow:[^;]*rgba\(/g) || []).length;
  console.log(`\n⚠️  ${remainingShadows} rgba shadows remain (may need manual review)`);

  if (remainingShadows > 0) {
    console.log('\nRemaining shadow patterns:');
    const samples = content.match(/box-shadow:[^;]*rgba\([^)]+\)[^;]*/g) || [];
    const unique = [...new Set(samples)];
    unique.slice(0, 5).forEach(s => {
      console.log(`  ${s.trim()}`);
    });
    if (unique.length > 5) {
      console.log(`  ... and ${unique.length - 5} more unique patterns`);
    }
  }

  console.log('\n');
}

// Run
replaceShadows();
