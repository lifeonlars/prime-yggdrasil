import { existsSync, mkdirSync, copyFileSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Parse command-line arguments for init command
 */
function parseInitArgs(args) {
  return {
    yes: args.includes('--yes') || args.includes('-y'),
    skipScripts: args.includes('--skip-scripts'),
    help: args.includes('--help') || args.includes('-h')
  };
}

/**
 * Initialize Yggdrasil in a project
 *
 * Options:
 *   --yes, -y       Non-interactive mode, accept all defaults
 *   --skip-scripts  Don't add npm scripts to package.json
 *   --help, -h      Show help
 */
export async function initCommand(args = []) {
  const options = parseInitArgs(args);

  if (options.help) {
    printInitHelp();
    return;
  }

  console.log(`
🌳 Yggdrasil Design System Setup
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This will set up AI agent documentation in your project
to guide design system usage and prevent drift.
`);

  try {
    // Detect project type
    const projectType = detectProjectType();
    console.log(`📦 Detected project type: ${projectType}`);
    console.log('');

    let copyAgents = true;
    let addScripts = !options.skipScripts;

    // Interactive mode - ask for confirmation
    if (!options.yes) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      copyAgents = await askYesNo(rl, 'Copy agent documentation to .ai/yggdrasil/?', true);
      if (!options.skipScripts) {
        addScripts = await askYesNo(rl, 'Add npm scripts to package.json?', true);
      }

      console.log('');
      console.log('📋 Installation Plan:');
      console.log('');
      if (copyAgents) console.log('  ✓ Copy 3 agent specifications to .ai/yggdrasil/');
      if (addScripts) console.log('  ✓ Add npm scripts for validation');
      console.log('');

      const proceed = await askYesNo(rl, 'Proceed with installation?', true);
      rl.close();

      if (!proceed) {
        console.log('❌ Installation cancelled.');
        return;
      }
    } else {
      // Non-interactive mode - show what we're doing
      console.log('📋 Installing (non-interactive mode):');
      console.log('');
      if (copyAgents) console.log('  ✓ Copy 3 agent specifications to .ai/yggdrasil/');
      if (addScripts) console.log('  ✓ Add npm scripts for validation');
      console.log('');
    }

    console.log('🚀 Installing...');
    console.log('');

    // Copy agents
    if (copyAgents) {
      copyAgentFiles();
    }

    // Add scripts
    if (addScripts) {
      addNpmScripts();
    }

    // Print success message
    printSuccessMessage(copyAgents, addScripts);

  } catch (error) {
    console.error('❌ Error during installation:', error.message);
    process.exit(1);
  }
}

function printInitHelp() {
  console.log(`
🌳 Yggdrasil Init Command

Usage:
  npx @lifeonlars/prime-yggdrasil init [options]

Options:
  --yes, -y       Non-interactive mode, accept all defaults
  --skip-scripts  Don't add npm scripts to package.json
  --help, -h      Show this help message

Examples:
  # Interactive setup
  npx @lifeonlars/prime-yggdrasil init

  # Non-interactive (CI/automation)
  npx @lifeonlars/prime-yggdrasil init --yes

  # Only copy agents, no scripts
  npx @lifeonlars/prime-yggdrasil init --yes --skip-scripts
`);
}

function detectProjectType() {
  const cwd = process.cwd();

  if (existsSync(join(cwd, 'next.config.js')) || existsSync(join(cwd, 'next.config.mjs')) || existsSync(join(cwd, 'next.config.ts'))) {
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

function askYesNo(rl, question, defaultYes = true) {
  const prompt = `${question} ${defaultYes ? '[Y/n]' : '[y/N]'}: `;
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      const normalized = answer.toLowerCase().trim();
      if (normalized === '') resolve(defaultYes);
      else resolve(normalized === 'y' || normalized === 'yes');
    });
  });
}

function copyAgentFiles() {
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
      console.log(`     ⚠️  ${file} not found`);
    }
  }

  // Copy README
  const readmePath = join(sourceDir, 'README.md');
  if (existsSync(readmePath)) {
    copyFileSync(readmePath, join(targetDir, 'README.md'));
    console.log('     ✓ README.md');
  }

  console.log('');
  console.log(`  ✅ Copied agents to ${targetDir}`);
  console.log('');
}

function addNpmScripts() {
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

  // Add working CLI scripts
  const scriptsToAdd = {
    'yggdrasil:validate': 'npx @lifeonlars/prime-yggdrasil validate',
    'yggdrasil:audit': 'npx @lifeonlars/prime-yggdrasil audit'
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

function printSuccessMessage(copiedAgents, addedScripts) {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Yggdrasil Setup Complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');

  if (copiedAgents) {
    console.log('📚 Agent Documentation:');
    console.log('   .ai/yggdrasil/block-composer.md        - UI composition planning');
    console.log('   .ai/yggdrasil/semantic-token-intent.md - Token selection guidance');
    console.log('   .ai/yggdrasil/drift-validator.md       - Policy enforcement rules');
    console.log('');
  }

  console.log('🤖 Using with AI Assistants:');
  console.log('');
  console.log('   Claude Code / Cursor / Copilot:');
  console.log('   "Read .ai/yggdrasil/block-composer.md and help me');
  console.log('    implement a user profile form using PrimeReact."');
  console.log('');

  if (addedScripts) {
    console.log('🔍 Validation Commands:');
    console.log('');
    console.log('   npm run yggdrasil:validate   # Check for design system violations');
    console.log('   npm run yggdrasil:audit      # Detailed audit with fix suggestions');
    console.log('');
  }

  console.log('📋 Agent Workflow:');
  console.log('');
  console.log('   1. Planning UI      → Block Composer Agent');
  console.log('   2. Styling choices  → Semantic Token Intent Agent');
  console.log('   3. Code review      → Drift Validator Agent');
  console.log('');

  console.log('🔗 Resources:');
  console.log('');
  console.log('   Docs:      https://github.com/lifeonlars/prime-yggdrasil');
  console.log('   PrimeReact: https://primereact.org/');
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
}
