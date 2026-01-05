/**
 * Replace hardcoded colors in Menu components with semantic tokens
 * Handles: Menu, Menubar, Megamenu, Slidemenu, Tieredmenu, Contextmenu
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '..', 'src', 'theme', 'components.css');

// Menu component sections to process
const menuComponents = [
  'contextmenu',
  'megamenu',
  'menu',
  'menubar',
  'panelmenu',
  'slidemenu',
  'tieredmenu'
];

// Color mapping - same as DataTable since menus use similar patterns
const colorMap = {
  '#ffffff': 'var(--surface-neutral-primary)',
  '#f9fafb': 'var(--surface-neutral-secondary)',
  '#f3f4f6': 'var(--surface-state-hover)',
  '#e5e7eb': 'var(--border-neutral-default)',
  '#4b5563': 'var(--text-neutral-subdued)',
  '#374151': 'var(--text-neutral-default)',
  '#6b7280': 'var(--icon-neutral-subdued)',
  '#9ca3af': 'var(--icon-neutral-disabled)',
  '#d1d5db': 'var(--border-neutral-subdued)',
  'rgba(59, 130, 246, 0.24)': 'color-mix(in srgb, var(--surface-brand-primary) 24%, transparent)',
  'rgba(59, 130, 246, 0.16)': 'color-mix(in srgb, var(--surface-brand-primary) 16%, transparent)',
};

function escapeRegex(str) {
  return str.replace(/[().,]/g, '\\$&');
}

function findComponentBounds(content, componentName) {
  const startPattern = `.p-${componentName} `;
  const startIndex = content.indexOf(startPattern);

  if (startIndex === -1) {
    return null;
  }

  // Find the next component or end of file
  let endIndex = content.length;

  // Look for next major component
  const nextComponents = [
    '.p-dialog ',
    '.p-dock ',
    '.p-steps ',
    '.p-tabmenu ',
    '.p-message ',
    '.p-inline-message ',
    '.p-toast '
  ];

  for (const nextComp of nextComponents) {
    const idx = content.indexOf(nextComp, startIndex + 1);
    if (idx !== -1 && idx < endIndex) {
      endIndex = idx;
    }
  }

  return { start: startIndex, end: endIndex };
}

function replaceMenuColors() {
  console.log('Reading components.css...');
  let content = fs.readFileSync(componentsPath, 'utf8');

  let totalReplacements = 0;
  let updatedContent = content;

  menuComponents.forEach(componentName => {
    const bounds = findComponentBounds(content, componentName);

    if (!bounds) {
      console.log(`⚠ Component .p-${componentName} not found`);
      return;
    }

    console.log(`\nProcessing .p-${componentName}...`);

    const beforeSection = updatedContent.substring(0, bounds.start);
    let componentSection = updatedContent.substring(bounds.start, bounds.end);
    const afterSection = updatedContent.substring(bounds.end);

    let componentReplacements = 0;

    Object.entries(colorMap).forEach(([oldColor, newToken]) => {
      const regex = new RegExp(escapeRegex(oldColor), 'g');
      const matches = componentSection.match(regex);

      if (matches) {
        console.log(`  ${matches.length}× ${oldColor} → ${newToken}`);
        componentSection = componentSection.replace(regex, newToken);
        componentReplacements += matches.length;
      }
    });

    if (componentReplacements > 0) {
      updatedContent = beforeSection + componentSection + afterSection;
      totalReplacements += componentReplacements;
      console.log(`  ✓ ${componentReplacements} replacements`);
    } else {
      console.log(`  ℹ No hardcoded colors found`);
    }
  });

  if (totalReplacements > 0) {
    console.log(`\n✓ Total replacements across all menu components: ${totalReplacements}`);
    console.log('Writing updated components.css...');
    fs.writeFileSync(componentsPath, updatedContent, 'utf8');
    console.log('✓ Menu components migrated to semantic tokens');
  } else {
    console.log('\nℹ No changes needed');
  }
}

replaceMenuColors();
