import React from 'react'

import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import omit from 'lodash/omit'

import { Heading } from 'rebass/emotion'

import { toGraphQlSchema } from '../team'

import TeamForm from '../TeamForm/TeamForm'
import RedirectToTeams from '../RedirectToTeams'

export const GET_TEAM = gql`
  query Team($id: String!) {
    team(id: $id) {
      _id
      name
      mailingList
      locations {
        name
        timeZone
      }
    }
  }
`

export const EDIT_TEAM = gql`
  mutation EditTeam($id: String!, $team: TeamInput!) {
    editTeam(id: $id, team: $team) {
      _id
      name
      mailingList
      locations {
        name
        timeZone
      }
    }
  }
`

const doEditTeam = (id, teamData, editTeamMutation) => {
  editTeamMutation({
    variables: {
      id,
      team: toGraphQlSchema(teamData),
    },
  })
}

// Workaround until: https://github.com/apollographql/apollo-feature-requests/issues/6
const removeTypename = locations =>
  locations.map(location => omit(location, '__typename'))

const EditTeam = ({ match }) => {
  const { id } = match.params

  return (
    <Query query={GET_TEAM} variables={{ id }}>
      {({ loading, data: { team } }) => {
        if (loading) {
          return 'Loading...'
        }

        const { _id, name, mailingList, locations } = team

        return (
          <RedirectToTeams>
            {doRedirect => {
              return (
                <Mutation mutation={EDIT_TEAM} onCompleted={doRedirect}>
                  {editTeam => {
                    return (
                      <div>
                        <Heading>Editing team "{name}"</Heading>
                        <TeamForm
                          name={name}
                          mailingList={mailingList}
                          locations={removeTypename(locations)}
                          onSubmit={teamData =>
                            doEditTeam(_id, teamData, editTeam)
                          }
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
      }}
    </Query>
  )
}

export default EditTeam
