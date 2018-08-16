const { makeExecutableSchema } = require('graphql-tools')

const dbEntries = require('./dbConnection').entries

const typeDefs = `
  type Entry {
    category: String!
    content: String!
    sent: Boolean
  }
  
  type Eod {
    entries: [Entry]
  }
  
  type Response {
    status: String!
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
    sendEod: Response
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
        .find({ sent: false })
        .toArray(),
    }),
  },
  Mutation: {
    addToEod: async (_, { entries }) => {
      const unsavedEntries = entries.map(entry =>
        Object.assign({}, entry, { sent: false })
      )
      const { ops } = await dbEntries().insertMany(unsavedEntries)

      return ops
    },
    sendEod: async () => {
      await dbEntries().updateMany({ sent: false }, { $set: { sent: true } })

      // TODO: Can this return the updated documents?
      return { status: 'success' }
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
