import React from 'react'

import { Link } from 'react-router-dom'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Box, Heading, Flex } from 'rebass/emotion'

import TabularList from '../../ui-components/TabularList/TabularList'
import ShowCreateATeamFallback from '../../ShowCreateATeamFallback/ShowCreateATeamFallback'

export const GET_TEAMS = gql`
  {
    teams {
      _id
      name
      locations {
        name
        eodTime
      }
    }
  }
`

const locationsInfo = locations =>
  locations.map(({ name, eodTime }) => `${name}: ${eodTime}`).join(' | ')

const Teams = ({ match }) => {
  const teamsUrl = match.path

  return (
    <Query query={GET_TEAMS}>
      {({ loading, data: { teams } }) => {
        if (loading) {
          teams = []
        }

        return (
          <>
            <Heading>Manage teams</Heading>

            <Box mt={3}>
              <ShowCreateATeamFallback teams={teams}>
                {teams => (
                  <TabularList>
                    {teams.map(({ _id, name, locations }) => (
                      <Flex justifyContent="space-between" key={_id}>
                        <Link to={`${teamsUrl}/${_id}/edit`}>{name}</Link>
                        {locationsInfo(locations)}
                      </Flex>
                    ))}
                  </TabularList>
                )}
              </ShowCreateATeamFallback>
            </Box>

            <Box mt={3}>
              <Link to={`${teamsUrl}/new`}>Create a team →</Link>
            </Box>
          </>
        )
      }}
    </Query>
  )
}

export default Teams
