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

describe('hello query', () => {
  it('receives a hello world message', async () => {
    const query = `
      {
        hello {
          message
        }
      }
    `
    const { data } = await graphql(schema, query)

    expect(data).toEqual({ hello: { message: 'Hello from the EOD Machine' } })
  })
})

const deleteAllEntries = async () => await entries().deleteMany()

describe('queries', () => {
  describe('eod', () => {
    beforeEach(deleteAllEntries)

    it('fetches all entries', async () => {
      await entries().insertOne({
        category: 'Test category',
        content: 'some content',
      })

      const query = `
        {
          eod {
            entries {
              category
              content
            }
          }
        }
      `

      const { data } = await graphql(schema, query)

      expect(data).toEqual({
        eod: {
          entries: [
            {
              category: 'Test category',
              content: 'some content',
            },
          ],
        },
      })
    })
  })
})

describe('mutations', () => {
  describe('addToEod', () => {
    beforeEach(deleteAllEntries)

    it('appends entries', async () => {
      const mutation = `
        mutation AddToEod($entries: [EntryInput]!) {
          addToEod(entries: $entries) {
            category
            content
          }
        }
      `
      const variables = {
        entries: [
          {
            category: 'Test category',
            content: 'some content',
          },
        ],
      }

      const { data } = await graphql(schema, mutation, {}, {}, variables)

      expect(data).toEqual({
        addToEod: [
          {
            category: 'Test category',
            content: 'some content',
          },
        ],
      })

      const savedEntries = await entries()
        .find()
        .toArray()

      expect(savedEntries).toEqual([
        expect.objectContaining({
          category: 'Test category',
          content: 'some content',
        }),
      ])
    })
  })
})
