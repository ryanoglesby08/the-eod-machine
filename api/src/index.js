import server from './server'
import { connectToDb } from './dbConnection'

const DB_HOST = process.env.DB_HOST || 'localhost'

const run = async () => {
  await connectToDb(`mongodb://${DB_HOST}`, 'eodmachine')

  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

run()
