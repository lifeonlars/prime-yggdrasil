#!/usr/bin/env node

/**
 * Claude Code Skills Setup Script
 *
 * This script runs automatically after npm install to set up
 * Claude Code skills and configuration files.
 */

const fs = require('fs');
const path = require('path');

// Find project root (where the user ran npm install)
const projectRoot = process.cwd();

// Source paths (from this package)
const packageDir = __dirname.replace(/[\\/]scripts$/, '');
const skillsSource = path.join(packageDir, '.claude', 'skills');
const claudeMdSource = path.join(packageDir, '.claude', 'CLAUDE.md');

// Destination paths (user's project root)
const skillsDest = path.join(projectRoot, '.agents', 'skills');
const claudeMdDest = path.join(projectRoot, 'CLAUDE.md');

// Don't run in the package's own directory (during development)
if (projectRoot === packageDir || projectRoot.includes('node_modules')) {
  console.log('Skipping Claude Code setup (running in package directory)');
  process.exit(0);
}

console.log('\n🔧 Setting up Claude Code skills...\n');

// Create .agents/skills directory if it doesn't exist
if (!fs.existsSync(path.join(projectRoot, '.agents'))) {
  fs.mkdirSync(path.join(projectRoot, '.agents'), { recursive: true });
}

// Copy skills to project .agents/skills/
if (fs.existsSync(skillsSource)) {
  try {
    // Use cpSync (Node 16.7.0+) with recursive option
    fs.cpSync(skillsSource, skillsDest, {
      recursive: true,
      force: true // Overwrite existing files
    });
    console.log('✓ Skills installed to .agents/skills/');
  } catch (error) {
    console.error('Failed to copy skills:', error.message);
    process.exit(0); // Don't fail npm install
  }
} else {
  console.log('⚠ Skills source directory not found, skipping skills installation');
}

// Copy CLAUDE.md to project root (only if it doesn't exist)
if (fs.existsSync(claudeMdSource)) {
  if (!fs.existsSync(claudeMdDest)) {
    try {
      fs.copyFileSync(claudeMdSource, claudeMdDest);
      console.log('✓ CLAUDE.md copied to project root');
    } catch (error) {
      console.error('Failed to copy CLAUDE.md:', error.message);
    }
  } else {
    console.log('ℹ CLAUDE.md already exists (not overwriting)');
  }
} else {
  console.log('⚠ CLAUDE.md source not found, skipping');
}

console.log('\n✨ Claude Code is configured with:');
console.log('   - verification-before-completion skill');
console.log('   - frontend-design skill');
console.log('   - vercel-react-best-practices skill');
console.log('   - agent-browser skill');
console.log('\n💡 Press Ctrl+T to view tasks when using Claude Code.\n');
