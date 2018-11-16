import { entriesCollection } from '../dbConnection'
import buildMutationResponse from './buildMutationResponse'

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
    addToEod: async (_, { author, entries, teamId }) => {
      const unsavedEntries = entries.map(entry => ({
        ...entry,
        author,
        teamId,
        sent: false,
      }))
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

export default resolvers
