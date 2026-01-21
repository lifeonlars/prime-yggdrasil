/**
 * APCA Contrast Testing Utilities
 *
 * Uses WCAG 3.0 Advanced Perceptual Contrast Algorithm (APCA)
 * to verify accessible color contrast ratios.
 */

import { APCAcontrast, sRGBtoY } from 'apca-w3';

export interface ContrastResult {
  pair: string;
  textColor: string;
  surfaceColor: string;
  contrastValue: number;
  minRequired: number;
  passes: boolean;
  category: 'body' | 'large' | 'ui' | 'heading';
}

export interface ContrastThresholds {
  body: number;      // 16px text - Lc 60 minimum
  large: number;     // 24px+ text - Lc 45 minimum
  ui: number;        // UI components - Lc 75 minimum
  heading: number;   // Headings - Lc 60 minimum
}

export const APCA_THRESHOLDS: ContrastThresholds = {
  body: 60,
  large: 45,
  ui: 75,
  heading: 60,
};

/**
 * Convert CSS color value to RGB array [r, g, b] in 0-255 range
 */
export function parseColor(cssColor: string): number[] | null {
  try {
    const color = cssColor.trim();

    // Handle hex colors (#RGB, #RRGGBB, #RRGGBBAA)
    if (color.startsWith('#')) {
      let hex = color.slice(1);

      // Convert 3-digit hex to 6-digit
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }

      // Remove alpha channel if present
      if (hex.length === 8) {
        hex = hex.slice(0, 6);
      }

      if (hex.length !== 6) {
        console.warn(`Invalid hex color: ${cssColor}`);
        return null;
      }

      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);

      return [r, g, b];
    }

    // Handle rgb() and rgba()
    const rgbMatch = color.match(/rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (rgbMatch) {
      return [
        parseInt(rgbMatch[1]),
        parseInt(rgbMatch[2]),
        parseInt(rgbMatch[3]),
      ];
    }

    // Handle named colors (basic set)
    const namedColors: Record<string, number[]> = {
      white: [255, 255, 255],
      black: [0, 0, 0],
      red: [255, 0, 0],
      green: [0, 128, 0],
      blue: [0, 0, 255],
      yellow: [255, 255, 0],
      cyan: [0, 255, 255],
      magenta: [255, 0, 255],
      transparent: [0, 0, 0],
    };

    const lowerColor = color.toLowerCase();
    if (lowerColor in namedColors) {
      return namedColors[lowerColor];
    }

    console.warn(`Unsupported color format: ${cssColor}`);
    return null;
  } catch (error) {
    console.warn(`Failed to parse color: ${cssColor}`, error);
    return null;
  }
}

/**
 * Calculate APCA contrast between text and background colors
 *
 * @param textColor - CSS color string for text
 * @param bgColor - CSS color string for background
 * @returns Contrast value (Lc)
 */
export function calculateContrast(textColor: string, bgColor: string): number | null {
  const textRGB = parseColor(textColor);
  const bgRGB = parseColor(bgColor);

  if (!textRGB || !bgRGB) {
    return null;
  }

  // Convert RGB to Y (luminance)
  const textY = sRGBtoY(textRGB);
  const bgY = sRGBtoY(bgRGB);

  // Calculate APCA contrast
  const contrast = APCAcontrast(textY, bgY);

  return Math.abs(contrast);
}

/**
 * Test if a text/background pair meets APCA contrast requirements
 */
export function testContrast(
  pair: string,
  textColor: string,
  surfaceColor: string,
  category: ContrastResult['category'] = 'body'
): ContrastResult {
  const contrastValue = calculateContrast(textColor, surfaceColor) || 0;
  const minRequired = APCA_THRESHOLDS[category];

  return {
    pair,
    textColor,
    surfaceColor,
    contrastValue,
    minRequired,
    passes: contrastValue >= minRequired,
    category,
  };
}

/**
 * Extract CSS variable value from computed styles
 */
export function getCSSVariable(varName: string, computedStyles: CSSStyleDeclaration): string {
  const value = computedStyles.getPropertyValue(varName).trim();

  // If value is another CSS variable, resolve it recursively
  if (value.startsWith('var(')) {
    const nestedVar = value.match(/var\((--[^,)]+)/)?.[1];
    if (nestedVar) {
      return getCSSVariable(nestedVar, computedStyles);
    }
  }

  return value;
}

/**
 * Format contrast test results for reporting
 */
export function formatResults(results: ContrastResult[]): string {
  const failing = results.filter(r => !r.passes);
  const passing = results.filter(r => r.passes);

  let output = '\n=== APCA Contrast Test Results ===\n\n';

  output += `Total Tests: ${results.length}\n`;
  output += `Passing: ${passing.length} ✓\n`;
  output += `Failing: ${failing.length} ✗\n\n`;

  if (failing.length > 0) {
    output += '--- Failing Contrasts ---\n';
    failing.forEach(result => {
      output += `\n${result.pair} (${result.category}):\n`;
      output += `  Text: ${result.textColor}\n`;
      output += `  Surface: ${result.surfaceColor}\n`;
      output += `  Contrast: Lc ${result.contrastValue.toFixed(1)} (need Lc ${result.minRequired})\n`;
      output += `  Deficit: Lc ${(result.minRequired - result.contrastValue).toFixed(1)}\n`;
    });
  }

  return output;
}

/**
 * Generate a markdown report of contrast issues
 */
export function generateMarkdownReport(results: ContrastResult[]): string {
  const failing = results.filter(r => !r.passes);
  const passing = results.filter(r => r.passes);

  let md = '# APCA Contrast Test Report\n\n';
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `**Total Tests:** ${results.length}\n`;
  md += `**Passing:** ${passing.length} ✓\n`;
  md += `**Failing:** ${failing.length} ✗\n\n`;

  if (failing.length > 0) {
    md += '## Failing Contrasts\n\n';
    md += '| Pair | Category | Text Color | Surface Color | Contrast | Required | Deficit |\n';
    md += '|------|----------|------------|---------------|----------|----------|----------|\n';

    failing.forEach(result => {
      md += `| ${result.pair} `;
      md += `| ${result.category} `;
      md += `| ${result.textColor} `;
      md += `| ${result.surfaceColor} `;
      md += `| Lc ${result.contrastValue.toFixed(1)} `;
      md += `| Lc ${result.minRequired} `;
      md += `| Lc ${(result.minRequired - result.contrastValue).toFixed(1)} |\n`;
    });

    md += '\n';
  }

  if (passing.length > 0) {
    md += '## Passing Contrasts\n\n';
    md += '<details>\n<summary>Click to expand</summary>\n\n';
    md += '| Pair | Category | Contrast | Required |\n';
    md += '|------|----------|----------|----------|\n';

    passing.forEach(result => {
      md += `| ${result.pair} `;
      md += `| ${result.category} `;
      md += `| Lc ${result.contrastValue.toFixed(1)} `;
      md += `| Lc ${result.minRequired} |\n`;
    });

    md += '\n</details>\n';
  }

  return md;
}
