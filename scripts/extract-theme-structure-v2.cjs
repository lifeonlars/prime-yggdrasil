/**
 * Script to extract and reorganize theme files - Version 2
 * Properly detects sections based on comment headers
 */

const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'src', 'theme');

console.log('🚀 Extracting theme structure (v2)...\n');

/**
 * Parse theme file into sections based on comment headers
 */
function parseThemeFile(filePath, themeName) {
  console.log(`📖 Parsing ${themeName}...`);

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const sections = {
    header: [],
    imports: [],
    semanticTokens: [],
    primeAliases: [],
    paletteAliases: [],
    additionalTokens: [],
    components: []
  };

  let currentSection = 'header';
  let inRootBlock = false;
  let rootDepth = 0;
  let rootContent = [];
  let currentRootType = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect section changes based on comments
    if (trimmed.includes('==================== Semantic Tokens')) {
      currentSection = 'preparingSemanticTokens';
      sections.header.push(line);
      continue;
    }
    if (trimmed.includes('==================== PrimeReact Theme Mappings')) {
      currentSection = 'preparingPrimeAliases';
      sections.header.push(line);
      continue;
    }
    if (trimmed.includes('=== Prime palette aliases')) {
      currentSection = 'preparingPaletteAliases';
      sections.header.push(line);
      continue;
    }
    if (trimmed.includes('Additional semantic tokens')) {
      currentSection = 'preparingAdditionalTokens';
      sections.header.push(line);
      continue;
    }

    // Track imports
    if (trimmed.startsWith('@import')) {
      sections.imports.push(line);
      continue;
    }

    // Handle :root blocks
    if (trimmed.startsWith(':root')) {
      inRootBlock = true;
      rootDepth = 0;
      rootContent = [line];
      currentRootType = currentSection;
      continue;
    }

    if (inRootBlock) {
      rootContent.push(line);

      if (trimmed.includes('{')) rootDepth++;
      if (trimmed.includes('}')) rootDepth--;

      if (rootDepth === 0 && trimmed.includes('}')) {
        inRootBlock = false;

        // Categorize based on the section we're in
        if (currentRootType === 'preparingSemanticTokens') {
          sections.semanticTokens.push(...rootContent);
        } else if (currentRootType === 'preparingPrimeAliases') {
          sections.primeAliases.push(...rootContent);
        } else if (currentRootType === 'preparingPaletteAliases') {
          sections.paletteAliases.push(...rootContent);
        } else if (currentRootType === 'preparingAdditionalTokens') {
          sections.additionalTokens.push(...rootContent);
        }

        rootContent = [];
        currentSection = 'components';
        continue;
      }
      continue;
    }

    // Header comments before any :root
    if (currentSection === 'header') {
      sections.header.push(line);
      continue;
    }

    // Everything after all :root blocks is components
    if (currentSection === 'components') {
      sections.components.push(line);
    }
  }

  console.log(`   ✓ Semantic tokens: ${sections.semanticTokens.length} lines`);
  console.log(`   ✓ Prime aliases: ${sections.primeAliases.length} lines`);
  console.log(`   ✓ Palette aliases: ${sections.paletteAliases.length} lines`);
  console.log(`   ✓ Additional tokens: ${sections.additionalTokens.length} lines`);
  console.log(`   ✓ Component styles: ${sections.components.length} lines`);

  return sections;
}

/**
 * Create semantic tokens file
 */
function createSemanticFile(sections, themeName, outputPath) {
  const lines = [];

  // Header
  lines.push(`/**`);
  lines.push(` * Yggdrasil ${themeName} - Semantic Tokens`);
  lines.push(` *`);
  lines.push(` * Semantic color tokens that map foundation colors to meaningful names`);
  lines.push(` * for surfaces, text, borders, and icons.`);
  lines.push(` */`);
  lines.push(``);

  // Add semantic tokens :root block
  lines.push(`:root {`);
  const tokenContent = sections.semanticTokens
    .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
    .filter(line => line.trim() !== '');
  lines.push(...tokenContent);

  // Add additional tokens if any
  if (sections.additionalTokens.length > 0) {
    const additionalContent = sections.additionalTokens
      .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
      .filter(line => line.trim() !== '');
    lines.push(...additionalContent);
  }

  lines.push(`}`);
  lines.push(``);

  // Add Prime aliases :root block
  lines.push(`/* PrimeReact Theme Mappings */`);
  lines.push(`:root {`);
  const primeContent = sections.primeAliases
    .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
    .filter(line => line.trim() !== '');
  lines.push(...primeContent);
  lines.push(`}`);
  lines.push(``);

  // Add palette aliases if any
  if (sections.paletteAliases.length > 0) {
    lines.push(`/* Prime Palette Aliases */`);
    lines.push(`:root {`);
    const paletteContent = sections.paletteAliases
      .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
      .filter(line => line.trim() !== '');
    lines.push(...paletteContent);
    lines.push(`}`);
    lines.push(``);
  }

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`   ✅ Created ${path.basename(outputPath)}`);
}

/**
 * Create components.css
 */
function createComponentsFile(sections, outputPath) {
  const lines = [];

  lines.push(`/**`);
  lines.push(` * Yggdrasil Components`);
  lines.push(` *`);
  lines.push(` * Unified component styles for all PrimeReact components.`);
  lines.push(` * Uses semantic tokens exclusively - no hardcoded colors.`);
  lines.push(` */`);
  lines.push(``);

  const componentContent = sections.components.filter(line => line.trim() !== '');
  lines.push(...componentContent);

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`   ✅ Created ${path.basename(outputPath)}`);
}

/**
 * Create adaptive theme
 */
function createAdaptiveTheme(lightSections, darkSections, outputPath) {
  const lines = [];

  lines.push(`/**`);
  lines.push(` * Yggdrasil Adaptive Theme`);
  lines.push(` *`);
  lines.push(` * Runtime light/dark mode switching using data-theme attribute.`);
  lines.push(` *`);
  lines.push(` * Usage:`);
  lines.push(` *   document.documentElement.dataset.theme = 'dark';  // Switch to dark`);
  lines.push(` *   document.documentElement.dataset.theme = 'light'; // Switch to light`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`);
  lines.push(`@import "./foundations.css";`);
  lines.push(``);

  // Light theme (default)
  lines.push(`/* ==================== Light Theme (Default) ==================== */`);
  lines.push(`:root,`);
  lines.push(`:root[data-theme="light"] {`);

  // Add all light theme tokens
  const lightTokens = lightSections.semanticTokens
    .concat(lightSections.additionalTokens)
    .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
    .filter(line => line.trim() !== '');
  lines.push(...lightTokens);
  lines.push(``);

  const lightPrime = lightSections.primeAliases
    .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
    .filter(line => line.trim() !== '');
  lines.push(...lightPrime);
  lines.push(``);

  if (lightSections.paletteAliases.length > 0) {
    const lightPalette = lightSections.paletteAliases
      .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
      .filter(line => line.trim() !== '');
    lines.push(...lightPalette);
    lines.push(``);
  }

  lines.push(`  color-scheme: light;`);
  lines.push(`}`);
  lines.push(``);

  // Dark theme
  lines.push(`/* ==================== Dark Theme ==================== */`);
  lines.push(`:root[data-theme="dark"] {`);

  const darkTokens = darkSections.semanticTokens
    .concat(darkSections.additionalTokens)
    .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
    .filter(line => line.trim() !== '');
  lines.push(...darkTokens);
  lines.push(``);

  const darkPrime = darkSections.primeAliases
    .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
    .filter(line => line.trim() !== '');
  lines.push(...darkPrime);
  lines.push(``);

  if (darkSections.paletteAliases.length > 0) {
    const darkPalette = darkSections.paletteAliases
      .filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}'))
      .filter(line => line.trim() !== '');
    lines.push(...darkPalette);
    lines.push(``);
  }

  lines.push(`  color-scheme: dark;`);
  lines.push(`}`);
  lines.push(``);

  // Components
  lines.push(`/* ==================== Components (Theme-Agnostic) ==================== */`);
  lines.push(`@import "./components.css";`);

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`   ✅ Created ${path.basename(outputPath)}`);
}

/**
 * Update legacy theme file
 */
function updateLegacyTheme(themeName, semanticFile, outputPath) {
  const lines = [];

  lines.push(`/**`);
  lines.push(` * Yggdrasil ${themeName}`);
  lines.push(` *`);
  lines.push(` * Legacy theme file for stylesheet-swapping approach.`);
  lines.push(` * For runtime theme switching, use yggdrasil-adaptive.css instead.`);
  lines.push(` */`);
  lines.push(``);
  lines.push(`@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`);
  lines.push(`@import "./foundations.css";`);
  lines.push(`@import "./${semanticFile}";`);
  lines.push(`@import "./components.css";`);

  fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`   ✅ Updated ${path.basename(outputPath)}`);
}

// Main execution
try {
  console.log('Step 1: Parsing theme files...\n');
  const lightSections = parseThemeFile(
    path.join(themesDir, 'yggdrasil-light.css'),
    'Light Theme'
  );
  const darkSections = parseThemeFile(
    path.join(themesDir, 'yggdrasil-dark.css'),
    'Dark Theme'
  );

  console.log('\nStep 2: Creating semantic token files...\n');
  createSemanticFile(
    lightSections,
    'Light',
    path.join(themesDir, 'semantic-light.css')
  );
  createSemanticFile(
    darkSections,
    'Dark',
    path.join(themesDir, 'semantic-dark.css')
  );

  console.log('\nStep 3: Creating unified components file...\n');
  createComponentsFile(
    lightSections,
    path.join(themesDir, 'components.css')
  );

  console.log('\nStep 4: Creating adaptive theme...\n');
  createAdaptiveTheme(
    lightSections,
    darkSections,
    path.join(themesDir, 'yggdrasil-adaptive.css')
  );

  console.log('\nStep 5: Updating legacy theme files...\n');
  updateLegacyTheme(
    'Light',
    'semantic-light.css',
    path.join(themesDir, 'yggdrasil-light.css')
  );
  updateLegacyTheme(
    'Dark',
    'semantic-dark.css',
    path.join(themesDir, 'yggdrasil-dark.css')
  );

  console.log('\n✨ Theme structure extraction complete!');
  console.log('\n📁 New structure:');
  console.log('   ├── foundations.css          (foundation color ramps)');
  console.log('   ├── semantic-light.css       (light mode semantic + Prime tokens)');
  console.log('   ├── semantic-dark.css        (dark mode semantic + Prime tokens)');
  console.log('   ├── components.css           (unified component styles)');
  console.log('   ├── yggdrasil-adaptive.css   (adaptive theme with data-theme)');
  console.log('   ├── yggdrasil-light.css      (legacy - imports above)');
  console.log('   └── yggdrasil-dark.css       (legacy - imports above)');

  console.log('\n💡 Usage:');
  console.log('   Modern:  import "./theme/yggdrasil-adaptive.css"');
  console.log('   Legacy:  import "./theme/yggdrasil-light.css"');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
