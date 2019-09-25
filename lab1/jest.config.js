module.exports = {
  rootDir: '.',
  setupTestFrameworkScriptFile: '<rootDir>/test/utils/setupTests.js',
  testMatch: [
    '<rootDir>/test/*.test.js?(x)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__mocks__/',
    '.eslintrc.js'
  ],

  collectCoverageFrom: [
    '**/*.js?(x)',
  ],
  coveragePathIgnorePatterns: [
    'index.js',
    'test',
  ],
  coverageThreshold: {
    global: {
      statements: 65,
      branches: 65,
      functions: 65,
      lines: 65
    }
  },

  moduleDirectories: [
    'node_modules',
    'nerdlets',
    'hooks',
    'entity-types',
    'launchers'
  ],

  // Ignore npm caching to avoid problems with jest and chalk throwing errors
  // when running in grand central. Fix grabbed from this github issue:
  // https://github.com/facebook/jest/issues/4682#issuecomment-352899677
  modulePathIgnorePatterns: [
    'npm-cache',
    '.npm'
  ],
  modulePaths: [
    '<rootDir>/nerdlets',
    '<rootDir>/hooks',
    '<rootDir>/entity-types',
    '<rootDir>/launchers',
  ],
  moduleNameMapper: {
    '\\.(scss|css)$': '<rootDir>/test/utils/mocks/styleMock.js',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '^testUtils/(.+)$': '<rootDir>/test/utils/$1',
    '^shared(.*)$': '<rootDir>/lib/$1',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
}
