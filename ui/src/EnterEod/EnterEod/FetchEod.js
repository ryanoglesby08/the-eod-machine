import React from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const GET_EOD = gql`
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

export const updateGetEodQuery = teamId => (cache, { data: { addToEod } }) => {
  const { eod } = cache.readQuery({ query: GET_EOD, variables: { teamId } })

  eod.entries = eod.entries.concat(addToEod)

  cache.writeQuery({
    query: GET_EOD,
    variables: { teamId },
    data: { eod },
  })
}

const FetchEod = ({ teamId, children }) => (
  <Query query={GET_EOD} variables={{ teamId }}>
    {({ data: { eod } }) => {
      return children(eod)
    }}
  </Query>
)
FetchEod.propTypes = {
  teamId: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

export default FetchEod
