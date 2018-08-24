import { CREATE_TEAM } from '../NewTeam'
import { GET_TEAM } from '../EditTeam'

export const buildMockGetTeam = team => ({
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

export const buildCreateTeamMock = team => ({
  request: {
    query: CREATE_TEAM,
    variables: {
      team,
    },
  },
  result: {
    data: {
      createTeam: { _id: '123', ...team },
    },
  },
})
