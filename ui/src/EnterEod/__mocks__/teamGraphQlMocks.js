import { GET_TEAMS } from '../WithTeam'

export const buildMockGetTeams = teams => ({
  request: {
    query: GET_TEAMS,
  },
  result: {
    data: {
      teams,
    },
  },
})
