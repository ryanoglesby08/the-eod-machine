module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/../__test-utils__/'],
  globalSetup: './src/__test-utils__/globalSetup.js', // Copied from https://github.com/vladgolubev/jest-mongodb
  globalTeardown: './src/__test-utils__/globalTeardown.js', // Copied from https://github.com/vladgolubev/jest-mongodb
  testEnvironment: './src/__test-utils__/mongoEnvironment.js', // Copied from https://github.com/vladgolubev/jest-mongodb
}
