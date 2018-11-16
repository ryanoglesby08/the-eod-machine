import { graphql } from 'graphql'
import { makeExecutableSchema } from 'apollo-server'

import typeDefs from '../schema/typeDefs'
import resolvers from '../resolvers/resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const executeQuery = async (query, variables) => {
  const { data } = await graphql(schema, query, {}, {}, variables)

  return data
}

export default executeQuery
