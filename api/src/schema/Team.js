import { ObjectId } from 'mongodb'

import { entriesCollection, teamsCollection } from '../dbConnection'

const TeamInput = `
  input TeamInput {
    name: String!
    mailingList: [String]!
  }
`

const Team = `
  type Team {
    _id: String!
    name: String!
    mailingList: [String]!
    currentEod: [Entry]
  }
`

const resolvers = {
  Team: {
    currentEod: async team => {
      return await entriesCollection()
        .find({ teamId: team._id.toString(), sent: false })
        .toArray()
    },
  },

  Query: {
    teams: async () =>
      await teamsCollection()
        .find()
        .toArray(),
    team: async (_, { id }) => await teamsCollection().findOne(ObjectId(id)),
  },
  Mutation: {
    createTeam: async (_, { team }) => {
      const { ops } = await teamsCollection().insertOne(team)

      return ops[0]
    },
    editTeam: async (_, { id, team }) => {
      await teamsCollection().updateOne(
        { _id: ObjectId(id) },
        {
          $set: team,
        }
      )

      return { ...team, _id: id }
    },
  },
}

const teamSchema = { schema: [TeamInput, Team], resolvers }
export default teamSchema
