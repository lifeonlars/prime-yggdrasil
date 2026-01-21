const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'theme', 'yggdrasil-light.css');
let content = fs.readFileSync(filePath, 'utf-8');

// Color mappings: Lara hex → Yggdrasil Sky
const colorReplacements = [
  // Primary blues (Lara → Sky)
  { from: /#3b82f6/gi, to: 'var(--foundation-sky-700)' },  // Lara blue-500 → Sky-700 (#001F4A)
  { from: /#1d4ed8/gi, to: 'var(--foundation-sky-600)' },  // Lara blue-700 → Sky-600 (#183B60)
  { from: /#2563eb/gi, to: 'var(--foundation-sky-600)' },  // Lara blue-600 → Sky-600
  { from: /#bfdbfe/gi, to: 'var(--foundation-sky-100)' },  // Lara blue-100 → Sky-100 (#DDE0EA)
  { from: /#eff6ff/gi, to: 'var(--foundation-sky-100)' },  // Lara blue-50 → Sky-100 (selected bg)
  { from: /#dbeafe/gi, to: 'var(--foundation-sky-100)' },  // Lara blue-100 alt → Sky-100
];

// Apply replacements
colorReplacements.forEach(({ from, to }) => {
  const count = (content.match(from) || []).length;
  if (count > 0) {
    content = content.replace(from, to);
    console.log(`✓ Replaced ${count} occurrences of ${from.source} with ${to}`);
  }
});

fs.writeFileSync(filePath, content, 'utf-8');
console.log('\n✓ Successfully replaced hardcoded Lara colors with Yggdrasil variables');
