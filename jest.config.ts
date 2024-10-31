import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Bevara inställningen för TypeScript
  testEnvironment: 'node', // Bevara testmiljön
  extensionsToTreatAsEsm: ['.ts'], // Bevara inställningen för ESM
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Bevara modulnamnmapper
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }], // Bevara transformering
  },
  testMatch: ['<rootDir>/src/**/*.test.ts'], // Bevara testmatchning
  collectCoverage: true, // Aktivera kodtäckning
  coverageThreshold: {
    global: {
      branches: 100, // Minst 100% branch-täckning
      functions: 100, // Minst 100% funktionstäckning
      lines: 100, // Minst 100% linjetäckning
      statements: 100, // Minst 100% uttalande-täckning
    },
  },
  // Lägg till andra Jest-inställningar här, om nödvändigt
};

export default config;
