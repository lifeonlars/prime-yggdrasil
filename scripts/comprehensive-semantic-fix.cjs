/**
 * Comprehensive script to replace ALL foundation variable references
 * with appropriate semantic tokens based on CSS property context
 */

const fs = require('fs');
const path = require('path');

// Property type categories
const SURFACE_PROPERTIES = ['background', 'background-color'];
const TEXT_PROPERTIES = ['color'];
const BORDER_PROPERTIES = ['border', 'border-color', 'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color', 'outline-color'];
const ICON_PROPERTIES = ['stroke', 'fill'];

// Dark theme mappings by foundation color and context
const DARK_MAPPINGS = {
  // White mappings
  '--foundation-white': {
    surface: 'var(--surface-neutral-primary)',
    text: 'var(--text-neutral-loud)',
    border: 'var(--foundation-lighter-200)', // For borders on dark backgrounds
    icon: 'var(--icon-neutral-loud)',
  },

  // Rock shades
  '--foundation-rock-050': {
    surface: 'var(--surface-neutral-primary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-neutral-loud)',
    icon: 'var(--icon-neutral-default)',
  },
  '--foundation-rock-100': {
    surface: 'var(--surface-neutral-secondary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-neutral-loud)',
    icon: 'var(--icon-neutral-default)',
  },
  '--foundation-rock-200': {
    surface: 'var(--surface-neutral-tertiary)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-loud)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-300': {
    surface: 'var(--surface-state-hover)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-loud)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-400': {
    surface: 'var(--surface-state-disabled)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-default)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-500': {
    surface: 'var(--surface-state-disabled)',
    text: 'var(--text-neutral-disabled)',
    border: 'var(--border-neutral-loud)',
    icon: 'var(--icon-neutral-disabled)',
  },
  '--foundation-rock-700': {
    surface: 'var(--surface-neutral-tertiary)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-default)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-800': {
    surface: 'var(--surface-state-disabled)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-subdued)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-900': {
    surface: 'var(--surface-neutral-secondary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-neutral-subdued)',
    icon: 'var(--icon-neutral-default)',
  },

  // Sky shades
  '--foundation-sky-100': {
    surface: 'var(--surface-state-selected)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-brand-brand)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-300': {
    surface: 'var(--surface-brand-primary)',
    text: 'var(--text-state-interactive)',
    border: 'var(--border-state-interactive)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-400': {
    surface: 'var(--surface-brand-primary)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-state-focus)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-500': {
    surface: 'var(--surface-context-info)',
    text: 'var(--text-state-interactive)',
    border: 'var(--border-context-info)',
    icon: 'var(--icon-context-info)',
  },
  '--foundation-sky-600': {
    surface: 'var(--surface-brand-primary)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-brand-brand)',
    icon: 'var(--icon-state-interactive)',
  },

  // Berries shades (danger/accent)
  '--foundation-berries-100': {
    surface: 'var(--severity-danger-surface)',
    text: 'var(--text-context-danger)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-300': {
    surface: 'var(--surface-context-danger)',
    text: 'var(--text-context-danger)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-500': {
    surface: 'var(--surface-context-dangeractive)',
    text: 'var(--text-brand-accent)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-600': {
    surface: 'var(--surface-brand-accent)',
    text: 'var(--text-brand-accent)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-700': {
    surface: 'var(--surface-context-danger)',
    text: 'var(--text-context-danger)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },

  // Sea shades (info)
  '--foundation-sea-100': {
    surface: 'var(--severity-info-surface)',
    text: 'var(--text-state-selected)',
    border: 'var(--border-state-selected)',
    icon: 'var(--icon-state-selected)',
  },
  '--foundation-sea-800': {
    surface: 'var(--surface-context-signal)',
    text: 'var(--text-state-selected)',
    border: 'var(--border-context-signal)',
    icon: 'var(--icon-state-selected)',
  },

  // Sand shades (warning)
  '--foundation-sand-100': {
    surface: 'var(--severity-warn-surface)',
    text: 'var(--text-context-warning)',
    border: 'var(--border-context-warning)',
    icon: 'var(--icon-context-warning)',
  },
  '--foundation-sand-800': {
    surface: 'var(--surface-context-warning)',
    text: 'var(--text-context-warning)',
    border: 'var(--border-context-warning)',
    icon: 'var(--icon-context-warning)',
  },

  // Forest shades (success)
  '--foundation-forest-700': {
    surface: 'var(--surface-context-success)',
    text: 'var(--text-context-success)',
    border: 'var(--border-context-success)',
    icon: 'var(--icon-context-success)',
  },

  // Black
  '--foundation-black': {
    surface: 'var(--surface-input-primary)',
    text: 'var(--text-onsurface-onsentiment)',
    border: 'var(--border-neutral-subdued)',
    icon: 'var(--icon-neutral-default)',
  },
};

// Light theme mappings
const LIGHT_MAPPINGS = {
  '--foundation-white': {
    surface: 'var(--surface-neutral-primary)',
    text: 'var(--text-neutral-loud)',
    border: 'var(--border-neutral-subdued)',
    icon: 'var(--icon-neutral-loud)',
  },

  '--foundation-black': {
    surface: 'var(--surface-input-primary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-neutral-strong)',
    icon: 'var(--icon-neutral-default)',
  },

  // Rock shades
  '--foundation-rock-100': {
    surface: 'var(--surface-neutral-tertiary)',
    text: 'var(--text-neutral-muted)',
    border: 'var(--border-neutral-subdued)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-300': {
    surface: 'var(--surface-state-hover)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-strong)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-700': {
    surface: 'var(--surface-neutral-tertiary)',
    text: 'var(--text-neutral-subdued)',
    border: 'var(--border-neutral-default)',
    icon: 'var(--icon-neutral-subdued)',
  },
  '--foundation-rock-800': {
    surface: 'var(--surface-neutral-secondary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-neutral-strong)',
    icon: 'var(--icon-neutral-default)',
  },
  '--foundation-rock-900': {
    surface: 'var(--surface-input-secondary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-neutral-strong)',
    icon: 'var(--icon-neutral-default)',
  },

  // Sky shades
  '--foundation-sky-100': {
    surface: 'var(--surface-state-selected)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-brand-brand)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-300': {
    surface: 'var(--surface-brand-tertiary)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-state-interactive)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-400': {
    surface: 'var(--surface-brand-tertiary)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-context-info)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-600': {
    surface: 'var(--surface-brand-secondary)',
    text: 'var(--text-brand-primary)',
    border: 'var(--border-brand-brand)',
    icon: 'var(--icon-state-interactive)',
  },
  '--foundation-sky-700': {
    surface: 'var(--surface-brand-primary)',
    text: 'var(--text-neutral-default)',
    border: 'var(--border-brand-brand)',
    icon: 'var(--icon-neutral-default)',
  },

  // Berries (danger)
  '--foundation-berries-100': {
    surface: 'var(--severity-danger-surface)',
    text: 'var(--text-context-danger)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-500': {
    surface: 'var(--surface-context-danger)',
    text: 'var(--text-brand-accent)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-600': {
    surface: 'var(--surface-brand-accent)',
    text: 'var(--text-brand-accent)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },
  '--foundation-berries-700': {
    surface: 'var(--surface-context-danger)',
    text: 'var(--text-context-danger)',
    border: 'var(--border-context-danger)',
    icon: 'var(--icon-context-danger)',
  },

  // Sea shades (info)
  '--foundation-sea-100': {
    surface: 'var(--severity-info-surface)',
    text: 'var(--text-state-selected)',
    border: 'var(--border-state-selected)',
    icon: 'var(--icon-state-selected)',
  },
  '--foundation-sea-800': {
    surface: 'var(--surface-context-signal)',
    text: 'var(--text-state-selected)',
    border: 'var(--border-context-signal)',
    icon: 'var(--icon-state-selected)',
  },

  // Sand shades (warning)
  '--foundation-sand-100': {
    surface: 'var(--severity-warn-surface)',
    text: 'var(--text-context-warning)',
    border: 'var(--border-context-warning)',
    icon: 'var(--icon-context-warning)',
  },
  '--foundation-sand-800': {
    surface: 'var(--surface-context-warning)',
    text: 'var(--text-context-warning)',
    border: 'var(--border-context-warning)',
    icon: 'var(--icon-context-warning)',
  },

  // Forest shades (success)
  '--foundation-forest-700': {
    surface: 'var(--surface-context-success)',
    text: 'var(--text-context-success)',
    border: 'var(--border-context-success)',
    icon: 'var(--icon-context-success)',
  },
};

function getPropertyType(line) {
  const trimmed = line.trim();

  // Check for each property type
  for (const prop of TEXT_PROPERTIES) {
    if (trimmed.startsWith(`${prop}:`)) return 'text';
  }
  for (const prop of SURFACE_PROPERTIES) {
    if (trimmed.startsWith(`${prop}:`)) return 'surface';
  }
  for (const prop of BORDER_PROPERTIES) {
    if (trimmed.startsWith(`${prop}:`)) return 'border';
  }
  for (const prop of ICON_PROPERTIES) {
    if (trimmed.startsWith(`${prop}:`)) return 'icon';
  }

  return 'unknown';
}

function replaceFoundationVars(content, mappings, themeName) {
  const lines = content.split('\n');
  let replacementCount = 0;
  const stats = {};

  // Find where :root sections end
  let inRootSection = false;
  let rootDepth = 0;
  let lastRootEnd = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith(':root')) {
      inRootSection = true;
      rootDepth = 0;
    }

    if (inRootSection) {
      if (line.includes('{')) rootDepth++;
      if (line.includes('}')) {
        rootDepth--;
        if (rootDepth === 0) {
          inRootSection = false;
          lastRootEnd = i;
        }
      }
    }
  }

  // Process lines after :root sections
  for (let i = lastRootEnd + 1; i < lines.length; i++) {
    const line = lines[i];
    let newLine = line;

    // Check if line contains a foundation variable
    for (const [foundationVar, contextMappings] of Object.entries(mappings)) {
      const varPattern = `var(${foundationVar})`;
      if (line.includes(varPattern)) {
        const propType = getPropertyType(line);

        if (propType !== 'unknown' && contextMappings[propType]) {
          const replacement = contextMappings[propType];
          newLine = newLine.replace(new RegExp(`var\\(${foundationVar.replace(/[-]/g, '\\-')}\\)`, 'g'), replacement);

          replacementCount++;
          const key = `${foundationVar} (${propType})`;
          stats[key] = (stats[key] || 0) + 1;
        }
      }
    }

    lines[i] = newLine;
  }

  console.log(`   ✓ Replaced ${replacementCount} foundation references in ${themeName}`);
  if (Object.keys(stats).length > 0) {
    console.log(`   📊 Top replacements:`);
    const sorted = Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 8);
    for (const [key, count] of sorted) {
      console.log(`      ${key}: ${count}x`);
    }
  }

  return lines.join('\n');
}

// Main execution
const themesDir = path.join(__dirname, '..', 'src', 'theme');
const lightThemePath = path.join(themesDir, 'yggdrasil-light.css');
const darkThemePath = path.join(themesDir, 'yggdrasil-dark.css');

console.log('🚀 Comprehensive semantic token fix...\n');

try {
  console.log('🔧 Processing Light Theme...');
  let lightContent = fs.readFileSync(lightThemePath, 'utf-8');
  lightContent = replaceFoundationVars(lightContent, LIGHT_MAPPINGS, 'Light Theme');
  fs.writeFileSync(lightThemePath, lightContent, 'utf-8');
  console.log('   ✅ Light Theme completed\n');

  console.log('🔧 Processing Dark Theme...');
  let darkContent = fs.readFileSync(darkThemePath, 'utf-8');
  darkContent = replaceFoundationVars(darkContent, DARK_MAPPINGS, 'Dark Theme');
  fs.writeFileSync(darkThemePath, darkContent, 'utf-8');
  console.log('   ✅ Dark Theme completed\n');

  console.log('✨ All foundation references replaced with semantic tokens!');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
