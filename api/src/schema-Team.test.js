import { someEntryInputAndAuthoredEntry } from '../../__test-utils__/entry-mother'
import { someTeamInput } from '../../__test-utils__/team-mother'
import executeQuery from './__test-utils__/executeQuery'

import {
  closeDbConnection,
  connectToDb,
  entriesCollection,
  teamsCollection,
} from './dbConnection'

beforeAll(async () => {
  await connectToDb(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
})

afterAll(async () => {
  await closeDbConnection()
})

const ADD_TO_EOD = `
  mutation AddToEod($author: String!, $entries: [EntryInput]!, $teamId: String!) {
    addToEod(author: $author, entries: $entries, teamId: $teamId) {
      author
      category
      content
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
        author
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

beforeEach(async () => {
  await entriesCollection().deleteMany()
  await teamsCollection().deleteMany()
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

  const { entryInput, authoredEntry } = someEntryInputAndAuthoredEntry({
    author: 'The author',
  })

  await executeQuery(ADD_TO_EOD, {
    author: 'The author',
    entries: [entryInput],
    teamId: _id,
  })

  const getDueEodsResult = await executeQuery(GET_TEAMS)

  expect(getDueEodsResult).toEqual({
    teams: [
      {
        _id,
        ...team,
        currentEod: [authoredEntry],
      },
    ],
  })
})
