/**
 * Script to extract and reorganize theme files into:
 * - foundations.css (already exists)
 * - semantic-light.css (semantic tokens for light mode)
 * - semantic-dark.css (semantic tokens for dark mode)
 * - components.css (unified component styles)
 * - yggdrasil-adaptive.css (adaptive theme with data-theme selector)
 */

const fs = require('fs');
const path = require('path');

const themesDir = path.join(__dirname, '..', 'src', 'theme');
const lightThemePath = path.join(themesDir, 'yggdrasil-light.css');
const darkThemePath = path.join(themesDir, 'yggdrasil-dark.css');

console.log('🚀 Extracting theme structure...\n');

/**
 * Parse a theme file into sections
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
    components: []
  };

  let currentSection = 'header';
  let inRootBlock = false;
  let rootBlockDepth = 0;
  let rootBlockType = null;
  let currentBlock = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Track imports
    if (trimmed.startsWith('@import')) {
      sections.imports.push(line);
      continue;
    }

    // Track header comments
    if (!inRootBlock && (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//'))) {
      if (currentSection === 'header') {
        sections.header.push(line);
        continue;
      }
    }

    // Detect :root blocks
    if (trimmed.startsWith(':root')) {
      inRootBlock = true;
      rootBlockDepth = 0;
      currentBlock = [line];

      // Determine the type of :root block by looking ahead at comments
      const nextNonEmptyLine = lines.slice(i + 1, i + 10).find(l => l.trim() && !l.trim().startsWith('/*'));
      if (nextNonEmptyLine) {
        if (nextNonEmptyLine.includes('--surface-') || nextNonEmptyLine.includes('--text-') ||
            nextNonEmptyLine.includes('--border-') || nextNonEmptyLine.includes('--icon-') ||
            nextNonEmptyLine.includes('--severity-')) {
          rootBlockType = 'semantic';
        } else if (nextNonEmptyLine.includes('--primary-color') || nextNonEmptyLine.includes('--surface-a')) {
          rootBlockType = 'prime';
        } else if (nextNonEmptyLine.includes('--blue-') || nextNonEmptyLine.includes('--green-') ||
                   nextNonEmptyLine.includes('--red-')) {
          rootBlockType = 'palette';
        }
      }
      continue;
    }

    if (inRootBlock) {
      currentBlock.push(line);

      // Track braces
      if (trimmed.includes('{')) rootBlockDepth++;
      if (trimmed.includes('}')) rootBlockDepth--;

      // End of :root block
      if (rootBlockDepth === 0 && trimmed.includes('}')) {
        inRootBlock = false;

        // Categorize the block
        if (rootBlockType === 'semantic') {
          sections.semanticTokens.push(...currentBlock);
        } else if (rootBlockType === 'prime') {
          sections.primeAliases.push(...currentBlock);
        } else if (rootBlockType === 'palette') {
          sections.paletteAliases.push(...currentBlock);
        }

        currentBlock = [];
        rootBlockType = null;
        currentSection = 'components';
        continue;
      }
      continue;
    }

    // Everything else is components
    if (currentSection === 'components') {
      sections.components.push(line);
    }
  }

  console.log(`   ✓ Found ${sections.semanticTokens.length} lines of semantic tokens`);
  console.log(`   ✓ Found ${sections.primeAliases.length} lines of Prime aliases`);
  console.log(`   ✓ Found ${sections.paletteAliases.length} lines of palette aliases`);
  console.log(`   ✓ Found ${sections.components.length} lines of component styles`);

  return sections;
}

/**
 * Extract semantic tokens file
 */
function createSemanticFile(sections, themeName, outputPath) {
  const content = [
    `/**`,
    ` * Yggdrasil ${themeName} Theme - Semantic Tokens`,
    ` *`,
    ` * This file contains semantic color tokens that map foundation colors`,
    ` * to meaningful names for surfaces, text, borders, and icons.`,
    ` */`,
    ``,
    `:root {`,
    ...sections.semanticTokens.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    `}`,
    ``
  ].join('\n');

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`   ✅ Created ${path.basename(outputPath)}`);
}

/**
 * Create components.css from light theme (they should be identical)
 */
function createComponentsFile(sections, outputPath) {
  const content = [
    `/**`,
    ` * Yggdrasil Components`,
    ` *`,
    ` * Unified component styles for all PrimeReact components.`,
    ` * Uses semantic tokens exclusively - no hardcoded colors.`,
    ` *`,
    ` * This file is theme-agnostic and works with both light and dark modes`,
    ` * by referencing semantic tokens (--surface-*, --text-*, --border-*, etc.)`,
    ` */`,
    ``,
    ...sections.components.filter(line => line.trim() !== '')
  ].join('\n');

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`   ✅ Created ${path.basename(outputPath)}`);
}

/**
 * Create adaptive theme file with data-theme selectors
 */
function createAdaptiveTheme(lightSections, darkSections, outputPath) {
  const content = [
    `/**`,
    ` * Yggdrasil Adaptive Theme`,
    ` *`,
    ` * This theme supports runtime light/dark mode switching using the data-theme attribute.`,
    ` *`,
    ` * Usage:`,
    ` *   // Switch to dark mode`,
    ` *   document.documentElement.dataset.theme = 'dark';`,
    ` *`,
    ` *   // Switch to light mode`,
    ` *   document.documentElement.dataset.theme = 'light';`,
    ` */`,
    ``,
    `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`,
    `@import "./foundations.css";`,
    ``,
    `/* ==================== Light Theme (Default) ==================== */`,
    `:root,`,
    `:root[data-theme="light"] {`,
    ...lightSections.semanticTokens.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    ``,
    ...lightSections.primeAliases.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    ``,
    ...lightSections.paletteAliases.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    ``,
    `  color-scheme: light;`,
    `}`,
    ``,
    `/* ==================== Dark Theme ==================== */`,
    `:root[data-theme="dark"] {`,
    ...darkSections.semanticTokens.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    ``,
    ...darkSections.primeAliases.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    ``,
    ...darkSections.paletteAliases.filter(line => !line.trim().startsWith(':root') && !line.trim().startsWith('}')),
    ``,
    `  color-scheme: dark;`,
    `}`,
    ``,
    `/* ==================== Components (Theme-Agnostic) ==================== */`,
    `@import "./components.css";`,
    ``
  ].join('\n');

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`   ✅ Created ${path.basename(outputPath)}`);
}

/**
 * Update legacy theme files to use new structure
 */
function updateLegacyTheme(sections, themeName, outputPath, semanticFile) {
  const content = [
    `/**`,
    ` * Yggdrasil ${themeName} Theme`,
    ` *`,
    ` * Legacy theme file for stylesheet-swapping approach.`,
    ` * For runtime theme switching, use yggdrasil-adaptive.css instead.`,
    ` */`,
    ``,
    `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');`,
    `@import "./foundations.css";`,
    `@import "./${semanticFile}";`,
    `@import "./components.css";`,
    ``
  ].join('\n');

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`   ✅ Updated ${path.basename(outputPath)} (now uses modular structure)`);
}

// Main execution
try {
  console.log('Step 1: Parsing theme files...\n');
  const lightSections = parseThemeFile(lightThemePath, 'Light Theme');
  const darkSections = parseThemeFile(darkThemePath, 'Dark Theme');

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

  console.log('\nStep 4: Creating adaptive theme file...\n');
  createAdaptiveTheme(
    lightSections,
    darkSections,
    path.join(themesDir, 'yggdrasil-adaptive.css')
  );

  console.log('\nStep 5: Updating legacy theme files...\n');
  updateLegacyTheme(
    lightSections,
    'Light',
    lightThemePath,
    'semantic-light.css'
  );
  updateLegacyTheme(
    darkSections,
    'Dark',
    darkThemePath,
    'semantic-dark.css'
  );

  console.log('\n✨ Theme structure extraction complete!');
  console.log('\n📁 New structure:');
  console.log('   ├── foundations.css          (foundation color ramps)');
  console.log('   ├── semantic-light.css       (light mode semantic tokens)');
  console.log('   ├── semantic-dark.css        (dark mode semantic tokens)');
  console.log('   ├── components.css           (unified component styles)');
  console.log('   ├── yggdrasil-adaptive.css   (adaptive theme with data-theme)');
  console.log('   ├── yggdrasil-light.css      (legacy light theme - now imports above)');
  console.log('   └── yggdrasil-dark.css       (legacy dark theme - now imports above)');

  console.log('\n💡 Usage:');
  console.log('   Modern (runtime switching):  import "yggdrasil-adaptive.css"');
  console.log('   Legacy (stylesheet swap):    import "yggdrasil-light.css" OR "yggdrasil-dark.css"');

} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
