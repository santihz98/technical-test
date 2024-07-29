module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: [
      "/node_modules/",
      "/dist/"
    ],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
    transform: {
      '^.+\\.(ts|js|html)$': 'jest-preset-angular',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    coverageDirectory: 'coverage',
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/main.ts',
      '!src/polyfills.ts',
      '!src/**/*.module.ts',
      '!src/**/*.array.ts'
    ],
    coverageReporters: ['html', 'text', 'text-summary', 'lcov'],
    moduleNameMapper: {
      '^@services/(.*)$': '<rootDir>/__mocks__/$1'
    },
  };
  