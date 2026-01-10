/**
 * Strict ESLint configuration for Yggdrasil design system
 *
 * This config uses ERRORS for all rules to enforce design system compliance.
 * Use this after completing adoption to ensure no violations make it to production.
 *
 * For gradual adoption with warnings, use configs/recommended.js
 */

export default {
  plugins: ['@lifeonlars/yggdrasil'],
  rules: {
    // CRITICAL: No PrimeFlex utilities on PrimeReact components
    '@lifeonlars/yggdrasil/no-utility-on-components': 'error',

    // PrimeFlex allowlist: layout/spacing only, not design
    '@lifeonlars/yggdrasil/primeflex-allowlist': 'error',

    // No hardcoded color values (hex, rgb, hsl, named colors)
    '@lifeonlars/yggdrasil/no-hardcoded-colors': 'error',

    // No Tailwind CSS classes
    '@lifeonlars/yggdrasil/no-tailwind': 'error',

    // Enforce 4px grid spacing
    '@lifeonlars/yggdrasil/valid-spacing': 'error',

    // Only semantic tokens, not foundation tokens
    '@lifeonlars/yggdrasil/semantic-tokens-only': 'error',

    // Consistent PrimeReact imports
    '@lifeonlars/yggdrasil/primereact-imports-only': 'error'
  }
};
