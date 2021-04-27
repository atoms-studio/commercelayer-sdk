module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/__tests__/**/*.spec.+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['__tests__/utils.ts'],
  coverageReporters: ['lcov', 'html', 'text'],
}
