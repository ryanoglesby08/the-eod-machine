import gql from 'graphql-tag'

import apiClient from './apiClient'

const SEND_EOD = gql`
  mutation SendEod($teamIds: [String]!) {
    sendEod(teamIds: $teamIds) {
      success
    }
  }
`

const markEodAsSent = async teams => {
  const teamIds = teams.map(team => team._id)

  await apiClient.mutate({ mutation: SEND_EOD, variables: { teamIds } })
}

export default markEodAsSent
