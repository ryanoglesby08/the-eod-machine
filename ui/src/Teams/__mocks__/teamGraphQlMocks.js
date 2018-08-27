import { CREATE_TEAM } from '../NewTeam'
import { GET_TEAM } from '../EditTeam'
import { GET_TEAMS } from '../Teams'

export const buildGetTeamsMock = teams => ({
  request: {
    query: GET_TEAMS,
  },
  result: {
    data: {
      teams,
    },
  },
})

export const buildGetTeamMock = team => ({
  request: {
    query: GET_TEAM,
    variables: { id: team._id },
  },
  result: {
    data: {
      team,
    },
  },
})

export const buildCreateTeamMock = ({ _id, ...team }) => ({
  request: {
    query: CREATE_TEAM,
    variables: {
      team,
    },
  },
  result: {
    data: {
      createTeam: { _id, ...team },
    },
  },
})
