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

async function main() {
  switch (command) {
    case 'init':
      const { initCommand } = await import('../commands/init.js');
      await initCommand();
      break;

    case 'validate':
      console.log('⚠️  The validate command will be available in Phase 4.');
      console.log('📋 For now, use ESLint with @lifeonlars/eslint-plugin-yggdrasil (Phase 3).');
      process.exit(0);
      break;

    case 'audit':
      console.log('⚠️  The audit command will be available in Phase 4.');
      console.log('📋 For now, use ESLint with @lifeonlars/eslint-plugin-yggdrasil (Phase 3).');
      process.exit(0);
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
  validate          Validate code against design system rules (Phase 4)
  audit             Detailed audit with autofix suggestions (Phase 4)

Options:
  -h, --help        Show this help message
  -v, --version     Show version number

Examples:
  npx @lifeonlars/prime-yggdrasil init
  npx @lifeonlars/prime-yggdrasil validate
  npx @lifeonlars/prime-yggdrasil audit --fix

Documentation:
  https://github.com/lifeonlars/prime-yggdrasil#readme
`);
}

main().catch((error) => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
