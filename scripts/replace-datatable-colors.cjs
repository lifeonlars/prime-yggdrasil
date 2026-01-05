/**
 * Replace hardcoded colors in DataTable component with semantic tokens
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '..', 'src', 'theme', 'components.css');

// Color mapping for DataTable
const replacements = [
  // Header/Footer/THead/TFoot backgrounds
  { from: /#f9fafb/g, to: 'var(--surface-neutral-secondary)', context: 'header/footer bg' },

  // Header/THead text colors
  { from: /#374151/g, to: 'var(--text-neutral-default)', context: 'header text' },

  // Border colors
  { from: /#e5e7eb/g, to: 'var(--border-neutral-default)', context: 'borders' },

  // Hover backgrounds
  { from: /#f3f4f6/g, to: 'var(--surface-state-hover)', context: 'hover bg' },

  // Row backgrounds
  { from: /#ffffff/g, to: 'var(--surface-neutral-primary)', context: 'row bg' },

  // Row text
  { from: /#4b5563/g, to: 'var(--text-neutral-subdued)', context: 'row text' },

  // Editor button icons
  { from: /#6b7280/g, to: 'var(--icon-neutral-subdued)', context: 'editor icons' },

  // Striped row background
  { from: /#f8f8fa/g, to: 'var(--surface-neutral-secondary)', context: 'striped bg' },

  // Drag selection helper
  { from: /rgba\(59, 130, 246, 0\.16\)/g, to: 'color-mix(in srgb, var(--surface-brand-primary) 16%, transparent)', context: 'drag selection' },
];

function replaceDataTableColors() {
  console.log('Reading components.css...');
  let content = fs.readFileSync(componentsPath, 'utf8');

  // Extract just the DataTable section to avoid affecting other components
  const datatableStart = content.indexOf('.p-datatable .p-paginator-top');
  const datatableEnd = content.indexOf('.p-dataview .p-paginator-top');

  if (datatableStart === -1 || datatableEnd === -1) {
    console.error('Could not find DataTable section boundaries');
    process.exit(1);
  }

  const beforeSection = content.substring(0, datatableStart);
  const datatableSection = content.substring(datatableStart, datatableEnd);
  const afterSection = content.substring(datatableEnd);

  console.log(`Found DataTable section: ${datatableStart} to ${datatableEnd}`);

  let modifiedSection = datatableSection;
  let totalReplacements = 0;

  replacements.forEach(({ from, to, context }) => {
    const matches = modifiedSection.match(from);
    if (matches) {
      console.log(`  Replacing ${matches.length}x ${from.source} → ${to} (${context})`);
      modifiedSection = modifiedSection.replace(from, to);
      totalReplacements += matches.length;
    }
  });

  // Reassemble the file
  const newContent = beforeSection + modifiedSection + afterSection;

  console.log(`\nTotal replacements: ${totalReplacements}`);
  console.log('Writing updated components.css...');
  fs.writeFileSync(componentsPath, newContent, 'utf8');
  console.log('✓ DataTable colors migrated to semantic tokens');
}

replaceDataTableColors();
