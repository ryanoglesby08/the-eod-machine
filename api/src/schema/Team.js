const { ObjectId } = require('mongodb')

const { teamsCollection } = require('../dbConnection')
const { buildMutationResponse } = require('./MutationResponse')

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
  }
`

const resolvers = {
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
      const { result } = await teamsCollection().updateOne(
        { _id: ObjectId(id) },
        {
          $set: team,
        }
      )

      return buildMutationResponse(result)
    },
  },
}

module.exports = { schema: [TeamInput, Team], resolvers }
