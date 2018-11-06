import {
  someEntryInput,
  someEntryInputAndAuthoredEntry,
} from '../../__test-utils__/entry-mother'
import executeQuery from './__test-utils__/executeQuery'

import {
  closeDbConnection,
  connectToDb,
  entriesCollection,
} from './dbConnection'

beforeAll(async () => {
  await connectToDb(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
})

afterAll(async () => {
  await closeDbConnection()
})

const GET_EOD = `
  query Eod($teamId: String!) {
    eod(teamId: $teamId) {
      entries {
        author
        category
        content
      }
    }
  }
`

const ADD_TO_EOD = `
  mutation AddToEod($author: String!, $entries: [EntryInput]!, $teamId: String!) {
    addToEod(author: $author, entries: $entries, teamId: $teamId) {
      author
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

beforeEach(async () => {
  await entriesCollection().deleteMany()
})

it("adds entries to a team's current eod", async () => {
  const { entryInput, authoredEntry } = someEntryInputAndAuthoredEntry({
    author: 'The author',
  })

  let eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [],
    },
  })

  const addToEodResult = await executeQuery(ADD_TO_EOD, {
    author: 'The author',
    entries: [entryInput],
    teamId: 'team-1',
  })
  expect(addToEodResult).toEqual({
    addToEod: [authoredEntry],
  })

  eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [authoredEntry],
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
  const team1Entry = someEntryInputAndAuthoredEntry({ author: 'team 1' })
  const team2EntryInput = someEntryInput({ author: 'team 2' })

  await executeQuery(ADD_TO_EOD, {
    author: 'team 1',
    entries: [team1Entry.entryInput],
    teamId: 'team-1',
  })
  await executeQuery(ADD_TO_EOD, {
    author: 'team 2',
    entries: [team2EntryInput],
    teamId: 'team-2',
  })

  let eodQueryResult = await executeQuery(GET_EOD, { teamId: 'team-1' })
  expect(eodQueryResult).toEqual({
    eod: {
      entries: [team1Entry.authoredEntry],
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
