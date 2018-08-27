import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Heading } from 'rebass/emotion'

import TeamForm from './TeamForm'

export const CREATE_TEAM = gql`
  mutation CreateTeam($team: TeamInput!) {
    createTeam(team: $team) {
      _id
      name
      mailingList
    }
  }
`

const doCreateTeam = (teamData, createTeamMutation) => {
  const mailingListAsArray = teamData.mailingList
    .split(',')
    .map(emailAddress => emailAddress.trim())

  createTeamMutation({
    variables: {
      team: {
        ...teamData,
        mailingList: mailingListAsArray,
      },
    },
  })
}

class NewTeam extends Component {
  state = {
    toTeamsList: false,
  }

  render() {
    const { toTeamsList } = this.state

    if (toTeamsList) {
      return <Redirect to="/teams" push />
    }

    return (
      <Mutation
        mutation={CREATE_TEAM}
        onCompleted={() => {
          this.setState({ toTeamsList: true })
        }}
      >
        {createTeam => {
          return (
            <div>
              <Heading>Create a new team</Heading>
              <TeamForm
                onSubmit={teamData => {
                  doCreateTeam(teamData, createTeam)
                }}
              />
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default NewTeam
