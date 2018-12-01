import { gql } from 'apollo-server'

import { createTeamMother } from '../../__test-utils__/team-mother'
import { executeQuery, executeMutation } from './__test-utils__/executeQuery'

import { closeDbConnection, connectToDb, teamsCollection } from './dbConnection'

beforeAll(async () => {
  await connectToDb(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
})

afterAll(async () => {
  await closeDbConnection()
})

const CREATE_TEAM = gql`
  mutation CreateTeam($team: TeamInput!) {
    createTeam(team: $team) {
      _id
      name
      mailingList
      locations {
        name
      }
    }
  }
`

const EDIT_TEAM = gql`
  mutation EditTeam($id: String!, $team: TeamInput!) {
    editTeam(id: $id, team: $team) {
      _id
      name
      mailingList
      locations {
        name
      }
    }
  }
`

const GET_TEAMS = gql`
  query Teams {
    teams {
      _id
      name
      mailingList
      locations {
        name
      }
    }
  }
`

const GET_TEAM = gql`
  query Team($id: String!) {
    team(id: $id) {
      _id
      name
      mailingList
      locations {
        name
      }
    }
  }
`

const someTeamInput = createTeamMother(['name', 'mailingList', 'locations'])

beforeEach(async () => {
  await teamsCollection().deleteMany()
})

// TODO to toMatchObject when this jest issue is resolved: https://github.com/facebook/jest/issues/6730
it('creates and edits teams', async () => {
  const team = someTeamInput({
    locations: [{ name: 'Timbuktu' }, { name: 'Chicago' }],
  })

  const createTeamResult = await executeMutation(CREATE_TEAM, { team })
  expect(createTeamResult).toEqual({
    createTeam: expect.objectContaining(team),
  })

  const teamsResult = await executeQuery(GET_TEAMS)
  expect(teamsResult).toEqual({
    teams: [expect.objectContaining(team)],
  })

  const createdTeamId = createTeamResult.createTeam._id
  let teamResult = await executeQuery(GET_TEAM, {
    id: createdTeamId,
  })
  expect(teamResult).toEqual({
    team: expect.objectContaining(team),
  })

  const teamEdits = someTeamInput({
    name: 'New name',
    mailingList: ['new@mail.com'],
    locations: [{ name: 'Timbuktu' }],
  })

  const editTeamResult = await executeQuery(EDIT_TEAM, {
    id: createdTeamId,
    team: teamEdits,
  })
  expect(editTeamResult).toEqual({
    editTeam: { ...teamEdits, _id: createdTeamId },
  })

  teamResult = await executeQuery(GET_TEAM, {
    id: createdTeamId,
  })
  expect(teamResult).toEqual({
    team: expect.objectContaining(teamEdits),
  })
})
