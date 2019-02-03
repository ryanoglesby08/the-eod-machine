import { gql } from 'apollo-server'

import { createTeamMother } from '../../__test-utils__/team-mother'
import { createLocationMother } from '../../__test-utils__/location-mother'
import { executeQuery, executeMutation } from './__test-utils__/executeQuery'

import { closeDbConnection, connectToDb, teamsCollection } from './dbConnection'
import { convertLocalTimeToUtcTime } from './time-utils/time-utils'

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
        timeZone
        eodTime
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
        timeZone
        eodTime
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
        timeZone
        eodTime
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
        timeZone
        eodTime
      }
    }
  }
`

const GET_TEAMS_READY_FOR_EOD_DELIVERY = gql`
  query GetTeamsReadyForEodDelivery($currentTimeUtc: String!) {
    teamsReadyForAnEodDelivery(currentTimeUtc: $currentTimeUtc) {
      name
    }
  }
`

const someTeamInput = createTeamMother(['name', 'mailingList', 'locations'])
const aLocation = createLocationMother(['name', 'timeZone', 'eodTime'])

beforeEach(async () => {
  await teamsCollection().deleteMany()
})

// TODO to toMatchObject when this jest issue is resolved: https://github.com/facebook/jest/issues/6730
it('creates and edits teams', async () => {
  const team = someTeamInput({
    locations: [
      aLocation({ name: 'First city' }),
      aLocation({ name: 'Second city' }),
    ],
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
    locations: [aLocation({ name: 'Timbuktu' })],
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

it('gets teams in which one of its locations has reached its EOD time', async () => {
  const team = someTeamInput({
    name: 'The team',
    locations: [
      aLocation({
        name: 'The city',
        timeZone: 'America/New_York',
        eodTime: '6:00 PM',
      }),
    ],
  })

  await executeMutation(CREATE_TEAM, { team })

  const currentTimeUtc = convertLocalTimeToUtcTime(
    '6:00 PM',
    'America/New_York'
  )
  const result = await executeQuery(GET_TEAMS_READY_FOR_EOD_DELIVERY, {
    currentTimeUtc,
  })

  expect(result).toEqual({
    teamsReadyForAnEodDelivery: [{ name: 'The team' }],
  })
})

// TODO: include a team that is NOT at delivery time
// TODO: rounding to nearest half hour (check Ruby for how much, I think 5 minutes)
