const { graphql } = require('graphql')

//TODO: This mongo setup only works with one file. Need to upgrade jest in order to do this way --> https://jestjs.io/docs/en/mongodb
const startDbServer = require('../test/startDbServer')
const stopDbServer = require('../test/stopDbServer')

const { connectToDb, closeDbConnection, entries } = require('./dbConnection')

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

const executeQuery = async (query, variables) => {
  const { data } = await graphql(schema, query, {}, {}, variables)

  return data
}

beforeEach(async () => await entries().deleteMany())

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
