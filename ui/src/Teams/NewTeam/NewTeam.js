import React from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Heading } from 'rebass/emotion'

import { toGraphQlSchema } from '../team'

import TeamForm from '../TeamForm/TeamForm'
import RedirectToTeams from '../RedirectToTeams'

export const CREATE_TEAM = gql`
  mutation CreateTeam($team: TeamInput!) {
    createTeam(team: $team) {
      _id
      name
      mailingList
      locations {
        name
      }
    }
  }
`

const doCreateTeam = (teamData, createTeamMutation) => {
  createTeamMutation({
    variables: {
      team: toGraphQlSchema(teamData),
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
                  onCancel={doRedirect}
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
