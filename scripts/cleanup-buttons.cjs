/**
 * Clean up Button component:
 * 1. Remove unused variants (secondary, help, contrast)
 * 2. Fix hardcoded colors in remaining variants
 * 3. Keep only: Primary, Outlined, Link (text), Danger
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, '..', 'src', 'theme', 'components.css');

function cleanupButtons() {
  console.log('Reading components.css...');
  let content = fs.readFileSync(componentsPath, 'utf8');

  // Find button section
  const buttonStart = content.indexOf('.p-button {');
  if (buttonStart === -1) {
    console.error('Could not find .p-button section');
    process.exit(1);
  }

  console.log('\nStep 1: Removing unused button variants...');

  // Remove secondary button styles
  const secondaryStart = content.indexOf('.p-button.p-button-secondary,');
  const secondaryEnd = content.indexOf('.p-button.p-button-info,');
  if (secondaryStart !== -1 && secondaryEnd !== -1) {
    const beforeSecondary = content.substring(0, secondaryStart);
    const afterSecondary = content.substring(secondaryEnd);
    content = beforeSecondary + afterSecondary;
    console.log('  ✓ Removed .p-button-secondary styles');
  }

  // Remove help button styles
  const helpStart = content.indexOf('.p-button.p-button-help,');
  const helpEnd = content.indexOf('.p-button.p-button-danger,');
  if (helpStart !== -1 && helpEnd !== -1) {
    const beforeHelp = content.substring(0, helpStart);
    const afterHelp = content.substring(helpEnd);
    content = beforeHelp + afterHelp;
    console.log('  ✓ Removed .p-button-help styles');
  }

  // Remove contrast button styles
  const contrastStart = content.indexOf('.p-button.p-button-contrast,');
  const contrastEnd = content.indexOf('.p-button.p-button-link {');
  if (contrastStart !== -1 && contrastEnd !== -1) {
    const beforeContrast = content.substring(0, contrastStart);
    const afterContrast = content.substring(contrastEnd);
    content = beforeContrast + afterContrast;
    console.log('  ✓ Removed .p-button-contrast styles');
  }

  console.log('\nStep 2: Fixing hardcoded colors in remaining button variants...');

  // Fix primary button colors
  const colorReplacements = [
    { from: /#ffffff/g, to: 'var(--text-onsurface-onbrand)', context: 'primary button text' },
    { from: /#6b7280/g, to: 'var(--text-neutral-subdued)', context: 'plain button text' },
    { from: /#f3f4f6/g, to: 'var(--surface-state-hover)', context: 'plain button hover' },
    { from: /#e5e7eb/g, to: 'var(--border-neutral-default)', context: 'plain button active' },
    { from: /rgba\(59, 130, 246, 0\.04\)/g, to: 'color-mix(in srgb, var(--surface-brand-primary) 4%, transparent)', context: 'outlined hover' },
    { from: /rgba\(59, 130, 246, 0\.16\)/g, to: 'color-mix(in srgb, var(--surface-brand-primary) 16%, transparent)', context: 'outlined/text active' },
  ];

  let totalReplacements = 0;
  colorReplacements.forEach(({ from, to, context }) => {
    // Only replace within button section (roughly first 2000 lines from button start)
    const buttonSectionEnd = content.indexOf('.p-button.p-button-link {', buttonStart);
    if (buttonSectionEnd === -1) return;

    const beforeButton = content.substring(0, buttonStart);
    let buttonSection = content.substring(buttonStart, buttonSectionEnd + 500);
    const afterButton = content.substring(buttonSectionEnd + 500);

    const matches = buttonSection.match(from);
    if (matches) {
      console.log(`  ${matches.length}× ${from.source || from} → ${to} (${context})`);
      buttonSection = buttonSection.replace(from, to);
      content = beforeButton + buttonSection + afterButton;
      totalReplacements += matches.length;
    }
  });

  console.log(`\n✓ Total color replacements: ${totalReplacements}`);
  console.log('Writing updated components.css...');
  fs.writeFileSync(componentsPath, content, 'utf8');
  console.log('✓ Button cleanup complete');
  console.log('\nRemaining button types:');
  console.log('  - Primary (filled)');
  console.log('  - Outlined');
  console.log('  - Link/Text');
  console.log('  - Danger (all variants)');
  console.log('  - Info, Success, Warning (severity variants - kept for messages)');
}

cleanupButtons();
