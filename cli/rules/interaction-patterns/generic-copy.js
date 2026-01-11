/**
 * Interaction Patterns Rule: Generic Copy
 *
 * Enforces specific, action-oriented button labels and copy instead of generic terms.
 * Aligns with AESTHETICS.md: "Be specific, be concise, be functional"
 *
 * Phase 6 - Interaction Patterns Agent
 */

export default {
  name: 'interaction-patterns/generic-copy',
  description: 'Enforce specific button labels over generic ones ("Save Changes" not "Submit")',
  category: 'interaction-patterns',
  severity: 'warning',
  documentation: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/.ai/agents/interaction-patterns.md#7-copy-tone--content',

  // Generic terms to avoid
  genericTerms: {
    // Button labels
    'Submit': 'Use specific action like "Save Changes", "Create Account", "Send Message"',
    'OK': 'Use specific action like "Confirm Delete", "Apply Settings", "Close"',
    'Cancel': 'OK in most cases, but consider "Keep Editing", "Go Back" for clarity',
    'Continue': 'Use specific action like "Next: Payment", "Proceed to Checkout"',
    'Done': 'Use specific action like "Finish Setup", "Complete"',
    'Click here': 'Use descriptive link text like "View documentation", "Learn more about tokens"',
    'Click': 'Avoid instructional copy - buttons are self-evident',

    // Messages
    'Success!': 'Be specific: "Settings saved", "User created", "Email sent"',
    'Error': 'Explain what failed: "Unable to save. Try again.", "Connection failed."',
    'Warning': 'Be specific about the warning: "Unsaved changes will be lost"',
    'Oops!': 'Avoid casual tone - be clear and pragmatic',
    'Something went wrong': 'Explain the issue: "Unable to connect to server", "Invalid format"',
    'Loading...': 'Be specific: "Loading users...", "Saving changes...", "Processing..."',
  },

  validate(fileContent, filePath) {
    const violations = [];

    // Skip non-React/TSX files
    if (!filePath.match(/\.(jsx|tsx|js|ts)$/)) {
      return violations;
    }

    // Pattern 1: Check Button component labels
    const buttonLabelRegex = /<Button[^>]*label=["']([^"']+)["']/g;
    let match;

    while ((match = buttonLabelRegex.exec(fileContent)) !== null) {
      const label = match[1];
      const line = this.getLineNumber(fileContent, match.index);

      if (this.genericTerms[label]) {
        violations.push({
          line,
          column: 1,
          message: `Generic button label "${label}". ${this.genericTerms[label]}`,
          severity: 'warning',
          rule: this.name,
          suggestion: this.getSuggestion(label),
        });
      }
    }

    // Pattern 2: Check button element text content
    const buttonTextRegex = /<button[^>]*>([^<]+)<\/button>/gi;

    while ((match = buttonTextRegex.exec(fileContent)) !== null) {
      const text = match[1].trim();
      const line = this.getLineNumber(fileContent, match.index);

      if (this.genericTerms[text]) {
        violations.push({
          line,
          column: 1,
          message: `Generic button text "${text}". ${this.genericTerms[text]}`,
          severity: 'warning',
          rule: this.name,
          suggestion: this.getSuggestion(text),
        });
      }
    }

    // Pattern 3: Check Message/Toast content
    const messagePatterns = [
      /severity=["']success["'][^>]*text=["']([^"']+)["']/g,
      /severity=["']error["'][^>]*text=["']([^"']+)["']/g,
      /severity=["']warn["'][^>]*text=["']([^"']+)["']/g,
      /summary=["']([^"']+)["']/g,
    ];

    messagePatterns.forEach(pattern => {
      while ((match = pattern.exec(fileContent)) !== null) {
        const text = match[1];
        const line = this.getLineNumber(fileContent, match.index);

        if (this.genericTerms[text]) {
          violations.push({
            line,
            column: 1,
            message: `Generic message "${text}". ${this.genericTerms[text]}`,
            severity: 'warning',
            rule: this.name,
            suggestion: this.getSuggestion(text),
          });
        }

        // Check for emoji/fluffy language
        if (/[🎉😅❤️👍✨]/.test(text)) {
          violations.push({
            line,
            column: 1,
            message: `Avoid emoji in UI copy. Keep tone clear and pragmatic.`,
            severity: 'warning',
            rule: this.name,
            suggestion: `Remove emoji from: "${text}"`,
          });
        }

        // Check for casual/marketing language
        const casualPhrases = [
          /let's/i,
          /awesome/i,
          /amazing/i,
          /yay/i,
          /congrats/i,
          /you're all set/i,
        ];

        casualPhrases.forEach(phrase => {
          if (phrase.test(text)) {
            violations.push({
              line,
              column: 1,
              message: `Avoid casual/marketing language in UI copy: "${text}"`,
              severity: 'warning',
              rule: this.name,
              suggestion: 'Use clear, functional copy. See docs/AESTHETICS.md for examples.',
            });
          }
        });
      }
    });

    // Pattern 4: Check link text
    const linkTextRegex = /<a[^>]*>([^<]+)<\/a>/gi;

    while ((match = linkTextRegex.exec(fileContent)) !== null) {
      const text = match[1].trim();
      const line = this.getLineNumber(fileContent, match.index);

      if (this.genericTerms[text]) {
        violations.push({
          line,
          column: 1,
          message: `Generic link text "${text}". ${this.genericTerms[text]}`,
          severity: 'warning',
          rule: this.name,
          suggestion: 'Use descriptive link text that explains the destination.',
        });
      }
    }

    return violations;
  },

  getSuggestion(genericTerm) {
    const examples = {
      'Submit': 'Examples: "Save Changes", "Create Project", "Send Email"',
      'OK': 'Examples: "Confirm", "Apply", "Close Dialog"',
      'Continue': 'Examples: "Next: Payment", "Proceed to Review"',
      'Success!': 'Examples: "Settings saved", "User created successfully"',
      'Error': 'Examples: "Unable to save. Try again.", "Invalid email format."',
    };

    return examples[genericTerm] || 'Use specific, action-oriented copy.';
  },

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  },

  autofix(fileContent, violation) {
    // No automatic fix for copy - requires human judgment
    return {
      fixed: false,
      message: 'Manual fix required. Replace generic copy with specific, action-oriented text.',
    };
  },
};
