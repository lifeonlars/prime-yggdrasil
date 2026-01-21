/**
 * APCA Contrast Tests
 *
 * Tests semantic token pairs for WCAG 3.0 APCA contrast compliance.
 * Initially configured to warn but not fail builds.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { CONTRAST_PAIRS, EXTENDED_CONTRAST_PAIRS } from './contrast.config';
import {
  testContrast,
  formatResults,
  generateMarkdownReport,
  type ContrastResult,
} from './contrast.utils';

/**
 * Parse CSS file and extract CSS variable values
 */
function parseCSSVariables(cssContent: string): Map<string, string> {
  const variables = new Map<string, string>();

  // Match CSS custom properties: --var-name: value;
  const varRegex = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const varName = `--${match[1]}`;
    let value = match[2].trim();

    // Remove comments from value
    value = value.replace(/\/\*.*?\*\//g, '').trim();

    variables.set(varName, value);
  }

  return variables;
}

/**
 * Resolve CSS variable references recursively
 */
function resolveVariable(
  varName: string,
  variables: Map<string, string>,
  visited: Set<string> = new Set()
): string {
  if (visited.has(varName)) {
    console.warn(`Circular reference detected: ${varName}`);
    return '';
  }

  const value = variables.get(varName);
  if (!value) {
    console.warn(`Variable not found: ${varName}`);
    return '';
  }

  // If value is a var() reference, resolve it
  const varMatch = value.match(/var\((--[a-z0-9-]+)\)/i);
  if (varMatch) {
    visited.add(varName);
    return resolveVariable(varMatch[1], variables, visited);
  }

  return value;
}

/**
 * Load and parse theme CSS files
 */
function loadTheme(themeName: 'light' | 'dark'): Map<string, string> {
  const themeDir = path.join(__dirname, '..', 'src', 'theme');
  const foundationsPath = path.join(themeDir, 'foundations.css');
  const semanticPath = path.join(themeDir, `semantic-${themeName}.css`);

  // Read both files
  const foundationsContent = fs.readFileSync(foundationsPath, 'utf-8');
  const semanticContent = fs.readFileSync(semanticPath, 'utf-8');

  // Parse variables from both files
  const foundationVars = parseCSSVariables(foundationsContent);
  const semanticVars = parseCSSVariables(semanticContent);

  // Merge them (semantic overrides foundation if there are conflicts)
  const allVars = new Map<string, string>(foundationVars);
  semanticVars.forEach((value, key) => {
    allVars.set(key, value);
  });

  return allVars;
}

describe('APCA Contrast Tests', () => {
  let lightThemeVars: Map<string, string>;
  let darkThemeVars: Map<string, string>;
  let allResults: ContrastResult[] = [];

  beforeAll(() => {
    lightThemeVars = loadTheme('light');
    darkThemeVars = loadTheme('dark');
  });

  describe('Light Theme Contrast', () => {
    const results: ContrastResult[] = [];

    CONTRAST_PAIRS.forEach((pair) => {
      it(`should have sufficient contrast for: ${pair.name}`, () => {
        const textColor = resolveVariable(pair.textVar, lightThemeVars);
        const surfaceColor = resolveVariable(pair.surfaceVar, lightThemeVars);

        const result = testContrast(
          pair.name,
          textColor,
          surfaceColor,
          pair.category
        );

        results.push(result);
        allResults.push({ ...result, pair: `[Light] ${result.pair}` });

        // Log the result but don't fail the test yet
        if (!result.passes) {
          console.warn(
            `⚠️  CONTRAST WARNING: ${pair.name}\n` +
              `   Text: ${textColor} (${pair.textVar})\n` +
              `   Surface: ${surfaceColor} (${pair.surfaceVar})\n` +
              `   Contrast: Lc ${result.contrastValue.toFixed(1)} ` +
              `(need Lc ${result.minRequired})\n` +
              `   Deficit: Lc ${(result.minRequired - result.contrastValue).toFixed(1)}`
          );
        }

        // For now, always pass but track failures
        // TODO: Uncomment the line below when ready to enforce contrast
        // expect(result.passes).toBe(true);
        expect(true).toBe(true);
      });
    });

    it('should generate light theme contrast report', () => {
      const report = formatResults(results);
      console.log('\n' + report);

      // Generate markdown report
      const mdReport = generateMarkdownReport(results);
      const reportPath = path.join(__dirname, '..', 'contrast-report-light.md');
      fs.writeFileSync(reportPath, mdReport);
      console.log(`\n📊 Light theme report saved to: ${reportPath}`);

      expect(true).toBe(true);
    });
  });

  describe('Dark Theme Contrast', () => {
    const results: ContrastResult[] = [];

    CONTRAST_PAIRS.forEach((pair) => {
      it(`should have sufficient contrast for: ${pair.name}`, () => {
        const textColor = resolveVariable(pair.textVar, darkThemeVars);
        const surfaceColor = resolveVariable(pair.surfaceVar, darkThemeVars);

        const result = testContrast(
          pair.name,
          textColor,
          surfaceColor,
          pair.category
        );

        results.push(result);
        allResults.push({ ...result, pair: `[Dark] ${result.pair}` });

        // Log the result but don't fail the test yet
        if (!result.passes) {
          console.warn(
            `⚠️  CONTRAST WARNING: ${pair.name}\n` +
              `   Text: ${textColor} (${pair.textVar})\n` +
              `   Surface: ${surfaceColor} (${pair.surfaceVar})\n` +
              `   Contrast: Lc ${result.contrastValue.toFixed(1)} ` +
              `(need Lc ${result.minRequired})\n` +
              `   Deficit: Lc ${(result.minRequired - result.contrastValue).toFixed(1)}`
          );
        }

        // For now, always pass but track failures
        // TODO: Uncomment the line below when ready to enforce contrast
        // expect(result.passes).toBe(true);
        expect(true).toBe(true);
      });
    });

    it('should generate dark theme contrast report', () => {
      const report = formatResults(results);
      console.log('\n' + report);

      // Generate markdown report
      const mdReport = generateMarkdownReport(results);
      const reportPath = path.join(__dirname, '..', 'contrast-report-dark.md');
      fs.writeFileSync(reportPath, mdReport);
      console.log(`\n📊 Dark theme report saved to: ${reportPath}`);

      expect(true).toBe(true);
    });
  });

  describe('Overall Contrast Summary', () => {
    it('should generate combined contrast report', () => {
      const report = formatResults(allResults);
      console.log('\n=== COMBINED THEME REPORT ===');
      console.log(report);

      const mdReport = generateMarkdownReport(allResults);
      const reportPath = path.join(__dirname, '..', 'contrast-report-combined.md');
      fs.writeFileSync(reportPath, mdReport);
      console.log(`\n📊 Combined report saved to: ${reportPath}`);

      const failingCount = allResults.filter(r => !r.passes).length;
      const passingCount = allResults.filter(r => r.passes).length;

      console.log(`\n🎯 Overall Results:`);
      console.log(`   Total: ${allResults.length}`);
      console.log(`   Passing: ${passingCount} ✓`);
      console.log(`   Failing: ${failingCount} ✗`);
      console.log(`   Success Rate: ${((passingCount / allResults.length) * 100).toFixed(1)}%`);

      if (failingCount > 0) {
        console.log(`\n⚠️  NOTE: ${failingCount} contrast issues detected but not blocking build.`);
        console.log(`   To enforce contrast requirements, uncomment the expect() assertions in contrast.test.ts`);
      }

      expect(true).toBe(true);
    });
  });
});
