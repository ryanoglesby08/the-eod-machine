// Hack alert... serialize mongo ids properly
// https://github.com/apollographql/apollo-server/issues/1633
import { ObjectId } from 'mongodb'
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

import { entriesCollection } from '../dbConnection'
import buildMutationResponse from './buildMutationResponse'

const resolvers = {
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
    sendEod: async (_, { teamIds }) => {
      const { result } = await entriesCollection().updateMany(
        { teamId: { $in: teamIds }, sent: false },
        { $set: { sent: true } }
      )

      return buildMutationResponse(result)
    },
  },
}

export default resolvers
