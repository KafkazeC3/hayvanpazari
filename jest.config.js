const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Next.js uygulamasının yolu
  dir: './',
});

// Jest'e özel konfigürasyon
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (TypeScript paths)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/playwright-tests/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/app/api/**/*', // API route'ları için ayrı test stratejisi
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

// createJestConfig, async/await desteği sağlar
module.exports = createJestConfig(customJestConfig);
