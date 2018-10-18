const { graphql } = require('graphql')

//TODO: This mongo setup only works with one file. Need to upgrade jest in order to do this way --> https://jestjs.io/docs/en/mongodb
const startDbServer = require('./__test-utils__/startDbServer')
const stopDbServer = require('./__test-utils__/stopDbServer')

const anEntry = require('./__test-utils__/eod-entry-mother')

const {
  connectToDb,
  closeDbConnection,
  entriesCollection,
  teamsCollection,
} = require('./dbConnection')

const schema = require('./schema')

let dbServer

beforeAll(async () => {
  const { server, uri } = await startDbServer()
  dbServer = server

  await connectToDb(uri, 'eodmachine-test')
})

afterAll(async () => {
  await closeDbConnection()
  await stopDbServer(dbServer)
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

// TODO Try to use expect "toMatchObject"
it('creates and edits teams', async () => {
  const team = {
    name: 'Test team',
    mailingList: ['test@example.com', 'anothertest@example.com'],
  }

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

  const teamEdits = {
    name: 'New name',
    mailingList: ['new@mail.com'],
  }

  const editTeamResult = await executeQuery(EDIT_TEAM, {
    id: createdTeamId,
    team: teamEdits,
  })
  expect(editTeamResult).toEqual({
    editTeam: Object.assign({}, { _id: createdTeamId }, teamEdits),
  })

  teamResult = await executeQuery(GET_TEAM, {
    id: createdTeamId,
  })
  expect(teamResult).toEqual({
    team: expect.objectContaining(teamEdits),
  })
})

it('gets EODs that are due to be sent', async () => {
  const team1 = {
    name: 'Team 1',
    mailingList: ['test@example.com'],
  }
  const createTeamResult = await executeQuery(CREATE_TEAM, { team: team1 })
  const createdTeamId = createTeamResult.createTeam._id

  const team1Entry = anEntry({ content: 'team 1 content' })

  await executeQuery(ADD_TO_EOD, {
    entries: [team1Entry],
    teamId: createdTeamId,
  })

  const getDueEodsResult = await executeQuery(GET_TEAMS)

  // TODO: Clean this assertion up
  expect(getDueEodsResult).toEqual({
    teams: [
      {
        _id: createdTeamId,
        name: team1.name,
        mailingList: team1.mailingList,
        currentEod: [team1Entry],
      },
    ],
  })
})
