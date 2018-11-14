module.exports = {
  rootDir: 'src',
  roots: ['<rootDir>', '<rootDir>/../../__test-utils__/'],
  globalSetup: '<rootDir>/__test-utils__/globalSetup.js', // Copied from https://github.com/vladgolubev/jest-mongodb
  globalTeardown: '<rootDir>/__test-utils__/globalTeardown.js', // Copied from https://github.com/vladgolubev/jest-mongodb
  testEnvironment: '<rootDir>/__test-utils__/mongoEnvironment.js', // Copied from https://github.com/vladgolubev/jest-mongodb
}
