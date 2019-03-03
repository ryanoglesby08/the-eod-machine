import React from 'react'

import { Link } from 'react-router-dom'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Heading } from 'rebass/emotion'

import TabularList from '../../ui-components/TabularList/TabularList'

export const GET_TEAMS = gql`
  {
    teams {
      _id
      name
    }
  }
`

const Teams = ({ match }) => {
  const teamsUrl = match.path

  return (
    <Query query={GET_TEAMS}>
      {({ loading, data: { teams } }) => {
        if (loading) {
          teams = []
        }

        return (
          <div>
            <Heading>Manage teams</Heading>
            <TabularList>
              {teams.map(({ _id, name }) => (
                <Link to={`${teamsUrl}/${_id}/edit`} key={_id}>
                  {name}
                </Link>
              ))}
            </TabularList>

            <div>
              <Link to={`${teamsUrl}/new`}>Create a team</Link>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default Teams
