import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { Heading, Text, Box, Message } from 'rebass/emotion'

import TabularList from '../ui-components/TabularList/TabularList'

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

      return children(teams)
    }}
  </Query>
)
FetchTeams.propTypes = {
  children: PropTypes.func.isRequired,
}

const TeamSelector = ({ teams, chooseTeam }) => (
  <Fragment>
    <Box mb={3}>
      <Heading>Choose a team to receive your EOD update</Heading>
    </Box>

    <TabularList>
      {teams.map(({ _id, name }) => (
        <TabularList.ClickableRow onClick={() => chooseTeam(_id)} key={_id}>
          <Text textAlign="left">{name}</Text>
        </TabularList.ClickableRow>
      ))}
    </TabularList>
  </Fragment>
)
TeamSelector.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  chooseTeam: PropTypes.func.isRequired,
}

const doesTeamExist = (teams, teamId) => teams.some(({ _id }) => _id === teamId)

class WithTeam extends Component {
  state = {
    teamId: this.props.cookies.get('team'),
  }

  chooseTeam = teamId => {
    const { cookies } = this.props
    cookies.set('team', teamId)

    this.setState({ teamId })
  }

  render() {
    const { children } = this.props
    const { teamId } = this.state

    return (
      <FetchTeams>
        {teams => {
          if (teams.length === 0) {
            return (
              <Text>
                You'll need to create a team before you can enter an EOD update.{' '}
                <Link to={'/teams/new'}>Create a team →</Link>
              </Text>
            )
          }

          if (!teamId) {
            return <TeamSelector teams={teams} chooseTeam={this.chooseTeam} />
          }

          if (!doesTeamExist(teams, teamId)) {
            return (
              <Fragment>
                <Box mb={3}>
                  <Message bg="red">
                    That's odd... the team you've selected doesn't exist. Try
                    picking a different one.
                  </Message>
                </Box>

                <TeamSelector teams={teams} chooseTeam={this.chooseTeam} />
              </Fragment>
            )
          }

          return children(teamId)
        }}
      </FetchTeams>
    )
  }
}

WithTeam.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  children: PropTypes.func.isRequired,
}

export default withCookies(WithTeam)
