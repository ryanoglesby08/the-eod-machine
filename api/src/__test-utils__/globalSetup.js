/*
  Copied from https://github.com/vladgolubev/jest-mongodb
*/

const path = require('path')
const fs = require('fs')
const MongodbMemoryServer = require('mongodb-memory-server')
const globalConfigPath = path.join(__dirname, 'mongoConfig.json')

// const mongod = new MongodbMemoryServer.default({
//   instance: {
//     dbName: 'eodmachine-test',
//   },
//   binary: {
//     version: '3.2.18',
//   },
// })

module.exports = async function() {
  const mongod = new MongodbMemoryServer.default({
    instance: {
      dbName: 'eodmachine-test',
    },
    binary: {
      version: '3.2.18',
    },
  })

  const mongoConfig = {
    mongoDBName: 'eodmachine-test',
    mongoUri: await mongod.getConnectionString(),
  }

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig))

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod
  process.env.MONGO_URL = mongoConfig.mongoUri
}
