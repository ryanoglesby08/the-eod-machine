const MongodbMemoryServer = require('mongodb-memory-server')

const mongoServer = new MongodbMemoryServer.MongoMemoryServer()

module.exports = async () => ({
  server: mongoServer,
  uri: await mongoServer.getConnectionString(),
})
