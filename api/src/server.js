import { ApolloServer } from 'apollo-server'

import typeDefs from './schema/typeDefs'
import resolvers from './resolvers/resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default server
