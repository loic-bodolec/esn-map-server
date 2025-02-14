import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/test/setup.ts'],
  coverageDirectory: './coverage/',
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/src/app/',
    '/src/config/',
    '/src/dataLayer/',
    '/src/controllers/',
    '/src/test/',
  ],
  collectCoverageFrom: [
    './src/**/*.{ts,js}',
    '!./src/app/**',
    '!./src/config/**',
    '!./src/dataLayer/**',
    '!./src/controllers/**',
    '!./src/test/**',
  ],
  coverageReporters: ['lcov', 'text-summary'],
};

export default config;
