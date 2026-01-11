/**
 * Accessibility Rule: Missing Form Labels
 *
 * Enforces proper label association for form inputs.
 * WCAG 2.1 Level AA - Guideline 3.3 Input Assistance
 *
 * Phase 6 - Accessibility Agent
 */

export default {
  name: 'accessibility/missing-form-labels',
  description: 'Enforce proper labels on form inputs with htmlFor/id association',
  category: 'accessibility',
  severity: 'error',
  documentation: 'https://github.com/lifeonlars/prime-yggdrasil/blob/master/.ai/agents/accessibility.md#33-input-assistance',

  formComponents: [
    'InputText',
    'InputNumber',
    'InputTextarea',
    'Password',
    'Dropdown',
    'MultiSelect',
    'Calendar',
    'Checkbox',
    'RadioButton',
    'InputSwitch',
    'Slider',
    'Rating',
    'ColorPicker',
    'Chips',
    'AutoComplete',
  ],

  validate(fileContent, filePath) {
    const violations = [];

    // Skip non-React/TSX files
    if (!filePath.match(/\.(jsx|tsx|js|ts)$/)) {
      return violations;
    }

    // Extract all form component instances with their IDs
    const componentInstances = this.extractComponentInstances(fileContent);

    // Extract all label elements with their htmlFor attributes
    const labels = this.extractLabels(fileContent);

    // Check each form component
    componentInstances.forEach(instance => {
      const line = this.getLineNumber(fileContent, instance.index);

      // Check 1: Component has id attribute
      if (!instance.id) {
        violations.push({
          line,
          column: 1,
          message: `${instance.component} missing id attribute. Required for label association.`,
          severity: 'error',
          rule: this.name,
          suggestion: `Add id="${this.generateId(instance.component)}"`,
        });
        return;
      }

      // Check 2: Label exists with matching htmlFor
      const hasLabel = labels.some(label => label.htmlFor === instance.id);
      const hasAriaLabel = instance.tag.includes('aria-label=') || instance.tag.includes('ariaLabel=');
      const hasPlaceholder = instance.tag.includes('placeholder=');

      if (!hasLabel && !hasAriaLabel) {
        violations.push({
          line,
          column: 1,
          message: `${instance.component} with id="${instance.id}" missing associated label. Add <label htmlFor="${instance.id}">`,
          severity: 'error',
          rule: this.name,
          suggestion: `<label htmlFor="${instance.id}">Label Text</label>`,
        });
      }

      // Check 3: Placeholder should not replace label
      if (!hasLabel && !hasAriaLabel && hasPlaceholder) {
        violations.push({
          line,
          column: 1,
          message: `${instance.component} uses placeholder but missing label. Placeholder is not a substitute for labels.`,
          severity: 'error',
          rule: this.name,
          suggestion: 'Add proper <label> element in addition to placeholder.',
        });
      }
    });

    // Check for labels without matching inputs
    labels.forEach(label => {
      if (!label.htmlFor) {
        const line = this.getLineNumber(fileContent, label.index);

        violations.push({
          line,
          column: 1,
          message: 'Label missing htmlFor attribute. Required for screen reader association.',
          severity: 'warning',
          rule: this.name,
          suggestion: 'Add htmlFor="input-id" matching the input\'s id',
        });
        return;
      }

      const hasMatchingInput = componentInstances.some(instance => instance.id === label.htmlFor);

      if (!hasMatchingInput) {
        const line = this.getLineNumber(fileContent, label.index);

        violations.push({
          line,
          column: 1,
          message: `Label htmlFor="${label.htmlFor}" has no matching input with id="${label.htmlFor}".`,
          severity: 'warning',
          rule: this.name,
          suggestion: `Add id="${label.htmlFor}" to the associated input`,
        });
      }
    });

    // Check for required field indicators
    const requiredInputs = componentInstances.filter(instance =>
      instance.tag.includes('required') || instance.tag.includes('aria-required')
    );

    requiredInputs.forEach(instance => {
      const line = this.getLineNumber(fileContent, instance.index);
      const label = labels.find(l => l.htmlFor === instance.id);

      if (label) {
        const labelContent = fileContent.substring(label.index, label.index + 200);

        // Check if label indicates required status (*, required text, etc.)
        const hasRequiredIndicator = /(\*|required|Required)/i.test(labelContent);

        if (!hasRequiredIndicator) {
          violations.push({
            line,
            column: 1,
            message: `Required field "${instance.id}" should have visual indicator in label (e.g., asterisk).`,
            severity: 'warning',
            rule: this.name,
            suggestion: '<span style={{ color: "var(--text-context-danger)" }}>*</span>',
          });
        }
      }
    });

    return violations;
  },

  extractComponentInstances(fileContent) {
    const instances = [];

    this.formComponents.forEach(component => {
      const regex = new RegExp(`<${component}([^>]*)>`, 'g');
      let match;

      while ((match = regex.exec(fileContent)) !== null) {
        const tag = match[1];
        const idMatch = tag.match(/id=["']([^"']+)["']/);

        instances.push({
          component,
          tag,
          id: idMatch ? idMatch[1] : null,
          index: match.index,
        });
      }
    });

    return instances;
  },

  extractLabels(fileContent) {
    const labels = [];
    const labelRegex = /<label([^>]*)>/g;
    let match;

    while ((match = labelRegex.exec(fileContent)) !== null) {
      const tag = match[1];
      const htmlForMatch = tag.match(/htmlFor=["']([^"']+)["']/);

      labels.push({
        tag,
        htmlFor: htmlForMatch ? htmlForMatch[1] : null,
        index: match.index,
      });
    }

    return labels;
  },

  generateId(component) {
    const base = component.toLowerCase().replace('input', '');
    return `${base}-${Date.now().toString(36)}`;
  },

  getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
  },

  autofix(fileContent, violation) {
    if (violation.message.includes('missing id attribute')) {
      const componentMatch = violation.message.match(/^(\w+) missing/);
      if (!componentMatch) return { fixed: false };

      const component = componentMatch[1];
      const componentRegex = new RegExp(`(<${component}[^>]*)(>)`, 'g');
      const match = componentRegex.exec(fileContent);

      if (match && !match[1].includes(' id=')) {
        const generatedId = this.generateId(component);
        const fixedContent = fileContent.replace(
          match[0],
          `${match[1]} id="${generatedId}"${match[2]}`
        );

        return {
          fixed: true,
          content: fixedContent,
          message: `Added id="${generatedId}" (add corresponding <label htmlFor="${generatedId}">)`,
        };
      }
    }

    return {
      fixed: false,
      message: 'Manual fix required. Add proper label/id association.',
    };
  },
};
