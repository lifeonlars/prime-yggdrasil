import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Plugin to copy theme files
function copyThemeVariants() {
  return {
    name: 'copy-theme-variants',
    writeBundle() {
      const filesToCopy = [
        // Main theme files
        'yggdrasil-light.css',
        'yggdrasil-dark.css',
        // Dependencies
        'foundations.css',
        'prime-palette.css',
        'radius.css',
        'semantic-light.css',
        'semantic-dark.css',
        'components.css'
      ];

      const componentFiles = [
        'button.css',
        'data.css',
        'menu.css',
        'form.css',
        'calendar.css',
        'overlay.css',
        'panel.css',
        'message.css',
        'media.css',
        'misc.css',
        'misc-extended.css'
      ];

      // Copy main theme files
      filesToCopy.forEach(file => {
        const src = path.resolve(dirname, 'src/theme', file);
        const dest = path.resolve(dirname, 'dist', file);

        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`✓ Copied ${file} to dist/`);
        } else {
          console.warn(`⚠ Warning: ${file} not found in src/theme/`);
        }
      });

      // Create components directory in dist
      const componentsDir = path.resolve(dirname, 'dist/components');
      if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
      }

      // Copy component files
      componentFiles.forEach(file => {
        const src = path.resolve(dirname, 'src/theme/components', file);
        const dest = path.resolve(dirname, 'dist/components', file);

        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`✓ Copied components/${file} to dist/`);
        } else {
          console.warn(`⚠ Warning: components/${file} not found`);
        }
      });
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
