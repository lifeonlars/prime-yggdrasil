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
 * import { YggdrasilProvider } from '@lifeonlars/prime-yggdrasil';
 *
 * // Use PrimeReact components with YggdrasilProvider
 * import { Button } from 'primereact/button';
 * import { DataTable } from 'primereact/datatable';
 *
 * function App() {
 *   return (
 *     <YggdrasilProvider ripple={true}>
 *       <Button label="Hello Yggdrasil" />
 *     </YggdrasilProvider>
 *   );
 * }
 * ```
 */

// Export YggdrasilProvider for consumers
export { YggdrasilProvider } from './provider/YggdrasilProvider';
export type { YggdrasilProviderProps } from './provider/YggdrasilProvider';

/**
 * Package version
 */
export const version = '0.2.1';

/**
 * Theme information
 */
export const theme = {
  name: 'Yggdrasil',
  version: '0.2.1',
  tokens: 727,
  coverage: '100%',
  modes: ['light', 'dark'] as const,
};

// Theme CSS is exported via package.json exports field:
// import '@lifeonlars/prime-yggdrasil/yggdrasil-light.css'
// import '@lifeonlars/prime-yggdrasil/yggdrasil-dark.css'
