import React from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const GET_TEAM_WITH_EOD = gql`
  query Team($id: String!) {
    team(id: $id) {
      name
      currentEod {
        author
        category
        content
      }
    }
  }
`

export const updateGetTeamWithEodQuery = id => (
  cache,
  { data: { addToEod } }
) => {
  const { team } = cache.readQuery({
    query: GET_TEAM_WITH_EOD,
    variables: { id },
  })

  team.currentEod = team.currentEod.concat(addToEod)

  cache.writeQuery({
    query: GET_TEAM_WITH_EOD,
    variables: { id },
    data: { team },
  })
}

const FetchTeamWithEod = ({ id, children }) => (
  <Query query={GET_TEAM_WITH_EOD} variables={{ id }}>
    {({ loading, data }) => {
      if (loading) {
        return null
      }

      return children(data.team)
    }}
  </Query>
)
FetchTeamWithEod.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
}

export default FetchTeamWithEod
