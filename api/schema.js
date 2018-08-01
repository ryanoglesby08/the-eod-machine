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
  }
  
  type Mutation {
    addToEod(entries: [EntryInput]!): Eod
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: { hello: () => ({ message: 'Hello from the EOD Machine' }) },
  Mutation: {
    addToEod: (_, { entries }) => {
      eod.entries = eod.entries.concat(entries)
      return eod
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
