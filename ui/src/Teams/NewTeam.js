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
    newTeamId: undefined,
  }

  render() {
    const { newTeamId } = this.state

    if (newTeamId) {
      return <Redirect to={`/teams/${newTeamId}/edit`} push />
    }

    return (
      <Mutation
        mutation={CREATE_TEAM}
        onCompleted={({ createTeam: { _id } }) => {
          this.setState({ newTeamId: _id })
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
