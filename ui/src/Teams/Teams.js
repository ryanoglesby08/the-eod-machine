import React from 'react'

import { Link } from 'react-router-dom'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Box, Heading } from 'rebass/emotion'

export const GET_TEAMS = gql`
  {
    teams {
      _id
      name
      mailingList
    }
  }
`

const Teams = ({ match }) => (
  <Query query={GET_TEAMS}>
    {({ loading, data: { teams } }) => {
      if (loading) {
        teams = []
      }

      return (
        <div>
          <Heading>All teams</Heading>
          {teams.map(({ _id, name }) => (
            <Box py={3} key={_id}>
              <Link to={`${match.url}/${_id}/edit`}>{name}</Link>
            </Box>
          ))}
          <div>
            <Link to={`${match.url}/new`}>Create a team</Link>
          </div>
        </div>
      )
    }}
  </Query>
)

export default Teams
