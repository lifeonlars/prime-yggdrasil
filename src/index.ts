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

// Export reusable blocks
export { NavigationTabs } from './blocks/NavigationTabs';
export { AccountMenu } from './blocks/AccountMenu';
export { ThemeToggle } from './blocks/ThemeToggle';
export { LanguageMenu, LANGUAGES } from './blocks/LanguageMenu';
export { NotificationButton } from './blocks/NotificationButton';
export { PageHeader } from './blocks/PageHeader';
export { Card } from './blocks/Card';
export { FormField } from './blocks/FormField';
export { FilterBar } from './blocks/FilterBar';
export type { FilterBarProps, FilterConfig } from './blocks/FilterBar';

// Export components
export { Flag } from './components/Flag';
export { Icon } from './components/Icon';
export type { FlagCountry } from './components/Flag';
export type { IconProps } from './components/Icon';
export type { Language } from './blocks/LanguageMenu';
export type { Theme } from './blocks/ThemeToggle';

/**
 * Package version
 */
export const version = '0.8.1';

/**
 * Theme information
 */
export const theme = {
  name: 'Yggdrasil',
  version: '0.8.1',
  tokens: 336,
  coverage: '100%',
  modes: ['light', 'dark'] as const,
};

// Theme CSS is exported via package.json exports field:
// import '@lifeonlars/prime-yggdrasil/theme.css'
