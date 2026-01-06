/**
 * Prime Yggdrasil Design System
 *
 * A PrimeReact-based design system for React + Vite projects.
 *
 * Installation:
 * ```bash
 * npm install @lifeonlars/prime-yggdrasil primereact primeicons
 * ```
 *
 * Usage:
 * ```tsx
 * // Import theme CSS
 * import '@lifeonlars/prime-yggdrasil/yggdrasil-light.css';  // Light mode
 * // OR
 * import '@lifeonlars/prime-yggdrasil/yggdrasil-dark.css';   // Dark mode
 *
 * import 'primeicons/primeicons.css';
 *
 * // Use PrimeReact components
 * import { Button } from 'primereact/button';
 * import { DataTable } from 'primereact/datatable';
 *
 * function App() {
 *   return <Button label="Hello Yggdrasil" />;
 * }
 * ```
 */

/**
 * Package version
 */
export const version = '0.1.0';

/**
 * Theme information
 */
export const theme = {
  name: 'Yggdrasil',
  version: '0.1.0',
  tokens: 727,
  coverage: '96%',
  modes: ['light', 'dark'] as const,
};

// Theme CSS is exported via package.json exports field:
// import '@lifeonlars/prime-yggdrasil/yggdrasil-light.css'
// import '@lifeonlars/prime-yggdrasil/yggdrasil-dark.css'
