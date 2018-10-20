import { graphql } from 'graphql'

import schema from '../schema'

const executeQuery = async (query, variables) => {
  const { data } = await graphql(schema, query, {}, {}, variables)

  return data
}

export default executeQuery
