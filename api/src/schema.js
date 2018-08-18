const { makeExecutableSchema } = require('graphql-tools')

const { entriesCollection, teamsCollection } = require('./dbConnection')

const typeDefs = `
  type Entry {
    category: String!
    content: String!
    sent: Boolean
  }
  
  type Eod {
    entries: [Entry]
  }
  
  type Team {
    name: String!
    mailingList: [String]!
  }
  
  type MutationResponse {
    success: Boolean!
  }
  
  input EntryInput {
    category: String!
    content: String!
  }
  
  input TeamInput {
    name: String!
    mailingList: [String]!
  }
  

  type Query { 
    eod: Eod,
    teams: [Team]
  }
  
  type Mutation {
    addToEod(entries: [EntryInput]!): [Entry]
    sendEod: MutationResponse
    createTeam(team: TeamInput!): Team
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    eod: async () => ({
      entries: await entriesCollection()
        .find({ sent: false })
        .toArray(),
    }),
    teams: async () =>
      await teamsCollection()
        .find()
        .toArray(),
  },
  Mutation: {
    addToEod: async (_, { entries }) => {
      const unsavedEntries = entries.map(entry =>
        Object.assign({}, entry, { sent: false })
      )
      const { ops } = await entriesCollection().insertMany(unsavedEntries)

      return ops
    },
    sendEod: async () => {
      const { result } = await entriesCollection().updateMany(
        { sent: false },
        { $set: { sent: true } }
      )

      return { success: result.ok === 1 }
    },
    createTeam: async (_, { team }) => {
      const { ops } = await teamsCollection().insertOne(team)

      return ops[0]
    },
  },
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
})
