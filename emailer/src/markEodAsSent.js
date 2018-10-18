import gql from 'graphql-tag'

import apiClient from './apiClient'

const SEND_EOD = gql`
  mutation SendEod {
    sendEod {
      success
    }
  }
`

const markEodAsSent = async () => await apiClient.mutate({ mutation: SEND_EOD })

export default markEodAsSent
