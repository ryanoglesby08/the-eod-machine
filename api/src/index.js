import { ApolloServer } from 'apollo-server'

import typeDefs from './schema/typeDefs'
import resolvers from './resolvers/resolvers'

import { connectToDb } from './dbConnection'

const DB_HOST = process.env.DB_HOST || 'localhost'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const run = async () => {
  await connectToDb(`mongodb://${DB_HOST}`, 'eodmachine')

  const { url } = await server.listen()
  console.log(`🚀 Server ready at ${url}`)
}

run()
