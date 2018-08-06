const { makeExecutableSchema } = require('graphql-tools')

const dbEntries = require('./dbConnection').entries

const typeDefs = `
  type Entry {
    category: String!
    content: String!
  }
  
  type Eod {
    entries: [Entry]
  }
  
  input EntryInput {
    category: String!
    content: String!
  }

  type Message { message: String }
  

  type Query { 
    hello: Message
    eod: Eod
  }
  
  type Mutation {
    addToEod(entries: [EntryInput]!): [Entry]
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    hello: () => ({ message: 'Hello from the EOD Machine' }),
    eod: async () => ({
      entries: await dbEntries()
        .find()
        .toArray(),
    }),
  },
  Mutation: {
    addToEod: async (_, { entries }) => {
      const { ops } = await dbEntries().insertMany(entries)

      return ops
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
