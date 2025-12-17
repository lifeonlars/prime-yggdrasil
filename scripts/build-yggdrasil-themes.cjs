/**
 * Build Yggdrasil Light and Dark themes from Lara base themes
 *
 * This script replaces Lara color tokens with Yggdrasil tokens
 */

const fs = require('fs');
const path = require('path');

// Yggdrasil color mappings
const yggdrasilColors = {
  // Primary (Sky - replaces blue in Lara)
  blue: {
    50: '#F0F4F9',
    100: '#DDE0EA',
    200: '#BCCEE2',
    300: '#9DB7D6',
    400: '#648CC3',
    500: '#2E598F',
    600: '#183B60',
    700: '#001F4A',
    800: '#001129',
    900: '#000712',
  },
  // Success (Forest - replaces green)
  green: {
    50: '#F4F9F3',    // Lighter than 100 for consistency
    100: '#DFE3D9',
    200: '#C7D3B2',
    300: '#B0C18E',
    400: '#9AB56B',
    500: '#7A9652',
    600: '#5D7235',
    700: '#485E1D',
    800: '#364812',   // Darker for consistency
    900: '#243009',   // Darkest
  },
  // Warning (Sand - replaces yellow)
  yellow: {
    50: '#FAF6F0',    // Lighter
    100: '#EFE7DB',
    200: '#F4DAB8',
    300: '#EFCE94',
    400: '#DCAB54',
    500: '#C48E2F',
    600: '#9B6E1B',
    700: '#6E4A0A',
    800: '#4A3207',   // Darker
    900: '#2F2004',   // Darkest
  },
  // Danger (Clay - replaces red/pink)
  red: {
    50: '#F9F3F2',    // Lighter
    100: '#E8D5D3',
    200: '#E3BDB3',
    300: '#D89785',
    400: '#CD7459',
    500: '#B45431',
    600: '#923917',
    700: '#6E2509',
    800: '#4A1906',   // Darker
    900: '#2F1004',   // Darkest
  },
  // Slate/Gray (neutrals - keep similar to Lara but use Yggdrasil values)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// Additional semantic colors that map to Yggdrasil
const semanticMappings = {
  cyan: 'blue',    // Map cyan to Sea/Sky
  indigo: 'blue',  // Map indigo to Sky
  teal: 'green',   // Map teal to Forest
  orange: 'yellow', // Map orange to Sand
  pink: 'red',     // Map pink to Clay
};

function buildYggdrasilTheme(sourceFile, targetFile, isDark = false) {
  console.log(`Building ${isDark ? 'dark' : 'light'} theme...`);

  let content = fs.readFileSync(sourceFile, 'utf-8');

  // Replace font family (Inter -> Roboto)
  content = content.replace(/font-family:\s*"Inter var"[^;]*;/g, 'font-family: "Roboto", sans-serif;');
  content = content.replace(/--font-family:\s*"Inter var"[^;]*;/g, '--font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;');

  // Remove entire lines with font-feature-settings and font-variation-settings
  content = content.replace(/^.*font-feature-settings:.*$\n?/gm, '');
  content = content.replace(/^.*font-variation-settings:.*$\n?/gm, '');
  content = content.replace(/^.*--font-feature-settings:.*$\n?/gm, '');

  // Remove Inter font-face declarations
  content = content.replace(/@font-face\s*\{[^}]*Inter[^}]*\}/gs, '');

  // Replace primary color references (blue in Lara -> Sky in Yggdrasil)
  content = content.replace(/--primary-color:\s*#[0-9a-fA-F]{6};/, `--primary-color: ${yggdrasilColors.blue[500]};`);

  // Replace all color scale variables
  Object.entries(yggdrasilColors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, hexValue]) => {
      const regex = new RegExp(`--${colorName}-${shade}:\\s*#[0-9a-fA-F]{6};`, 'g');
      content = content.replace(regex, `--${colorName}-${shade}:${hexValue};`);
    });
  });

  // Map semantic colors to Yggdrasil equivalents
  Object.entries(semanticMappings).forEach(([semanticColor, targetColor]) => {
    const targetShades = yggdrasilColors[targetColor];
    Object.entries(targetShades).forEach(([shade, hexValue]) => {
      const regex = new RegExp(`--${semanticColor}-${shade}:\\s*#[0-9a-fA-F]{6};`, 'g');
      content = content.replace(regex, `--${semanticColor}-${shade}:${hexValue};`);
    });
  });

  // Add Roboto font import at the top
  const robotoImport = `/* Roboto Font from Google Fonts */\n@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');\n\n`;
  content = robotoImport + content;

  // Add header comment
  const header = `/**
 * Yggdrasil ${isDark ? 'Dark' : 'Light'} Theme
 *
 * A standalone PrimeReact theme based on Lara ${isDark ? 'Dark' : 'Light'} Blue
 * with Yggdrasil design tokens.
 *
 * Design System: Prime Yggdrasil
 * Color Palette: Sky (primary), Sea (info), Forest (success), Sand (warning), Clay (danger), Slate (neutral)
 */\n\n`;

  content = header + content;

  fs.writeFileSync(targetFile, content, 'utf-8');
  console.log(`✓ Created ${targetFile}`);
}

// Build both themes
const themesDir = path.join(__dirname, '..', 'src', 'theme');

buildYggdrasilTheme(
  path.join(themesDir, 'yggdrasil-light.css'),
  path.join(themesDir, 'yggdrasil-light.css'),
  false
);

buildYggdrasilTheme(
  path.join(themesDir, 'yggdrasil-dark.css'),
  path.join(themesDir, 'yggdrasil-dark.css'),
  true
);

console.log('\n✓ Yggdrasil themes built successfully!');
