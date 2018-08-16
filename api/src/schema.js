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
  
  type MutationResponse {
    success: Boolean!
  }
  
  input EntryInput {
    category: String!
    content: String!
  }
  

  type Query { 
    eod: Eod
  }
  
  type Mutation {
    addToEod(entries: [EntryInput]!): [Entry]
    sendEod: MutationResponse
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
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
      const { result } = await dbEntries().updateMany(
        { sent: false },
        { $set: { sent: true } }
      )

      return { success: result.ok === 1 }
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
