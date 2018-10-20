/*
  Copied from https://github.com/vladgolubev/jest-mongodb
*/

module.exports = async function() {
  await global.__MONGOD__.stop()
}
