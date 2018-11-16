import { createTestClient } from 'apollo-server-testing'

import server from '../server'

const { query, mutate } = createTestClient(server)

export const executeQuery = async (theQuery, variables) => {
  const { data } = await query({ query: theQuery, variables })

  return data
}

export const executeMutation = async (theMutation, variables) => {
  const { data } = await mutate({ mutation: theMutation, variables })

  return data
}
