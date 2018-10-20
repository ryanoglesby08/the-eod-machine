import { MongoMemoryServer } from 'mongodb-memory-server'

const mongoServer = new MongoMemoryServer()

export const startDbServer = async () => ({
  server: mongoServer,
  uri: await mongoServer.getConnectionString(),
})

export const stopDbServer = async () => {
  await mongoServer.stop()
}
