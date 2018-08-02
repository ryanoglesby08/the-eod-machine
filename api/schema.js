const { makeExecutableSchema } = require('graphql-tools')

const eod = {
  entries: [],
}

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
    eod: () => eod,
  },
  Mutation: {
    addToEod: (_, { entries }) => {
      eod.entries = eod.entries.concat(entries)
      return entries
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
