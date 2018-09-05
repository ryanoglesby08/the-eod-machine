import { GET_TEAMS } from '../Teams/Teams'
import { CREATE_TEAM } from '../NewTeam/NewTeam'
import { GET_TEAM, EDIT_TEAM } from '../EditTeam/EditTeam'

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

export const buildEditTeamMock = ({ _id, ...team }) => ({
  request: {
    query: EDIT_TEAM,
    variables: {
      id: _id,
      team,
    },
  },
  result: {
    data: {
      editTeam: { _id, ...team },
    },
  },
})
