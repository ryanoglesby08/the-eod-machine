const { makeExecutableSchema } = require('graphql-tools')

// The GraphQL schema in string form
const typeDefs = `
  type Query { hello: Message }
  type Message { message: String }
`

// The resolvers
const resolvers = {
  Query: { hello: () => ({ message: 'Hello from the EOD Machine' }) },
}

// Put together a schema
module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
