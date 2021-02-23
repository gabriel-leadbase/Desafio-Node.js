module.exports = {
  rootDir: './src',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/app/controllers/**/*.ts'],
  coverageDirectory: '<rootDir>/tests/coverage/functionals',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  verbose: true
};
