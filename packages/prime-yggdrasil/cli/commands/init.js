import { existsSync, mkdirSync, copyFileSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

export async function initCommand() {
  console.log(`
🌳 Yggdrasil Agent Infrastructure Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This will set up AI agents in your project to guide design
system usage and prevent drift.
`);

  try {
    // Detect project type
    const projectType = detectProjectType();
    console.log(`📦 Detected project type: ${projectType}`);
    console.log('');

    // Ask user preferences
    const copyAgents = await askYesNo('Copy agent documentation to .ai/yggdrasil/? (Recommended)', true);
    const installESLint = await askYesNo('Add ESLint config reference? (Available in Phase 3)', false);
    const addScripts = await askYesNo('Add npm scripts to package.json?', true);

    console.log('');
    console.log('📋 Installation Plan:');
    console.log('');
    if (copyAgents) console.log('  ✓ Copy 4 agent specifications to .ai/yggdrasil/');
    if (installESLint) console.log('  ✓ Add ESLint configuration (placeholder for Phase 3)');
    if (addScripts) console.log('  ✓ Add npm scripts for validation');
    console.log('');

    const proceed = await askYesNo('Proceed with installation?', true);
    if (!proceed) {
      console.log('❌ Installation cancelled.');
      rl.close();
      return;
    }

    console.log('');
    console.log('🚀 Installing...');
    console.log('');

    // Copy agents
    if (copyAgents) {
      await copyAgentFiles();
    }

    // Add ESLint config
    if (installESLint) {
      await createESLintConfig();
    }

    // Add scripts
    if (addScripts) {
      await addNpmScripts();
    }

    // Print success message
    printSuccessMessage(copyAgents, installESLint);

    rl.close();
  } catch (error) {
    console.error('❌ Error during installation:', error.message);
    rl.close();
    process.exit(1);
  }
}

function detectProjectType() {
  const cwd = process.cwd();

  if (existsSync(join(cwd, 'next.config.js')) || existsSync(join(cwd, 'next.config.mjs'))) {
    return 'Next.js';
  }
  if (existsSync(join(cwd, 'vite.config.js')) || existsSync(join(cwd, 'vite.config.ts'))) {
    return 'Vite';
  }
  if (existsSync(join(cwd, 'package.json'))) {
    return 'React/Node.js';
  }
  return 'Unknown';
}

async function askYesNo(question, defaultYes = true) {
  const prompt = `${question} ${defaultYes ? '[Y/n]' : '[y/N]'}: `;
  const answer = await questionPromise(prompt);
  const normalized = answer.toLowerCase().trim();

  if (normalized === '') return defaultYes;
  return normalized === 'y' || normalized === 'yes';
}

function questionPromise(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function copyAgentFiles() {
  const cwd = process.cwd();
  const targetDir = join(cwd, '.ai', 'yggdrasil');
  const sourceDir = join(__dirname, '../templates/.ai/yggdrasil');

  // Create target directory
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Copy agent files from main .ai/agents directory
  const mainAgentsDir = join(__dirname, '../../.ai/agents');
  const agentFiles = [
    'block-composer.md',
    'primeflex-guard.md',
    'semantic-token-intent.md',
    'drift-validator.md'
  ];

  console.log('  📄 Copying agent specifications...');
  for (const file of agentFiles) {
    const source = join(mainAgentsDir, file);
    const target = join(targetDir, file);

    if (existsSync(source)) {
      copyFileSync(source, target);
      console.log(`     ✓ ${file}`);
    } else {
      console.log(`     ⚠️  ${file} not found (will be available after build)`);
    }
  }

  // Copy README
  const readmePath = join(sourceDir, 'README.md');
  if (existsSync(readmePath)) {
    copyFileSync(readmePath, join(targetDir, 'README.md'));
    console.log('     ✓ README.md');
  }

  // Copy PrimeFlex policy
  const policySource = join(__dirname, '../../docs/PRIMEFLEX-POLICY.md');
  if (existsSync(policySource)) {
    copyFileSync(policySource, join(targetDir, 'PRIMEFLEX-POLICY.md'));
    console.log('     ✓ PRIMEFLEX-POLICY.md');
  }

  console.log('');
  console.log(`  ✅ Copied agents to ${targetDir}`);
  console.log('');
}

async function createESLintConfig() {
  const cwd = process.cwd();
  const configPath = join(cwd, '.eslintrc.yggdrasil.js');

  const configContent = `// Yggdrasil ESLint Configuration
// This will be functional in Phase 3 when the ESLint plugin is published

module.exports = {
  extends: [
    // Uncomment when @lifeonlars/eslint-plugin-yggdrasil is available (Phase 3)
    // 'plugin:@lifeonlars/yggdrasil/recommended'
  ],
  rules: {
    // Phase 3: ESLint rules will enforce:
    // - No hardcoded colors (use semantic tokens)
    // - No PrimeFlex on PrimeReact components
    // - PrimeFlex allowlist (layout/spacing only)
    // - No Tailwind classes
    // - Valid spacing (4px grid)
    // - Semantic tokens only
    // - Consistent PrimeReact imports
  }
};
`;

  writeFileSync(configPath, configContent);
  console.log(`  ✅ Created ${configPath}`);
  console.log('     ⚠️  ESLint plugin will be available in Phase 3');
  console.log('');
}

async function addNpmScripts() {
  const cwd = process.cwd();
  const packageJsonPath = join(cwd, 'package.json');

  if (!existsSync(packageJsonPath)) {
    console.log('  ⚠️  package.json not found, skipping script installation');
    return;
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }

  // Add scripts (placeholders for Phase 4)
  const scriptsToAdd = {
    'yggdrasil:validate': 'echo "⚠️  Validation command available in Phase 4. Use ESLint for now."',
    'yggdrasil:audit': 'echo "⚠️  Audit command available in Phase 4. Use ESLint for now."'
  };

  let added = false;
  for (const [key, value] of Object.entries(scriptsToAdd)) {
    if (!packageJson.scripts[key]) {
      packageJson.scripts[key] = value;
      console.log(`  ✓ Added script: ${key}`);
      added = true;
    }
  }

  if (added) {
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('');
    console.log('  ✅ Updated package.json');
  } else {
    console.log('  ℹ️  Scripts already exist, skipping');
  }
  console.log('');
}

function printSuccessMessage(copiedAgents, addedESLint) {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Yggdrasil Agent Infrastructure Installed!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (copiedAgents) {
    console.log('📚 Agent Documentation:');
    console.log('   .ai/yggdrasil/block-composer.md        - Composition planning');
    console.log('   .ai/yggdrasil/primeflex-guard.md       - Layout constraints');
    console.log('   .ai/yggdrasil/semantic-token-intent.md - Token selection');
    console.log('   .ai/yggdrasil/drift-validator.md       - Policy enforcement');
    console.log('   .ai/yggdrasil/PRIMEFLEX-POLICY.md      - PrimeFlex usage rules');
    console.log('');
  }

  console.log('🤖 Using Agents with AI Tools:');
  console.log('');
  console.log('   Claude Code:');
  console.log('   "Before implementing UI, read .ai/yggdrasil/block-composer.md');
  console.log('    and suggest the appropriate PrimeReact components."');
  console.log('');
  console.log('   Cursor/Copilot:');
  console.log('   Add .ai/yggdrasil/ to your AI context, then ask:');
  console.log('   "Help me implement a user profile form following Yggdrasil agents."');
  console.log('');

  console.log('📖 Next Steps:');
  console.log('');
  console.log('   1. Read the agent documentation in .ai/yggdrasil/');
  console.log('   2. Reference agents when implementing UI features');
  console.log('   3. Phase 3: Install ESLint plugin for code-time validation');
  console.log('      npm install --save-dev @lifeonlars/eslint-plugin-yggdrasil');
  console.log('   4. Phase 4: Use validation commands');
  console.log('      npm run yggdrasil:validate');
  console.log('      npm run yggdrasil:audit');
  console.log('');

  console.log('📋 Agent Workflow:');
  console.log('');
  console.log('   Planning UI:        Block Composer Agent');
  console.log('   Choosing layout:    PrimeFlex Guard Agent');
  console.log('   Selecting colors:   Semantic Token Intent Agent');
  console.log('   Validating code:    Drift Validator Agent');
  console.log('');

  console.log('🔗 Resources:');
  console.log('');
  console.log('   Documentation: https://github.com/lifeonlars/prime-yggdrasil');
  console.log('   PrimeReact:    https://primereact.org/');
  console.log('   PrimeFlex:     https://primeflex.org/');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}
