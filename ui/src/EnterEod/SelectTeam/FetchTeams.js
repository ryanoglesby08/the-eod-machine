import React from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

export const GET_TEAMS = gql`
  {
    teams {
      _id
      name
    }
  }
`

const FetchTeams = ({ children }) => (
  <Query query={GET_TEAMS}>
    {({ loading, data: { teams } }) => {
      if (loading) {
        return null
      }

      const doesTeamExist = teamId => teams.some(({ _id }) => _id === teamId)
      return children(teams, doesTeamExist)
    }}
  </Query>
)
FetchTeams.propTypes = {
  children: PropTypes.func.isRequired,
}

export default FetchTeams
