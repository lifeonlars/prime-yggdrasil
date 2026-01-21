#!/usr/bin/env node

/**
 * Yggdrasil CLI - Design System Agent Infrastructure
 *
 * Commands:
 *   init      - Initialize Yggdrasil agents in your project
 *   validate  - Validate code against design system rules (Phase 4)
 *   audit     - Detailed audit with autofix suggestions (Phase 4)
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

// Parse command-line arguments
function parseArgs(args) {
  const options = {};
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--fix') {
      options.fix = true;
    } else if (arg === '--format') {
      options.format = args[++i];
    } else if (arg === '--rules') {
      options.rules = args[++i];
    } else if (arg.startsWith('--')) {
      // Skip unknown options
      console.warn(`⚠️  Unknown option: ${arg}`);
    }
  }
  return options;
}

async function main() {
  const options = parseArgs(args);

  switch (command) {
    case 'init':
      const { initCommand } = await import('../commands/init.js');
      await initCommand();
      break;

    case 'validate':
      const { validateCommand } = await import('../commands/validate.js');
      await validateCommand(options);
      break;

    case 'audit':
      const { auditCommand } = await import('../commands/audit.js');
      await auditCommand(options);
      break;

    case '--version':
    case '-v':
      const packageJsonPath = join(__dirname, '../../package.json');
      if (existsSync(packageJsonPath)) {
        const pkg = await import(packageJsonPath, { assert: { type: 'json' } });
        console.log(pkg.default.version);
      }
      break;

    case '--help':
    case '-h':
    case undefined:
      printHelp();
      break;

    default:
      console.error(`❌ Unknown command: ${command}`);
      console.log('');
      printHelp();
      process.exit(1);
  }
}

function printHelp() {
  console.log(`
🌳 Yggdrasil CLI - AI-Agent-Friendly Design System

Usage:
  npx @lifeonlars/prime-yggdrasil <command> [options]

Commands:
  init              Initialize Yggdrasil agents in your project
  validate          Validate code against design system rules
  audit             Detailed audit with autofix suggestions

Options:
  -h, --help        Show this help message
  -v, --version     Show version number

Validate/Audit Options:
  --format <type>   Output format: cli (default), json, markdown
  --rules <list>    Comma-separated list of rules to check
  --fix             Apply automatic fixes (audit only)

Examples:
  # Initialize agents in your project
  npx @lifeonlars/prime-yggdrasil init

  # Validate code (report-only)
  npx @lifeonlars/prime-yggdrasil validate

  # Detailed audit with recommendations
  npx @lifeonlars/prime-yggdrasil audit

  # Audit with automatic fixes
  npx @lifeonlars/prime-yggdrasil audit --fix

  # Validate specific rules only
  npx @lifeonlars/prime-yggdrasil validate --rules no-tailwind,no-hardcoded-colors

  # Output as JSON for CI/CD integration
  npx @lifeonlars/prime-yggdrasil validate --format json

  # Generate markdown report
  npx @lifeonlars/prime-yggdrasil audit --format markdown > audit-report.md

Documentation:
  https://github.com/lifeonlars/prime-yggdrasil#readme
`);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
