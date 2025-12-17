import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Plugin to copy theme variants
function copyThemeVariants() {
  return {
    name: 'copy-theme-variants',
    writeBundle() {
      // Copy light theme
      const lightSrc = path.resolve(dirname, 'src/theme/yggdrasil-light.css');
      const lightDest = path.resolve(dirname, 'dist/yggdrasil-light.css');
      fs.copyFileSync(lightSrc, lightDest);
      console.log('✓ Copied yggdrasil-light.css to dist/');

      // Copy dark theme
      const darkSrc = path.resolve(dirname, 'src/theme/yggdrasil-dark.css');
      const darkDest = path.resolve(dirname, 'dist/yggdrasil-dark.css');
      fs.copyFileSync(darkSrc, darkDest);
      console.log('✓ Copied yggdrasil-dark.css to dist/');

      // Copy foundations
      const foundationsSrc = path.resolve(dirname, 'src/theme/foundations.css');
      const foundationsDest = path.resolve(dirname, 'dist/foundations.css');
      fs.copyFileSync(foundationsSrc, foundationsDest);
      console.log('✓ Copied foundations.css to dist/');
    }
  };
}

// Library build configuration
export default defineConfig({
  plugins: [react(), copyThemeVariants()],
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
