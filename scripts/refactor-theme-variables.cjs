/**
 * Script to refactor theme files to use semantic variables instead of hardcoded hex/rgba values
 *
 * This script:
 * 1. Reads the theme file
 * 2. Identifies all hardcoded color values (hex, rgb, rgba)
 * 3. Replaces them with appropriate semantic variable references
 * 4. Preserves the :root section with semantic variable definitions
 */

const fs = require('fs');
const path = require('path');

// Map of common hardcoded values to their semantic equivalents for LIGHT theme
const LIGHT_THEME_MAPPINGS = {
  // Primary/Brand colors (Sky)
  '#001F4A': 'var(--surface-brand-primary)',
  '#183B60': 'var(--surface-brand-secondary)',
  '#2E598F': 'var(--surface-brand-tertiary)',
  '#648CC3': 'var(--foundation-sky-400)',
  '#9DB7D6': 'var(--foundation-sky-300)',
  '#BCCEE2': 'var(--foundation-sky-200)',
  '#DDE0EA': 'var(--surface-brand-subtle)',
  '#F0F4F9': 'var(--foundation-sky-050)',

  // Neutral surfaces (White/Rock)
  '#FFFFFF': 'var(--foundation-white)',
  '#F8F8F8': 'var(--surface-neutral-secondary)',
  '#F2F1F2': 'var(--surface-neutral-tertiary)',
  '#E4E4E4': 'var(--border-neutral-default)',
  '#C4C2C5': 'var(--border-neutral-strong)',
  '#A39FA7': 'var(--text-neutral-muted)',
  '#8A858E': 'var(--foundation-rock-500)',
  '#716C75': 'var(--text-neutral-subdued)',
  '#58525D': 'var(--foundation-rock-700)',
  '#2E2734': 'var(--foundation-rock-800)',
  '#201C25': 'var(--foundation-rock-900)',
  '#131116': 'var(--foundation-rock-950)',

  // Black
  '#000000': 'var(--foundation-black)',

  // Context: Info (Sea)
  '#477E92': 'var(--foundation-sea-600)',
  '#649EB3': 'var(--foundation-sea-500)',
  '#7BB8D1': 'var(--foundation-sea-400)',
  '#98C5D3': 'var(--foundation-sea-300)',
  '#BEDCDD': 'var(--foundation-sea-200)',
  '#D9E4E1': 'var(--surface-context-info-subtle)',

  // Context: Success (Forest)
  '#485E1D': 'var(--text-context-success)',
  '#5D7235': 'var(--foundation-forest-600)',
  '#7A9652': 'var(--foundation-forest-500)',
  '#9AB56B': 'var(--foundation-forest-400)',
  '#B0C18E': 'var(--foundation-forest-300)',
  '#C7D3B2': 'var(--foundation-forest-200)',
  '#DFE3D9': 'var(--surface-context-success-subtle)',

  // Context: Warning (Sand)
  '#AA6509': 'var(--text-context-warning)',
  '#7B4E0F': 'var(--foundation-sand-800)',
  '#C17B16': 'var(--foundation-sand-600)',
  '#D39327': 'var(--foundation-sand-500)',
  '#E2AC5D': 'var(--foundation-sand-400)',
  '#F2C77F': 'var(--foundation-sand-300)',
  '#F4DAB8': 'var(--foundation-sand-200)',
  '#EFE7DB': 'var(--surface-context-warning-subtle)',

  // Context: Danger (Berries)
  '#BC3939': 'var(--text-context-danger)',
  '#D64949': 'var(--foundation-berries-600)',
  '#EA5E68': 'var(--foundation-berries-500)',
  '#FF8186': 'var(--foundation-berries-400)',
  '#FCA4AB': 'var(--foundation-berries-300)',
  '#F9BBC3': 'var(--foundation-berries-200)',
  '#F4DFDF': 'var(--surface-context-danger-subtle)',

  // Common Prime components colors that need mapping
  '#60a5fa': 'var(--primary-color)', // This was the hardcoded primary
  '#030712': 'var(--text-neutral-default)', // Dark text

  // Tailwind-style grays -> map to Rock neutral colors for light theme
  '#f9fafb': 'var(--surface-neutral-secondary)', // gray-50 -> neutral surface
  '#f3f4f6': 'var(--surface-neutral-tertiary)', // gray-100 -> subtle surface
  '#e5e7eb': 'var(--border-neutral-default)', // gray-200 -> default border
  '#d1d5db': 'var(--border-neutral-strong)', // gray-300 -> strong border
  '#9ca3af': 'var(--text-neutral-muted)', // gray-400 -> muted text
  '#6b7280': 'var(--text-neutral-subdued)', // gray-500 -> subdued text
  '#4b5563': 'var(--foundation-rock-700)', // gray-600 -> darker neutral
  '#374151': 'var(--foundation-rock-800)', // gray-700 -> very dark neutral
  '#1f2937': 'var(--foundation-rock-900)', // gray-800 -> almost black
  '#111827': 'var(--foundation-rock-950)', // gray-900 -> darkest

  // Slate variants (similar mapping)
  '#f8f9fa': 'var(--surface-neutral-secondary)',
  '#f8f8fa': 'var(--surface-neutral-secondary)',
  '#f2f2f2': 'var(--surface-neutral-tertiary)',
  '#e2e8f0': 'var(--border-neutral-default)',
  '#cbd5e1': 'var(--border-neutral-strong)',
  '#94a3b8': 'var(--text-neutral-muted)',
  '#64748b': 'var(--text-neutral-subdued)',

  // Purple accent colors -> map to berries for light theme
  '#a855f7': 'var(--foundation-berries-500)', // purple-500
  '#c084fc': 'var(--foundation-berries-400)', // purple-400
  '#e9d5ff': 'var(--foundation-berries-100)', // purple-200
  '#d8b4fe': 'var(--foundation-berries-200)', // purple-300
  '#3b0764': 'var(--foundation-berries-700)', // purple-900

  // Danger/error colors
  '#ea5455': 'var(--surface-context-danger)',
  '#f48fb1': 'var(--foundation-berries-300)',

  // Blue accent colors -> use sky
  '#93c5fd': 'var(--foundation-sky-300)',
  '#bfdbfe': 'var(--foundation-sky-100)',
  '#9dc1fb': 'var(--foundation-sky-300)',
  '#8cbeff': 'var(--foundation-sky-400)',
  '#70aeff': 'var(--foundation-sky-400)',
  '#3b82f6': 'var(--foundation-sky-400)', // blue-500 from Tailwind
  '#1d7ffc': 'var(--foundation-sky-500)',

  // More purple variants
  '#9333ea': 'var(--foundation-berries-500)',
  '#7e22ce': 'var(--foundation-berries-600)',
  '#d4aafb': 'var(--foundation-berries-200)',

  // Slate/gray additional variants
  '#475569': 'var(--foundation-rock-700)',
  '#334155': 'var(--foundation-rock-800)',
  '#b7bcc5': 'var(--foundation-rock-300)',
  '#b0b9c6': 'var(--foundation-rock-300)',
  '#323232': 'var(--foundation-rock-900)',
  '#191919': 'var(--foundation-rock-950)',

  // Additional context colors
  '#e73d3e': 'var(--foundation-berries-600)',
  '#ff9f42': 'var(--foundation-sand-400)',
  '#29c76f': 'var(--foundation-forest-500)',

  // Dark blues
  '#022354': 'var(--foundation-sky-700)',

  // RGB equivalents for rgba patterns (calculated from rgba values in theme)
  '#64748b': 'var(--text-neutral-subdued)', // rgb(100, 116, 139)
  '#a855f7': 'var(--foundation-berries-500)', // rgb(168, 85, 247)
  '#3b82f6': 'var(--foundation-sky-400)', // rgb(59, 130, 246)
};

// Map of common hardcoded values to their semantic equivalents for DARK theme
const DARK_THEME_MAPPINGS = {
  // Primary/Brand colors (Sky for dark)
  '#183B60': 'var(--surface-brand-primary)',
  '#001F4A': 'var(--surface-brand-secondary)',
  '#2E598F': 'var(--surface-context-info)',
  '#648CC3': 'var(--foundation-sky-400)',
  '#9DB7D6': 'var(--foundation-sky-300)',
  '#BCCEE2': 'var(--foundation-sky-200)',
  '#DDE0EA': 'var(--foundation-sky-100)',
  '#F0F4F9': 'var(--foundation-sky-050)',

  // Dark surfaces
  '#000D20': 'var(--surface-neutral-primary)',
  '#000712': 'var(--surface-neutral-secondary)',
  '#000409': 'var(--surface-neutral-tertiary)',
  '#001129': 'var(--foundation-sky-800)',

  // Neutral text/icons (Rock for dark - lighter shades)
  '#FFFFFF': 'var(--foundation-white)',
  '#F8F8F8': 'var(--foundation-rock-050)',
  '#F2F1F2': 'var(--foundation-rock-100)',
  '#E4E4E4': 'var(--foundation-rock-200)',
  '#C4C2C5': 'var(--foundation-rock-300)',
  '#A39FA7': 'var(--text-neutral-subdued)',
  '#8A858E': 'var(--text-neutral-disabled)',
  '#716C75': 'var(--foundation-rock-600)',
  '#58525D': 'var(--border-neutral-loud)',
  '#2E2734': 'var(--foundation-rock-800)',
  '#201C25': 'var(--foundation-rock-900)',
  '#131116': 'var(--foundation-rock-950)',

  // Black
  '#000000': 'var(--foundation-black)',

  // Context: Info (Sea for dark)
  '#244655': 'var(--foundation-sea-800)',
  '#336174': 'var(--foundation-sea-700)',
  '#477E92': 'var(--surface-context-signal)',
  '#649EB3': 'var(--foundation-sea-500)',
  '#7BB8D1': 'var(--foundation-sea-400)',
  '#98C5D3': 'var(--text-state-selected)',
  '#BEDCDD': 'var(--foundation-sea-200)',
  '#D9E4E1': 'var(--foundation-sea-100)',

  // Context: Success (Forest for dark)
  '#485E1D': 'var(--surface-context-success)',
  '#5D7235': 'var(--foundation-forest-600)',
  '#7A9652': 'var(--foundation-forest-500)',
  '#9AB56B': 'var(--border-context-success)',
  '#B0C18E': 'var(--text-context-success)',
  '#C7D3B2': 'var(--foundation-forest-200)',
  '#DFE3D9': 'var(--foundation-forest-100)',

  // Context: Warning (Sand for dark)
  '#7B4E0F': 'var(--foundation-sand-800)',
  '#AA6509': 'var(--foundation-sand-700)',
  '#C17B16': 'var(--surface-context-warning)',
  '#D39327': 'var(--foundation-sand-500)',
  '#E2AC5D': 'var(--foundation-sand-400)',
  '#F2C77F': 'var(--border-context-warning)',
  '#F4DAB8': 'var(--foundation-sand-200)',
  '#EFE7DB': 'var(--foundation-sand-100)',

  // Context: Danger (Berries for dark)
  '#BC3939': 'var(--surface-context-danger)',
  '#D64949': 'var(--foundation-berries-600)',
  '#EA5E68': 'var(--surface-context-dangeractive)',
  '#FF8186': 'var(--foundation-berries-400)',
  '#FCA4AB': 'var(--text-context-danger)',
  '#F9BBC3': 'var(--foundation-berries-200)',
  '#F4DFDF': 'var(--foundation-berries-100)',

  // Common Prime components colors
  '#60a5fa': 'var(--primary-color)',
  '#030712': 'var(--foundation-black)',

  // Tailwind-style grays -> map for dark theme
  '#f9fafb': 'var(--foundation-rock-050)', // Light surface in dark -> use rock-050
  '#f3f4f6': 'var(--foundation-rock-100)', // gray-100
  '#e5e7eb': 'var(--foundation-rock-200)', // gray-200
  '#d1d5db': 'var(--foundation-rock-300)', // gray-300
  '#9ca3af': 'var(--text-neutral-subdued)', // gray-400
  '#6b7280': 'var(--foundation-rock-600)', // gray-500
  '#4b5563': 'var(--border-neutral-loud)', // gray-600
  '#424b57': 'var(--border-neutral-default)', // Darker gray variant for dark theme borders
  '#374151': 'var(--foundation-rock-800)', // gray-700
  '#1f2937': 'var(--foundation-rock-900)', // gray-800
  '#1c2127': 'var(--foundation-rock-900)', // Similar dark
  '#1c2532': 'var(--foundation-rock-900)', // Similar dark
  '#111827': 'var(--foundation-rock-950)', // gray-900
  '#020617': 'var(--foundation-black)', // Almost black

  // Slate variants for dark
  '#f8f9fa': 'var(--foundation-rock-050)',
  '#f8f8fa': 'var(--foundation-rock-050)',
  '#f2f2f2': 'var(--foundation-rock-100)',
  '#e2e8f0': 'var(--foundation-rock-200)',
  '#cbd5e1': 'var(--foundation-rock-300)',
  '#94a3b8': 'var(--text-neutral-subdued)',
  '#64748b': 'var(--foundation-rock-600)',

  // Purple accent colors for dark theme
  '#c084fc': 'var(--surface-brand-accent)', // purple-400
  '#a855f7': 'var(--foundation-berries-500)', // purple-500
  '#e9d5ff': 'var(--foundation-berries-100)', // purple-200
  '#d8b4fe': 'var(--foundation-berries-200)', // purple-300
  '#3b0764': 'var(--foundation-berries-700)', // purple-900

  // Danger/error colors
  '#ea5455': 'var(--surface-context-danger)',
  '#f48fb1': 'var(--foundation-berries-300)',

  // Blue accent colors for dark
  '#93c5fd': 'var(--foundation-sky-300)',
  '#bfdbfe': 'var(--foundation-sky-100)',
  '#3b82f6': 'var(--foundation-sky-400)',
  '#1d7ffc': 'var(--foundation-sky-500)',
  '#0763d4': 'var(--foundation-sky-600)',

  // Additional context colors
  '#ffcf91': 'var(--foundation-sand-200)',
  '#eb9a9c': 'var(--foundation-berries-300)',
  '#93deac': 'var(--foundation-forest-300)',
  '#d3a9fd': 'var(--foundation-berries-200)',
  '#b4bfcd': 'var(--foundation-rock-300)',

  // Dark variations
  '#3f4753': 'var(--foundation-rock-700)',

  // RGB equivalents for rgba patterns in dark theme
  '#94a3b8': 'var(--text-neutral-subdued)', // rgb(148, 163, 184)
  '#c084fc': 'var(--surface-brand-accent)', // rgb(192, 132, 252)
  '#1d7ff8': 'var(--foundation-sky-500)', // rgb(29, 127, 248)
  '#424b57': 'var(--border-neutral-default)', // rgb(66, 75, 87)
  '#60a5fa': 'var(--primary-color)', // rgb(96, 165, 250)
};

function normalizeHexColor(hex) {
  // Convert to uppercase for consistent matching
  hex = hex.toUpperCase();
  // Convert 3-digit hex to 6-digit
  if (hex.length === 4) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
}

// Create case-insensitive versions of mappings
function createCaseInsensitiveMappings(mappings) {
  const result = {};
  for (const [key, value] of Object.entries(mappings)) {
    // Add both lowercase and uppercase versions
    result[key.toLowerCase()] = value;
    result[key.toUpperCase()] = value;
    result[key] = value; // Keep original
  }
  return result;
}

function rgbaToHex(r, g, b, a) {
  const toHex = (n) => {
    const hex = Math.round(n).toString(16).toUpperCase();
    return hex.length === 1 ? '0' + hex : hex;
  };

  let hex = '#' + toHex(r) + toHex(g) + toHex(b);

  // If there's alpha, we'll return it separately to handle opacity later
  if (a !== undefined && a !== 1) {
    return { hex, alpha: a };
  }

  return hex;
}

function refactorThemeFile(inputPath, outputPath, mappings, themeName) {
  console.log(`\n🔄 Refactoring ${themeName}...`);
  console.log(`   Input: ${inputPath}`);
  console.log(`   Output: ${outputPath}`);

  let content = fs.readFileSync(inputPath, 'utf-8');
  let replacementCount = 0;
  const replacements = new Map();

  // Create case-insensitive mappings
  const caseInsensitiveMappings = createCaseInsensitiveMappings(mappings);

  // Split content to preserve the :root section (semantic variables)
  // We only want to replace in component classes, not in variable definitions
  const lines = content.split('\n');
  let inRootSection = false;
  let rootSectionDepth = 0;
  let rootSectionEnd = 0;

  // Find where the :root sections end
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith(':root')) {
      inRootSection = true;
      rootSectionDepth = 0;
    }

    if (inRootSection) {
      if (line.includes('{')) rootSectionDepth++;
      if (line.includes('}')) rootSectionDepth--;

      if (rootSectionDepth === 0 && line.includes('}')) {
        inRootSection = false;
        rootSectionEnd = i;
      }
    }
  }

  // Join the content back
  const headerContent = lines.slice(0, rootSectionEnd + 1).join('\n');
  let componentContent = lines.slice(rootSectionEnd + 1).join('\n');

  // Now replace in the component section only
  // Sort mappings by length (longest first) to avoid partial replacements
  const sortedMappings = Object.entries(caseInsensitiveMappings).sort((a, b) => b[0].length - a[0].length);

  for (const [hexColor, varName] of sortedMappings) {
    // Create case-insensitive regex for hex colors
    const hexPattern = new RegExp(hexColor.replace(/[#]/g, '\\#'), 'gi');
    const matches = componentContent.match(hexPattern);

    if (matches) {
      componentContent = componentContent.replace(hexPattern, varName);
      replacementCount += matches.length;
      replacements.set(hexColor, (replacements.get(hexColor) || 0) + matches.length);
    }
  }

  // Handle rgba values with opacity by wrapping in color-mix
  // Pattern: rgba(R, G, B, A) or rgb(R, G, B)
  const rgbaPattern = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/g;

  componentContent = componentContent.replace(rgbaPattern, (match, r, g, b, a) => {
    const hexInfo = rgbaToHex(parseInt(r), parseInt(g), parseInt(b), a ? parseFloat(a) : 1);

    if (typeof hexInfo === 'string') {
      // No alpha, just convert to hex and check if we have a mapping
      const normalizedHex = normalizeHexColor(hexInfo);
      if (caseInsensitiveMappings[normalizedHex]) {
        replacementCount++;
        return caseInsensitiveMappings[normalizedHex];
      }
    } else {
      // Has alpha, use color-mix if we have a mapping for the base color
      const normalizedHex = normalizeHexColor(hexInfo.hex);
      if (caseInsensitiveMappings[normalizedHex]) {
        replacementCount++;
        const percentage = Math.round(hexInfo.alpha * 100);
        return `color-mix(in srgb, ${caseInsensitiveMappings[normalizedHex]} ${percentage}%, transparent)`;
      }
    }

    return match; // Keep original if no mapping found
  });

  // Combine back together
  const finalContent = headerContent + '\n' + componentContent;

  // Write the output
  fs.writeFileSync(outputPath, finalContent, 'utf-8');

  console.log(`   ✅ Replaced ${replacementCount} color values`);
  console.log(`   📊 Breakdown:`);
  for (const [color, count] of Array.from(replacements.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10)) {
    console.log(`      ${color}: ${count} replacements`);
  }

  return replacementCount;
}

// Main execution
const themesDir = path.join(__dirname, '..', 'src', 'theme');
const lightThemePath = path.join(themesDir, 'yggdrasil-light.css');
const darkThemePath = path.join(themesDir, 'yggdrasil-dark.css');

console.log('🚀 Starting theme refactoring...\n');
console.log('This script will replace hardcoded hex and rgba values with semantic variables.');

try {
  const lightReplacements = refactorThemeFile(
    lightThemePath,
    lightThemePath,
    LIGHT_THEME_MAPPINGS,
    'Light Theme'
  );

  const darkReplacements = refactorThemeFile(
    darkThemePath,
    darkThemePath,
    DARK_THEME_MAPPINGS,
    'Dark Theme'
  );

  console.log('\n✨ Refactoring complete!');
  console.log(`   Total replacements: ${lightReplacements + darkReplacements}`);
  console.log(`   - Light theme: ${lightReplacements}`);
  console.log(`   - Dark theme: ${darkReplacements}`);

} catch (error) {
  console.error('❌ Error during refactoring:', error.message);
  process.exit(1);
}
