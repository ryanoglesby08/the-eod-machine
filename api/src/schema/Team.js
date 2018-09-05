const { ObjectId } = require('mongodb')

const { teamsCollection } = require('../dbConnection')

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
      await teamsCollection().updateOne(
        { _id: ObjectId(id) },
        {
          $set: team,
        }
      )

      return Object.assign({}, { _id: id }, team)
    },
  },
}

module.exports = { schema: [TeamInput, Team], resolvers }
