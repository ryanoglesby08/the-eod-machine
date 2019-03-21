import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect, Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import { Heading, Text, Box, Message } from 'rebass/emotion'

import TabularList from '../../ui-components/TabularList/TabularList'
import ShowCreateATeamFallback from '../../ShowCreateATeamFallback/ShowCreateATeamFallback'
import FetchTeams from './FetchTeams'

const NonExistentTeamMessage = () => (
  <Message bg="red">
    <span role="img" aria-label="thinking face">
      🤔
    </span>
    That's odd... the team you've selected doesn't exist. It may have been
    deleted. Try choosing a new one.
  </Message>
)

const TeamSelector = ({ teams, chooseTeam }) => (
  <>
    <Heading>Choose a team to receive your EOD update</Heading>

    <Box mt={3}>
      <ShowCreateATeamFallback teams={teams}>
        {teams => (
          <TabularList>
            {teams.map(({ _id, name }) => (
              <TabularList.ClickableRow
                onClick={() => chooseTeam(_id)}
                key={_id}
              >
                <Text textAlign="left">{name}</Text>
              </TabularList.ClickableRow>
            ))}
          </TabularList>
        )}
      </ShowCreateATeamFallback>
    </Box>

    <Box mt={3}>
      <Link to="/teams/new">Create a team →</Link>
    </Box>
  </>
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

class SelectTeam extends Component {
  state = {
    redirectToEod: false,
  }

  chooseTeam = teamId => {
    const { cookies } = this.props
    cookies.set('team', teamId)

    this.setState({ redirectToEod: true })
  }

  render() {
    const { redirectToEod } = this.state
    const { cookies } = this.props

    const teamId = cookies.get('team')

    if (redirectToEod) {
      return <Redirect to="/" />
    }

    return (
      <FetchTeams>
        {(teams, doesTeamExist) => {
          return (
            <>
              {teamId && !doesTeamExist(teamId) && (
                <Box mb={3}>
                  <NonExistentTeamMessage />
                </Box>
              )}

              <TeamSelector teams={teams} chooseTeam={this.chooseTeam} />
            </>
          )
        }}
      </FetchTeams>
    )
  }
}

export default withCookies(SelectTeam)
