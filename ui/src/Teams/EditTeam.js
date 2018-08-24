import React from 'react'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Heading } from 'rebass/emotion'

import TeamForm from './TeamForm'

export const GET_TEAM = gql`
  query Team($id: String!) {
    team(id: $id) {
      _id
      name
      mailingList
    }
  }
`

const EditTeam = ({ match }) => {
  const { id } = match.params

  return (
    <Query query={GET_TEAM} variables={{ id }}>
      {({ loading, data: { team } }) => {
        if (loading) {
          team = {}
        }

        const { name, mailingList } = team

        return (
          <div>
            <Heading>Editing team "{name}"</Heading>
            <TeamForm
              name={name}
              mailingList={mailingList}
              onSubmit={() => console.log('submitted')}
            />
          </div>
        )
      }}
    </Query>
  )
}

export default EditTeam
