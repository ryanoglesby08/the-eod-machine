import React from 'react'

import { Route, Redirect, Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import { Text } from 'rebass/emotion'

import FetchTeams from './FetchTeams'

const CreateTeamMessage = () => (
  <Text>
    You'll need to create a team before you can enter an EOD update.{' '}
    <Link to={'/teams/new'}>Create a team →</Link>
  </Text>
)

const TeamRequiredRoute = ({ component: Component, cookies, ...rest }) => {
  const teamId = cookies.get('team')

  return (
    <Route
      {...rest}
      render={() => {
        return (
          <FetchTeams>
            {(teams, doesTeamExist) => {
              if (teams.length === 0) {
                return <CreateTeamMessage />
              }

              if (!teamId || !doesTeamExist(teamId)) {
                return <Redirect to="/select-team" />
              }

              return <Component teamId={teamId} />
            }}
          </FetchTeams>
        )
      }}
    />
  )
}

export default withCookies(TeamRequiredRoute)
