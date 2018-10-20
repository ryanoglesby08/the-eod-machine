import { anEntry } from '../../__test-utils__/entry-mother'
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

beforeEach(async () => {
  await entriesCollection().deleteMany()
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
