import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router-dom'
import { withCookies } from 'react-cookie'

import { Heading, Text, Box, Message } from 'rebass/emotion'

import TabularList from '../../ui-components/TabularList/TabularList'
import FetchTeams from './FetchTeams'

const NonExistentTeamMessage = () => (
  <Message bg="red">
    That's odd... the team you've selected doesn't exist. Try picking a
    different one.
  </Message>
)

const TeamSelector = ({ teams, chooseTeam }) => (
  <>
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
