/**
 * Final theme extraction script
 * Simpler approach - extracts :root blocks in order
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Extracting theme structure...\n');

function extractRootBlocks(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const rootBlocks = [];
  const components = [];
  let inRoot = false;
  let rootDepth = 0;
  let currentBlock = [];
  let headerLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith(':root')) {
      inRoot = true;
      rootDepth = 0;
      currentBlock = [];
      // Look back for comment header
      let j = i - 1;
      while (j >= 0 && (lines[j].trim().startsWith('/*') || lines[j].trim().startsWith('*') || lines[j].trim() === '')) {
        if (lines[j].trim().startsWith('/*')) break;
        j--;
      }
      if (j >= 0 && lines[j].trim().startsWith('/*')) {
        headerLines = lines.slice(j, i);
      } else {
        headerLines = [];
      }
      continue;
    }

    if (inRoot) {
      currentBlock.push(line);
      if (trimmed.includes('{')) rootDepth++;
      if (trimmed.includes('}')) rootDepth--;

      if (rootDepth === 0 && trimmed.includes('}')) {
        rootBlocks.push({
          header: headerLines,
          content: currentBlock
        });
        inRoot = false;
        currentBlock = [];
        headerLines = [];
        continue;
      }
    } else {
      // After all :root blocks, everything is components
      if (rootBlocks.length > 0) {
        components.push(line);
      }
    }
  }

  return { rootBlocks, components };
}

function createFiles() {
  const themesDir = path.join(__dirname, '..', 'src', 'theme');

  // Extract from both files
  console.log('📖 Extracting from yggdrasil-light.css...');
  const light = extractRootBlocks(path.join(themesDir, 'yggdrasil-light.css'));
  console.log(`   Found ${light.rootBlocks.length} :root blocks, ${light.components.length} component lines`);

  console.log('📖 Extracting from yggdrasil-dark.css...');
  const dark = extractRootBlocks(path.join(themesDir, 'yggdrasil-dark.css'));
  console.log(`   Found ${dark.rootBlocks.length} :root blocks, ${dark.components.length} component lines`);

  // Create semantic-light.css (all :root blocks from light theme)
  console.log('\n✍️  Creating semantic-light.css...');
  const semanticLight = [
    '/**',
    ' * Yggdrasil Light - Semantic Tokens',
    ' */',
    '',
    ...light.rootBlocks.flatMap(block => [
      ...block.header,
      ':root {',
      ...block.content.slice(0, -1), // Remove the closing }
      '}',
      ''
    ])
  ];
  fs.writeFileSync(path.join(themesDir, 'semantic-light.css'), semanticLight.join('\n'), 'utf-8');
  console.log('   ✅ Created semantic-light.css');

  // Create semantic-dark.css
  console.log('✍️  Creating semantic-dark.css...');
  const semanticDark = [
    '/**',
    ' * Yggdrasil Dark - Semantic Tokens',
    ' */',
    '',
    ...dark.rootBlocks.flatMap(block => [
      ...block.header,
      ':root {',
      ...block.content.slice(0, -1),
      '}',
      ''
    ])
  ];
  fs.writeFileSync(path.join(themesDir, 'semantic-dark.css'), semanticDark.join('\n'), 'utf-8');
  console.log('   ✅ Created semantic-dark.css');

  // Create components.css (from light theme components)
  console.log('✍️  Creating components.css...');
  const components = [
    '/**',
    ' * Yggdrasil Components',
    ' *',
    ' * Unified component styles using semantic tokens.',
    ' */',
    '',
    ...light.components.filter(line => line.trim() !== '')
  ];
  fs.writeFileSync(path.join(themesDir, 'components.css'), components.join('\n'), 'utf-8');
  console.log('   ✅ Created components.css');

  // Create yggdrasil-adaptive.css
  console.log('✍️  Creating yggdrasil-adaptive.css...');
  const adaptive = [
    '/**',
    ' * Yggdrasil Adaptive Theme',
    ' *',
    ' * Runtime theme switching via data-theme attribute.',
    ' *',
    ' * Usage: document.documentElement.dataset.theme = "dark" | "light"',
    ' */',
    '',
    '@import url(\'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap\');',
    '@import "./foundations.css";',
    '',
    '/* Light Theme (Default) */',
    ':root,',
    ':root[data-theme="light"] {',
    ...light.rootBlocks.flatMap(block =>
      block.content.slice(0, -1).filter(line => line.trim() !== '')
    ),
    '  color-scheme: light;',
    '}',
    '',
    '/* Dark Theme */',
    ':root[data-theme="dark"] {',
    ...dark.rootBlocks.flatMap(block =>
      block.content.slice(0, -1).filter(line => line.trim() !== '')
    ),
    '  color-scheme: dark;',
    '}',
    '',
    '@import "./components.css";'
  ];
  fs.writeFileSync(path.join(themesDir, 'yggdrasil-adaptive.css'), adaptive.join('\n'), 'utf-8');
  console.log('   ✅ Created yggdrasil-adaptive.css');

  // Update legacy files
  console.log('✍️  Updating legacy theme files...');
  const lightLegacy = [
    '/**',
    ' * Yggdrasil Light',
    ' *',
    ' * Legacy theme file for stylesheet swapping.',
    ' * For runtime switching, use yggdrasil-adaptive.css',
    ' */',
    '',
    '@import url(\'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap\');',
    '@import "./foundations.css";',
    '@import "./semantic-light.css";',
    '@import "./components.css";'
  ];
  fs.writeFileSync(path.join(themesDir, 'yggdrasil-light.css'), lightLegacy.join('\n'), 'utf-8');

  const darkLegacy = [
    '/**',
    ' * Yggdrasil Dark',
    ' *',
    ' * Legacy theme file for stylesheet swapping.',
    ' * For runtime switching, use yggdrasil-adaptive.css',
    ' */',
    '',
    '@import url(\'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap\');',
    '@import "./foundations.css";',
    '@import "./semantic-dark.css";',
    '@import "./components.css";'
  ];
  fs.writeFileSync(path.join(themesDir, 'yggdrasil-dark.css'), darkLegacy.join('\n'), 'utf-8');
  console.log('   ✅ Updated yggdrasil-light.css and yggdrasil-dark.css');

  console.log('\n✨ Theme extraction complete!');
  console.log('\n📁 Structure:');
  console.log('   ├── foundations.css');
  console.log('   ├── semantic-light.css       (all light theme tokens)');
  console.log('   ├── semantic-dark.css        (all dark theme tokens)');
  console.log('   ├── components.css           (shared component styles)');
  console.log('   ├── yggdrasil-adaptive.css   (data-theme switching)');
  console.log('   ├── yggdrasil-light.css      (legacy import wrapper)');
  console.log('   └── yggdrasil-dark.css       (legacy import wrapper)');
}

createFiles();
