import { gql } from 'apollo-server'

import {
  someEntryInput,
  someEntryInputAndAuthoredEntry,
} from '../../__test-utils__/entry-mother'
import { createTeamMother } from '../../__test-utils__/team-mother'
import { executeQuery, executeMutation } from './__test-utils__/executeQuery'

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

const CREATE_TEAM = gql`
  mutation CreateTeam($team: TeamInput!) {
    createTeam(team: $team) {
      _id
      name
      mailingList
    }
  }
`

const GET_TEAM_WITH_EOD = gql`
  query TeamWithEod($id: String!) {
    team(id: $id) {
      currentEod {
        author
        category
        content
      }
    }
  }
`

const ADD_TO_EOD = gql`
  mutation AddToEod(
    $author: String!
    $entries: [EntryInput]!
    $teamId: String!
  ) {
    addToEod(author: $author, entries: $entries, teamId: $teamId) {
      author
      category
      content
    }
  }
`

const SEND_EOD = gql`
  mutation SendEod {
    sendEod {
      success
    }
  }
`

const someTeamInput = createTeamMother(['name', 'mailingList', 'locations'])

beforeEach(async () => {
  await entriesCollection().deleteMany()
  await teamsCollection().deleteMany()
})

it("adds entries to a team's current eod", async () => {
  const teamId1 = (await executeMutation(CREATE_TEAM, {
    team: someTeamInput(),
  })).createTeam._id
  const teamId2 = (await executeMutation(CREATE_TEAM, {
    team: someTeamInput(),
  })).createTeam._id

  const { entryInput, authoredEntry } = someEntryInputAndAuthoredEntry({
    author: 'The author',
  })

  let eodQueryResult = await executeQuery(GET_TEAM_WITH_EOD, { id: teamId1 })
  expect(eodQueryResult).toEqual({
    team: {
      currentEod: [],
    },
  })

  const addToEodResult = await executeMutation(ADD_TO_EOD, {
    author: 'The author',
    entries: [entryInput],
    teamId: teamId1,
  })
  expect(addToEodResult).toEqual({
    addToEod: [authoredEntry],
  })

  eodQueryResult = await executeQuery(GET_TEAM_WITH_EOD, { id: teamId1 })
  expect(eodQueryResult).toEqual({
    team: {
      currentEod: [authoredEntry],
    },
  })

  eodQueryResult = await executeQuery(GET_TEAM_WITH_EOD, { id: teamId2 })
  expect(eodQueryResult).toEqual({
    team: {
      currentEod: [],
    },
  })
})

it('marks all eod entries as sent regardless of team', async () => {
  const teamId1 = (await executeMutation(CREATE_TEAM, {
    team: someTeamInput(),
  })).createTeam._id
  const teamId2 = (await executeMutation(CREATE_TEAM, {
    team: someTeamInput(),
  })).createTeam._id

  const team1Entry = someEntryInputAndAuthoredEntry({ author: 'team 1' })
  const team2EntryInput = someEntryInput({ author: 'team 2' })

  await executeMutation(ADD_TO_EOD, {
    author: 'team 1',
    entries: [team1Entry.entryInput],
    teamId: teamId1,
  })
  await executeMutation(ADD_TO_EOD, {
    author: 'team 2',
    entries: [team2EntryInput],
    teamId: teamId2,
  })

  let eodQueryResult = await executeQuery(GET_TEAM_WITH_EOD, { id: teamId1 })
  expect(eodQueryResult).toEqual({
    team: {
      currentEod: [team1Entry.authoredEntry],
    },
  })

  await executeMutation(SEND_EOD)

  eodQueryResult = await executeQuery(GET_TEAM_WITH_EOD, { id: teamId1 })
  expect(eodQueryResult).toEqual({
    team: {
      currentEod: [],
    },
  })

  // TODO. this will change when sendEod works with teams
  eodQueryResult = await executeQuery(GET_TEAM_WITH_EOD, { id: teamId2 })
  expect(eodQueryResult).toEqual({
    team: {
      currentEod: [], // [team2Entry]
    },
  })
})
