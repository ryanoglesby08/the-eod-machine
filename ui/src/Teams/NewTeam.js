import React from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Heading } from 'rebass/emotion'

import TeamForm from './TeamForm'
import RedirectToTeams from './RedirectToTeams'

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

const NewTeam = () => (
  <RedirectToTeams>
    {doRedirect => {
      return (
        <Mutation mutation={CREATE_TEAM} onCompleted={doRedirect}>
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
    }}
  </RedirectToTeams>
)

export default NewTeam
