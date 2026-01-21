/**
 * APCA Contrast Test Configuration
 *
 * Defines semantic token pairs that should be tested for
 * WCAG 3.0 APCA contrast compliance.
 */

export interface ContrastPair {
  name: string;
  textVar: string;
  surfaceVar: string;
  category: 'body' | 'large' | 'ui' | 'heading';
  description?: string;
}

/**
 * Semantic token pairs to test for contrast
 * Each pair represents a common text/background combination
 */
export const CONTRAST_PAIRS: ContrastPair[] = [
  // Primary text on primary surfaces
  {
    name: 'Default text on primary surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
    description: 'Most common text/background combination',
  },
  {
    name: 'Loud text on primary surface',
    textVar: '--text-neutral-loud',
    surfaceVar: '--surface-neutral-primary',
    category: 'heading',
    description: 'High emphasis text like headings',
  },
  {
    name: 'Subdued text on primary surface',
    textVar: '--text-neutral-subdued',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
    description: 'Lower emphasis text like captions',
  },

  // Text on secondary surfaces
  {
    name: 'Default text on secondary surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-neutral-secondary',
    category: 'body',
  },
  {
    name: 'Loud text on secondary surface',
    textVar: '--text-neutral-loud',
    surfaceVar: '--surface-neutral-secondary',
    category: 'heading',
  },

  // Text on tertiary surfaces
  {
    name: 'Default text on tertiary surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-neutral-tertiary',
    category: 'body',
  },
  {
    name: 'Loud text on tertiary surface',
    textVar: '--text-neutral-loud',
    surfaceVar: '--surface-neutral-tertiary',
    category: 'heading',
  },

  // Brand/Primary interactions
  {
    name: 'Text on brand primary',
    textVar: '--text-onsurface-onbrand',
    surfaceVar: '--surface-brand-primary',
    category: 'ui',
    description: 'Primary buttons, brand surfaces',
  },
  {
    name: 'Text on brand accent',
    textVar: '--text-onsurface-onbrand',
    surfaceVar: '--surface-brand-accent',
    category: 'ui',
    description: 'Accent brand elements',
  },

  // Context/Severity - Info
  {
    name: 'Text on info surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-info',
    category: 'ui',
    description: 'Info messages, badges',
  },
  {
    name: 'Info text on primary surface',
    textVar: '--text-context-info',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
    description: 'Info-colored text',
  },

  // Context/Severity - Success
  {
    name: 'Text on success surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-success',
    category: 'ui',
    description: 'Success messages, badges',
  },
  {
    name: 'Success text on primary surface',
    textVar: '--text-context-success',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
    description: 'Success-colored text',
  },

  // Context/Severity - Warning
  {
    name: 'Text on warning surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-warning',
    category: 'ui',
    description: 'Warning messages, badges',
  },
  {
    name: 'Warning text on primary surface',
    textVar: '--text-context-warning',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
    description: 'Warning-colored text',
  },

  // Context/Severity - Danger/Error
  {
    name: 'Text on danger surface',
    textVar: '--text-onsurface-oncontext',
    surfaceVar: '--surface-context-danger',
    category: 'ui',
    description: 'Error messages, badges',
  },
  {
    name: 'Danger text on primary surface',
    textVar: '--text-context-danger',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
    description: 'Error-colored text',
  },

  // Interactive states - Hover
  {
    name: 'Text on hover surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-state-hover',
    category: 'ui',
    description: 'Hovered interactive elements',
  },

  // Interactive states - Active
  {
    name: 'Text on active surface',
    textVar: '--text-neutral-default',
    surfaceVar: '--surface-state-active',
    category: 'ui',
    description: 'Active/pressed interactive elements',
  },

  // Interactive states - Selected
  {
    name: 'Text on selected surface',
    textVar: '--text-neutral-loud',
    surfaceVar: '--surface-state-selected',
    category: 'ui',
    description: 'Selected items in lists, tabs',
  },

  // Interactive states - Disabled
  {
    name: 'Disabled text on primary surface',
    textVar: '--text-state-disabled',
    surfaceVar: '--surface-neutral-primary',
    category: 'ui',
    description: 'Disabled form inputs, buttons',
  },
  {
    name: 'Text on disabled surface',
    textVar: '--text-state-disabled',
    surfaceVar: '--surface-state-disabled',
    category: 'ui',
    description: 'Disabled interactive elements',
  },

  // PrimeReact specific mappings
  {
    name: 'Primary color text on white',
    textVar: '--primary-color-text',
    surfaceVar: '--primary-color',
    category: 'ui',
    description: 'PrimeReact primary button text',
  },
  {
    name: 'Text color on surface-a',
    textVar: '--text-color',
    surfaceVar: '--surface-a',
    category: 'body',
    description: 'PrimeReact default text on primary surface',
  },
  {
    name: 'Text color on surface-b',
    textVar: '--text-color',
    surfaceVar: '--surface-b',
    category: 'body',
    description: 'PrimeReact text on secondary surface',
  },
  {
    name: 'Text color on surface-c',
    textVar: '--text-color',
    surfaceVar: '--surface-c',
    category: 'body',
    description: 'PrimeReact text on tertiary surface',
  },

  // Inverted contexts
  {
    name: 'Inverted text on inverted surface',
    textVar: '--text-onsurface-inverted',
    surfaceVar: '--surface-neutral-inverted',
    category: 'ui',
    description: 'Dark mode or inverted sections',
  },
];

/**
 * Additional pairs for comprehensive testing
 * These test edge cases and less common combinations
 */
export const EXTENDED_CONTRAST_PAIRS: ContrastPair[] = [
  // Links on various surfaces
  {
    name: 'Link on primary surface',
    textVar: '--text-link-default',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
  },
  {
    name: 'Visited link on primary surface',
    textVar: '--text-link-visited',
    surfaceVar: '--surface-neutral-primary',
    category: 'body',
  },

  // Icons on surfaces
  {
    name: 'Default icon on primary surface',
    textVar: '--icon-neutral-default',
    surfaceVar: '--surface-neutral-primary',
    category: 'ui',
  },
  {
    name: 'Loud icon on primary surface',
    textVar: '--icon-neutral-loud',
    surfaceVar: '--surface-neutral-primary',
    category: 'ui',
  },

  // Charts on surfaces (if using charts on colored backgrounds)
  {
    name: 'Chart 1 on primary surface',
    textVar: '--charts-category-chart-1',
    surfaceVar: '--surface-neutral-primary',
    category: 'ui',
  },
  {
    name: 'Chart 1 on secondary surface',
    textVar: '--charts-category-chart-1',
    surfaceVar: '--surface-neutral-secondary',
    category: 'ui',
  },
];
