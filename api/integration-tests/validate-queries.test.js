import { validate } from 'graphql/validation'
// import { parse } from 'graphql/language'  Use parse with raw queries that don't have gql

import glob from 'glob'

import schema from '../src/schema'

// TODO: add more queries in here

it('validates the queries', () => {
  const queryFiles = glob.sync('../../emailer/build/**/*.query.js')

  queryFiles.forEach(file => {
    const query = require(file).default
    const errors = validate(schema, query)

    expect(errors).toEqual([])
  })
})
