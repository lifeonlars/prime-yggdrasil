import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLibConfig } from '../../vite.config.shared';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Library build configuration for charts package
export default createLibConfig({
  entry: path.resolve(dirname, 'src/index.ts'),
  name: 'PrimeYggdrasilCharts',
  outDir: 'dist',
  additionalExternal: [
    'highcharts',
    'highcharts/modules/treemap',
    'highcharts/modules/wordcloud',
    'highcharts/modules/map',
    '@lifeonlars/prime-yggdrasil'
  ]
});
