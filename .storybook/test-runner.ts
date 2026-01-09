import type { TestRunnerConfig } from '@storybook/test-runner';

const config: TestRunnerConfig = {
  // The URL to your running Storybook instance
  storybookUrl: 'http://localhost:6006',

  // Timeout for each test
  testTimeout: 15000,

  // Browser context options
  browserContextOptions: {
    ignoreHTTPSErrors: true,
  },
};

export default config;
