import { graphql } from 'graphql'

//TODO: This mongo setup only works with one file. Need to upgrade jest in order to do this way --> https://jestjs.io/docs/en/mongodb
import { startDbServer, stopDbServer } from './__test-utils__/dbServer'
import { anEntry } from '../../__test-utils__/entry-mother'
import { someTeamInput } from '../../__test-utils__/team-mother'

import {
  closeDbConnection,
  connectToDb,
  entriesCollection,
  teamsCollection,
} from './dbConnection'
import schema from './schema'

beforeAll(async () => {
  const { uri } = await startDbServer()
  await connectToDb(uri, 'eodmachine-test')
})

afterAll(async () => {
  await closeDbConnection()
  await stopDbServer()
})

const GET_EOD = `
  query Eod($teamId: String!) {
    eod(teamId: $teamId) {
      entries {
        category
        content
      }
    }
  }
`

const ADD_TO_EOD = `
  mutation AddToEod($entries: [EntryInput]!, $teamId: String!) {
    addToEod(entries: $entries, teamId: $teamId) {
      category
      content
    }
  }
`

const SEND_EOD = `
  mutation SendEod {
    sendEod {
      success
    }
  }
`

const CREATE_TEAM = `
  mutation CreateTeam($team: TeamInput!) {
    createTeam(team: $team) {
      _id
      name
      mailingList
    }
  }
`

const EDIT_TEAM = `
  mutation EditTeam($id: String!, $team: TeamInput!) {
    editTeam(id: $id, team: $team) {
      _id
      name
      mailingList
    }
  }
`

const GET_TEAMS = `
  {
    teams {
      _id
      name
      mailingList
      currentEod {
        category
        content
      }
    }
  }
`

const GET_TEAM = `
  query Team($id: String!) {
    team(id: $id) {
      _id
      name
      mailingList
    }
  }
`

const executeQuery = async (query, variables) => {
  const { data } = await graphql(schema, query, {}, {}, variables)

  return data
}

beforeEach(async () => {
  await entriesCollection().deleteMany()
  await teamsCollection().deleteMany()
})

it("adds entries to a team's current eod", async () => {
  const entry = anEntry()

  let eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [],
    },
  })

  const addToEodResult = await executeQuery(ADD_TO_EOD, {
    entries: [entry],
    teamId: 'team-1',
  })
  expect(addToEodResult).toEqual({
    addToEod: [entry],
  })

  eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [entry],
    },
  })

  eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-2' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [],
    },
  })
})

it('marks all eod entries as sent regardless of team', async () => {
  const team1Entry = anEntry({ content: 'some content' })
  const team2Entry = anEntry({ content: 'other content' })

  await executeQuery(ADD_TO_EOD, { entries: [team1Entry], teamId: 'team-1' })
  await executeQuery(ADD_TO_EOD, { entries: [team2Entry], teamId: 'team-2' })

  let eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [team1Entry],
    },
  })

  await executeQuery(SEND_EOD)

  eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [],
    },
  })

  // TODO. this will change when sendEod works with teams
  eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-2' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [], // [team2Entry]
    },
  })
})

// TODO to toMatchObject when this jest issue is resolved: https://github.com/facebook/jest/issues/6730
it('creates and edits teams', async () => {
  const team = someTeamInput()

  const createTeamResult = await executeQuery(CREATE_TEAM, { team })
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

it('gets EODs that are due to be sent', async () => {
  const team = someTeamInput()

  const createTeamResult = await executeQuery(CREATE_TEAM, { team })
  const { _id } = createTeamResult.createTeam

  const entry = anEntry()

  await executeQuery(ADD_TO_EOD, {
    entries: [entry],
    teamId: _id,
  })

  const getDueEodsResult = await executeQuery(GET_TEAMS)

  expect(getDueEodsResult).toEqual({
    teams: [
      {
        _id,
        ...team,
        currentEod: [entry],
      },
    ],
  })
})
