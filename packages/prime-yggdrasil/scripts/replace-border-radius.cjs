/**
 * Replace hardcoded border-radius values with semantic tokens
 *
 * Strategy:
 * - 6px → 8px (var(--radius-md))
 * - 5px → 8px (var(--radius-md))
 * - 10px → 12px (var(--radius-lg))
 * - 3px → 4px (var(--radius-sm))
 * - 50% / 9999px → var(--radius-full)
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '../src/theme/components.css');
let css = fs.readFileSync(componentsPath, 'utf8');

const replacements = [
  // 6px → var(--radius-md) - most common, becomes 8px
  { from: /border-radius:\s*6px/g, to: 'border-radius: var(--radius-md)', name: '6px → --radius-md' },
  { from: /border-top-left-radius:\s*6px/g, to: 'border-top-left-radius: var(--radius-md)', name: 'border-top-left 6px → --radius-md' },
  { from: /border-top-right-radius:\s*6px/g, to: 'border-top-right-radius: var(--radius-md)', name: 'border-top-right 6px → --radius-md' },
  { from: /border-bottom-left-radius:\s*6px/g, to: 'border-bottom-left-radius: var(--radius-md)', name: 'border-bottom-left 6px → --radius-md' },
  { from: /border-bottom-right-radius:\s*6px/g, to: 'border-bottom-right-radius: var(--radius-md)', name: 'border-bottom-right 6px → --radius-md' },

  // 5px → var(--radius-md) - invalid for 4px grid, becomes 8px
  { from: /border-radius:\s*5px/g, to: 'border-radius: var(--radius-md)', name: '5px → --radius-md' },

  // 10px → var(--radius-lg) - becomes 12px
  { from: /border-radius:\s*10px/g, to: 'border-radius: var(--radius-lg)', name: '10px → --radius-lg' },

  // 3px → var(--radius-sm) - becomes 4px
  { from: /border-radius:\s*3px/g, to: 'border-radius: var(--radius-sm)', name: '3px → --radius-sm' },

  // 50% → var(--radius-full)
  { from: /border-radius:\s*50%/g, to: 'border-radius: var(--radius-full)', name: '50% → --radius-full' },

  // 9999px → var(--radius-full)
  { from: /border-radius:\s*9999px/g, to: 'border-radius: var(--radius-full)', name: '9999px → --radius-full' },

  // 2em, 1.5em variants (rare but present in some components)
  { from: /border-radius:\s*2em/g, to: 'border-radius: var(--radius-full)', name: '2em → --radius-full' },
];

let totalChanges = 0;

console.log('Replacing border-radius values in components.css...\n');

replacements.forEach(({ from, to, name }) => {
  const matches = css.match(from);
  if (matches && matches.length > 0) {
    console.log(`  ${name}: ${matches.length} replacements`);
    css = css.replace(from, to);
    totalChanges += matches.length;
  }
});

fs.writeFileSync(componentsPath, css, 'utf8');

console.log(`\n✅ Total: ${totalChanges} border-radius values replaced`);
console.log(`📁 Updated: ${componentsPath}`);
