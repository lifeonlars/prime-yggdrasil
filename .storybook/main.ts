import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@vueless/storybook-dark-mode",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    // Add alias to resolve @storybook/addon-docs/blocks properly
    const blocksPath = path.resolve(__dirname, '../node_modules/@storybook/addon-docs/dist/blocks.js');
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@storybook/addon-docs/blocks': blocksPath,
      };
    }
    return config;
  },
};
export default config;