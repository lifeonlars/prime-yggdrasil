import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Library build configuration
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'PrimeYggdrasil',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'primereact',
        'primereact/api',
        'primeicons',
        'primeflex'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          primereact: 'PrimeReact',
          'primereact/api': 'PrimeReact.API'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'theme.css';
          if (assetInfo.name === 'theme.css') return 'theme.css';
          return assetInfo.name || 'asset';
        }
      }
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true
  }
});
