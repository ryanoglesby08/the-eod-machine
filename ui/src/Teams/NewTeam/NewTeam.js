import React from 'react'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { Box, Heading } from 'rebass/emotion'

import { toGraphQlSchema } from '../team'

import { GET_TEAMS } from '../Teams/Teams'
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
        timeZone
        eodTime
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
        <Mutation
          mutation={CREATE_TEAM}
          refetchQueries={[{ query: GET_TEAMS }]}
          onCompleted={doRedirect}
        >
          {createTeam => {
            return (
              <>
                <Heading>Create a new team</Heading>

                <Box mt={3}>
                  <TeamForm
                    onSubmit={teamData => {
                      doCreateTeam(teamData, createTeam)
                    }}
                    onCancel={doRedirect}
                  />
                </Box>
              </>
            )
          }}
        </Mutation>
      )
    }}
  </RedirectToTeams>
)

export default NewTeam
