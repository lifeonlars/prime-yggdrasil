/**
 * Prime Yggdrasil Design System
 *
 * A PrimeReact-based design system for React + Vite projects.
 *
 * Installation:
 * ```bash
 * npm install prime-yggdrasil
 * ```
 *
 * Usage:
 * ```tsx
 * import { YggdrasilProvider } from 'prime-yggdrasil';
 * // Import Yggdrasil standalone theme
 * import 'prime-yggdrasil/theme.css';        // Light mode
 * // OR import 'prime-yggdrasil/theme-dark.css';  // Dark mode
 * import 'primeicons/primeicons.css';
 * import 'primeflex/primeflex.css';
 *
 * function App() {
 *   return (
 *     <YggdrasilProvider>
 *       <YourApp />
 *     </YggdrasilProvider>
 *   );
 * }
 * ```
 */

// Import theme CSS to be bundled with library
import './theme/index.css';
import './blocks/blocks.css';

// Provider
export { YggdrasilProvider } from './provider/YggdrasilProvider';
export type { YggdrasilProviderProps } from './provider/YggdrasilProvider';

// Blocks
export { Card } from './blocks/Card';
export { PageHeader } from './blocks/PageHeader';
export { FormField } from './blocks/FormField';
export { SectionTitle } from './blocks/SectionTitle';

// Theme CSS is exported via package.json exports field:
// import 'prime-yggdrasil/theme.css'
