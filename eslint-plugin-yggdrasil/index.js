/**
 * @fileoverview ESLint plugin for Prime Yggdrasil design system
 * @author Lars Farstad
 */

import noUtilityOnComponents from './rules/no-utility-on-components.js';
import primeflexAllowlist from './rules/primeflex-allowlist.js';
import noHardcodedColors from './rules/no-hardcoded-colors.js';
import noTailwind from './rules/no-tailwind.js';
import validSpacing from './rules/valid-spacing.js';
import semanticTokensOnly from './rules/semantic-tokens-only.js';
import primereactImportsOnly from './rules/primereact-imports-only.js';

import recommended from './configs/recommended.js';
import strict from './configs/strict.js';

const plugin = {
  meta: {
    name: '@lifeonlars/eslint-plugin-yggdrasil',
    version: '0.1.0'
  },
  rules: {
    'no-utility-on-components': noUtilityOnComponents,
    'primeflex-allowlist': primeflexAllowlist,
    'no-hardcoded-colors': noHardcodedColors,
    'no-tailwind': noTailwind,
    'valid-spacing': validSpacing,
    'semantic-tokens-only': semanticTokensOnly,
    'primereact-imports-only': primereactImportsOnly
  },
  configs: {
    recommended,
    strict
  }
};

export default plugin;
