import { ObjectId } from 'mongodb'
import timeZonesDataByValue from '../time-utils/time-zone-data'

import { entriesCollection, teamsCollection } from '../dbConnection'
import { convertLocalTimeToUtcTime } from '../time-utils/time-utils'

// Hack alert... serialize mongo ids properly
// https://github.com/apollographql/apollo-server/issues/1633
ObjectId.prototype.valueOf = function() {
  return this.toString()
}

const resolvers = {
  Team: {
    currentEod: async team => {
      return await entriesCollection()
        .find({ teamId: team._id.toString(), sent: false })
        .toArray()
    },
  },

  Query: {
    teamsReadyForAnEodDelivery: async (_, { currentTimeUtc }) => {
      const allTeams = await teamsCollection()
        .find()
        .toArray()

      return allTeams.filter(team => {
        return team.locations.some(({ eodTime, timeZone }) => {
          const utcTimezone = timeZonesDataByValue[timeZone].utc[0]
          const eodTimeUtc = convertLocalTimeToUtcTime(eodTime, utcTimezone)

          return eodTimeUtc === currentTimeUtc
        })
      })
    },
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

export default resolvers
