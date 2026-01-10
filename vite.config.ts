import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for dev server
// For library build, see vite.config.lib.ts
export default defineConfig({
  plugins: [react()],
});
