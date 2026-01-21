import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Shared Vite configuration for all packages in the monorepo
 *
 * This provides common settings that all packages can extend:
 * - React plugin configuration
 * - Common external dependencies
 * - Base build settings
 */
export const sharedConfig: UserConfig = {
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'primereact',
        'primereact/api',
        'primeicons'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          primereact: 'PrimeReact',
          'primereact/api': 'PrimeReact.API'
        }
      }
    },
    cssCodeSplit: false
  }
};

/**
 * Helper to create a library build config
 */
export function createLibConfig(options: {
  entry: string;
  name: string;
  outDir?: string;
  additionalExternal?: string[];
  additionalPlugins?: any[];
}): UserConfig {
  const { entry, name, outDir = 'dist', additionalExternal = [], additionalPlugins = [] } = options;

  return defineConfig({
    ...sharedConfig,
    plugins: [...(sharedConfig.plugins || []), ...additionalPlugins],
    build: {
      ...sharedConfig.build,
      lib: {
        entry,
        name,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
      },
      rollupOptions: {
        ...sharedConfig.build?.rollupOptions,
        external: [
          ...(sharedConfig.build?.rollupOptions?.external || []),
          ...additionalExternal
        ]
      },
      outDir,
      emptyOutDir: true
    }
  });
}
