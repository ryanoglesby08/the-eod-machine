const { graphql } = require('graphql')

//TODO: This mongo setup only works with one file. Need to upgrade jest in order to do this way --> https://jestjs.io/docs/en/mongodb
const startDbServer = require('../test/startDbServer')
const stopDbServer = require('../test/stopDbServer')

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
  {
    eod {
      entries {
        category
        content
      }
    }
  }
`

const ADD_TO_EOD = `
  mutation AddToEod($entries: [EntryInput]!) {
    addToEod(entries: $entries) {
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

it('adds entries to the current eod', async () => {
  const entry = {
    category: 'Test category',
    content: 'some content',
  }

  let eodQueryResult = await executeQuery(GET_EOD)
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [],
    },
  })

  const addToEodResult = await executeQuery(ADD_TO_EOD, { entries: [entry] })
  expect(addToEodResult).toEqual({
    addToEod: [entry],
  })

  eodQueryResult = await executeQuery(GET_EOD)
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [entry],
    },
  })
})

it('marks eod entries as sent', async () => {
  const entry = {
    category: 'Test category',
    content: 'some content',
  }

  await executeQuery(ADD_TO_EOD, { entries: [entry] })

  let eodQueryResult = await executeQuery(GET_EOD)
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [entry],
    },
  })

  await executeQuery(SEND_EOD)

  eodQueryResult = await executeQuery(GET_EOD)
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [],
    },
  })
})

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
