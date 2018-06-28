const { graphql } = require('graphql')

const schema = require('./schema')

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
