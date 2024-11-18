import type { Config } from 'jest';

/**
 * Jest configuration:
 * 1. Prettier 3 is not support right now.
 * 2. Notify adding.
 * *NOTE: Can setup projects for monorepos.
 * @see https://jestjs.io/docs/configuration
 * *WARNING: Careful for transformIgnorePatterns setting (this settings for monorepos while using pnpm)
 */
const config: Config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: -100,
    },
  },
  fakeTimers: {
    timerLimit: 1000,
    enableGlobally: true,
  },
  projects: [
    {
      displayName: 'test',
      testEnvironment: 'jsdom',
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.{js,mjs,ts,jsx,tsx}'],
    },
  ],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: '<rootDir>/reports',
        filename: 'test-report.html',
        darkTheme: true,
        hideIcon: true,
        openReport: false,
      },
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
