import { readFileSync, writeFileSync } from 'fs';
import { validateCommand } from './validate.js';

// Import Phase 6 rules for autofix
import interactionPatternsRules from '../rules/interaction-patterns/index.js';
import accessibilityRules from '../rules/accessibility/index.js';

/**
 * Audit command - Detailed analysis with autofix
 *
 * Provides detailed analysis of violations with autofix suggestions.
 * Can automatically fix certain violations when --fix flag is used.
 *
 * For simple report-only validation, use the validate command.
 */

/**
 * Autofix strategies for each rule
 */
const AUTOFIXES = {
  'no-utility-on-components': {
    canAutoFix: true,
    fix: (content, violation) => {
      // Remove utility classes from PrimeReact components
      // This is a simplified version - real implementation would use AST parsing
      const lines = content.split('\n');
      const line = lines[violation.line - 1];

      // Extract utility classes to remove
      const utilityMatch = violation.message.match(/classes? "([^"]+)"/);
      if (utilityMatch) {
        const utilities = utilityMatch[1].split(', ');

        let fixedLine = line;
        utilities.forEach(utility => {
          // Remove the utility class
          fixedLine = fixedLine.replace(new RegExp(`\\b${utility}\\b\\s*`, 'g'), '');
        });

        // Clean up empty className
        fixedLine = fixedLine.replace(/className=["'`]\s*["'`]/g, '');

        lines[violation.line - 1] = fixedLine;
        return lines.join('\n');
      }

      return content;
    },
    explanation: 'Removes utility classes from PrimeReact components. The theme handles all component styling.'
  },

  'no-tailwind': {
    canAutoFix: true,
    fix: (content, violation) => {
      // Remove Tailwind classes
      const lines = content.split('\n');
      const line = lines[violation.line - 1];

      const tailwindMatch = violation.message.match(/classes? "([^"]+)"/);
      if (tailwindMatch) {
        const tailwindClasses = tailwindMatch[1].split(', ');

        let fixedLine = line;
        tailwindClasses.forEach(cls => {
          fixedLine = fixedLine.replace(new RegExp(`\\b${cls}\\b\\s*`, 'g'), '');
        });

        // Clean up empty className
        fixedLine = fixedLine.replace(/className=["'`]\s*["'`]/g, '');

        lines[violation.line - 1] = fixedLine;
        return lines.join('\n');
      }

      return content;
    },
    explanation: 'Removes Tailwind CSS classes. Use semantic tokens for styling.'
  },

  'no-hardcoded-colors': {
    canAutoFix: false,
    suggestions: [
      'Replace with semantic token: var(--surface-neutral-primary) for backgrounds',
      'Replace with semantic token: var(--text-neutral-default) for text',
      'Replace with semantic token: var(--border-neutral-default) for borders',
      'Consult .ai/yggdrasil/semantic-token-intent.md for complete token catalog'
    ],
    explanation: 'Cannot auto-fix - requires semantic understanding of color intent. Use semantic tokens based on the element\'s purpose.'
  },

  'semantic-tokens-only': {
    canAutoFix: false,
    suggestions: [
      'var(--blue-500) → var(--surface-brand-primary) or var(--text-state-interactive)',
      'var(--green-500) → var(--surface-context-success) or var(--text-context-success)',
      'var(--red-500) → var(--surface-context-danger) or var(--text-context-danger)',
      'var(--gray-100) → var(--surface-neutral-secondary) or var(--text-neutral-subdued)',
      'Consult .ai/yggdrasil/semantic-token-intent.md for complete mapping'
    ],
    explanation: 'Cannot auto-fix - requires understanding of token purpose. Foundation tokens are for theme definition only.'
  },

  'valid-spacing': {
    canAutoFix: true,
    fix: (content, violation) => {
      const lines = content.split('\n');
      const line = lines[violation.line - 1];

      // Extract off-grid value and nearest suggestion
      const valueMatch = violation.message.match(/(\d+)px/);
      const suggestionMatch = violation.suggestion.match(/(\d+)px/);

      if (valueMatch && suggestionMatch) {
        const oldValue = valueMatch[1];
        const newValue = suggestionMatch[1];

        // Replace the value
        const fixedLine = line.replace(
          new RegExp(`${oldValue}px`, 'g'),
          `${newValue}px`
        );

        lines[violation.line - 1] = fixedLine;
        return lines.join('\n');
      }

      // Handle invalid utility classes
      const classMatch = violation.message.match(/([pm][trblxy]?-\d+)/);
      if (classMatch) {
        const invalidClass = classMatch[1];
        const number = parseInt(invalidClass.match(/\d+/)[0], 10);
        const nearestValid = Math.min(8, Math.round(number / 4) * 4 / 4);
        const validClass = invalidClass.replace(/\d+/, nearestValid);

        const fixedLine = line.replace(invalidClass, validClass);
        lines[violation.line - 1] = fixedLine;
        return lines.join('\n');
      }

      return content;
    },
    explanation: 'Rounds spacing values to nearest 4px grid value (0, 4, 8, 12, 16, 20, 24, 28, 32px).'
  },

  // Phase 6 Autofixes: Dynamically add from rule definitions
  ...Object.fromEntries(
    Object.entries({ ...interactionPatternsRules, ...accessibilityRules }).map(([key, rule]) => [
      key,
      {
        canAutoFix: typeof rule.autofix === 'function',
        fix: (content, violation) => {
          if (rule.autofix) {
            const result = rule.autofix(content, violation);
            return result.fixed ? result.content : content;
          }
          return content;
        },
        explanation: rule.autofix ? `${rule.description} (Phase 6 rule)` : 'Manual fix required'
      }
    ])
  )
};

/**
 * Generate detailed audit report
 */
function generateAuditReport(results) {
  const report = {
    summary: {
      totalFiles: 0,
      filesWithViolations: 0,
      totalViolations: 0,
      errors: 0,
      warnings: 0,
      autoFixable: 0
    },
    violations: [],
    recommendations: []
  };

  Object.entries(results).forEach(([filePath, fileResults]) => {
    report.summary.totalFiles++;

    if (Object.keys(fileResults).length > 0 && !fileResults.error) {
      report.summary.filesWithViolations++;

      Object.entries(fileResults).forEach(([ruleId, result]) => {
        result.violations.forEach(violation => {
          report.summary.totalViolations++;

          if (result.severity === 'error') {
            report.summary.errors++;
          } else {
            report.summary.warnings++;
          }

          const autofix = AUTOFIXES[ruleId];
          if (autofix?.canAutoFix) {
            report.summary.autoFixable++;
          }

          report.violations.push({
            file: filePath,
            rule: ruleId,
            ruleName: result.rule,
            severity: result.severity,
            line: violation.line,
            column: violation.column,
            message: violation.message,
            suggestion: violation.suggestion,
            autoFixable: autofix?.canAutoFix || false,
            autoFixExplanation: autofix?.explanation,
            manualFixSuggestions: autofix?.suggestions
          });
        });
      });
    }
  });

  // Generate recommendations
  const violationsByRule = {};
  report.violations.forEach(v => {
    violationsByRule[v.rule] = (violationsByRule[v.rule] || 0) + 1;
  });

  const sortedRules = Object.entries(violationsByRule)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  if (sortedRules.length > 0) {
    report.recommendations.push({
      priority: 'high',
      title: 'Focus on Most Common Violations',
      description: `Top violations: ${sortedRules.map(([rule, count]) => `${rule} (${count})`).join(', ')}`
    });
  }

  if (report.summary.autoFixable > 0) {
    report.recommendations.push({
      priority: 'high',
      title: 'Run Autofix',
      description: `${report.summary.autoFixable} violations can be automatically fixed. Run: yggdrasil audit --fix`
    });
  }

  if (violationsByRule['no-hardcoded-colors'] || violationsByRule['semantic-tokens-only']) {
    report.recommendations.push({
      priority: 'medium',
      title: 'Review Semantic Token Guide',
      description: 'Read .ai/yggdrasil/semantic-token-intent.md for token selection guidance'
    });
  }

  return report;
}

/**
 * Format audit report
 */
function formatAuditReport(report, format = 'cli') {
  if (format === 'json') {
    return JSON.stringify(report, null, 2);
  }

  if (format === 'markdown') {
    let md = '# Yggdrasil Design System Audit Report\n\n';
    md += '## Summary\n\n';
    md += `- **Total Files Scanned:** ${report.summary.totalFiles}\n`;
    md += `- **Files with Violations:** ${report.summary.filesWithViolations}\n`;
    md += `- **Total Violations:** ${report.summary.totalViolations}\n`;
    md += `- **Errors:** ${report.summary.errors}\n`;
    md += `- **Warnings:** ${report.summary.warnings}\n`;
    md += `- **Auto-Fixable:** ${report.summary.autoFixable}\n\n`;

    if (report.recommendations.length > 0) {
      md += '## Recommendations\n\n';
      report.recommendations.forEach(rec => {
        const icon = rec.priority === 'high' ? '🔴' : '🟡';
        md += `${icon} **${rec.title}**\n`;
        md += `   ${rec.description}\n\n`;
      });
    }

    md += '## Violations\n\n';
    report.violations.forEach(v => {
      const icon = v.severity === 'error' ? '❌' : '⚠️';
      md += `${icon} **${v.ruleName}** in \`${v.file}:${v.line}\`\n`;
      md += `   ${v.message}\n`;
      md += `   💡 ${v.suggestion}\n`;
      if (v.autoFixable) {
        md += `   ✨ Auto-fixable\n`;
      }
      md += '\n';
    });

    return md;
  }

  // CLI format
  let output = '\n';
  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  output += '📊 Yggdrasil Design System Audit Report\n';
  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

  output += '📈 Summary:\n';
  output += `   Total Files Scanned:      ${report.summary.totalFiles}\n`;
  output += `   Files with Violations:    ${report.summary.filesWithViolations}\n`;
  output += `   Total Violations:         ${report.summary.totalViolations}\n`;
  output += `   ❌ Errors:                 ${report.summary.errors}\n`;
  output += `   ⚠️  Warnings:               ${report.summary.warnings}\n`;
  output += `   ✨ Auto-Fixable:           ${report.summary.autoFixable}\n\n`;

  if (report.recommendations.length > 0) {
    output += '💡 Recommendations:\n\n';
    report.recommendations.forEach(rec => {
      const icon = rec.priority === 'high' ? '🔴' : '🟡';
      output += `   ${icon} ${rec.title}\n`;
      output += `      ${rec.description}\n\n`;
    });
  }

  if (report.violations.length > 0) {
    output += '📋 Violations by File:\n\n';

    const violationsByFile = {};
    report.violations.forEach(v => {
      if (!violationsByFile[v.file]) {
        violationsByFile[v.file] = [];
      }
      violationsByFile[v.file].push(v);
    });

    Object.entries(violationsByFile).forEach(([file, violations]) => {
      output += `📄 ${file}\n`;

      violations.forEach(v => {
        const icon = v.severity === 'error' ? '❌' : '⚠️';
        const fixIcon = v.autoFixable ? ' ✨' : '';
        output += `   ${icon}${fixIcon} ${v.ruleName} (line ${v.line})\n`;
        output += `      ${v.message}\n`;
        output += `      💡 ${v.suggestion}\n`;

        if (v.autoFixable) {
          output += `      ✨ ${v.autoFixExplanation}\n`;
        } else if (v.manualFixSuggestions) {
          output += `      📝 Manual fix suggestions:\n`;
          v.manualFixSuggestions.forEach(suggestion => {
            output += `         • ${suggestion}\n`;
          });
        }
        output += '\n';
      });
    });
  }

  output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';

  return output;
}

/**
 * Apply autofixes to files
 */
function applyAutofixes(results) {
  const fixed = {};

  Object.entries(results).forEach(([filePath, fileResults]) => {
    let content = readFileSync(filePath, 'utf8');
    let modified = false;

    Object.entries(fileResults).forEach(([ruleId, result]) => {
      const autofix = AUTOFIXES[ruleId];

      if (autofix?.canAutoFix) {
        result.violations.forEach(violation => {
          const newContent = autofix.fix(content, violation);
          if (newContent !== content) {
            content = newContent;
            modified = true;

            if (!fixed[filePath]) {
              fixed[filePath] = [];
            }
            fixed[filePath].push({
              rule: result.rule,
              line: violation.line,
              message: violation.message
            });
          }
        });
      }
    });

    if (modified) {
      writeFileSync(filePath, content, 'utf8');
    }
  });

  return fixed;
}

/**
 * Main audit command
 */
export async function auditCommand(options = {}) {
  const fix = options.fix || false;
  const format = options.format || 'cli';

  console.log(`
🌳 Yggdrasil Design System Audit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 Running comprehensive analysis...
`);

  // Run validation
  const results = await validateCommand({ ...options, format: 'json' });

  // Generate audit report
  const report = generateAuditReport(results);

  // Apply fixes if requested
  if (fix && report.summary.autoFixable > 0) {
    console.log('✨ Applying automatic fixes...\n');
    const fixed = applyAutofixes(results);

    console.log(`✅ Fixed ${Object.keys(fixed).length} files:\n`);
    Object.entries(fixed).forEach(([file, fixes]) => {
      console.log(`   📄 ${file}`);
      fixes.forEach(f => {
        console.log(`      ✓ ${f.rule} (line ${f.line})`);
      });
      console.log('');
    });

    // Re-run validation to show remaining violations
    console.log('🔍 Re-validating after fixes...\n');
    const newResults = await validateCommand({ ...options, format: 'json' });
    const newReport = generateAuditReport(newResults);

    console.log(formatAuditReport(newReport, format));
  } else {
    console.log(formatAuditReport(report, format));
  }

  return report;
}
