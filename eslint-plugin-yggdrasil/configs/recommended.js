/**
 * Recommended ESLint configuration for Yggdrasil design system
 *
 * This config uses WARNINGS for all rules to facilitate gradual adoption.
 * Use this during the adoption phase to learn the design system rules
 * without blocking builds.
 *
 * To enable strict enforcement (errors), use configs/strict.js
 */

export default {
  plugins: ['@lifeonlars/yggdrasil'],
  rules: {
    // CRITICAL: No PrimeFlex utilities on PrimeReact components
    '@lifeonlars/yggdrasil/no-utility-on-components': 'warn',

    // PrimeFlex allowlist: layout/spacing only, not design
    '@lifeonlars/yggdrasil/primeflex-allowlist': 'warn',

    // No hardcoded color values (hex, rgb, hsl, named colors)
    '@lifeonlars/yggdrasil/no-hardcoded-colors': 'warn',

    // No Tailwind CSS classes
    '@lifeonlars/yggdrasil/no-tailwind': 'warn',

    // Enforce 4px grid spacing
    '@lifeonlars/yggdrasil/valid-spacing': 'warn',

    // Only semantic tokens, not foundation tokens
    '@lifeonlars/yggdrasil/semantic-tokens-only': 'warn',

    // Consistent PrimeReact imports
    '@lifeonlars/yggdrasil/primereact-imports-only': 'warn'
  }
};
