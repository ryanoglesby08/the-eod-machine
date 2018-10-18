const { entriesCollection } = require('../dbConnection')
const { buildMutationResponse } = require('./MutationResponse')

const Entry = `
  type Entry {
    category: String!
    content: String!
    sent: Boolean
  }
`

const EntryInput = `
  input EntryInput {
    category: String!
    content: String!
  }
`

const Eod = `
  type Eod {
    entries: [Entry]
  }
`

const resolvers = {
  Query: {
    eod: async (_, { teamId }) => {
      return {
        entries: await entriesCollection()
          .find({ teamId, sent: false })
          .toArray(),
      }
    },
  },
  Mutation: {
    addToEod: async (_, { entries, teamId }) => {
      const unsavedEntries = entries.map(entry =>
        Object.assign({}, entry, { teamId, sent: false })
      )
      const { ops } = await entriesCollection().insertMany(unsavedEntries)

      return ops
    },
    sendEod: async () => {
      const { result } = await entriesCollection().updateMany(
        { sent: false },
        { $set: { sent: true } }
      )

      return buildMutationResponse(result)
    },
  },
}

module.exports = { schema: [Entry, EntryInput, Eod], resolvers }
