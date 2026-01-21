import { PrimeReactProvider } from 'primereact/api';
import type { ReactNode } from 'react';

export interface YggdrasilProviderProps {
  children: ReactNode;
  /**
   * Enable ripple effect on compatible components
   * @default true
   */
  ripple?: boolean;
  /**
   * Additional PrimeReact configuration options
   */
  primeConfig?: Record<string, any>;
}

/**
 * YggdrasilProvider
 *
 * Wraps PrimeReactProvider with sensible defaults for the Yggdrasil design system.
 *
 * Usage:
 * ```tsx
 * import { YggdrasilProvider } from 'prime-yggdrasil';
 * import 'prime-yggdrasil/theme.css';
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
export function YggdrasilProvider({
  children,
  ripple = true,
  primeConfig = {},
}: YggdrasilProviderProps) {
  const value = {
    ripple,
    inputStyle: 'outlined' as const,
    ...primeConfig,
  };

  return <PrimeReactProvider value={value}>{children}</PrimeReactProvider>;
}
