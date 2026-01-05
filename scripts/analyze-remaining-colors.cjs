/**
 * Analyze remaining hardcoded colors in component files
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const componentsDir = path.join(__dirname, '..', 'src', 'theme', 'components');

function analyzeRemainingColors() {
  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.css'));

  const colorPattern = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b|rgba?\([^)]+\)/g;

  let totalColors = 0;
  const colorFrequency = {};
  const fileBreakdown = {};

  files.forEach(filename => {
    const filePath = path.join(componentsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');

    const matches = content.match(colorPattern) || [];
    const uniqueColors = new Set(matches);

    fileBreakdown[filename] = {
      total: matches.length,
      unique: uniqueColors.size,
      colors: {}
    };

    matches.forEach(color => {
      if (!colorFrequency[color]) {
        colorFrequency[color] = 0;
      }
      colorFrequency[color]++;

      if (!fileBreakdown[filename].colors[color]) {
        fileBreakdown[filename].colors[color] = 0;
      }
      fileBreakdown[filename].colors[color]++;

      totalColors++;
    });
  });

  console.log('Remaining Hardcoded Colors Analysis');
  console.log('====================================\n');

  // Sort by frequency
  const sortedColors = Object.entries(colorFrequency)
    .sort((a, b) => b[1] - a[1]);

  console.log('Most Common Colors (across all files):');
  sortedColors.slice(0, 15).forEach(([color, count]) => {
    console.log(`  ${count.toString().padStart(3)}× ${color}`);
  });

  console.log('\n\nBreakdown by File:');
  console.log('==================\n');

  Object.entries(fileBreakdown)
    .sort((a, b) => b[1].total - a[1].total)
    .forEach(([filename, data]) => {
      if (data.total === 0) return;

      console.log(`${filename} - ${data.total} colors (${data.unique} unique)`);

      const topColors = Object.entries(data.colors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      topColors.forEach(([color, count]) => {
        console.log(`  ${count}× ${color}`);
      });
      console.log('');
    });

  console.log(`Total: ${totalColors} hardcoded color values across ${files.length} files`);

  // Suggest semantic token mappings
  console.log('\n\nSuggested Semantic Token Mappings:');
  console.log('===================================\n');

  const suggestions = {
    '#ffffff': 'var(--surface-neutral-primary)',
    '#f9fafb': 'var(--surface-neutral-secondary)',
    '#f3f4f6': 'var(--surface-state-hover)',
    '#e5e7eb': 'var(--border-neutral-default)',
    '#d1d5db': 'var(--border-neutral-subdued)',
    '#4b5563': 'var(--text-neutral-subdued)',
    '#374151': 'var(--text-neutral-default)',
    '#6b7280': 'var(--icon-neutral-subdued)',
    '#9ca3af': 'var(--icon-neutral-disabled)',
    'rgba(0, 0, 0, 0.04)': 'color-mix(in srgb, var(--surface-neutral-primary) 4%, black)',
  };

  Object.entries(suggestions).forEach(([color, token]) => {
    const count = colorFrequency[color] || 0;
    if (count > 0) {
      console.log(`${color.padEnd(25)} → ${token.padEnd(50)} (${count}× uses)`);
    }
  });
}

analyzeRemainingColors();
