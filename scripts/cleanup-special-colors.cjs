/**
 * Clean up special remaining hardcoded colors:
 * 1. Remove leftover help button styles from splitbutton
 * 2. Replace rgb(0,0,0) with semantic black
 * 3. Fix focus ring colors to use semantic tokens
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'theme', 'components');

function cleanupButtonFile() {
  const buttonPath = path.join(componentsDir, 'button.css');
  let content = fs.readFileSync(buttonPath, 'utf8');

  console.log('Cleaning up button.css...');

  // Remove splitbutton help styles (lines with p-button-help)
  const helpPattern = /  \.p-splitbutton\.p-button-help[^}]+\{[^}]+\}\n/g;
  const helpMatches = content.match(helpPattern);
  if (helpMatches) {
    content = content.replace(helpPattern, '');
    console.log(`  ✓ Removed ${helpMatches.length} p-button-help splitbutton rules`);
  }

  // Replace rgb(0, 0, 0) with proper semantic
  const rgbBlackCount = (content.match(/rgb\(0,\s*0,\s*0\)/g) || []).length;
  if (rgbBlackCount > 0) {
    content = content.replace(/rgb\(0,\s*0,\s*0\)/g, 'black');
    console.log(`  ✓ Replaced ${rgbBlackCount}× rgb(0, 0, 0) with black`);
  }

  // Fix focus ring color (#9dc1fb is info-200, should use semantic)
  const focusRingCount = (content.match(/#9dc1fb/g) || []).length;
  if (focusRingCount > 0) {
    content = content.replace(/#9dc1fb/g, 'var(--surface-context-info)');
    console.log(`  ✓ Replaced ${focusRingCount}× #9dc1fb with var(--surface-context-info)`);
  }

  fs.writeFileSync(buttonPath, content, 'utf8');
  console.log('  → button.css cleaned\n');
}

function cleanupMessageFile() {
  const messagePath = path.join(componentsDir, 'message.css');
  let content = fs.readFileSync(messagePath, 'utf8');

  console.log('Cleaning up message.css...');

  // Replace rgb(0, 0, 0) with black
  const rgbBlackCount = (content.match(/rgb\(0,\s*0,\s*0\)/g) || []).length;
  if (rgbBlackCount > 0) {
    content = content.replace(/rgb\(0,\s*0,\s*0\)/g, 'black');
    console.log(`  ✓ Replaced ${rgbBlackCount}× rgb(0, 0, 0) with black`);
  }

  // Fix focus ring colors
  const colorMap = {
    '#9dc1fb': 'var(--surface-context-info)',
    '#b0b9c6': 'var(--border-neutral-subdued)',
    '#d4aafb': 'color-mix(in srgb, var(--surface-brand-accent) 50%, white)',
  };

  Object.entries(colorMap).forEach(([oldColor, newToken]) => {
    const count = (content.match(new RegExp(oldColor, 'g')) || []).length;
    if (count > 0) {
      content = content.replace(new RegExp(oldColor, 'g'), newToken);
      console.log(`  ✓ Replaced ${count}× ${oldColor}`);
    }
  });

  fs.writeFileSync(messagePath, content, 'utf8');
  console.log('  → message.css cleaned\n');
}

function cleanupMiscFile() {
  const miscPath = path.join(componentsDir, 'misc.css');
  let content = fs.readFileSync(miscPath, 'utf8');

  console.log('Cleaning up misc.css...');

  // Fix link blue color
  const linkBlue = '#70aeff';
  const count = (content.match(new RegExp(linkBlue, 'g')) || []).length;
  if (count > 0) {
    content = content.replace(new RegExp(linkBlue, 'g'), 'var(--surface-brand-primary)');
    console.log(`  ✓ Replaced ${count}× ${linkBlue} with brand primary`);
  }

  fs.writeFileSync(miscPath, content, 'utf8');
  console.log('  → misc.css cleaned\n');
}

function cleanupSpecialColors() {
  console.log('Cleaning up special hardcoded colors...\n');

  cleanupButtonFile();
  cleanupMessageFile();
  cleanupMiscFile();

  console.log('✓ Special color cleanup complete!');
  console.log('\nRemaining hardcoded colors are context-specific overlays (rgba with transparency)');
  console.log('These are intentionally left as-is since they create effects based on underlying colors.');
}

cleanupSpecialColors();
