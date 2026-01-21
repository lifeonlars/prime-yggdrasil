/**
 * Accessibility Rule: Missing Alt Text
 *
 * Enforces alt text on images and aria-label on icon-only buttons.
 * WCAG 2.1 Level AA - Guideline 1.1 Text Alternatives
 *
 * Phase 6 - Accessibility Agent
 */

export default {
  name: 'accessibility/missing-alt-text',
  description: 'Enforce alt text on images and aria-label on icon-only buttons',
  category: 'accessibility',
  severity: 'error',
  documentation: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/.ai/agents/accessibility.md#11-text-alternatives',

  validate(fileContent, filePath) {
    const violations = [];

    // Skip non-React/TSX files
    if (!filePath.match(/\.(jsx|tsx|js|ts)$/)) {
      return violations;
    }

    // Pattern 1: Check <img> tags for alt attribute
    const imgRegex = /<img([^>]*)>/g;
    let match;

    while ((match = imgRegex.exec(fileContent)) !== null) {
      const imgTag = match[1];
      const line = this.getLineNumber(fileContent, match.index);

      if (!imgTag.includes('alt=')) {
        violations.push({
          line,
          column: 1,
          message: 'Image missing alt attribute. Add alt text or alt="" for decorative images.',
          severity: 'error',
          rule: this.name,
          suggestion: 'alt="Description of image content" or alt="" for decorative',
        });
      }

      // Check for empty alt with src that suggests non-decorative
      if (imgTag.includes('alt=""') || imgTag.includes("alt=''")) {
        const srcMatch = imgTag.match(/src=["']([^"']+)["']/);
        if (srcMatch) {
          const src = srcMatch[1];
          const nonDecorativeKeywords = ['chart', 'graph', 'diagram', 'photo', 'avatar', 'profile'];

          if (nonDecorativeKeywords.some(keyword => src.toLowerCase().includes(keyword))) {
            violations.push({
              line,
              column: 1,
              message: 'Image appears non-decorative but has empty alt. Add descriptive alt text.',
              severity: 'warning',
              rule: this.name,
              suggestion: `alt="Description of ${src}"`,
            });
          }
        }
      }
    }

    // Pattern 2: Check PrimeReact Image component
    const primeImageRegex = /<Image([^>]*)>/g;

    while ((match = primeImageRegex.exec(fileContent)) !== null) {
      const imageTag = match[1];
      const line = this.getLineNumber(fileContent, match.index);

      if (!imageTag.includes('alt=')) {
        violations.push({
          line,
          column: 1,
          message: 'PrimeReact Image missing alt attribute.',
          severity: 'error',
          rule: this.name,
          suggestion: 'Add alt="Description" prop',
        });
      }
    }

    // Pattern 3: Check icon-only buttons for aria-label
    const buttonRegex = /<Button([^>]*)>/g;

    while ((match = buttonRegex.exec(fileContent)) !== null) {
      const buttonTag = match[1];
      const line = this.getLineNumber(fileContent, match.index);

      const hasIcon = buttonTag.includes('icon=');
      const hasLabel = buttonTag.includes('label=');
      const hasAriaLabel = buttonTag.includes('ariaLabel=') || buttonTag.includes('aria-label=');

      // Icon-only button (has icon but no label)
      if (hasIcon && !hasLabel && !hasAriaLabel) {
        violations.push({
          line,
          column: 1,
          message: 'Icon-only button missing ariaLabel. Screen readers need descriptive label.',
          severity: 'error',
          rule: this.name,
          suggestion: 'Add ariaLabel="Description of action"',
        });
      }
    }

    // Pattern 4: Check custom icon buttons (i tag with onClick)
    const iconClickRegex = /<i[^>]*className=["'][^"']*pi[^"']*["'][^>]*onClick/g;

    while ((match = iconClickRegex.exec(fileContent)) !== null) {
      const line = this.getLineNumber(fileContent, match.index);

      violations.push({
        line,
        column: 1,
        message: 'Icon with onClick should be wrapped in Button with ariaLabel, not clickable <i> tag.',
        severity: 'error',
        rule: this.name,
        suggestion: '<Button icon="pi pi-..." ariaLabel="Action" onClick={handler} />',
      });
    }

    // Pattern 5: Check Avatar component without alt or image
    const avatarRegex = /<Avatar([^>]*)>/g;

    while ((match = avatarRegex.exec(fileContent)) !== null) {
      const avatarTag = match[1];
      const line = this.getLineNumber(fileContent, match.index);

      const hasImage = avatarTag.includes('image=');
      const hasLabel = avatarTag.includes('label=');
      const hasAlt = avatarTag.includes('alt=');
      const hasAriaLabel = avatarTag.includes('ariaLabel=') || avatarTag.includes('aria-label=');

      if (hasImage && !hasAlt && !hasAriaLabel) {
        violations.push({
          line,
          column: 1,
          message: 'Avatar with image should have alt or ariaLabel for accessibility.',
          severity: 'warning',
          rule: this.name,
          suggestion: 'Add alt="User name" or ariaLabel="User name"',
        });
      }
    }

    return violations;
  },

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  },

  autofix(fileContent, violation) {
    if (violation.message.includes('Image missing alt attribute')) {
      // Add alt="" as safe default (user must fill in description)
      const imgRegex = /(<img[^>]*)(>)/;
      const match = imgRegex.exec(fileContent);

      if (match && !match[1].includes('alt=')) {
        const fixedContent = fileContent.replace(
          match[0],
          `${match[1]} alt=""${match[2]}`
        );

        return {
          fixed: true,
          content: fixedContent,
          message: 'Added empty alt attribute (add description if image is not decorative)',
        };
      }
    }

    if (violation.message.includes('Icon-only button missing ariaLabel')) {
      const buttonRegex = /(<Button[^>]*icon=["'][^"']+["'][^>]*)(>)/;
      const match = buttonRegex.exec(fileContent);

      if (match && !match[1].includes('ariaLabel')) {
        const iconMatch = match[1].match(/icon=["']pi pi-([^"']+)["']/);
        const iconName = iconMatch ? iconMatch[1] : 'action';

        const fixedContent = fileContent.replace(
          match[0],
          `${match[1]} ariaLabel="${iconName}"${match[2]}`
        );

        return {
          fixed: true,
          content: fixedContent,
          message: `Added ariaLabel="${iconName}" (customize for specific action)`,
        };
      }
    }

    return {
      fixed: false,
      message: 'Manual fix required. Add descriptive alt text or aria-label.',
    };
  },
};
