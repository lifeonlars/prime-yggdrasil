/**
 * Replace hardcoded colors in Paginator component with semantic tokens
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '..', 'src', 'theme', 'components.css');

const colorMap = {
  '#ffffff': 'var(--surface-neutral-primary)',
  '#f3f4f6': 'var(--surface-state-hover)',
  '#6b7280': 'var(--icon-neutral-subdued)',
  '#374151': 'var(--text-neutral-default)',
};

function escapeRegex(str) {
  return str.replace(/[().,]/g, '\\$&');
}

function replacePaginatorColors() {
  console.log('Reading components.css...');
  let content = fs.readFileSync(componentsPath, 'utf8');

  // Find paginator section boundaries
  const startPattern = '.p-paginator {';
  const startIndex = content.indexOf(startPattern);

  if (startIndex === -1) {
    console.error('Could not find .p-paginator section');
    process.exit(1);
  }

  // Find next component (.p-picklist)
  const endPattern = '.p-picklist ';
  const endIndex = content.indexOf(endPattern, startIndex);

  if (endIndex === -1) {
    console.error('Could not find end of .p-paginator section');
    process.exit(1);
  }

  console.log(`Found Paginator section: ${startIndex} to ${endIndex}`);

  const beforeSection = content.substring(0, startIndex);
  let paginatorSection = content.substring(startIndex, endIndex);
  const afterSection = content.substring(endIndex);

  let totalReplacements = 0;

  Object.entries(colorMap).forEach(([oldColor, newToken]) => {
    const regex = new RegExp(escapeRegex(oldColor), 'g');
    const matches = paginatorSection.match(regex);

    if (matches) {
      console.log(`  ${matches.length}× ${oldColor} → ${newToken}`);
      paginatorSection = paginatorSection.replace(regex, newToken);
      totalReplacements += matches.length;
    }
  });

  if (totalReplacements > 0) {
    const newContent = beforeSection + paginatorSection + afterSection;
    console.log(`\n✓ Total replacements: ${totalReplacements}`);
    console.log('Writing updated components.css...');
    fs.writeFileSync(componentsPath, newContent, 'utf8');
    console.log('✓ Paginator migrated to semantic tokens');
  } else {
    console.log('\nℹ No changes needed');
  }
}

replacePaginatorColors();
