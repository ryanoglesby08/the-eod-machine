import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withCookies, Cookies } from 'react-cookie'
import { Link } from 'react-router-dom'

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

      return children(teams)
    }}
  </Query>
)
FetchTeams.propTypes = {
  children: PropTypes.func.isRequired,
}

const TeamSelector = ({ teams, chooseTeam }) => (
  <div>
    Select your team
    {teams.map(team => (
      <div key={team._id} onClick={() => chooseTeam(team._id)}>
        {team.name}
      </div>
    ))}
  </div>
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
              <Fragment>
                <span>There are no teams</span>
                <Link to={'/teams'}>Create teams</Link>
              </Fragment>
            )
          }

          if (!teamId) {
            return <TeamSelector teams={teams} chooseTeam={this.chooseTeam} />
          }

          if (!doesTeamExist(teams, teamId)) {
            return (
              <Fragment>
                Team does not exist
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
