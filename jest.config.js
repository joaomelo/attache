module.exports = {
  testEnvironment: 'node',
  setupFiles: ['./tests/config'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'tests/coverage'
};
